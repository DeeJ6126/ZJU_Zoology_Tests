import { createContext } from 'react'
import type {
  AnswerSelection,
  MistakeRecord,
  PracticeSession,
  Question,
  QuestionBank,
} from '../types'

export interface PracticeContextValue {
  questionBank: QuestionBank
  session: PracticeSession | null
  selectedCategoryIds: string[]
  mistakeRecords: MistakeRecord[]
  setSelectedCategoryIds: (categoryIds: string[]) => void
  beginPractice: (categoryIds: string[]) => PracticeSession | null
  beginMistakePractice: () => PracticeSession | null
  restartPractice: () => PracticeSession | null
  /** Record a choice or true-false answer */
  recordAnswer: (questionId: string, selectedKey: AnswerSelection) => void
  /** Record self-judgment for translation / essay */
  recordSelfJudge: (questionId: string, isCorrect: boolean) => void
  goToIndex: (index: number) => void
  clearSession: () => void
  keepMistake: (questionId: string, selectedKey?: AnswerSelection, textAnswer?: string) => void
  removeMistake: (questionId: string) => void
  clearMistakes: () => void
  hasMistake: (questionId: string) => boolean
  getQuestionById: (questionId: string) => Question | undefined
}

export const PracticeContext = createContext<PracticeContextValue | null>(null)
