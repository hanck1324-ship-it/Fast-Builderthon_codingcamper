# 🌊 Yeoul: Multimodal AI Trialogue Interface

> **"Passive Watching to Active Flow."** (수동적 시청에서 능동적 몰입으로.)

---

## 📖 Project Overview

**여울(Yeoul)**은 패스트캠퍼스 강의 수강 환경을 혁신하는 **멀티모달 AI 트라이얼로그(3자 대화) 인터페이스**입니다.

기존의 이러닝(E-learning)이 '시청(Watching)'에 머물렀다면, 여울은 **Vision AI(시각)**와 **Voice AI(청각)** 기술을 결합하여 사용자가 **읽고(OCR), 쓰고(Writing), 말하는(Speaking)** 완전한 **액티브 러닝(Active Learning)** 경험을 제공합니다.

---

## 🚀 Key Features (Core Competency)

### 1. **Multimodal AI Tutoring** (멀티모달 튜터링)

**Vision-to-Text (OCR)**
- 강의 화면이나 사용자의 손글씨 노트를 카메라로 인식하여, AI가 수식과 개념을 즉시 이해하고 첨삭합니다.

**Context-Awareness**
- 현재 시청 중인 강의의 맥락(Context)을 AI가 실시간으로 파악하여 질문하지 않아도 먼저 화두를 던집니다.

---

### 2. **Immersive AI Trialogue** (몰입형 3자 토론)

단순한 1:1 챗봇이 아닙니다. **상반된 페르소나**를 가진 AI 패널들이 사용자와 함께 **3각 구도**로 토론을 펼칩니다.

- **🔥 James (The Critic)**: 논리적 허점을 날카롭게 지적하는 비평가 에이전트
  - *(Based on Llama 3 70B)*
  
- **🍀 Linda (The Supporter)**: 창의적 발상을 지지하고 확장해주는 조력자 에이전트

- **👤 User (The Learner)**: 두 AI 사이에서 자신의 논리를 증명하며 주도적으로 학습합니다.

---

### 3. **Voice-First Experience** (음성 우선 경험)

**Real-time Audio Visualization**
- 사용자와 AI의 목소리에 반응하는 유동적 파형(Fluid Waveform) UI로 시각적 몰입감을 극대화합니다.

**Human-like TTS**
- ElevenLabs API를 활용하여, AI 패널들이 감정이 실린 목소리로 실제 사람처럼 대화합니다.

---

### 4. **Flow Gamification** (성장 시스템)

**Cognitive Tokens**
- 단순 출석이 아닌, 발언의 **'논리성'**과 **'기여도'**를 분석하여 성장 토큰을 지급합니다.

**Persistent Learning**
- 획득한 토큰과 학습 데이터는 Supabase에 영구 저장되어 학습자의 **포트폴리오**가 됩니다.

---

## 💻 Technology Stack

### Frontend
- **Framework**: Next.js 15 + React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui + Custom Components
- **Icons**: Lucide React
- **Animations**: Motion (Framer Motion)
- **Charts**: Recharts

### Backend (Planned)
- **LLM**: Llama 3 70B (Claude API)
- **Voice**: ElevenLabs TTS API
- **Database**: Supabase (PostgreSQL)
- **OCR**: Vision AI (Claude Vision)

---

## 📁 Project Structure

```
frontend/
├── app/
│   ├── page.tsx                 # 메인 페이지
│   ├── layout.tsx               # 레이아웃
│   └── globals.css              # 글로벌 스타일
├── components/
│   ├── HomePage.tsx             # 홈페이지
│   ├── MainChatUI.tsx           # 메인 트라이얼로그 UI
│   ├── BattleArena.tsx          # 배틀 아레나
│   ├── AudioVisualizer.tsx      # 오디오 파형 시각화
│   ├── TokenRewardPopup.tsx     # 토큰 리워드
│   ├── providers.tsx            # Context Providers
│   └── ui/                      # UI 컴포넌트 라이브러리
├── data/
│   └── mockData.ts              # 목업 데이터
├── types/                       # TypeScript 타입 정의 (준비 중)
├── hooks/                       # Custom Hooks (준비 중)
└── lib/                         # 유틸리티 함수 (준비 중)
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x 이상
- pnpm 또는 npm

### Installation

```bash
# 저장소 클론
git clone https://github.com/hanck1324-ship-it/Fast-Builderthon_codingcamper.git

# 프론트엔드 디렉토리로 이동
cd frontend

# 의존성 설치
pnpm install
```

### Development Server

```bash
pnpm dev
```

브라우저에서 `http://localhost:3000`으로 접속하세요.

### Build

```bash
pnpm build
pnpm start
```

---

## 🎯 Core User Flows

### 1. **Learning Flow**
학생 → 강의 선택 → AI Trialogue 시작 → 발언 입력 → 토큰 획득 → 포트폴리오 축적

### 2. **Battle Flow**
사용자 A, B 선택 → 토론 주제 선택 → AI 심판 → 점수 계산 → 승자 결정

### 3. **Multimodal Input Flow**
카메라(OCR) → 음성(STT) → LLM 분석 → 응답 생성 → 음성 출력(TTS)

---

## 📊 Competitive Advantages

| 기능 | 기존 이러닝 | **여울** |
|------|----------|--------|
| 상호작용 | 1:1 채팅 | **3자 토론** |
| 입력 방식 | 텍스트만 | **음성 + 텍스트 + OCR** |
| AI 성격 | 일관된 톤 | **상반된 페르소나** |
| 학습 증명 | 수료증 | **Cognitive Token + 포트폴리오** |
| 시각적 경험 | 정적 채팅창 | **유동형 파형 + 몰입감** |

---

## 🔮 Future Roadmap

- [ ] **Phase 1**: Core Trialogue System (현재 진행 중)
- [ ] **Phase 2**: Multimodal Input (Voice STT + Vision OCR)
- [ ] **Phase 3**: Real LLM Integration (Claude API)
- [ ] **Phase 4**: Persistent Database (Supabase)
- [ ] **Phase 5**: Mobile App (React Native)
- [ ] **Phase 6**: Live Battle System with Real Users

---

## 📝 License

MIT License - 자세한 내용은 `LICENSE` 파일을 참고하세요.

---

## 🤝 Contributing

기여를 환영합니다! Pull Request를 제출해 주세요.

---

## 📧 Contact & Support

프로젝트에 대한 문의사항이 있으시면 이슈를 등록해 주세요.

---

**Made with ❤️ for transforming passive learning into active flow.**
