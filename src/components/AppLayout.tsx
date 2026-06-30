import { NavLink, Outlet } from 'react-router-dom'
import { usePractice } from '../hooks/usePractice'
import { useT } from '../lib/i18n'

export function AppLayout() {
  const practice = usePractice()
  const t = useT()

  return (
    <div className="app-shell">
      {/* Ambient decorations */}
      <div className="ambient ambient-left" />
      <div className="ambient ambient-right" />

      {/* Top bar */}
      <header className="topbar">
        <NavLink to="/" className="brand-block">
          <span className="brand-mark">ZO</span>
          <div className="brand-copy">
            <strong>{t('brand', 'title')}</strong>
            <span className="eyebrow">{t('brand', 'subtitle')}</span>
          </div>
        </NavLink>

        <nav className="topnav">
          <NavLink to="/" className="nav-link" end>{t('nav', 'home')}</NavLink>
          <NavLink to="/categories" className="nav-link">{t('nav', 'categories')}</NavLink>
          <NavLink to="/practice" className="nav-link">{t('nav', 'practice')}</NavLink>
          <NavLink to="/mistakes" className="nav-link">{t('nav', 'mistakes')}</NavLink>
          <NavLink to="/results" className="nav-link">{t('nav', 'results')}</NavLink>
          <NavLink to="/about" className="nav-link">{t('nav', 'about')}</NavLink>
        </nav>

        <div className="status-group">
          {practice.session && (
            <span className="status-pill">
              {t('status', 'answered')} <strong>{practice.session.answers.length}</strong> {t('status', 'questions')}
            </span>
          )}
          <span className="status-pill">
            {t('status', 'mistakes')} <strong>{practice.mistakeRecords.length}</strong>
          </span>
        </div>
      </header>

      {/* Page content */}
      <main className="page-shell">
        <Outlet />
      </main>
    </div>
  )
}
