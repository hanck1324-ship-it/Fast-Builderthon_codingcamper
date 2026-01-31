import { useState, useRef, useEffect, useCallback } from 'react';
import type { Message, MessageSender, UserProfile, ChatRequest, ChatResponse } from '@/types';
import { callBackendAPI } from '@/lib/api';

const initialMessages: Message[] = [
  {
    id: 1,
    sender: 'james',
    text: 'Custom Hooks가 정말 필요할까요? 코드만 복잡해지는 것 아닌가요?',
    timestamp: new Date(),
  },
  {
    id: 2,
    sender: 'linda',
    text: '아니요! Custom Hooks는 로직 재사용성을 높여줍니다. 컴포넌트를 깔끔하게 유지할 수 있어요.',
    timestamp: new Date(),
  },
];

const aiResponses = [
  '그 관점은 흥미롭네요. 하지만 실제 프로덕션 환경에서는 어떨까요?',
  '좋은 질문입니다! 제 경험상 Custom Hooks는 팀 협업에도 큰 도움이 됩니다.',
];

interface UseChatOptions {
  onEarnTokens: (amount: number, message: string) => void;
  userProfile?: UserProfile;
  lectureContext?: string;
  lectureId?: number;
}

export function useChat({ onEarnTokens, userProfile, lectureContext = 'React', lectureId }: UseChatOptions) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isAISpeaking, setIsAISpeaking] = useState(false);
  const [isLoadingFromBackend, setIsLoadingFromBackend] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = useCallback(async () => {
    if (!inputText.trim()) return;

    // 1️⃣ 사용자 메시지 추가
    const newMessage: Message = {
      id: messages.length + 1,
      sender: 'user',
      text: inputText,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
    setInputText('');

    // 2️⃣ 백엔드에 요청 (사용자 정보 포함)
    const backendEnabled = process.env.NEXT_PUBLIC_BACKEND_URL;

    if (backendEnabled && userProfile) {
      setIsLoadingFromBackend(true);

      try {
        // 📡 백엔드로 사용자 정보와 함께 전송
        const chatRequest: ChatRequest = {
          user_input: inputText,
          context: lectureContext,
          user_profile: userProfile,
          lecture_id: lectureId,
        };

        const response = await callBackendAPI<ChatResponse>('/api/v1/debate/message', chatRequest);

        if (response) {
          // 3️⃣ 백엔드 응답 메시지 추가
          const aiResponse: Message = {
            id: messages.length + 2,
            sender: response.sender,
            text: response.message,
            timestamp: new Date(),
          };
          setMessages(prev => [...prev, aiResponse]);

          // 4️⃣ 토큰 획득
          if (response.tokens_earned) {
            setTimeout(() => {
              onEarnTokens(response.tokens_earned || 5, '훌륭한 토론 참여!');
            }, 1000);
          }
        }
      } catch (error) {
        console.error('Backend chat error:', error);
        // 🔄 백엔드 실패 시 로컬 시뮬레이션으로 폴백
        simulateLocalAIResponse();
      } finally {
        setIsLoadingFromBackend(false);
      }
    } else {
      // 🔄 로컬 시뮬레이션 (백엔드 없을 때)
      simulateLocalAIResponse();
    }

    function simulateLocalAIResponse() {
      setTimeout(() => {
        setIsAISpeaking(true);
        const sender: MessageSender = Math.random() > 0.5 ? 'james' : 'linda';
        const text = aiResponses[Math.floor(Math.random() * aiResponses.length)];
        const aiResponse: Message = {
          id: messages.length + 2,
          sender,
          text,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, aiResponse]);

        setTimeout(() => {
          setIsAISpeaking(false);
          onEarnTokens(5, '훌륭한 토론 참여!');
        }, 2000);
      }, 1500);
    }
  }, [inputText, messages.length, onEarnTokens, userProfile, lectureContext, lectureId]);

  const toggleRecording = useCallback(() => {
    setIsRecording(prev => !prev);
  }, []);

  return {
    messages,
    inputText,
    setInputText,
    isRecording,
    isAISpeaking,
    isLoadingFromBackend,
    messagesEndRef,
    handleSendMessage,
    toggleRecording,
  };
}
