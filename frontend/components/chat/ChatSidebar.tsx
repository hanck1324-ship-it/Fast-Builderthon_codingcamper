'use client'

import { ArrowLeft } from 'lucide-react';

interface ChatSidebarProps {
  tokens: number;
  onBack: () => void;
}

export function ChatSidebar({ tokens, onBack }: ChatSidebarProps) {
  return (
    <aside className="w-64 border-r border-white/10 bg-slate-950/50 backdrop-blur-xl p-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
      >
        <ArrowLeft size={20} />
        <span>대시보드로</span>
      </button>

      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-400 mb-2">현재 챕터</h3>
        <div className="bg-white/5 border border-cyan-500/50 rounded-xl p-3">
          <p className="text-sm text-white font-medium">Chapter 3</p>
          <p className="text-xs text-gray-400">Custom Hooks Best Practices</p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-yellow-950/30 to-orange-950/30 border border-yellow-500/30 rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-300">토큰</span>
          <span className="text-2xl font-bold text-yellow-400">{tokens}</span>
        </div>
        <div className="text-xs text-gray-400">
          토론 중 +5 토큰 획득 가능
        </div>
      </div>
    </aside>
  );
}
