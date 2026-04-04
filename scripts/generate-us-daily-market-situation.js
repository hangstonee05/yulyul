const fs = require('fs');
const path = require('path');

// 1단계: 전날 주식 시장 휴장 여부 확인
function isUSMarketHoliday(date) {
  const yesterday = new Date(date);
  yesterday.setDate(yesterday.getDate() - 1);

  const month = yesterday.getMonth() + 1;
  const day = yesterday.getDate();
  const dayOfWeek = yesterday.getDay(); // 0: 일요일, 6: 토요일

  // 주말 확인
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    return true;
  }

  // 주요 휴장일 확인 (예시에 나온 1월 1일 포함)
  const holidays = [
    { month: 1, day: 1 },   // 신정
    { month: 12, day: 25 }, // 크리스마스
    // 추가적인 휴장일이 필요할 경우 여기에 추가 가능 (설날 등은 해당 없음)
  ];

  return holidays.some(h => h.month === month && h.day === day);
}

async function generateMarketPost() {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  // YYYY-MM-DD 형식의 날짜 문자열 생성
  const formatDate = (d) => d.toISOString().split('T')[0];
  const todayStr = formatDate(today);
  const yesterdayStr = formatDate(yesterday);
  
  // 휴장일 체크
  if (isUSMarketHoliday(today)) {
    console.log(`어제(${yesterdayStr})는 휴장일(주말 또는 공휴일)이었습니다. 스크립트를 종료합니다.`);
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('에러: GEMINI_API_KEY 환경변수가 설정되지 않았습니다.');
    process.exit(1);
  }

  // 2단계: Gemini AI로 블로그 글 생성
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent`;
  
  const prompt = `당신은 전문 주식 분석가이자 친근한 블로거입니다. 당신의 닉네임은 'yulyul'입니다. ${yesterdayStr}(미국 현지 시각 기준)의 미국 주식 시장 시황을 바탕으로 블로그 글을 작성해 주세요.

아래 형식으로 출력해줘. 반드시 이 형식만 출력하고 다른 텍스트는 없이:
---
title: (친근하고 흥미로운 제목)
date: ${todayStr}
summary: (한 줄 요약)
category: 정보
tags: [태그1, 태그2, 태그3]
---

(본문: 1000자 이상, ${yesterdayStr}의 구체적인 지수(다우, S&P500, 나스닥)와 주요 이슈를 포함하여 친근하고 정보성 있는 블로그 톤으로 작성)

마지막 줄에 FILENAME: ${todayStr}-us-daily-(영문키워드) 형식으로 파일명도 출력해줘. 키워드는 영문 1~2단어로.`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    const data = await response.json();
    
    if (data.error) {
      throw new Error(`Gemini API 에러: ${data.error.message}`);
    }

    const outputText = data.candidates[0].content.parts[0].text;

    // 3단계: 파일 저장 처리
    // FILENAME 부분을 찾아 추출
    const filenameMatch = outputText.match(/FILENAME:\s*(.+)/i);
    if (!filenameMatch) {
      throw new Error('응답에서 파일명을 찾을 수 없습니다.');
    }

    const filename = filenameMatch[1].trim() + '.md';
    // 파일명 라인을 제외한 본문 내용만 추출
    const content = outputText.replace(/FILENAME:\s*.+/i, '').trim();

    const postsDir = path.join(__dirname, '../src/content/posts');
    if (!fs.existsSync(postsDir)) {
      fs.mkdirSync(postsDir, { recursive: true });
    }

    const targetPath = path.join(postsDir, filename);
    fs.writeFileSync(targetPath, content, 'utf8');

    console.log(`성공: 블로그 포스트가 생성되었습니다 -> ${filename}`);
  } catch (error) {
    console.error(`작업 중 오류 발생: ${error.message}`);
  }
}

generateMarketPost();
