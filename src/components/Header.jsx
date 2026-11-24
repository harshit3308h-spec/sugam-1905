import React, { useState } from 'react';
import {
  PhoneCall,
  Menu,
  X,
  FilePlus2,
  ClipboardList,
  Globe2,
  BookOpen,
  Landmark,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

function UttarakhandEmblemSVG() {
  return (
    <svg
      viewBox="0 0 64 64"
      className="w-12 h-12 sm:w-14 sm:h-14 shrink-0"
      role="img"
      aria-label="Government of Uttarakhand Official Emblem"
    >
      <circle cx="32" cy="32" r="30" fill="#0F2942" stroke="#E65100" strokeWidth="2.5" />
      <circle cx="32" cy="32" r="24" fill="none" stroke="#F47920" strokeWidth="1" strokeDasharray="3 2" />
      {/* Himalayan Peaks */}
      <polygon points="12,42 24,22 33,36 42,20 52,42" fill="#FFFFFF" opacity="0.95" />
      <polygon points="24,22 29,30 20,30" fill="#F47920" />
      <polygon points="42,20 46,28 38,28" fill="#F47920" />
      {/* Sacred Ganga Waves */}
      <path d="M14,45 Q23,41 32,45 T50,45" fill="none" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M18,50 Q25,47 32,50 T46,50" fill="none" stroke="#34D399" strokeWidth="2" strokeLinecap="round" />
      {/* Crest Dot */}
      <circle cx="32" cy="13" r="3.5" fill="#F47920" />
    </svg>
  );
}

export default function Header() {
  const {
    t,
    setActiveModal,
    setGrievanceTab,
    setActivePillar,
    scrollToSection,
  } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (action) => {
    setMobileMenuOpen(false);
    if (action === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setActiveModal({ type: 'info', page: action });
    }
  };

  const handleActionClick = (action) => {
    setMobileMenuOpen(false);
    if (action === 'register') {
      setGrievanceTab('register');
      scrollToSection('grievance-section');
    } else if (action === 'myComplaints') {
      setGrievanceTab('track');
      scrollToSection('grievance-section');
    } else if (action === 'cpgrams') {
      setActiveModal({ type: 'manual', tab: 'cpgrams' });
    } else if (action === 'manual') {
      setActiveModal({ type: 'manual', tab: 'manual' });
    } else if (action === 'apuniSarkar') {
      setActivePillar('p1');
      scrollToSection('services-section');
    }
  };

  return (
    <header className="bg-white shadow-sm lg:sticky lg:top-0 z-40 border-b border-slate-200">
      {/* Main Brand & Primary Nav Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Official Branding */}
          <button
            type="button"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group"
          >
            <UttarakhandEmblemSVG />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-lg sm:text-xl font-extrabold text-ukNavy tracking-tight group-hover:text-ukSaffron transition-colors">
                  {t.portalName}
                </span>
                <span className="hidden md:inline-block text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-ukEmerald border border-emerald-200">
                  {t.portalTag}
                </span>
              </div>
              <p className="text-xs sm:text-sm font-medium text-slate-600">
                उत्तराखंड सरकार <span className="text-slate-400">|</span> Government of Uttarakhand
              </p>
            </div>
          </button>

          {/* Desktop Main Nav + 1905 Badge */}
          <div className="hidden lg:flex items-center gap-5">
            <nav aria-label="Main navigation" className="flex items-center gap-4 text-xs font-bold text-ukNavy">
              <button
                type="button"
                onClick={() => handleNavClick('home')}
                className="hover:text-ukSaffron transition-colors py-1"
              >
                {t.nav.home}
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('about')}
                className="hover:text-ukSaffron transition-colors py-1"
              >
                {t.nav.about}
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('govOrder')}
                className="hover:text-ukSaffron transition-colors py-1"
              >
                {t.nav.govOrder}
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('privacy')}
                className="hover:text-ukSaffron transition-colors py-1"
              >
                {t.nav.privacy}
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('contact')}
                className="hover:text-ukSaffron transition-colors py-1"
              >
                {t.nav.contact}
              </button>
            </nav>

            {/* Toll-Free 1905 Badge */}
            <a
              href="tel:1905"
              className="flex items-center gap-2 bg-orange-50 border-2 border-ukSaffron text-ukSaffron hover:bg-ukSaffron hover:text-white px-3.5 py-1.5 rounded-lg transition-colors shadow-sm"
            >
              <PhoneCall className="w-4 h-4 animate-pulse" aria-hidden="true" />
              <div className="leading-tight">
                <span className="block text-[10px] uppercase font-bold tracking-wider">
                  {t.tollFree}
                </span>
                <span className="block text-base font-extrabold leading-none">1905</span>
              </div>
            </a>
          </div>

          {/* Mobile Menu Button & 1905 Pill */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              href="tel:1905"
              className="inline-flex items-center gap-1 bg-ukSaffron text-white font-extrabold text-sm px-2.5 py-1.5 rounded-md"
            >
              <PhoneCall className="w-4 h-4" aria-hidden="true" />
              <span>1905</span>
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
              className="p-2 rounded-md border border-slate-300 text-ukNavy hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Nav */}
        {mobileMenuOpen && (
          <nav
            aria-label="Mobile navigation"
            className="lg:hidden mt-3 pt-3 border-t border-slate-200 grid grid-cols-2 gap-2 text-xs font-bold text-ukNavy"
          >
            <button
              type="button"
              onClick={() => handleNavClick('home')}
              className="text-left px-3 py-2 rounded bg-slate-50 hover:bg-orange-50 hover:text-ukSaffron"
            >
              {t.nav.home}
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('about')}
              className="text-left px-3 py-2 rounded bg-slate-50 hover:bg-orange-50 hover:text-ukSaffron"
            >
              {t.nav.about}
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('govOrder')}
              className="text-left px-3 py-2 rounded bg-slate-50 hover:bg-orange-50 hover:text-ukSaffron"
            >
              {t.nav.govOrder}
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('privacy')}
              className="text-left px-3 py-2 rounded bg-slate-50 hover:bg-orange-50 hover:text-ukSaffron"
            >
              {t.nav.privacy}
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('contact')}
              className="col-span-2 text-left px-3 py-2 rounded bg-slate-50 hover:bg-orange-50 hover:text-ukSaffron"
            >
              {t.nav.contact}
            </button>
          </nav>
        )}
      </div>

      {/* Official Action Strip (Deep Navy with Saffron Accent) */}
      <div className="bg-ukNavy text-white border-t-2 border-ukSaffron">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-1 py-1.5 text-xs font-bold">
            <button
              type="button"
              onClick={() => handleActionClick('register')}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded hover:bg-ukSaffron transition-colors"
            >
              <FilePlus2 className="w-4 h-4 text-ukSaffronLight" aria-hidden="true" />
              <span>{t.actionStrip.register}</span>
            </button>
            <button
              type="button"
              onClick={() => handleActionClick('myComplaints')}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded hover:bg-ukSaffron transition-colors"
            >
              <ClipboardList className="w-4 h-4 text-ukSaffronLight" aria-hidden="true" />
              <span>{t.actionStrip.myComplaints}</span>
            </button>
            <button
              type="button"
              onClick={() => handleActionClick('cpgrams')}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded hover:bg-ukSaffron transition-colors"
            >
              <Globe2 className="w-4 h-4 text-ukSaffronLight" aria-hidden="true" />
              <span>{t.actionStrip.cpgrams}</span>
            </button>
            <button
              type="button"
              onClick={() => handleActionClick('manual')}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded hover:bg-ukSaffron transition-colors"
            >
              <BookOpen className="w-4 h-4 text-ukSaffronLight" aria-hidden="true" />
              <span>{t.actionStrip.manual}</span>
            </button>
            <button
              type="button"
              onClick={() => handleActionClick('apuniSarkar')}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded bg-ukSaffron hover:bg-ukSaffronLight text-white transition-colors"
            >
              <Landmark className="w-4 h-4" aria-hidden="true" />
              <span>{t.actionStrip.apuniSarkar}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
