import { Link, Navigate } from 'react-router-dom'
import { usePractice } from '../hooks/usePractice'
import { getScoreSummary } from '../lib/practice'
import { useT } from '../lib/i18n'

export function ResultsPage() {
  const practice = usePractice()
  const t = useT()
  const { session, questionBank } = practice

  if (!session || !session.answers.length) {
    return <Navigate replace to="/categories" />
  }

  const {
    total,
    answered,
    correct,
    selfJudgedCorrect,
    selfJudgedIncorrect,
    unanswered,
    accuracy,
  } = getScoreSummary(session)

  // Group answers by question type
  const typeStats: Record<string, { total: number; correct: number }> = {}
  for (const qid of session.questionOrder) {
    const q = questionBank.questions.find((qq) => qq.id === qid)
    if (!q) continue
    if (!typeStats[q.type]) {
      typeStats[q.type] = { total: 0, correct: 0 }
    }
    typeStats[q.type].total += 1
    const answer = session.answers.find((a) => a.questionId === qid)
    if (answer?.isCorrect) {
      typeStats[q.type].correct += 1
    }
  }

  // Categories included
  const selectedCats = questionBank.categories.filter((c) =>
    session.selectedCategoryIds.includes(c.id),
  )

  return (
    <div className="page-stack">
      {/* Spotlight */}
      <section className="panel result-spotlight">
        <h1 style={{ fontSize: 'clamp(3rem, 5vw, 5rem)' }}>{accuracy}%</h1>
        <p className="panel-note">正确率</p>
        <p>
          已答：{answered}/{total}
          {' · '}
          正确：{correct}
          {selfJudgedCorrect > 0 && ` · 自判正确：${selfJudgedCorrect}`}
          {selfJudgedIncorrect > 0 && ` · 自判错误：${selfJudgedIncorrect}`}
        </p>
      </section>

      {/* Stats cards */}
      <section className="result-grid">
        <div className="panel result-card">
          <strong>{total}</strong>
          <span>{t('results', 'totalLabel')}</span>
        </div>
        <div className="panel result-card">
          <strong>{answered}</strong>
          <span>已作答</span>
        </div>
        <div className="panel result-card">
          <strong>{correct}</strong>
          <span>{t('results', 'correct').replace('{n}', String(correct))}</span>
        </div>
        <div className="panel result-card">
          <strong>{unanswered}</strong>
          <span>{t('results', 'unanswered').replace('{n}', String(unanswered))}</span>
        </div>
      </section>

      {/* Per-type breakdown */}
      {Object.keys(typeStats).length > 0 && (
        <section className="panel compact-panel">
          <h2 style={{ marginBottom: 14 }}>{t('results', 'byType')}</h2>
          <div className="chapter-grid">
            {Object.entries(typeStats).map(([type, stats]) => (
              <div key={type} className="chapter-card" style={{ cursor: 'default' }}>
                <div className="chapter-card-top">
                  <span className="chapter-chip">{t('typeLabels', type)}</span>
                  <span className="chapter-count">
                    {stats.total > 0
                      ? `${Math.round((stats.correct / stats.total) * 100)}%`
                      : '—'}
                  </span>
                </div>
                <p style={{ color: 'var(--ink-soft)' }}>
                  {t('results', 'correct').replace('{n}', String(stats.correct))} / {stats.total}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Selected categories */}
      {selectedCats.length > 0 && (
        <section className="panel compact-panel">
          <h2 style={{ marginBottom: 14 }}>{t('results', 'scope')}</h2>
          <div className="chapter-pill-row">
            {selectedCats.map((cat) => (
              <span key={cat.id} className="chapter-pill">
                {cat.parentTitle && `${cat.parentTitle} · `}
                {cat.title}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Actions */}
      <section className="cta-row">
        <button
          className="primary-button"
          onClick={() => {
            practice.restartPractice()
            window.location.href = '/practice'
          }}
        >
          {t('results', 'retry')}
        </button>
        <Link to="/categories" className="secondary-button">
          {t('results', 'backCategories')}
        </Link>
        {practice.mistakeRecords.length > 0 && (
          <Link to="/mistakes" className="ghost-button">
            {t('results', 'viewMistakes')}
          </Link>
        )}
      </section>
    </div>
  )
}
