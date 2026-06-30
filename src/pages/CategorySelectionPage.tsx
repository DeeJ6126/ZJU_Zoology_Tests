import { useNavigate } from 'react-router-dom'
import { usePractice } from '../hooks/usePractice'
import { getSubcategories, getQuestionTypes } from '../lib/categoryScope'
import { useT } from '../lib/i18n'
import type { QuestionType } from '../types'

const TYPE_ORDER: QuestionType[] = [
  'translation',
  'choice',
  'true-false',
  'essay',
]

export function CategorySelectionPage() {
  const navigate = useNavigate()
  const practice = usePractice()
  const t = useT()
  const { questionBank, selectedCategoryIds, setSelectedCategoryIds, beginPractice } = practice

  const types = getQuestionTypes(questionBank).sort(
    (a, b) => TYPE_ORDER.indexOf(a) - TYPE_ORDER.indexOf(b),
  )

  function toggleCategory(categoryId: string) {
    if (selectedCategoryIds.includes(categoryId)) {
      setSelectedCategoryIds(selectedCategoryIds.filter((id) => id !== categoryId))
    } else {
      setSelectedCategoryIds([...selectedCategoryIds, categoryId])
    }
  }

  function selectAllInType(type: QuestionType) {
    const subIds = getSubcategories(questionBank, type).map((c) => c.id)
    const others = selectedCategoryIds.filter(
      (id) => !subIds.includes(id),
    )
    setSelectedCategoryIds([...others, ...subIds])
  }

  function clearType(type: QuestionType) {
    const subIds = new Set(getSubcategories(questionBank, type).map((c) => c.id))
    setSelectedCategoryIds(selectedCategoryIds.filter((id) => !subIds.has(id)))
  }

  function handleStart() {
    if (!selectedCategoryIds.length) return
    beginPractice(selectedCategoryIds)
    navigate('/practice')
  }

  const totalSelected = questionBank.categories
    .filter((c) => selectedCategoryIds.includes(c.id))
    .reduce((sum, c) => sum + c.questionCount, 0)

  return (
    <div className={`page-stack ${selectedCategoryIds.length > 0 ? 'page-with-dock' : ''}`}>
      <section className="panel compact-panel">
        <div className="section-heading">
          <div>
            <h2>{t('categories', 'title')}</h2>
            <p className="scope-note">
              勾选想练习的子分类。已选 <strong>{totalSelected}</strong> 题。
            </p>
          </div>
          {selectedCategoryIds.length > 0 && (
            <button
              className="primary-button desktop-only"
              onClick={handleStart}
            >
              {t('categories', 'start').replace('{n}', String(totalSelected))}
            </button>
          )}
        </div>
      </section>

      {types.map((type) => {
        const subcategories = getSubcategories(questionBank, type)
        if (!subcategories.length) return null

        const selectedInType = subcategories.filter((c) =>
          selectedCategoryIds.includes(c.id),
        )
        const allSelected = selectedInType.length === subcategories.length

        return (
          <section key={type} className="panel compact-panel">
            <div className="section-heading">
              <h2>{t('typeLabels', type)}</h2>
              <div className="toolbar-actions">
                <button
                  className="ghost-button"
                  onClick={() =>
                    allSelected ? clearType(type) : selectAllInType(type)
                  }
                >
                  {allSelected ? t('categories', 'deselectAll') : t('categories', 'selectAll')}
                </button>
                {selectedInType.length > 0 && (
                  <button className="ghost-button" onClick={() => clearType(type)}>
                    {t('categories', 'clear')}
                  </button>
                )}
              </div>
            </div>

            <div className="chapter-grid">
              {subcategories.map((cat) => {
                const isSelected = selectedCategoryIds.includes(cat.id)
                return (
                  <button
                    key={cat.id}
                    className={`chapter-card ${isSelected ? 'is-selected' : ''}`}
                    onClick={() => toggleCategory(cat.id)}
                    type="button"
                  >
                    <div className="chapter-card-top">
                      <span className="chapter-chip">{cat.title}</span>
                      <span className="chapter-count">{cat.questionCount}</span>
                    </div>
                  </button>
                )
              })}
            </div>
          </section>
        )
      })}

      {/* Mobile dock */}
      {selectedCategoryIds.length > 0 && (
        <div className="mobile-dock">
          <div className="mobile-dock-copy">
            <strong>已选 {totalSelected} 题</strong>
          </div>
          <button className="primary-button" onClick={handleStart}>
            {t('categories', 'startShort')}
          </button>
        </div>
      )}
    </div>
  )
}
