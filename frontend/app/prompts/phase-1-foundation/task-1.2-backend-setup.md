# Task 1.2: Backend 프로젝트 셋업 (업데이트)

## 목표
FastAPI + LangChain 기반 AI 백엔드 구축 (프론트엔드 사용자 정보 연동)

## ✅ 완료 상황 (2026-01-31)

### 이미 구현된 것
- ✅ `Backend/main.py` - FastAPI 앱 (사용자 정보 통합)
- ✅ `Backend/requirements.txt` - 의존성
- ✅ `Backend/.env.example` - 환경변수 템플릿
- ✅ `frontend/lib/api.ts` - API 통합 계층
- ✅ `frontend/hooks/useAuth.ts` - 사용자 프로필 관리
- ✅ `frontend/hooks/useChat.ts` - 사용자 정보 포함 토론
- ✅ `INTEGRATION_GUIDE.md` - 완벽한 셋업 가이드

### 핵심 특징
🛂 **사용자 정보 통합**
- 프론트엔드에서 사용자 프로필(nickname, interest 등) 포함
- 백엔드에서 UserProfile 데이터모델로 받음
- AI 시스템 프롬프트에 사용자 정보 자동 포함
- 개인화된 AI 응답 생성 가능

---

## 📋 남은 작업 (다음 단계)

### Phase 2: 모듈화 및 확장

#### 1. 프로젝트 구조 정리 (선택사항)
```
Backend/
├── main.py              ✅ 완료 (현재: 단일 파일)
├── app/                 ❌ 확장용
│   ├── api/
│   │   └── v1/
│   │       ├── debate.py      (토론 API 라우터 분리)
│   │       └── voice.py       (음성 API 라우터 분리)
│   ├── core/
│   │   ├── config.py          (환경설정)
│   │   └── dependencies.py    (의존성 주입)
│   ├── services/
│   │   ├── debate_engine.py   (AI 토론 로직)
│   │   └── voice_service.py   (ElevenLabs 연동)
│   ├── models/
│   │   └── schemas.py         (Pydantic 모델)
│   └── prompts/
│       ├── james.txt          (제임스 시스템 프롬프트)
│       └── linda.txt          (린다 시스템 프롬프트)
├── requirements.txt     ✅ 완료
├── .env.example        ✅ 완료
└── .env                (로컬 개발용 - 파일 생성 필요)
```

#### 2. 실제 LLM 통합
- [ ] Claude API (OpenAI) 연동
- [ ] Llama 3 엔드포인트 연동
- [ ] 제임스/린다 시스템 프롬프트 파일 작성
- [ ] AI 응답 생성 로직 구현

#### 3. ElevenLabs TTS 연동
- [ ] `/api/v1/voice/synthesize` 구현
- [ ] 음성 스트리밍 반환

#### 4. 데이터베이스 (선택사항)
- [ ] Supabase PostgreSQL 연동
- [ ] 사용자 프로필 저장
- [ ] 토론 이력 저장

---

## 🚀 현재 상태 테스트

### 1. 로컬 개발 환경 셋업

#### 프론트엔드
```bash
cd frontend
pnpm install
pnpm dev
# http://localhost:3000
```

#### 백엔드
```bash
cd Backend
python -m venv venv
source venv/bin/activate  # Mac/Linux
pip install -r requirements.txt

cp .env.example .env
# .env에 API Key 설정 (필요시)

python main.py
# 또는
uvicorn main:app --reload
# http://localhost:8000
```

### 2. API 테스트

#### 헬스 체크
```bash
curl http://localhost:8000/api/v1/health
```

#### 토론 메시지 (사용자 정보 포함)
```bash
curl -X POST http://localhost:8000/api/v1/debate/message \
  -H "Content-Type: application/json" \
  -d '{
    "user_input": "Custom Hooks가 정말 필요할까요?",
    "context": "React",
    "user_profile": {
      "id": "user_123",
      "nickname": "지민",
      "interest": "React",
      "level": "intermediate"
    }
  }'
```

응답 예시:
```json
{
  "message": "지민님, 좋은 질문입니다. React에서는 Custom Hooks가...",
  "sender": "james",
  "tokens_earned": 5,
  "reasoning": "User 'jiMIN' asked about React"
}
```

---

## 📚 참고 문서

- **INTEGRATION_GUIDE.md** - 프론트엔드-백엔드 완벽 셋업 가이드
- **Backend/main.py** - FastAPI 백엔드 코드 및 주석
- **frontend/lib/api.ts** - API 통합 계층
- **frontend/hooks/useChat.ts** - 사용자 정보 포함 토론 로직

---

## 🎯 주요 개선사항

### 프론트엔드 (Frontend) ✅
```typescript
// Before: 사용자 정보 없음
const { messages } = useChat({ onEarnTokens })

// After: 사용자 정보 포함
const { userProfile } = useAuth()
const { messages } = useChat({
  onEarnTokens,
  userProfile,        // 👈 사용자 정보 자동 전송
  lectureContext: 'React',
  lectureId: 1,
})
```

### 백엔드 (Backend) ✅
```python
# UserProfile 데이터모델로 사용자 정보 수신
@app.post("/api/v1/debate/message", response_model=ChatResponse)
async def debate_message(request: ChatRequest) -> ChatResponse:
    # request.user_profile.nickname, interest 등 사용 가능
    system_prompt = build_system_prompt(request.user_profile)
    ai_response = await call_ai_with_user_context(...)
    return ChatResponse(...)
```

---

## 🐛 트러블슈팅

### CORS 에러
**해결**: Backend/main.py에서 프론트엔드 URL 확인
```python
allow_origins=[
    "http://localhost:3000",
    "https://*.vercel.app",
]
```

### 백엔드 연결 불가
```bash
# 백엔드 실행 확인
curl http://localhost:8000/api/v1/health

# 프론트엔드 환경변수 확인
cat frontend/.env.local
# NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

---

## 💡 Next Steps

### 단기 (1-2주)
1. API Key 설정 (OpenAI, ElevenLabs)
2. 실제 LLM 통합
3. 프롬프트 파일 작성 (james.txt, linda.txt)

### 중기 (2-4주)
1. Supabase 데이터베이스 연동
2. 사용자 인증 개선 (OAuth)
3. 토론 이력 저장 및 분석

### 장기 (1개월+)
1. 고급 AI 페르소나 개발
2. 멀티모달 입력 (음성, OCR)
3. 성능 최적화 및 배포

---

## 📊 아키텍처 흐름도

```
프론트엔드 (Next.js)
    ↓
useAuth() → 사용자 프로필 로드
    ↓
useChat() → 사용자 정보 포함한 ChatRequest 생성
    ↓
lib/api.ts → callBackendAPI()
    ↓
HTTPS POST → http://localhost:8000/api/v1/debate/message
    ↓
백엔드 (FastAPI)
    ↓
ChatRequest 수신 → UserProfile 파싱
    ↓
build_system_prompt() → 사용자 정보 포함 프롬프트
    ↓
call_ai_with_user_context() → Claude/Llama 호출
    ↓
ChatResponse 반환 (사용자명 포함된 응답)
    ↓
프론트엔드에서 표시
```

---

**상태**: 🟢 핵심 기능 완료, 다음 단계는 LLM 통합  
**최종 업데이트**: 2026-01-31
