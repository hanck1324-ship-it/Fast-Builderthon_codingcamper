/**
 * API 통합 계층
 * Supabase (인증) + Backend (AI 로직) 연동
 */

import type { UserProfile, ChatRequest, ChatResponse } from '@/types';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

/**
 * 🛂 Supabase에서 사용자 정보 가져오기
 * (나중에 Supabase 통합 시 활용)
 */
export async function fetchUserProfile(): Promise<UserProfile | null> {
  try {
    // TODO: Supabase 클라이언트 초기화 후 실제 구현
    // const { data: { user } } = await supabase.auth.getUser();
    // if (!user) return null;
    //
    // const { data } = await supabase
    //   .from('profiles')
    //   .select('*')
    //   .eq('id', user.id)
    //   .single();
    //
    // return data as UserProfile;

    // 🔄 임시: 로컬 스토리지에서 프로필 가져오기
    const storedProfile = localStorage.getItem('userProfile');
    return storedProfile ? JSON.parse(storedProfile) : null;
  } catch (error) {
    console.error('Failed to fetch user profile:', error);
    return null;
  }
}

/**
 * 💾 사용자 프로필 로컬 저장 (테스트용)
 */
export function saveUserProfileLocally(profile: UserProfile) {
  localStorage.setItem('userProfile', JSON.stringify(profile));
}

/**
 * 🧠 백엔드 API 호출 (사용자 정보 포함)
 */
export async function callBackendAPI<T>(
  endpoint: string,
  payload: ChatRequest | any,
): Promise<T | null> {
  try {
    const response = await fetch(`${BACKEND_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Backend error: ${response.status}`);
    }

    return await response.json() as T;
  } catch (error) {
    console.error(`API call failed for ${endpoint}:`, error);
    return null;
  }
}

/**
 * 💬 토론 메시지 전송 (사용자 정보 포함)
 */
export async function sendDebateMessage(
  userInput: string,
  userProfile: UserProfile,
  lectureContext: string,
  lectureId?: number,
): Promise<ChatResponse | null> {
  const chatRequest: ChatRequest = {
    user_input: userInput,
    context: lectureContext,
    user_profile: userProfile,
    lecture_id: lectureId,
  };

  return callBackendAPI<ChatResponse>('/api/v1/debate/message', chatRequest);
}

/**
 * 🎬 토론 세션 시작
 */
export async function startDebateSession(
  userProfile: UserProfile,
  topic: string,
  lectureId: number,
) {
  const request = {
    user_profile: userProfile,
    topic,
    lecture_id: lectureId,
    opponent: 'both', // James + Linda 둘 다와 토론
  };

  return callBackendAPI('/api/v1/debate/start', request);
}

/**
 * 🎙️ TTS (음성 합성) 요청
 */
export async function synthesizeVoice(
  text: string,
  voice: 'james' | 'linda',
): Promise<ArrayBuffer | null> {
  try {
    const response = await fetch(`${BACKEND_URL}/api/v1/voice/synthesize`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text, voice }),
    });

    if (!response.ok) {
      throw new Error(`TTS error: ${response.status}`);
    }

    return await response.arrayBuffer();
  } catch (error) {
    console.error('TTS synthesis failed:', error);
    return null;
  }
}

/**
 * ❤️ 헬스 체크 (백엔드 연결 확인)
 */
export async function healthCheck(): Promise<boolean> {
  try {
    const response = await fetch(`${BACKEND_URL}/api/v1/health`, {
      method: 'GET',
    });
    return response.ok;
  } catch {
    return false;
  }
}
