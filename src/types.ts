// ── Question type taxonomy ──────────────────────────────────────────

export type QuestionType =
  | 'translation'
  | 'choice'
  | 'true-false'
  | 'essay'

// ── Question category ──────────────────────────────────────────────

export interface QuestionCategory {
  id: string
  type: QuestionType
  title: string
  parentTitle?: string
  questionCount: number
}

// ── Multiple choice primitives ────────────────────────────────────

export type OptionKey = 'A' | 'B' | 'C' | 'D'
export type AnswerSelection = OptionKey | 'UNKNOWN'

export interface QuestionOption {
  key: OptionKey
  text: string
}

// ── Question interfaces (discriminated union) ─────────────────────

interface BaseQuestionFields {
  id: string
  type: QuestionType
  categoryId: string
  categoryTitle: string
  parentTitle?: string
  number: number
  examSources?: string[]
  prompt: string
}

/** Translation / term explanation question (self-judged) */
export interface TranslationQuestion extends BaseQuestionFields {
  type: 'translation'
  referenceAnswer: string
}

/** Multiple choice question (A/B/C/D) */
export interface ChoiceQuestion extends BaseQuestionFields {
  type: 'choice'
  options: QuestionOption[]
  answerKey: OptionKey
  explanation: string
}

/** True/False question */
export interface TrueFalseQuestion extends BaseQuestionFields {
  type: 'true-false'
  answerIsTrue: boolean
  explanation: string
}

/** Essay question with self-judge */
export interface EssayQuestion extends BaseQuestionFields {
  type: 'essay'
  referenceAnswer: string
}

export type Question =
  | TranslationQuestion
  | ChoiceQuestion
  | TrueFalseQuestion
  | EssayQuestion

// ── Question bank ─────────────────────────────────────────────────

export interface QuestionBank {
  generatedAt: string
  totalQuestions: number
  categories: QuestionCategory[]
  questions: Question[]
}

// ── Practice session ──────────────────────────────────────────────

export type PracticeMode = 'categories' | 'mistakes'

export interface PracticeAnswer {
  questionId: string
  selectedKey?: AnswerSelection
  textAnswer?: string
  selfJudgedCorrect?: boolean
  isCorrect: boolean
  answeredAt: string
}

export interface PracticeSession {
  mode: PracticeMode
  title: string
  selectedCategoryIds: string[]
  questionOrder: string[]
  currentIndex: number
  answers: PracticeAnswer[]
  startedAt: string
}

// ── Mistake records ───────────────────────────────────────────────

export interface MistakeRecord {
  questionId: string
  questionType: QuestionType
  categoryId: string
  lastSelectedKey?: AnswerSelection
  lastTextAnswer?: string
  correctAnswerDisplay: string
  wrongCount: number
  lastAnsweredAt: string
}
