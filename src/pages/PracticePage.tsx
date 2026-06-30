import { Link, Navigate, useNavigate } from 'react-router-dom'
import { usePractice } from '../hooks/usePractice'
import { findAnswer } from '../lib/practice'
import { TranslationInput } from '../components/TranslationInput'
import { TrueFalseInput } from '../components/TrueFalseInput'
import { MultipleChoiceInput } from '../components/MultipleChoiceInput'
import { EssayInput } from '../components/EssayInput'
import { useT } from '../lib/i18n'
import type { AnswerSelection } from '../types'

export function PracticePage() {
  const navigate = useNavigate()
  const practice = usePractice()
  const { questionBank, session } = practice
  const t = useT()

  const currentSession = session!

  // Redirect if no session
  if (!currentSession || !currentSession.questionOrder.length) {
    return <Navigate replace to="/categories" />
  }

  const currentQuestion = questionBank.questions.find(
    (q) => q.id === currentSession.questionOrder[currentSession.currentIndex],
  )

  if (!currentQuestion) {
    return (
      <div className="page-stack">
        <section className="panel empty-state">
          <p>{t('practice', 'notFound')}</p>
          <button
            className="primary-button"
            onClick={() => {
              practice.clearSession()
              navigate('/categories')
            }}
          >
            {t('practice', 'back')}
          </button>
        </section>
      </div>
    )
  }

  const existingAnswer = findAnswer(currentSession, currentQuestion.id)
  const isMistakeMode = currentSession.mode === 'mistakes'
  const hasMistake = practice.hasMistake(currentQuestion.id)
  const progress = ((currentSession.currentIndex + 1) / currentSession.questionOrder.length) * 100

  const isLastQuestion = currentSession.currentIndex >= currentSession.questionOrder.length - 1

  function handleNext() {
    if (isLastQuestion) {
      navigate('/results')
    } else {
      practice.goToIndex(currentSession.currentIndex + 1)
    }
  }

  function handlePrev() {
    practice.goToIndex(currentSession.currentIndex - 1)
  }

  function handleRestart() {
    practice.restartPractice()
  }

  function handleMistakeRemove() {
    practice.removeMistake(currentQuestion!.id)
  }

  function handleMistakeKeep() {
    const answer = findAnswer(currentSession, currentQuestion!.id)
    practice.keepMistake(
      currentQuestion!.id,
      answer?.selectedKey ?? 'UNKNOWN',
      answer?.textAnswer,
    )
  }

  // Question type label
  const typeLabels: Record<string, string> = {
    translation: t('typeLabels', 'translation'),
    choice: t('typeLabels', 'choice'),
    'true-false': t('typeLabels', 'true-false'),
    essay: t('typeLabels', 'essay'),
  }

  return (
    <div className="page-stack">
      {/* Progress bar */}
      <div className="progress-track">
        <span className="progress-fill" style={{ width: `${progress}%` }} />
      </div>

      {/* Question meta */}
      <div className="question-meta">
        <span className="status-pill">
          {typeLabels[currentQuestion.type] || currentQuestion.type}
        </span>
        <span className="status-pill">
          {currentQuestion.categoryTitle}
        </span>
        <span className="status-pill">
          {t('practice', 'questionN')
            .replace('{n}', String(currentSession.currentIndex + 1))
            .replace('{m}', String(currentSession.questionOrder.length))}
        </span>
        {isMistakeMode && (
          <span className="status-pill" style={{ background: 'var(--primary-soft)', color: 'var(--primary-deep)' }}>
            {t('practice', 'mistakeMode')}
          </span>
        )}
        {currentQuestion.examSources && currentQuestion.examSources.length > 0 && (
          currentQuestion.examSources.map((src: string) => (
            <span key={src} className="status-pill" style={{ background: 'var(--primary-soft)', color: 'var(--primary-deep)', fontSize: '0.78rem' }}>
              {src}
            </span>
          ))
        )}
      </div>

      {/* Question-type-specific input */}
      <section className="panel">
        {currentQuestion.type === 'translation' && (
          <TranslationInput
            key={currentQuestion.id}
            question={currentQuestion}
            existingAnswer={existingAnswer}
            onSelfJudge={(qid, isCorrect) => practice.recordSelfJudge(qid, isCorrect)}
          />
        )}

        {currentQuestion.type === 'choice' && (
          <MultipleChoiceInput
            question={currentQuestion}
            existingAnswer={existingAnswer}
            onAnswer={(qid, key) => practice.recordAnswer(qid, key as AnswerSelection)}
          />
        )}

        {currentQuestion.type === 'true-false' && (
          <TrueFalseInput
            question={currentQuestion}
            existingAnswer={existingAnswer}
            onAnswer={(qid, key) => practice.recordAnswer(qid, key as AnswerSelection)}
          />
        )}

        {currentQuestion.type === 'essay' && (
          <EssayInput
            key={currentQuestion.id}
            question={currentQuestion}
            existingAnswer={existingAnswer}
            onSelfJudge={(qid, isCorrect) => practice.recordSelfJudge(qid, isCorrect)}
          />
        )}
      </section>

      {/* Mistake-mode actions */}
      {isMistakeMode && existingAnswer && (
        <section className="panel compact-panel">
          <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
            <span className="panel-note">
              {hasMistake ? t('practice', 'inMistakes') : t('practice', 'notInMistakes')}
            </span>
            {hasMistake && (
              <button className="ghost-button" onClick={handleMistakeRemove}>
                {t('practice', 'removeMistake')}
              </button>
            )}
            {!hasMistake && (
              <button className="ghost-button" onClick={handleMistakeKeep}>
                {t('practice', 'addMistake')}
              </button>
            )}
          </div>
        </section>
      )}

      {/* Navigation */}
      <section className="practice-actions">
        <button className="secondary-button" onClick={handlePrev} disabled={currentSession.currentIndex <= 0}>
          {t('practice', 'prev')}
        </button>
        {isLastQuestion ? (
          <Link to="/results" className="primary-button">
            {t('practice', 'results')}
          </Link>
        ) : (
          <button className="primary-button" onClick={handleNext}>
            {t('practice', 'next')}
          </button>
        )}
        <button className="ghost-button" onClick={handleRestart}>
          {t('practice', 'restart')}
        </button>
      </section>
    </div>
  )
}
