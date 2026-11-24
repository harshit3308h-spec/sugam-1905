import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  ShieldCheck,
  Download,
  Star,
  BookOpen,
  Globe2,
  MessageCircle,
  User,
  Briefcase,
  FileText,
  ExternalLink,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SAMPLE_CERTIFICATES } from '../data/services';
import { WhatsAppQRSVG } from './Hero';

export default function InfoModals() {
  const {
    activeModal,
    setActiveModal,
    setUser,
    addSurvey,
    setGrievanceTab,
    scrollToSection,
  } = useApp();

  // Login modal state
  const [loginRole, setLoginRole] = useState('citizen');
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginName, setLoginName] = useState('');

  // Certificate modal state
  const [certInput, setCertInput] = useState('UK-CERT-2026-7741');
  const [verifiedCert, setVerifiedCert] = useState(SAMPLE_CERTIFICATES['UK-CERT-2026-7741']);
  const [certError, setCertError] = useState('');
  const [downloadNotice, setDownloadNotice] = useState('');

  // Survey modal state
  const [rating, setRating] = useState(5);
  const [surveyComment, setSurveyComment] = useState('');
  const [surveySubmitted, setSurveySubmitted] = useState(false);

  // Manual/CPGRAMS tab
  const [manualTab, setManualTab] = useState('manual');

  if (!activeModal) return null;

  const closeModal = () => {
    setCertError('');
    setDownloadNotice('');
    setSurveySubmitted(false);
    setActiveModal(null);
  };

  // Trigger certificate file download
  const handleDownloadCert = (cert) => {
    const content = [
      '======================================================',
      '   GOVERNMENT OF UTTARAKHAND — APUNI SARKAR e-PORTAL  ',
      '======================================================',
      `Certificate ID   : ${cert.id}`,
      `Certificate Type : ${cert.type} (${cert.hindiType})`,
      `Citizen Name     : ${cert.holderName}`,
      `Father's Name    : ${cert.fatherName}`,
      `District / Tehsil: ${cert.district} / ${cert.tehsil}`,
      `Issue Date       : ${cert.issueDate}`,
      `Issuing Authority: ${cert.issuingAuthority}`,
      `Verification     : ${cert.status}`,
      '======================================================',
      'Digitally Verified via SUGAM 1905 Citizen Portal',
    ].join('\n');

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${cert.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setDownloadNotice(`Downloaded ${cert.id}.txt successfully.`);
  };

  const handleVerifyCert = (e) => {
    e.preventDefault();
    setCertError('');
    setDownloadNotice('');
    const key = certInput.trim().toUpperCase();
    if (SAMPLE_CERTIFICATES[key]) {
      setVerifiedCert(SAMPLE_CERTIFICATES[key]);
    } else {
      setVerifiedCert(null);
      setCertError('Certificate ID not found. Try sample ID UK-CERT-2026-7741 or UK-CERT-2026-8820.');
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const displayName =
      loginName.trim() || (loginRole === 'officer' ? 'SDM Uttarkashi' : 'Harshit Raj');
    const identifier =
      loginIdentifier.trim() || (loginRole === 'officer' ? 'UK-OFF-1905' : '9876543210');
    setUser({ role: loginRole, name: displayName, identifier });
    closeModal();
  };

  const handleSurveySubmit = (e) => {
    e.preventDefault();
    addSurvey({
      complaintId: activeModal.complaintId || 'PORTAL-GENERAL',
      rating,
      comment: surveyComment.trim(),
      date: new Date().toISOString(),
    });
    setSurveySubmitted(true);
    setSurveyComment('');
  };

  const currentManualTab = activeModal.type === 'manual' ? activeModal.tab || manualTab : manualTab;

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      onClick={closeModal}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 1. SERVICE DETAIL MODAL */}
        {activeModal.type === 'service' && activeModal.service && (
          <div>
            <div className="bg-ukNavy text-white px-6 py-4 flex items-start justify-between gap-4 rounded-t-2xl">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-ukSaffronLight">
                  {activeModal.service.department}
                </span>
                <h3 className="text-xl font-extrabold mt-0.5">{activeModal.service.name}</h3>
                <p className="text-xs text-slate-300">{activeModal.service.hindiName}</p>
              </div>
              <button
                type="button"
                onClick={closeModal}
                aria-label="Close modal"
                className="p-1.5 rounded-lg hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div>
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-1">
                  Service Purpose &amp; Scope
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {activeModal.service.purpose}
                </p>
              </div>

              {/* Affidavit Status Callout */}
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-ukEmerald shrink-0 mt-0.5" />
                <div className="text-sm text-emerald-950">
                  <strong className="block">No Mandatory Affidavit Required</strong>
                  <span>{activeModal.service.affidavitNote}</span>
                </div>
              </div>

              {/* Required Documents Upfront */}
              <div>
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-2">
                  Required Documents (Upfront Checklist)
                </h4>
                <ul className="space-y-2">
                  {activeModal.service.documents.map((doc, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-ukSaffron shrink-0 mt-0.5" />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="text-xs text-slate-500 flex flex-wrap items-center justify-between gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span>
                  <strong>Expected SLA:</strong> {activeModal.service.sla}
                </span>
                <span className="flex items-center gap-1.5 flex-wrap">
                  <strong>Official Domain:</strong>{' '}
                  <a
                    href={activeModal.service.portalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ukNavy hover:text-ukSaffron font-bold underline inline-flex items-center gap-1 transition-colors"
                    title={`Open ${activeModal.service.name} official site in a new tab`}
                  >
                    <span className="break-all">{activeModal.service.portalUrl}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-ukSaffron shrink-0" aria-hidden="true" />
                  </a>
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
                <a
                  href={activeModal.service.portalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-ukNavy hover:bg-ukNavyDark text-white text-sm font-bold shadow-sm transition-all"
                >
                  <span>Visit Official Portal</span>
                  <ExternalLink className="w-4 h-4 text-ukSaffronLight" aria-hidden="true" />
                </a>

                <div className="flex flex-wrap items-center gap-3">
                  {activeModal.service.supportsCertVerify && (
                    <button
                      type="button"
                      onClick={() => setActiveModal({ type: 'certificate', tab: 'verify' })}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-ukEmerald text-ukEmerald hover:bg-emerald-50 text-sm font-bold transition-colors"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>Verify Certificate</span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      closeModal();
                      setGrievanceTab('register');
                      scrollToSection('grievance-section');
                    }}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-ukSaffron hover:bg-ukSaffronLight text-white text-sm font-bold transition-colors"
                  >
                    <span>File Service Grievance / Request</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. LOGIN MODAL */}
        {activeModal.type === 'login' && (
          <div>
            <div className="bg-ukNavy text-white px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h3 className="text-lg font-extrabold">SUGAM 1905 — Unified Portal Login</h3>
              <button type="button" onClick={closeModal} aria-label="Close modal" className="p-1.5 rounded-lg hover:bg-white/10">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleLoginSubmit} className="p-6 space-y-5">
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setLoginRole('citizen')}
                  className={`flex items-center justify-center gap-2 py-3 rounded-xl border-2 text-sm font-bold transition-all ${loginRole === 'citizen'
                    ? 'border-ukSaffron bg-orange-50 text-ukSaffron'
                    : 'border-slate-200 text-slate-600'
                    }`}
                >
                  <User className="w-4 h-4" />
                  <span>Citizen Login</span>
                </button>
                <button
                  type="button"
                  onClick={() => setLoginRole('officer')}
                  className={`flex items-center justify-center gap-2 py-3 rounded-xl border-2 text-sm font-bold transition-all ${loginRole === 'officer'
                    ? 'border-ukNavy bg-slate-100 text-ukNavy'
                    : 'border-slate-200 text-slate-600'
                    }`}
                >
                  <Briefcase className="w-4 h-4" />
                  <span>Officer / L1–L4 Login</span>
                </button>
              </div>

              <div>
                <label className="block text-sm font-bold text-ukNavy mb-1">
                  Display Name (Demo)
                </label>
                <input
                  type="text"
                  value={loginName}
                  onChange={(e) => setLoginName(e.target.value)}
                  placeholder={loginRole === 'officer' ? 'SDM Uttarkashi' : 'Harshit Raj'}
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-ukSaffron focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-ukNavy mb-1">
                  {loginRole === 'officer' ? 'Officer Nodal ID' : 'Registered Mobile Number'}
                </label>
                <input
                  type="text"
                  value={loginIdentifier}
                  onChange={(e) => setLoginIdentifier(e.target.value)}
                  placeholder={loginRole === 'officer' ? 'UK-OFF-1905' : '9876543210'}
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-ukSaffron focus:outline-none"
                />
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-600">
                Demo Mode: Leave fields blank or enter any name to test instant Citizen / Officer session state.
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-ukSaffron hover:bg-ukSaffronLight text-white font-bold text-sm shadow-md"
              >
                Sign In to SUGAM 1905
              </button>
            </form>
          </div>
        )}

        {/* 3. VERIFY / DOWNLOAD CERTIFICATE MODAL */}
        {activeModal.type === 'certificate' && (
          <div>
            <div className="bg-ukNavy text-white px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h3 className="text-lg font-extrabold">
                  Apuni Sarkar — Verify &amp; Download e-Certificate
                </h3>
              </div>
              <button type="button" onClick={closeModal} aria-label="Close modal" className="p-1.5 rounded-lg hover:bg-white/10">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <form onSubmit={handleVerifyCert} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={certInput}
                  onChange={(e) => setCertInput(e.target.value)}
                  placeholder="Enter Certificate ID (e.g., UK-CERT-2026-7741)"
                  className="flex-1 rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm font-mono focus:border-ukSaffron focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-ukEmerald hover:bg-emerald-800 text-white text-sm font-bold shrink-0"
                >
                  Verify ID
                </button>
              </form>

              {/* Clickable Sample Certificate ID Chips */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="font-bold text-slate-500">Sample IDs:</span>
                {Object.keys(SAMPLE_CERTIFICATES).map((id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      setCertInput(id);
                      setVerifiedCert(SAMPLE_CERTIFICATES[id]);
                      setCertError('');
                      setDownloadNotice('');
                    }}
                    className="px-2.5 py-1 rounded-full bg-orange-50 text-ukSaffron border border-orange-200 font-mono font-bold hover:bg-orange-100"
                  >
                    {id}
                  </button>
                ))}
              </div>

              {certError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm font-semibold">
                  {certError}
                </div>
              )}

              {verifiedCert && (
                <div className="rounded-2xl border-2 border-ukEmerald bg-emerald-50/40 p-5 space-y-4">
                  <div className="flex items-start justify-between gap-3 border-b border-emerald-200 pb-3">
                    <div>
                      <span className="inline-flex items-center gap-1 text-xs font-extrabold text-ukEmerald bg-emerald-100 px-2.5 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{verifiedCert.status}</span>
                      </span>
                      <h4 className="text-base font-extrabold text-ukNavy mt-1.5">
                        {verifiedCert.type}
                      </h4>
                      <p className="text-xs text-slate-600">{verifiedCert.hindiType}</p>
                    </div>
                    <span className="font-mono text-xs font-extrabold text-ukNavy bg-white px-2.5 py-1 rounded border border-slate-300">
                      {verifiedCert.id}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-xs text-slate-500 block">Citizen Name</span>
                      <strong className="text-ukNavy">{verifiedCert.holderName}</strong>
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 block">Father&apos;s Name</span>
                      <strong className="text-ukNavy">{verifiedCert.fatherName}</strong>
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 block">District / Tehsil</span>
                      <strong className="text-ukNavy">
                        {verifiedCert.district} / {verifiedCert.tehsil}
                      </strong>
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 block">Issue Date</span>
                      <strong className="text-ukNavy">{verifiedCert.issueDate}</strong>
                    </div>
                    <div className="sm:col-span-2">
                      <span className="text-xs text-slate-500 block">Issuing Authority</span>
                      <strong className="text-ukNavy">{verifiedCert.issuingAuthority}</strong>
                    </div>
                  </div>

                  {downloadNotice && (
                    <p className="text-xs font-bold text-ukEmerald bg-white px-3 py-2 rounded-lg border border-emerald-200">
                      {downloadNotice}
                    </p>
                  )}

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => handleDownloadCert(verifiedCert)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-ukSaffron hover:bg-ukSaffronLight text-white text-sm font-bold shadow-sm"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download Verified Certificate</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 4. WHATSAPP 1905 MODAL */}
        {activeModal.type === 'whatsapp' && (
          <div>
            <div className="bg-ukEmerald text-white px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                <h3 className="text-lg font-extrabold">Connect on WhatsApp — CM Helpline 1905</h3>
              </div>
              <button type="button" onClick={closeModal} aria-label="Close modal" className="p-1.5 rounded-lg hover:bg-white/10">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 flex flex-col sm:flex-row items-center gap-6">
              <WhatsAppQRSVG size="w-40 h-40" />
              <div className="space-y-3 text-sm text-slate-700">
                <h4 className="text-base font-extrabold text-ukNavy">
                  Instant 24×7 WhatsApp Citizen Assistant
                </h4>
                <ol className="list-decimal list-inside space-y-1.5">
                  <li>Scan the official QR code with your phone camera or WhatsApp.</li>
                  <li>Send <strong>&ldquo;Namaste&rdquo;</strong> or <strong>&ldquo;1905&rdquo;</strong> in English, Hindi, Garhwali, Kumaoni, or Jaunsari.</li>
                  <li>Register a grievance, upload a site photo, or fetch your Apuni Sarkar certificate PDF directly in chat.</li>
                </ol>
                <div className="pt-2 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      closeModal();
                      setGrievanceTab('register');
                      scrollToSection('grievance-section');
                    }}
                    className="px-4 py-2 rounded-xl bg-ukEmerald hover:bg-emerald-800 text-white text-xs font-bold"
                  >
                    File Online Instead
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 5. TRAINING MANUAL / CPGRAMS MODAL */}
        {activeModal.type === 'manual' && (
          <div>
            <div className="bg-ukNavy text-white px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h3 className="text-lg font-extrabold">Training Manual &amp; CPGRAMS Integration</h3>
              <button type="button" onClick={closeModal} aria-label="Close modal" className="p-1.5 rounded-lg hover:bg-white/10">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-5">
              <div className="flex gap-2 border-b border-slate-200 pb-3">
                <button
                  type="button"
                  onClick={() => setActiveModal({ type: 'manual', tab: 'manual' })}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold ${currentManualTab === 'manual'
                    ? 'bg-ukSaffron text-white'
                    : 'bg-slate-100 text-ukNavy'
                    }`}
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Citizen &amp; Officer Training Manual</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveModal({ type: 'manual', tab: 'cpgrams' })}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold ${currentManualTab === 'cpgrams'
                    ? 'bg-ukNavy text-white'
                    : 'bg-slate-100 text-ukNavy'
                    }`}
                >
                  <Globe2 className="w-4 h-4" />
                  <span>CPGRAMS Central Portal Bridge</span>
                </button>
              </div>

              {currentManualTab === 'manual' ? (
                <div className="space-y-3 text-sm text-slate-700">
                  <h4 className="font-extrabold text-ukNavy">4-Level Escalation Matrix (L1 → L4)</h4>
                  <ul className="space-y-2 list-disc list-inside">
                    <li><strong>Level 1 (Block / Tehsil Officer):</strong> Initial field verification &amp; resolution within 7 working days.</li>
                    <li><strong>Level 2 (District Nodal Officer):</strong> Auto-escalated if unresolved or citizen marks unsatisfied.</li>
                    <li><strong>Level 3 (Departmental HOD):</strong> State-level directorate review with mandatory action report.</li>
                    <li><strong>Level 4 (Secretary / CM Office):</strong> Monthly CM Dashboard review for chronic or systemic issues.</li>
                  </ul>
                  <p className="text-xs bg-orange-50 border border-orange-200 p-3 rounded-xl text-slate-800">
                    Tip: Citizens can also call toll-free <strong>1905</strong> from 7:00 AM to 10:00 PM daily in Hindi, Garhwali, Kumaoni, or Jaunsari.
                  </p>
                </div>
              ) : (
                <div className="space-y-3 text-sm text-slate-700">
                  <h4 className="font-extrabold text-ukNavy">Lodge Central Government Grievance (CPGRAMS)</h4>
                  <p>
                    For matters under Central Ministries (Railways, National Highways NHAI, Telecom, Banking, or Central Universities), SUGAM 1905 bridges directly with the Government of India&apos;s <strong>CPGRAMS</strong> (`pgportal.gov.in`) framework.
                  </p>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                    <p><strong>State Matters:</strong> Use SUGAM 1905 Register Complaint for instant routing to Uttarakhand departments.</p>
                    <p><strong>Central Matters:</strong> Reference your Uttarakhand district PIN code so CPGRAMS routes to the Dehradun Regional Nodal Office.</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <a
                      href="https://pgportal.gov.in/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-ukNavy text-white text-xs font-bold hover:bg-ukNavyDark shadow-sm transition-all"
                    >
                      <span>Open CPGRAMS Portal (pgportal.gov.in)</span>
                      <ExternalLink className="w-3.5 h-3.5 text-ukSaffronLight" />
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        closeModal();
                        setGrievanceTab('register');
                        scrollToSection('grievance-section');
                      }}
                      className="px-4 py-2 rounded-xl bg-ukSaffron text-white text-xs font-bold hover:bg-ukSaffronLight transition-all"
                    >
                      File State Grievance on SUGAM 1905
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 6. CITIZEN SURVEY (1–5 STAR) MODAL */}
        {activeModal.type === 'survey' && (
          <div>
            <div className="bg-ukNavy text-white px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h3 className="text-lg font-extrabold">Citizen Satisfaction Survey (1905)</h3>
              <button type="button" onClick={closeModal} aria-label="Close modal" className="p-1.5 rounded-lg hover:bg-white/10">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              {surveySubmitted ? (
                <div className="text-center py-6 space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-ukEmerald mx-auto" />
                  <h4 className="text-lg font-extrabold text-ukNavy">Thank You for Your Feedback!</h4>
                  <p className="text-sm text-slate-600">
                    Your {rating}-star rating has been recorded to improve Uttarakhand public service delivery.
                  </p>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-5 py-2 rounded-xl bg-ukNavy text-white text-sm font-bold"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSurveySubmit} className="space-y-5">
                  <p className="text-sm text-slate-600">
                    How satisfied are you with the resolution speed and citizen portal experience
                    {activeModal.complaintId ? ` for ${activeModal.complaintId}` : ''}?
                  </p>
                  <div className="flex items-center justify-center gap-2 py-2">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setRating(num)}
                        aria-label={`Rate ${num} out of 5 stars`}
                        className="p-1.5 transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-9 h-9 ${num <= rating
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-slate-300'
                            }`}
                        />
                      </button>
                    ))}
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-ukNavy mb-1">
                      Suggestions (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={surveyComment}
                      onChange={(e) => setSurveyComment(e.target.value)}
                      placeholder="Share how we can make SUGAM 1905 even better..."
                      className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-ukSaffron focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-ukSaffron hover:bg-ukSaffronLight text-white font-bold text-sm"
                  >
                    Submit {rating}-Star Feedback
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        {/* 7. OFFICIAL INFO MODAL (ABOUT / GOV ORDER / PRIVACY / CONTACT) */}
        {activeModal.type === 'info' && (
          <div>
            <div className="bg-ukNavy text-white px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-ukSaffronLight" />
                <h3 className="text-lg font-extrabold capitalize">
                  {activeModal.page === 'about' && 'About SUGAM 1905 & CM Helpline'}
                  {activeModal.page === 'govOrder' && 'Official Government Orders (शासनादेश)'}
                  {activeModal.page === 'privacy' && 'Privacy & Data Protection Policy'}
                  {activeModal.page === 'contact' && 'Contact Uttarakhand CM Helpline 1905'}
                </h3>
              </div>
              <button type="button" onClick={closeModal} aria-label="Close modal" className="p-1.5 rounded-lg hover:bg-white/10">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4 text-sm text-slate-700 leading-relaxed">
              {activeModal.page === 'about' && (
                <>
                  <p>
                    <strong>SUGAM 1905 (सुगम 1905)</strong> is a citizen-first modernization of Uttarakhand&apos;s official CM Helpline 1905 (`cmhelpline.uk.gov.in`) unified with Apuni Sarkar (`eservices.uk.gov.in`), designed for the <strong>PRAYAS 2026 ITDA Hackathon</strong>.
                  </p>
                  <p>
                    Built by <strong>Harshit Raj, Vaishnavi Bahuguna, and Ashish Rana</strong> (Govt. Institute of Technology, Uttarkashi), it removes bureaucratic friction through 5-language support (including Garhwali, Kumaoni, and Jaunsari), upfront document checklists, and transparent 4-stage grievance tracking.
                  </p>
                </>
              )}
              {activeModal.page === 'govOrder' && (
                <ul className="space-y-2.5">
                  <li className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <strong>G.O. No. 1905/ITDA/2026-01:</strong> Elimination of mandatory notary affidavits for standard citizen grievances and self-attested Apuni Sarkar applications.
                  </li>
                  <li className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <strong>G.O. No. 412/RTS/2025-18:</strong> Mandatory 4-level escalation SLA (L1 to L4) across all 13 districts of Uttarakhand.
                  </li>
                  <li className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <strong>G.O. No. 89/GIGW/2025:</strong> Accessibility compliance (WCAG 2.1 AA, High Contrast, and regional dialect inclusion) for all state portals.
                  </li>
                </ul>
              )}
              {activeModal.page === 'privacy' && (
                <>
                  <p>
                    Citizen data submitted on SUGAM 1905 (mobile number, address, and grievance details) is used strictly for grievance redressal and service delivery under the IT Act and Uttarakhand e-Governance Security Guidelines.
                  </p>
                  <p>
                    No personal information is shared with third-party commercial entities. In this hackathon prototype, submitted complaints and survey ratings are stored locally in your browser&apos;s <code>localStorage</code>.
                  </p>
                </>
              )}
              {activeModal.page === 'contact' && (
                <div className="space-y-2">
                  <p><strong>Office Address:</strong> Uttarakhand Secretariat, New Building, 4th Floor, Subhash Rd, Dehradun, Uttarakhand 248001</p>
                  <p><strong>Toll-Free Helpline:</strong> 1905 (7:00 AM – 10:00 PM Daily)</p>
                  <p><strong>Disaster Helpline (USDMA):</strong> 1070 / District 1077</p>
                  <p><strong>Official Email:</strong> cmhelpline-uk@gov.in</p>
                </div>
              )}
              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-5 py-2 rounded-xl bg-ukNavy text-white text-xs font-bold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
