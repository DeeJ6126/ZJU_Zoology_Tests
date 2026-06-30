import { useState, useMemo } from 'react'
import type { EssayQuestion, PracticeAnswer } from '../types'
import { useT } from '../lib/i18n'
import { marked } from 'marked'

interface EssayInputProps {
  question: EssayQuestion
  existingAnswer: PracticeAnswer | undefined
  onSelfJudge: (questionId: string, isCorrect: boolean) => void
}

export function EssayInput({
  question,
  existingAnswer,
  onSelfJudge,
}: EssayInputProps) {
  const t = useT()
  const [revealed, setRevealed] = useState(false)
  const [draft, setDraft] = useState('')
  const judged = Boolean(existingAnswer)
  const selfJudgedCorrect = existingAnswer?.selfJudgedCorrect

  const answerHtml = useMemo(() => marked.parse(question.referenceAnswer) as string, [question.referenceAnswer])

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
        {t('essay', 'subtitle')}
      </p>

      {!judged && (
        <textarea
          className="option-button"
          style={{
            width: '100%',
            minHeight: 180,
            resize: 'vertical',
            fontFamily: 'inherit',
          }}
          placeholder={t('essay', 'placeholder')}
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
        />
      )}

      {!revealed && !judged && (
        <button className="primary-button" onClick={handleReveal} style={{ width: '100%' }}>
          {t('essay', 'reveal')}
        </button>
      )}

      {revealed && (
        <div className="answer-banner is-visible">
          <strong>{t('essay', 'reference')}</strong>
          <div className="markdown-content" dangerouslySetInnerHTML={{ __html: answerHtml }} />
        </div>
      )}

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
            <strong style={{ color: 'var(--correct)' }}>{t('essay', 'gotIt')}</strong>
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
            <strong style={{ color: 'var(--incorrect)' }}>{t('essay', 'gotWrong')}</strong>
          </button>
        </div>
      )}

      {judged && (
        <div className={`answer-banner ${selfJudgedCorrect ? 'is-visible' : ''}`}>
          {selfJudgedCorrect ? (
            <strong style={{ color: 'var(--correct)' }}>{t('essay', 'judgedCorrect')}</strong>
          ) : (
            <strong style={{ color: 'var(--incorrect)' }}>
              {t('essay', 'judgedWrong')}
            </strong>
          )}
          <div className="explanation-panel" style={{ marginTop: 12 }}>
            <strong>{t('essay', 'reference')}</strong>
            <div className="markdown-content" dangerouslySetInnerHTML={{ __html: answerHtml }} />
          </div>
        </div>
      )}
    </div>
  )
}
