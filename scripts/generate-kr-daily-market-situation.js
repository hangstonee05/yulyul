const fs = require('fs');
const path = require('path');

/**
 * [1단계] 오늘 주식 시장이 열렸었는지 확인
 * 한국의 휴장일(주말 및 공휴일)인지 체크합니다.
 */
function isKRMarketHoliday(date) {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dayOfWeek = date.getDay(); // 0: 일요일, 6: 토요일

  // 1. 주말(토, 일) 확인
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    return true;
  }

  // 2. 한국 주요 공휴일 (매년 날짜가 고정된 경우)
  const holidays = [
    { month: 1, day: 1 },   // 신정
    { month: 3, day: 1 },   // 삼일절
    { month: 5, day: 5 },   // 어린이날
    { month: 6, day: 6 },   // 현충일
    { month: 8, day: 15 },  // 광복절
    { month: 10, day: 3 },  // 개천절
    { month: 10, day: 9 },  // 한글날
    { month: 12, day: 25 }, // 크리스마스
    { month: 12, day: 31 }, // 연말 휴장일
  ];

  return holidays.some(h => h.month === month && h.day === day);
}

/**
 * 현재 시간을 한국 표준시(KST)로 가져오기
 */
function getKSTDate() {
  const curr = new Date();
  const utc = curr.getTime() + (curr.getTimezoneOffset() * 60 * 1000);
  const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
  return new Date(utc + KR_TIME_DIFF);
}

async function generateKRMarketPost() {
  const today = getKSTDate();
  
  // YYYY-MM-DD 형식의 날짜 문자열 생성
  const formatDate = (d) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const todayStr = formatDate(today);

  // 휴장일 체크
  if (isKRMarketHoliday(today)) {
    // 요청하신 대로 휴장일 메시지 출력 후 종료
    console.log('어제는 휴장일이었습니다.');
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('에러: GEMINI_API_KEY 환경변수가 설정되지 않았습니다.');
    return;
  }

  // [2단계] Gemini AI로 블로그 글 생성
  // 요청하신 전용 엔드포인트 사용
  const endpoint = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

  // 프롬프트 작성 (요청하신 가이드라인을 충실히 반영)
  const prompt = `당신은 전문 주식 분석가이자 친근한 블로거입니다. 당신의 닉네임은 'yulyul'입니다. ${todayStr}(한국 시각 기준)의 한국 주식 시장 시황을 바탕으로 블로그 글을 작성해 주세요.

[작성 가이드라인]
1. **시장 종합**: 2대 주요 지수(KOSPI, KOSDAQ)의 마감 현황과 등락 원인을 설명해 주세요.
2. **거시 지표**: 유가, 미국 및 한국 국채 금리, 금, 비트코인의 가격 동향과 이것이 증시에 미친 영향을 포함해 주세요.
3. **주요 흐름 및 특징주**: 당일 시장의 핵심 테마와 주도주, 혹은 실적 발표 등으로 급등락한 특징적인 종목을 분석해 주세요.
4. **섹터별 동향**: 주요 섹터(기술, 에너지, 금융, 헬스케어 등)별 흐름을 간략히 다뤄 주세요.
5. **어조**: 친근하면서도 전문성이 느껴지는 'yulyul' 블로거 톤으로 작성.
6. **분량**: 풍부한 정보를 위해 본문은 6,000자 내외로 상세하게 작성.

아래 형식으로 출력해줘. 반드시 이 형식만 출력하고 다른 텍스트는 없이:

---
title: "(친근하고 흥미로운 제목)"
date: ${todayStr}
summary: "(한 줄 요약)"
category: 정보
tags: [태그1, 태그2, 태그3]
---

(본문)

title과 summary에는 쌍따옴표로 묶어줘.
마지막 줄에 FILENAME: ${todayStr}-kr-daily-(영문키워드) 형식으로 파일명도 출력해줘. 키워드는 영문 1~2단어로.`;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    const data = await response.json();

    if (data.error) {
      throw new Error(`Gemini API 에러: ${data.error.message}`);
    }

    if (!data.candidates || !data.candidates[0]) {
      throw new Error('Gemini API로부터 유효한 응답을 받지 못했습니다.');
    }

    const outputText = data.candidates[0].content.parts[0].text;

    // [3단계] 파일 저장
    // FILENAME 부분을 찾아 추출
    const filenameMatch = outputText.match(/FILENAME:\s*(.+)/i);
    if (!filenameMatch) {
      throw new Error('응답에서 파일명을 찾을 수 없습니다.');
    }

    const blogFileName = filenameMatch[1].trim() + '.md';
    // 파일명 표시 라인을 제외한 본문 내용만 추출
    const blogContent = outputText.replace(/FILENAME:\s*.+/i, '').trim();

    const postsDir = path.join(__dirname, '../src/content/posts');
    if (!fs.existsSync(postsDir)) {
      fs.mkdirSync(postsDir, { recursive: true });
    }

    const targetPath = path.join(postsDir, blogFileName);
    fs.writeFileSync(targetPath, blogContent, 'utf8');

    console.log(`성공: 블로그 포스트가 생성되었습니다 -> ${blogFileName}`);
  } catch (error) {
    console.error(`작업 중 오류 발생: ${error.message}`);
  }
}

// 스크립트 실행
generateKRMarketPost();
