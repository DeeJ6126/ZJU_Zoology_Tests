import type { QuestionBank, QuestionCategory, QuestionType } from '../types'

/** Return the distinct top-level question types present in the bank. */
export function getQuestionTypes(questionBank: QuestionBank): QuestionType[] {
  const types = new Set<QuestionType>()
  for (const category of questionBank.categories) {
    types.add(category.type)
  }
  return Array.from(types)
}

/** Return all subcategories belonging to a given question type. */
export function getSubcategories(
  questionBank: QuestionBank,
  type: QuestionType,
): QuestionCategory[] {
  return questionBank.categories.filter((category) => category.type === type)
}

/** Return all category IDs present in the bank. */
export function getAllCategoryIds(questionBank: QuestionBank): string[] {
  return questionBank.categories.map((category) => category.id)
}
