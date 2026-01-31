# 🔗 프론트엔드-백엔드 통합 가이드

## 🎯 개요

프론트엔드 (Next.js/React)와 백엔드 (FastAPI)가 **사용자 정보**를 공유하며 작동합니다.

### 🛂 흐름도

```
프론트엔드 (useChat Hook)
    ↓ (사용자 정보 포함한 요청)
fetchUserProfile() → Supabase/localStorage에서 프로필 가져오기
    ↓
callBackendAPI() → 사용자 정보와 함께 백엔드로 전송
    ↓
백엔드 (FastAPI main.py)
    ↓ (사용자 정보 받음)
build_system_prompt() → 사용자 정보로 AI 시스템 프롬프트 구성
    ↓
call_ai_with_user_context() → Claude/Llama에 사용자 정보와 함께 쿼리
    ↓
ChatResponse → 사용자명을 포함한 AI 응답 반환
    ↓
프론트엔드에서 응답 표시
```

---

## 🚀 로컬 개발 환경 셋업

### 1️⃣ 프론트엔드 시작

```bash
cd /Users/hanchang-gi/Desktop/Project-yeoul/frontend

# .env.local 파일 생성
cp .env.example .env.local

# 의존성 설치 (이미 했다면 생략)
pnpm install

# 개발 서버 시작
pnpm dev
# http://localhost:3000 에서 확인
```

### 2️⃣ 백엔드 시작

```bash
cd /Users/hanchang-gi/Desktop/Project-yeoul/Backend

# 가상환경 생성
python -m venv venv
source venv/bin/activate  # Mac/Linux
# 또는 venv\Scripts\activate (Windows)

# 의존성 설치
pip install -r requirements.txt

# .env 파일 생성
cp .env.example .env

# 개발 서버 시작
python main.py
# 또는
uvicorn main:app --reload
# http://localhost:8000 에서 API 서버 실행
```

### 3️⃣ API 테스트

#### 헬스 체크
```bash
curl http://localhost:8000/api/v1/health
```

응답:
```json
{
  "status": "ok",
  "service": "Yeoul AI Backend"
}
```

#### 토론 메시지 전송 (사용자 정보 포함)
```bash
curl -X POST http://localhost:8000/api/v1/debate/message \
  -H "Content-Type: application/json" \
  -d '{
    "user_input": "Custom Hooks가 정말 필요할까요?",
    "context": "React",
    "user_profile": {
      "id": "user_123",
      "nickname": "지민",
      "email": "jiMIN@example.com",
      "interest": "React",
      "level": "intermediate"
    }
  }'
```

응답:
```json
{
  "message": "지민님, 좋은 질문입니다. 실제로 Custom Hooks는...",
  "sender": "james",
  "tokens_earned": 5,
  "reasoning": "User 'jiMIN' asked about React"
}
```

---

## 📝 프론트엔드 수정 사항

### useChat Hook 업데이트

**Before (사용자 정보 없음)**:
```typescript
const { messages, handleSendMessage } = useChat({ onEarnTokens })
```

**After (사용자 정보 포함)**:
```typescript
const { userProfile } = useAuth()  // 👈 사용자 정보 가져오기

const { messages, handleSendMessage } = useChat({
  onEarnTokens,
  userProfile,              // 👈 사용자 정보 전달
  lectureContext: 'React',
  lectureId: 1,
})
```

### MainChatUI 컴포넌트에서 사용

```typescript
'use client'

import { useAuth } from '@/hooks/useAuth'
import { useChat } from '@/hooks/useChat'
import { useToken } from '@/hooks/useToken'

export function MainChatUI() {
  const { userProfile } = useAuth()  // 🛂 사용자 정보
  const { earnTokens } = useToken()

  const {
    messages,
    handleSendMessage,
    isLoadingFromBackend,  // 👈 백엔드 로딩 상태
  } = useChat({
    onEarnTokens: earnTokens,
    userProfile,           // 👈 사용자 정보 전달
    lectureContext: 'React',
    lectureId: 1,
  })

  return (
    <div>
      {isLoadingFromBackend && <p>AI가 생각 중입니다...</p>}
      {/* 나머지 컴포넌트 */}
    </div>
  )
}
```

