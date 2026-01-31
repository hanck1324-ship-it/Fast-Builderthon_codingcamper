"""
FastAPI 백엔드 - 프론트엔드에서 보낸 사용자 정보를 받아서 AI에게 전달

🛂 요청 흐름:
프론트엔드 (useChat) 
  → 사용자 정보 포함한 ChatRequest 전송
  → Backend (이 파일)
    → AI에게 시스템 프롬프트로 사용자 정보 전달
    → AI가 응답 생성
  → 프론트엔드에서 응답 표시
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from enum import Enum
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Yeoul AI Backend", version="1.0.0")

# ===== CORS 설정 =====
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # 로컬 개발
        "http://localhost:3001",  # 백엔드 개발
        "https://*.vercel.app",   # Vercel 배포
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ===== 타입 정의 =====

class LectureLevel(str, Enum):
    beginner = "beginner"
    intermediate = "intermediate"
    advanced = "advanced"


class UserProfile(BaseModel):
    """🛂 프론트엔드에서 받을 사용자 정보"""
    id: str
    nickname: str
    email: Optional[str] = None
    interest: str  # e.g., "React", "Machine Learning"
    level: Optional[LectureLevel] = "beginner"
    createdAt: Optional[datetime] = None
    updatedAt: Optional[datetime] = None


class ChatRequest(BaseModel):
    """💬 프론트엔드에서 전송하는 채팅 요청 (사용자 정보 포함!)"""
    user_input: str                    # "Custom Hooks 정말 필요해?"
    context: str                       # "React"
    user_profile: UserProfile          # 👈 여기! 사용자 정보가 함께 옵니다
    lecture_id: Optional[int] = None


class ChatResponse(BaseModel):
    """✅ 백엔드에서 반환하는 응답"""
    message: str                       # AI의 답변
    sender: str                        # "james" 또는 "linda"
    tokens_earned: Optional[int] = 5   # 토큰 보상
    reasoning: Optional[str] = None    # AI의 추론 과정


class DebateSessionRequest(BaseModel):
    """🎬 토론 세션 시작 요청"""
    user_profile: UserProfile
    topic: str
    lecture_id: int
    opponent: Optional[str] = "both"


# ===== 핸들러 함수 =====

def build_system_prompt(user_profile: UserProfile) -> str:
    """
    🧠 AI 시스템 프롬프트 구성
    
    사용자 정보를 바탕으로 AI의 성격과 지시사항을 정의합니다.
    """
    return f"""
당신은 여울(Yeoul) 교육 플랫폼의 AI 토론 파트너입니다.

[사용자 정보]
- 이름: {user_profile.nickname}
- 관심사: {user_profile.interest}
- 수준: {user_profile.level}

[지시사항]
1. 사용자의 이름을 한 번 정도 부르면서 친근하게 대화하세요.
2. 사용자의 관심사({user_profile.interest})와 연관지어 설명하세요.
3. 사용자의 수준({user_profile.level})에 맞게 깊이를 조절하세요.
4. 논리적이고 건설적인 토론을 진행하세요.
5. 명확하고 이해하기 쉬운 응답을 제공하세요.
"""


async def call_ai_with_user_context(
    user_input: str,
    user_profile: UserProfile,
    context: str,
    ai_persona: str  # "james" 또는 "linda"
) -> str:
    """
    🤖 실제 AI 호출 (LangChain, Claude API 등)
    
    TODO: 실제 구현 시 다음을 수행합니다:
    1. LangChain 또는 직접 API로 Claude/Llama 호출
    2. 시스템 프롬프트에 사용자 정보 포함
    3. AI 페르소나(James/Linda) 선택
    """
    
    system_prompt = build_system_prompt(user_profile)
    
    # 예시 응답 (실제로는 AI가 생성)
    ai_responses = {
        "james": f"{user_profile.nickname}님, 흥미로운 관점이네요. 하지만 {user_profile.interest}에서는 어떻게 적용될까요?",
        "linda": f"{user_profile.nickname}님의 접근법 정말 좋습니다! {user_profile.interest} 분야에서도 이렇게 활용할 수 있어요.",
    }
    
    return ai_responses.get(ai_persona, "좋은 질문입니다!")


# ===== API 엔드포인트 =====

@app.get("/api/v1/health")
async def health_check():
    """❤️ 헬스 체크"""
    return {"status": "ok", "service": "Yeoul AI Backend"}


@app.post("/api/v1/debate/message", response_model=ChatResponse)
async def debate_message(request: ChatRequest) -> ChatResponse:
    """
    💬 토론 메시지 처리 (사용자 정보 활용!)
    
    요청:
    {
        "user_input": "Custom Hooks가 정말 필요할까요?",
        "context": "React",
        "user_profile": {
            "id": "user_123",
            "nickname": "지민",
            "interest": "React",
            "level": "intermediate"
        }
    }
    
    응답:
    {
        "message": "지민님, 좋은 질문입니다...",
        "sender": "james",
        "tokens_earned": 5
    }
    """
    
    # 🛂 프론트엔드에서 받은 사용자 정보 사용
    user_name = request.user_profile.nickname
    user_interest = request.user_profile.interest
    user_level = request.user_profile.level
    
    # 🤖 AI 페르소나 선택 (번갈아가며)
    import random
    persona = random.choice(["james", "linda"])
    
    # 🧠 AI에게 사용자 정보와 함께 질문
    ai_response = await call_ai_with_user_context(
        user_input=request.user_input,
        user_profile=request.user_profile,
        context=request.context,
        ai_persona=persona
    )
    
    # ✅ 응답 반환
    return ChatResponse(
        message=ai_response,
        sender=persona,
        tokens_earned=5,
        reasoning=f"User '{user_name}' asked about {request.context}"
    )


@app.post("/api/v1/debate/start")
async def start_debate(request: DebateSessionRequest):
    """🎬 토론 세션 시작"""
    
    user_name = request.user_profile.nickname
    
    return {
        "session_id": f"session_{request.user_profile.id}_{int(datetime.now().timestamp())}",
        "topic": request.topic,
        "started_at": datetime.now().isoformat(),
        "james_response": f"{user_name}님, {request.topic}에 대해 토론할 준비가 되었습니다.",
        "linda_response": f"좋아요, {user_name}님! 함께 깊이 있게 살펴봅시다."
    }


@app.post("/api/v1/voice/synthesize")
async def synthesize_voice(request: dict):
    """
    🎙️ TTS (Text-to-Speech)
    
    TODO: ElevenLabs API 연동
    """
    text = request.get("text")
    voice = request.get("voice")  # "james" 또는 "linda"
    
    return {
        "status": "success",
        "audio_url": f"https://elevenlabs.example.com/audio/{voice}.mp3"
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
