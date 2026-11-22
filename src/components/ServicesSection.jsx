import React from 'react';
import {
  FileCheck2,
  ShieldAlert,
  Zap,
  GraduationCap,
  Mountain,
  CheckCircle2,
  Clock,
  ArrowRight,
  Layers,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PILLARS, SERVICES } from '../data/services';

const ICON_MAP = {
  FileCheck2,
  ShieldAlert,
  Zap,
  GraduationCap,
  Mountain,
};

export default function ServicesSection() {
  const {
    t,
    searchQuery,
    setSearchQuery,
    activePillar,
    setActivePillar,
    setActiveModal,
  } = useApp();

  const filteredServices = SERVICES.filter((service) => {
    const matchesPillar = activePillar === 'all' || service.pillar === activePillar;
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      service.name.toLowerCase().includes(q) ||
      service.hindiName.toLowerCase().includes(q) ||
      service.shortDesc.toLowerCase().includes(q) ||
      service.department.toLowerCase().includes(q);
    return matchesPillar && matchesSearch;
  });

  return (
    <section id="services-section" className="py-12 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-ukNavy tracking-tight">
              {t.pillars.sectionTitle}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-3xl">
              {t.pillars.sectionSub}
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
            <span>
              {t.pillars.showingPrefix} <strong className="text-ukNavy">{filteredServices.length}</strong> / {SERVICES.length} {t.pillars.servicesWord}
            </span>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="ml-2 px-2.5 py-1 rounded bg-orange-100 text-ukSaffron hover:bg-orange-200 font-bold"
              >
                {t.pillars.clearSearch}
              </button>
            )}
          </div>
        </div>

        {/* Pillar Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-8" role="tablist" aria-label="Citizen-Intent Pillars">
          <button
            type="button"
            role="tab"
            aria-selected={activePillar === 'all'}
            onClick={() => setActivePillar('all')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold border transition-all ${
              activePillar === 'all'
                ? 'bg-ukNavy text-white border-ukNavy shadow-md'
                : 'bg-white text-slate-700 border-slate-300 hover:border-ukSaffron hover:text-ukSaffron'
            }`}
          >
            <Layers className="w-4 h-4" aria-hidden="true" />
            <span>{t.pillars.all} (15)</span>
          </button>

          {PILLARS.map((pillar) => {
            const Icon = ICON_MAP[pillar.icon];
            const isSelected = activePillar === pillar.id;
            return (
              <button
                key={pillar.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActivePillar(pillar.id)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold border transition-all ${
                  isSelected
                    ? 'bg-ukSaffron text-white border-ukSaffron shadow-md'
                    : 'bg-white text-slate-700 border-slate-300 hover:border-ukSaffron hover:text-ukSaffron'
                }`}
              >
                <Icon className="w-4 h-4" aria-hidden="true" />
                <span>{t.pillars[pillar.key]}</span>
              </button>
            );
          })}
        </div>

        {/* Service Cards Grid */}
        {filteredServices.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center">
            <p className="text-slate-600 font-semibold">{t.pillars.noResults}</p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setActivePillar('all');
              }}
              className="mt-4 px-4 py-2 rounded-lg bg-ukSaffron text-white text-sm font-bold hover:bg-ukSaffronLight"
            >
              {t.pillars.clearSearch}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredServices.map((service) => {
              const pillarObj = PILLARS.find((p) => p.id === service.pillar);
              const PillarIcon = ICON_MAP[pillarObj?.icon || 'FileCheck2'];
              return (
                <article
                  key={service.id}
                  onClick={() => setActiveModal({ type: 'service', service })}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveModal({ type: 'service', service });
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  className="bg-white rounded-2xl border border-slate-200 hover:border-ukSaffron hover:shadow-lg p-5 flex flex-col justify-between transition-all cursor-pointer group"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <span
                        className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-lg border ${pillarObj?.accent}`}
                      >
                        <PillarIcon className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>{t.pillars[service.pillar]}</span>
                      </span>
                      {service.noAffidavit && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-lg bg-emerald-50 text-ukEmerald border border-emerald-200 shrink-0">
                          <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>{t.pillars.noAffidavitBadge}</span>
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-extrabold text-ukNavy group-hover:text-ukSaffron transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-xs font-semibold text-slate-500 mb-2">{service.hindiName}</p>
                    <p className="text-sm text-slate-600 leading-relaxed">{service.shortDesc}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-500">
                      <Clock className="w-3.5 h-3.5 text-ukSaffron" aria-hidden="true" />
                      <span>{service.sla}</span>
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-ukSaffron group-hover:translate-x-0.5 transition-transform">
                      <span>{t.pillars.viewDetails}</span>
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
