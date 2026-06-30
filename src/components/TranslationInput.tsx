import { useState } from 'react'
import type { TranslationQuestion, PracticeAnswer } from '../types'
import { useT } from '../lib/i18n'

interface TranslationInputProps {
  question: TranslationQuestion
  existingAnswer: PracticeAnswer | undefined
  onSelfJudge: (questionId: string, isCorrect: boolean) => void
}

export function TranslationInput({
  question,
  existingAnswer,
  onSelfJudge,
}: TranslationInputProps) {
  const t = useT()
  const [revealed, setRevealed] = useState(false)
  const [draft, setDraft] = useState('')
  const judged = Boolean(existingAnswer)
  const selfJudgedCorrect = existingAnswer?.selfJudgedCorrect

  function handleReveal() {
    setRevealed(true)
  }

  function handleSelfJudge(isCorrect: boolean) {
    if (judged) return
    onSelfJudge(question.id, isCorrect)
  }

  return (
    <div className="question-panel">
      <p className="question-text">{question.prompt}</p>
      <p className="panel-note" style={{ marginTop: 0 }}>
        {t('tr', 'subtitle')}
      </p>

      {/* Draft textarea */}
      {!judged && (
        <textarea
          className="option-button"
          style={{
            width: '100%',
            minHeight: 120,
            resize: 'vertical',
            fontFamily: 'inherit',
          }}
          placeholder={t('tr', 'placeholder')}
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
        />
      )}

      {/* Reveal button */}
      {!revealed && !judged && (
        <button className="primary-button" onClick={handleReveal} style={{ width: '100%' }}>
          {t('tr', 'reveal')}
        </button>
      )}

      {/* Reference answer */}
      {revealed && (
        <div className="answer-banner is-visible">
          <strong>{t('tr', 'reference')}</strong>
          <div className="markdown-content" style={{ marginTop: 8, whiteSpace: 'pre-wrap' }}>
            {question.referenceAnswer}
          </div>
        </div>
      )}

      {/* Self-judge buttons */}
      {revealed && !judged && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <button
            className="option-button"
            style={{
              justifyContent: 'center',
              textAlign: 'center',
              borderColor: 'rgba(31,122,86,0.4)',
              background: 'var(--correct-soft)',
            }}
            onClick={() => handleSelfJudge(true)}
          >
            <strong style={{ color: 'var(--correct)' }}>{t('tr', 'gotIt')}</strong>
          </button>
          <button
            className="option-button"
            style={{
              justifyContent: 'center',
              textAlign: 'center',
              borderColor: 'rgba(182,86,66,0.4)',
              background: 'var(--incorrect-soft)',
            }}
            onClick={() => handleSelfJudge(false)}
          >
            <strong style={{ color: 'var(--incorrect)' }}>{t('tr', 'gotWrong')}</strong>
          </button>
        </div>
      )}

      {/* Post-judge feedback */}
      {judged && (
        <div className={`answer-banner ${selfJudgedCorrect ? 'is-visible' : ''}`}>
          {selfJudgedCorrect ? (
            <strong style={{ color: 'var(--correct)' }}>{t('tr', 'judgedCorrect')}</strong>
          ) : (
            <strong style={{ color: 'var(--incorrect)' }}>
              {t('tr', 'judgedWrong')}
            </strong>
          )}
          <div className="explanation-panel" style={{ marginTop: 12 }}>
            <strong>{t('tr', 'reference')}</strong>
            <div style={{ marginTop: 8, whiteSpace: 'pre-wrap' }}>
              {question.referenceAnswer}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
