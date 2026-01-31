import { useState, useEffect, useCallback } from 'react';
import type { UserProfile } from '@/types';
import { fetchUserProfile, saveUserProfileLocally } from '@/lib/api';

interface UseAuthReturn {
  isLoggedIn: boolean;
  userProfile: UserProfile | null;
  login: (profile?: UserProfile) => void;
  logout: () => void;
  isLoading: boolean;
}

/**
 * 🛂 인증 및 사용자 정보 관리
 * Supabase와 로컬 스토리지를 모두 지원합니다.
 */
export function useAuth(): UseAuthReturn {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 초기 로드: 저장된 사용자 정보 복구
  useEffect(() => {
    const initAuth = async () => {
      try {
        const profile = await fetchUserProfile();
        if (profile) {
          setUserProfile(profile);
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error('Auth initialization failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = useCallback((profile?: UserProfile) => {
    const newProfile: UserProfile = profile || {
      id: `user_${Date.now()}`,
      nickname: 'Guest',
      interest: 'General',
      level: 'beginner',
      createdAt: new Date(),
    };

    setUserProfile(newProfile);
    setIsLoggedIn(true);
    saveUserProfileLocally(newProfile);
  }, []);

  const logout = useCallback(() => {
    setUserProfile(null);
    setIsLoggedIn(false);
    localStorage.removeItem('userProfile');
  }, []);

  return {
    isLoggedIn,
    userProfile,
    login,
    logout,
    isLoading,
  };
}