---

## 🔐 환경변수 설정

### 프론트엔드 (`frontend/.env.local`)

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
# NEXT_PUBLIC_SUPABASE_URL=your_url (나중에)
# NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key (나중에)
```

### 백엔드 (`Backend/.env`)

```env
OPENAI_API_KEY=sk-...
ELEVENLABS_API_KEY=...
ELEVENLABS_JAMES_VOICE_ID=...
ELEVENLABS_LINDA_VOICE_ID=...
BACKEND_URL=http://localhost:8000
FRONTEND_URL=http://localhost:3000
SECRET_KEY=your_secret_key
```

---

## 🧪 테스트 흐름

### 1️⃣ 프론트엔드에서 메시지 전송

```
사용자 입력: "Custom Hooks가 정말 필요할까요?"
  ↓
useChat Hook 트리거
  ↓
사용자 프로필 포함:
{
  "user_input": "Custom Hooks가 정말 필요할까요?",
  "context": "React",
  "user_profile": {
    "nickname": "지민",
    "interest": "React"
  }
}
  ↓
백엔드 /api/v1/debate/message 호출
```

### 2️⃣ 백엔드에서 처리

```
ChatRequest 받음
  ↓
user_profile에서 사용자 정보 추출 (nickname, interest 등)
  ↓
System Prompt 구성:
"사용자 이름은 '지민'입니다. 사용자는 'React' 분야에 관심이 많습니다."
  ↓
Claude/Llama에 전달
  ↓
응답 생성:
"지민님, Custom Hooks는 정말 중요합니다..."
```

### 3️⃣ 프론트엔드에서 응답 표시

```
"지민님, Custom Hooks는 정말 중요합니다..." 메시지 표시
  ↓
토큰 +5 획득
  ↓
메시지 스크롤 자동 이동
```

---

## 🔗 API 엔드포인트

| 메서드 | 엔드포인트 | 설명 |
|--------|-----------|------|
| GET | `/api/v1/health` | 헬스 체크 |
| POST | `/api/v1/debate/message` | 토론 메시지 (사용자 정보 포함) |
| POST | `/api/v1/debate/start` | 토론 세션 시작 |
| POST | `/api/v1/voice/synthesize` | TTS (음성 합성) |

---

## 🐛 트러블슈팅

### 1️⃣ CORS 에러

**원인**: 백엔드가 프론트엔드 요청을 거부

**해결**:
```python
# Backend main.py에서 CORS 확인
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # 프론트엔드 주소
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### 2️⃣ 백엔드 연결 불가

**원인**: 백엔드 서버 미실행 또는 URL 오류

**해결**:
```bash
# 백엔드 실행 확인
curl http://localhost:8000/api/v1/health

# 프론트엔드 환경변수 확인
echo $NEXT_PUBLIC_BACKEND_URL
```

### 3️⃣ useChat Hook에서 타입 에러

**원인**: UserProfile 타입 미정의

**해결**:
```typescript
import type { UserProfile } from '@/types'
```

---

## 📦 배포 체크리스트

- [ ] 프론트엔드: Vercel 배포 환경변수 설정
- [ ] 백엔드: 클라우드 배포 (AWS/Railway/Heroku)
- [ ] CORS: 프로덕션 도메인 추가
- [ ] 환경변수: 모든 API Key 설정
- [ ] 테스트: 실제 API 연동 확인

---

## 📚 참고 자료

- **Frontend API Layer**: `frontend/lib/api.ts`
- **useChat Hook**: `frontend/hooks/useChat.ts`
- **useAuth Hook**: `frontend/hooks/useAuth.ts`
- **Backend Main**: `Backend/main.py`
- **Types**: `frontend/types/index.ts`

---

Made with ❤️ for seamless frontend-backend integration
