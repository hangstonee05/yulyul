@echo off
@chcp 65001 > nul

:: 1. 커밋 메시지 입력 받기
set /p msg="커밋 메시지를 입력하세요: "

:: 2. 입력값이 비어있는지 확인
if "%msg%"=="" (
    echo 에러: 메시지가 입력되지 않았습니다.
    pause
    exit /b
)

:: 3. Git 명령 실행
echo.
echo [작업 시작: %msg%]
git add .
git commit -m "%msg%"

:: 4. 결과 확인
if %errorlevel% equ 0 (
    echo.
    echo ? 커밋이 성공적으로 완료되었습니다!
) else (
    echo.
    echo ? 커밋 중 에러가 발생했습니다. 위 메시지를 확인하세요.
)

pause