import type { ChoiceQuestion, PracticeAnswer, AnswerSelection } from '../types'
import { useT } from '../lib/i18n'

interface MultipleChoiceInputProps {
  question: ChoiceQuestion
  existingAnswer: PracticeAnswer | undefined
  onAnswer: (questionId: string, selectedKey: AnswerSelection) => void
}

export function MultipleChoiceInput({
  question,
  existingAnswer,
  onAnswer,
}: MultipleChoiceInputProps) {
  const t = useT()
  const answered = Boolean(existingAnswer)
  const isCorrect = existingAnswer?.isCorrect ?? false
  const selectedKey = existingAnswer?.selectedKey
  const correctKey = question.answerKey

  function handleSelect(key: AnswerSelection) {
    if (answered) return
    onAnswer(question.id, key)
  }

  const correctOption = question.options.find((o) => o.key === correctKey)

  return (
    <div className="question-panel">
      <p className="question-text">{question.prompt}</p>

      <div className="option-list">
        {question.options.map((option) => {
          let className = 'option-button'
          if (answered) {
            if (option.key === correctKey) {
              className += ' is-correct'
            } else if (option.key === selectedKey && !isCorrect) {
              className += ' is-incorrect'
            } else {
              className += ' is-muted'
            }
          }

          return (
            <button
              key={option.key}
              className={className}
              onClick={() => handleSelect(option.key)}
              disabled={answered}
              type="button"
            >
              <span className="option-key">{option.key}</span>
              <span>{option.text}</span>
            </button>
          )
        })}
      </div>

      {answered && (
        <div className={`answer-banner ${isCorrect ? 'is-visible' : ''}`}>
          {isCorrect ? (
            <strong style={{ color: 'var(--correct)' }}>{t('choice', 'correct')}</strong>
          ) : (
            <strong style={{ color: 'var(--incorrect)' }}>
              {t('choice', 'wrong')}
              {correctOption
                ? `${correctKey}. ${correctOption.text}`
                : correctKey}
            </strong>
          )}
          {question.explanation && (
            <div className="explanation-panel">
              <strong>{t('choice', 'explanation')}</strong>
              <p>{question.explanation}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
