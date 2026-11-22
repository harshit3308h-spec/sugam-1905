import React from 'react';
import { Contrast, Globe, LogIn, LogOut, UserCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { LANGUAGES } from '../data/translations';

export default function AccessibilityBar() {
  const {
    lang,
    setLang,
    t,
    highContrast,
    setHighContrast,
    fontScale,
    setFontScale,
    user,
    setUser,
    setActiveModal,
  } = useApp();

  return (
    <div className="bg-ukNavyDark text-slate-100 text-xs border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-2">
        {/* Left: Skip to main content & GIGW indicator */}
        <div className="flex items-center gap-3">
          <a
            href="#main-content"
            className="underline underline-offset-2 hover:text-ukSaffronLight font-medium transition-colors"
          >
            {t.skipToContent}
          </a>
          <span className="hidden sm:inline text-slate-500">|</span>
          <span className="hidden sm:inline text-slate-300">
            GIGW 3.0 Compliant • WCAG 2.1 AA
          </span>
        </div>

        {/* Right: Contrast, Font Size, 5-Language Switcher, Login */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* High Contrast Toggle */}
          <button
            type="button"
            onClick={() => setHighContrast((prev) => !prev)}
            aria-pressed={highContrast}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded border transition-colors ${
              highContrast
                ? 'bg-yellow-400 text-black border-yellow-300 font-bold'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-100 border-slate-600'
            }`}
          >
            <Contrast className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{highContrast ? t.normalContrast : t.highContrast}</span>
          </button>

          {/* Font Size Controls */}
          <div
            className="inline-flex items-center rounded border border-slate-600 overflow-hidden bg-slate-800"
            role="group"
            aria-label="Font size controls"
          >
            <button
              type="button"
              onClick={() => setFontScale('small')}
              aria-label="Decrease font size"
              className={`px-2 py-1 text-xs font-semibold transition-colors ${
                fontScale === 'small' ? 'bg-ukSaffron text-white' : 'hover:bg-slate-700 text-slate-200'
              }`}
            >
              A-
            </button>
            <button
              type="button"
              onClick={() => setFontScale('normal')}
              aria-label="Reset font size"
              className={`px-2 py-1 text-xs font-semibold border-x border-slate-600 transition-colors ${
                fontScale === 'normal' ? 'bg-ukSaffron text-white' : 'hover:bg-slate-700 text-slate-200'
              }`}
            >
              A
            </button>
            <button
              type="button"
              onClick={() => setFontScale('large')}
              aria-label="Increase font size"
              className={`px-2 py-1 text-xs font-semibold transition-colors ${
                fontScale === 'large' ? 'bg-ukSaffron text-white' : 'hover:bg-slate-700 text-slate-200'
              }`}
            >
              A+
            </button>
          </div>

          {/* 5-Language Switcher */}
          <div className="inline-flex items-center gap-1 bg-slate-800 border border-slate-600 rounded px-2 py-0.5">
            <Globe className="w-3.5 h-3.5 text-ukSaffronLight" aria-hidden="true" />
            <label htmlFor="language-select" className="sr-only">
              Select Language
            </label>
            <select
              id="language-select"
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="bg-slate-800 text-white text-xs font-medium py-0.5 pr-1 focus:outline-none cursor-pointer"
            >
              {LANGUAGES.map((item) => (
                <option key={item.code} value={item.code} className="bg-ukNavyDark text-white">
                  {item.native} ({item.label})
                </option>
              ))}
            </select>
          </div>

          {/* Login / Logged-In Badge */}
          {user ? (
            <div className="inline-flex items-center gap-2 bg-emerald-900/70 border border-emerald-500/50 rounded px-2.5 py-1">
              <UserCheck className="w-3.5 h-3.5 text-emerald-300" aria-hidden="true" />
              <span className="font-semibold text-emerald-100">
                {user.name} ({user.role === 'officer' ? 'Officer' : 'Citizen'})
              </span>
              <button
                type="button"
                onClick={() => setUser(null)}
                className="inline-flex items-center gap-1 text-amber-300 hover:text-white ml-1 font-semibold"
                title={t.logout}
              >
                <LogOut className="w-3.5 h-3.5" aria-hidden="true" />
                <span className="hidden sm:inline">{t.logout}</span>
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setActiveModal({ type: 'login' })}
              className="inline-flex items-center gap-1.5 bg-ukSaffron hover:bg-ukSaffronLight text-white font-bold px-3 py-1 rounded transition-colors"
            >
              <LogIn className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{t.login}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
