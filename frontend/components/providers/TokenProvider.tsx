'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { TokenRewardPopup } from '../TokenRewardPopup'

interface TokenContextType {
  tokens: number
  earnTokens: (amount: number, message: string) => void
}

const TokenContext = createContext<TokenContextType | null>(null)

export function useToken() {
  const context = useContext(TokenContext)
  if (!context) {
    throw new Error('useToken must be used within a TokenProvider')
  }
  return context
}

export function TokenProvider({ children }: { children: ReactNode }) {
  const [tokens, setTokens] = useState(120)
  const [showReward, setShowReward] = useState(false)
  const [rewardAmount, setRewardAmount] = useState(0)
  const [rewardMessage, setRewardMessage] = useState('')

  const earnTokens = useCallback((amount: number, message: string) => {
    setTokens(prev => prev + amount)
    setRewardAmount(amount)
    setRewardMessage(message)
    setShowReward(true)
    setTimeout(() => {
      setShowReward(false)
    }, 3000)
  }, [])

  return (
    <TokenContext.Provider value={{ tokens, earnTokens }}>
      {children}
      <TokenRewardPopup
        show={showReward}
        amount={rewardAmount}
        message={rewardMessage}
      />
    </TokenContext.Provider>
  )
}
