import React from 'react';
import { MapPin, PhoneCall, Mail, Star, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Footer() {
  const { setActiveModal, setGrievanceTab, setActivePillar, scrollToSection } = useApp();

  return (
    <footer className="bg-ukNavyDark text-slate-200 border-t-4 border-ukSaffron">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Official Address */}
          <div className="space-y-3">
            <h3 className="text-base font-extrabold text-white">
              SUGAM 1905 (सुगम 1905)
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed flex items-start gap-2">
              <MapPin className="w-4 h-4 text-ukSaffronLight shrink-0 mt-0.5" aria-hidden="true" />
              <span>
                Uttarakhand Secretariat, New Building, 4th Floor, Subhash Rd, Dehradun, Uttarakhand 248001
              </span>
            </p>
            <p className="text-xs text-slate-300 flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-ukSaffronLight shrink-0" aria-hidden="true" />
              <span>Toll-Free CM Helpline: <strong className="text-white">1905</strong></span>
            </p>
            <p className="text-xs text-slate-300 flex items-center gap-2">
              <Mail className="w-4 h-4 text-ukSaffronLight shrink-0" aria-hidden="true" />
              <span>cmhelpline-uk@gov.in</span>
            </p>
          </div>

          {/* Column 2: Useful Links */}
          <div>
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider mb-3">
              Useful Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => setActiveModal({ type: 'info', page: 'about' })}
                  className="hover:text-ukSaffronLight transition-colors"
                >
                  About CM Helpline 1905
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActiveModal({ type: 'info', page: 'govOrder' })}
                  className="hover:text-ukSaffronLight transition-colors"
                >
                  Government Orders (शासनादेश)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActiveModal({ type: 'manual', tab: 'manual' })}
                  className="hover:text-ukSaffronLight transition-colors"
                >
                  Training Manual &amp; Escalation Matrix
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActiveModal({ type: 'manual', tab: 'cpgrams' })}
                  className="hover:text-ukSaffronLight transition-colors"
                >
                  CPGRAMS Central Portal Bridge
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActiveModal({ type: 'info', page: 'privacy' })}
                  className="hover:text-ukSaffronLight transition-colors"
                >
                  Privacy &amp; Accessibility Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Citizen Services */}
          <div>
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider mb-3">
              Citizen Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setGrievanceTab('register');
                    scrollToSection('grievance-section');
                  }}
                  className="hover:text-ukSaffronLight transition-colors"
                >
                  Register New Complaint
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setGrievanceTab('track');
                    scrollToSection('grievance-section');
                  }}
                  className="hover:text-ukSaffronLight transition-colors"
                >
                  Track Application Status
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setActivePillar('p1');
                    scrollToSection('services-section');
                  }}
                  className="hover:text-ukSaffronLight transition-colors"
                >
                  Apuni Sarkar &amp; Bhulekh Records
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActiveModal({ type: 'certificate', tab: 'verify' })}
                  className="hover:text-ukSaffronLight transition-colors"
                >
                  Verify / Download e-Certificate
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActiveModal({ type: 'whatsapp' })}
                  className="hover:text-ukSaffronLight transition-colors"
                >
                  WhatsApp 1905 Citizen Bot
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Citizen Feedback & Hackathon Trust */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">
              Citizen Feedback
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Help us improve citizen service delivery across all 13 districts of Uttarakhand.
            </p>
            <button
              type="button"
              onClick={() => setActiveModal({ type: 'survey' })}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-ukSaffron hover:bg-ukSaffronLight text-white text-xs font-bold transition-colors"
            >
              <Star className="w-4 h-4 fill-white" aria-hidden="true" />
              <span>Take Citizen Survey (1–5 ★)</span>
            </button>
            <div className="pt-2 flex items-center gap-1.5 text-[11px] text-emerald-300 font-semibold">
              <ShieldCheck className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Zero Mandatory Affidavit • GIGW Compliant</span>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & PRAYAS 2026 Attribution */}
        <div className="mt-8 pt-6 border-t border-slate-700/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p>
            © 2026 Government of Uttarakhand • CM Helpline 1905 &amp; Apuni Sarkar Redesign Prototype.
          </p>
          <p className="text-center sm:text-right">
            PRAYAS 2026 ITDA Hackathon • <strong className="text-slate-200">Harshit Raj, Vaishnavi Bahuguna, Ashish Rana</strong> (Govt. Institute of Technology, Uttarkashi)
          </p>
        </div>
      </div>
    </footer>
  );
}
