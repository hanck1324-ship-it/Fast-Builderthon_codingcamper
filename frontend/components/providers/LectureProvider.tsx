'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import type { Lecture } from '@/types'

interface LectureContextType {
  selectedLecture: Lecture | null
  selectedCategory: string
  setSelectedLecture: (lecture: Lecture | null) => void
  setSelectedCategory: (category: string) => void
}

const LectureContext = createContext<LectureContextType | null>(null)

export function useLecture() {
  const context = useContext(LectureContext)
  if (!context) {
    throw new Error('useLecture must be used within a LectureProvider')
  }
  return context
}

export function LectureProvider({ children }: { children: ReactNode }) {
  const [selectedLecture, setSelectedLecture] = useState<Lecture | null>(null)
  const [selectedCategory, setSelectedCategory] = useState('all')

  return (
    <LectureContext.Provider
      value={{ selectedLecture, selectedCategory, setSelectedLecture, setSelectedCategory }}
    >
      {children}
    </LectureContext.Provider>
  )
}
