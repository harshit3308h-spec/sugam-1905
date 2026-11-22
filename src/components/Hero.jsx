import React from 'react';
import {
  Search,
  FilePlus2,
  MapPin,
  Compass,
  Download,
  ShieldCheck,
  MessageCircle,
  Sparkles,
  CheckCircle2,
  X,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SERVICES } from '../data/services';

function DignitaryPortraitSVG() {
  return (
    <svg
      viewBox="0 0 120 120"
      className="w-24 h-24 shrink-0 rounded-xl border-2 border-ukSaffron/40 bg-gradient-to-br from-orange-50 to-slate-100 shadow-inner"
      role="img"
      aria-label="Official Portrait Emblem for Hon'ble Chief Minister of Uttarakhand"
    >
      <rect width="120" height="120" rx="10" fill="#FFF7ED" />
      <circle cx="60" cy="60" r="48" fill="none" stroke="#F47920" strokeWidth="1.5" strokeDasharray="4 3" />
      {/* Stylized dignified silhouette with traditional Pahadi cap motif */}
      <path d="M40 37 C45 27, 75 27, 80 37 L78 44 L42 44 Z" fill="#0F2942" />
      <rect x="42" y="38" width="36" height="4" fill="#E65100" />
      <circle cx="60" cy="54" r="15" fill="#1E3A5F" />
      <path d="M30 105 C32 82, 44 74, 60 74 C76 74, 88 82, 90 105 Z" fill="#0F2942" />
      <path d="M52 74 L60 90 L68 74" fill="none" stroke="#F47920" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function WhatsAppQRSVG({ size = 'w-20 h-20' }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={`${size} bg-white p-1.5 rounded-lg border border-slate-300 shrink-0`}
      role="img"
      aria-label="WhatsApp 1905 QR Code"
    >
      <rect width="100" height="100" fill="#FFFFFF" />
      {/* Top-left finder */}
      <rect x="6" y="6" width="24" height="24" fill="none" stroke="#0F2942" strokeWidth="5" />
      <rect x="13" y="13" width="10" height="10" fill="#0F2942" />
      {/* Top-right finder */}
      <rect x="70" y="6" width="24" height="24" fill="none" stroke="#0F2942" strokeWidth="5" />
      <rect x="77" y="13" width="10" height="10" fill="#0F2942" />
      {/* Bottom-left finder */}
      <rect x="6" y="70" width="24" height="24" fill="none" stroke="#0F2942" strokeWidth="5" />
      <rect x="13" y="77" width="10" height="10" fill="#0F2942" />
      {/* Data matrix pattern */}
      <rect x="38" y="8" width="6" height="6" fill="#0F2942" />
      <rect x="50" y="8" width="6" height="12" fill="#0F2942" />
      <rect x="38" y="20" width="12" height="6" fill="#0F2942" />
      <rect x="58" y="22" width="6" height="10" fill="#0F2942" />
      <rect x="8" y="38" width="12" height="6" fill="#0F2942" />
      <rect x="24" y="42" width="8" height="8" fill="#0F2942" />
      <rect x="8" y="52" width="8" height="10" fill="#0F2942" />
      <rect x="22" y="56" width="10" height="6" fill="#0F2942" />
      {/* Center 1905 emerald emblem */}
      <rect x="38" y="38" width="24" height="24" rx="4" fill="#047857" />
      <text x="50" y="53" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold" fontFamily="sans-serif">
        1905
      </text>
      {/* Right & bottom data */}
      <rect x="68" y="38" width="8" height="8" fill="#0F2942" />
      <rect x="82" y="38" width="10" height="6" fill="#0F2942" />
      <rect x="70" y="52" width="14" height="6" fill="#0F2942" />
      <rect x="88" y="50" width="6" height="14" fill="#0F2942" />
      <rect x="38" y="70" width="8" height="8" fill="#0F2942" />
      <rect x="52" y="70" width="10" height="6" fill="#0F2942" />
      <rect x="40" y="84" width="14" height="8" fill="#0F2942" />
      <rect x="60" y="80" width="8" height="12" fill="#0F2942" />
      <rect x="74" y="72" width="10" height="10" fill="#0F2942" />
      <rect x="86" y="84" width="8" height="8" fill="#0F2942" />
    </svg>
  );
}

export default function Hero() {
  const {
    t,
    searchQuery,
    setSearchQuery,
    setActivePillar,
    setGrievanceTab,
    setActiveModal,
    scrollToSection,
  } = useApp();

  const matchingServices = searchQuery.trim()
    ? SERVICES.filter((s) => {
        const q = searchQuery.toLowerCase();
        return (
          s.name.toLowerCase().includes(q) ||
          s.hindiName.toLowerCase().includes(q) ||
          s.shortDesc.toLowerCase().includes(q) ||
          s.department.toLowerCase().includes(q)
        );
      })
    : [];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setActivePillar('all');
    scrollToSection('services-section');
  };

  return (
    <section className="bg-gradient-to-br from-orange-50 via-white to-slate-100 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Headline, Live Search, 5 Quick Actions */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 border border-orange-300 text-ukSaffron text-xs sm:text-sm font-bold">
              <Sparkles className="w-4 h-4" aria-hidden="true" />
              <span>{t.hero.badge}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-ukNavy leading-tight tracking-tight">
              {t.hero.headline}
            </h1>

            <p className="text-sm sm:text-base font-semibold text-ukEmerald flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 shrink-0" aria-hidden="true" />
              <span>{t.hero.tagline}</span>
            </p>

            {/* Live Search Bar */}
            <div className="relative">
              <form onSubmit={handleSearchSubmit} className="flex items-stretch shadow-md rounded-xl overflow-hidden border-2 border-ukNavy/20 focus-within:border-ukSaffron bg-white">
                <div className="flex items-center pl-4 text-slate-400">
                  <Search className="w-5 h-5" aria-hidden="true" />
                </div>
                <label htmlFor="hero-service-search" className="sr-only">
                  {t.hero.searchPlaceholder}
                </label>
                <input
                  id="hero-service-search"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setActivePillar('all');
                  }}
                  placeholder={t.hero.searchPlaceholder}
                  className="w-full px-3 py-3.5 text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-none bg-white"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search"
                    className="px-2 text-slate-400 hover:text-slate-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <button
                  type="submit"
                  className="bg-ukSaffron hover:bg-ukSaffronLight text-white font-bold px-5 sm:px-6 text-sm transition-colors shrink-0"
                >
                  {t.hero.searchButton}
                </button>
              </form>

              {/* Live Instant Results Dropdown */}
              {searchQuery.trim() !== '' && (
                <div className="absolute left-0 right-0 mt-1.5 bg-white border border-slate-200 rounded-xl shadow-xl z-30 max-h-64 overflow-y-auto divide-y divide-slate-100">
                  {matchingServices.length > 0 ? (
                    matchingServices.map((svc) => (
                      <button
                        key={svc.id}
                        type="button"
                        onClick={() => setActiveModal({ type: 'service', service: svc })}
                        className="w-full text-left px-4 py-2.5 hover:bg-orange-50 flex items-center justify-between gap-3 transition-colors"
                      >
                        <div>
                          <p className="text-sm font-bold text-ukNavy">{svc.name}</p>
                          <p className="text-xs text-slate-500">{svc.hindiName} • {svc.department}</p>
                        </div>
                        <span className="text-xs font-semibold text-ukSaffron shrink-0">View →</span>
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-xs text-slate-500">{t.pillars.noResults}</div>
                  )}
                </div>
              )}
            </div>

            {/* 5 Quick-Action Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => {
                  setGrievanceTab('register');
                  scrollToSection('grievance-section');
                }}
                className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl bg-ukSaffron hover:bg-ukSaffronLight text-white font-bold text-xs text-center shadow-sm transition-all"
              >
                <FilePlus2 className="w-5 h-5" aria-hidden="true" />
                <span>{t.hero.quickRegister}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setGrievanceTab('track');
                  scrollToSection('grievance-section');
                }}
                className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl bg-ukNavy hover:bg-ukNavyDark text-white font-bold text-xs text-center shadow-sm transition-all"
              >
                <MapPin className="w-5 h-5 text-ukSaffronLight" aria-hidden="true" />
                <span>{t.hero.quickTrack}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActivePillar('all');
                  scrollToSection('services-section');
                }}
                className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl bg-white hover:bg-orange-50 text-ukNavy border border-slate-300 hover:border-ukSaffron font-bold text-xs text-center shadow-sm transition-all"
              >
                <Compass className="w-5 h-5 text-ukSaffron" aria-hidden="true" />
                <span>{t.hero.quickExplore}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveModal({ type: 'certificate', tab: 'download' })}
                className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl bg-white hover:bg-emerald-50 text-ukNavy border border-slate-300 hover:border-ukEmerald font-bold text-xs text-center shadow-sm transition-all"
              >
                <Download className="w-5 h-5 text-ukEmerald" aria-hidden="true" />
                <span>{t.hero.quickDownload}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveModal({ type: 'certificate', tab: 'verify' })}
                className="col-span-2 sm:col-span-1 flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl bg-white hover:bg-emerald-50 text-ukNavy border border-slate-300 hover:border-ukEmerald font-bold text-xs text-center shadow-sm transition-all"
              >
                <ShieldCheck className="w-5 h-5 text-ukEmerald" aria-hidden="true" />
                <span>{t.hero.quickVerify}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Official CM Card + WhatsApp 1905 QR Connect */}
          <div className="lg:col-span-5 space-y-4">
            {/* Respectful Official CM Card */}
            <div className="bg-white rounded-2xl border-2 border-orange-200 shadow-md p-5 flex items-center gap-4">
              <DignitaryPortraitSVG />
              <div>
                <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-ukSaffron bg-orange-50 px-2.5 py-0.5 rounded-full border border-orange-200 mb-1.5">
                  उत्तराखंड शासन
                </span>
                <h2 className="text-lg sm:text-xl font-extrabold text-ukNavy leading-snug">
                  {t.hero.cmName}
                </h2>
                <p className="text-sm font-bold text-ukSaffron">{t.hero.cmRole}</p>
                <p className="text-xs text-slate-500 mt-0.5">{t.hero.cmRoleEn}</p>
              </div>
            </div>

            {/* WhatsApp 1905 Direct Connect Card */}
            <button
              type="button"
              onClick={() => setActiveModal({ type: 'whatsapp' })}
              className="w-full text-left bg-emerald-50 hover:bg-emerald-100/80 border-2 border-emerald-300 rounded-2xl p-4 shadow-sm flex items-center gap-4 transition-all group"
            >
              <WhatsAppQRSVG size="w-20 h-20" />
              <div className="flex-1 min-w-0">
                <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-ukEmerald uppercase tracking-wide mb-1">
                  <MessageCircle className="w-4 h-4 fill-emerald-600 text-white" aria-hidden="true" />
                  <span>WhatsApp Citizen Bot</span>
                </div>
                <p className="text-sm font-bold text-ukNavy group-hover:text-ukEmerald transition-colors leading-snug">
                  {t.hero.whatsappTitle}
                </p>
                <p className="text-xs text-slate-600 mt-1">{t.hero.whatsappSub}</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
