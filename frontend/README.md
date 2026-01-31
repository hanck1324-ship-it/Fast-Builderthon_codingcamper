# 여울(Yeoul) - AI 세미나 토론 플랫폼

## 소개

여울(Yeoul)은 강의 시청 중 실시간으로 AI 에이전트와 3자 토론을 할 수 있는 혁신적인 교육 플랫폼입니다. 사용자는 제임스(비평가 🔥)와 린다(지지자 🍀)라는 두 AI 에이전트와 함께 강의 주제에 대해 토론하며, 논리적인 발언에 대해 토큰을 획득할 수 있습니다.

## 주요 기능

### 핵심 기능
- **실시간 AI 토론**: 제임스(비평가, 빨강🔥)와 린다(지지자, 초록🍀) AI 에이전트와 3자 토론
- **음성/텍스트 입력**: 음성 또는 텍스트로 의견 제시 가능
- **게이미피케이션**: 논리적인 발언에 대한 토큰 획득 시스템
- **오디오 비주얼라이저**: 음성 인식 시각화 UI
- **토큰 리워드 시스템**: 발언 품질에 따른 보상

### UI/UX 특징
- 📱 모바일 중심 설계
- 🌊 물결(여울) 테마의 청록색 브랜딩
- 🌙 다크 모드 채팅 인터페이스
- ✨ Glassmorphism 디자인 스타일

## 기술 스택

- **Frontend**: React + TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Custom component library with shadcn/ui
- **Icons**: Lucide React
- **Animations**: Motion (Framer Motion)
- **Charts**: Recharts

## 프로젝트 구조

```
/
├── App.tsx                      # 메인 앱 컴포넌트
├── components/
│   ├── MainChatUI.tsx          # 메인 토론 채팅 UI
│   ├── AudioVisualizer.tsx     # 오디오 비주얼라이저
│   ├── TokenRewardPopup.tsx    # 토큰 획득 팝업
│   ├── HomePage.tsx            # 홈페이지
│   ├── CourseDashboard.tsx     # 코스 대시보드
│   ├── LectureListPage.tsx     # 강의 목록
│   ├── LectureView.tsx         # 강의 시청
│   ├── BattleArena.tsx         # 배틀 아레나
│   ├── StrategyRoom.tsx        # 전략실
│   ├── AudienceLobby.tsx       # 관전 로비
│   ├── LiveArenaEvent.tsx      # 라이브 이벤트
│   ├── VictoryScreen.tsx       # 승리 화면
│   ├── LoginModal.tsx          # 로그인 모달
│   └── ui/                     # UI 컴포넌트 라이브러리
├── data/
│   └── mockData.ts             # 목업 데이터
├── styles/
│   └── globals.css             # 글로벌 스타일
└── guidelines/
    └── Guidelines.md           # 개발 가이드라인

```

## 시작하기

### 필요 조건

- Node.js 18.x 이상
- npm 또는 yarn

### 설치

```bash
# 저장소 클론
git clone https://github.com/your-username/yeoul-platform.git

# 프로젝트 디렉토리로 이동
cd yeoul-platform

# 의존성 설치
npm install
# 또는
yarn install
```

### 개발 서버 실행

```bash
npm run dev
# 또는
yarn dev
```

브라우저에서 `http://localhost:5173` (또는 표시된 포트)으로 접속하세요.

### 빌드

```bash
npm run build
# 또는
yarn build
```

## 주요 화면

1. **홈페이지**: 서비스 소개 및 코스 선택
2. **강의 대시보드**: 강의 목록 및 진행 상황
3. **토론 UI**: AI 에이전트와의 실시간 3자 토론
4. **배틀 아레나**: 사용자 간 토론 대결
5. **전략실**: 토론 준비 및 전략 수립

## 특징

### AI 에이전트

- **제임스 (James) 🔥**: 비평적 관점으로 논의를 심화시키는 에이전트
- **린다 (Linda) 🍀**: 긍정적 관점으로 아이디어를 발전시키는 에이전트

### 토큰 시스템

사용자의 발언은 다음 기준으로 평가되어 토큰을 획득합니다:
- 논리성
- 근거의 타당성
- 창의성
- 토론 기여도

## 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다.

## 기여

기여를 환영합니다! Pull Request를 제출해 주세요.

## 문의

프로젝트에 대한 문의사항이 있으시면 이슈를 등록해 주세요.

---

Made with ❤️ for better learning experiences
