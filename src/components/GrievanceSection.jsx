import React, { useState } from 'react';
import {
  FilePlus2,
  Search,
  CheckCircle2,
  ShieldCheck,
  Upload,
  ArrowRight,
  ArrowLeft,
  Star,
  ClipboardCheck,
  Building2,
  MapPin,
  Clock,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { UTTARAKHAND_DISTRICTS, GRIEVANCE_CATEGORIES } from '../data/services';

export default function GrievanceSection() {
  const {
    t,
    grievanceTab,
    setGrievanceTab,
    complaints,
    addComplaint,
    trackedId,
    setTrackedId,
    setActiveModal,
  } = useApp();

  // 3-step form state
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    district: 'Uttarkashi',
    categoryId: GRIEVANCE_CATEGORIES[0].id,
    citizenName: '',
    mobile: '',
    email: '',
    address: '',
    subject: '',
    description: '',
    attachmentName: '',
    declared: true,
  });
  const [formError, setFormError] = useState('');
  const [submittedComplaint, setSubmittedComplaint] = useState(null);

  // Tracker search state
  const [trackInput, setTrackInput] = useState(trackedId);

  const selectedCategory =
    GRIEVANCE_CATEGORIES.find((c) => c.id === formData.categoryId) || GRIEVANCE_CATEGORIES[0];

  const handleNextStep = () => {
    setFormError('');
    if (step === 2) {
      if (!formData.citizenName.trim()) {
        setFormError('Please enter your full name.');
        return;
      }
      if (!/^\d{10}$/.test(formData.mobile.trim())) {
        setFormError('Please enter a valid 10-digit mobile number.');
        return;
      }
      if (!formData.address.trim()) {
        setFormError('Please enter your village, ward, or block address.');
        return;
      }
    }
    setStep((prev) => Math.min(3, prev + 1));
  };

  const handleSubmitComplaint = (e) => {
    e.preventDefault();
    setFormError('');
    if (!formData.subject.trim() || !formData.description.trim()) {
      setFormError('Please enter both a subject and detailed description of your issue.');
      return;
    }
    if (!formData.declared) {
      setFormError('Please accept the self-declaration checkbox to proceed.');
      return;
    }

    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const newId = `UK-1905-2026-${randomDigits}`;
    const today = new Date().toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

    const newRecord = {
      id: newId,
      district: formData.district,
      category: selectedCategory.label,
      department: selectedCategory.department,
      citizenName: formData.citizenName.trim(),
      mobile: formData.mobile.trim(),
      email: formData.email.trim(),
      address: formData.address.trim(),
      subject: formData.subject.trim(),
      description: formData.description.trim(),
      filedDate: today,
      stage: 1,
      officerNote: `Grievance registered on SUGAM 1905 and queued for automatic routing to ${selectedCategory.department} (${formData.district}).`,
      attachmentName: formData.attachmentName || null,
    };

    addComplaint(newRecord);
    setSubmittedComplaint(newRecord);
    setTrackInput(newId);
    setStep(1);
    setFormData({
      district: 'Uttarkashi',
      categoryId: GRIEVANCE_CATEGORIES[0].id,
      citizenName: '',
      mobile: '',
      email: '',
      address: '',
      subject: '',
      description: '',
      attachmentName: '',
      declared: true,
    });
  };

  const handleTrackSearch = (e) => {
    e.preventDefault();
    if (!trackInput.trim()) return;
    const q = trackInput.trim().toLowerCase();
    const found = complaints.find(
      (c) => c.id.toLowerCase() === q || c.mobile === q
    );
    if (found) {
      setTrackedId(found.id);
    } else {
      setTrackedId(trackInput.trim());
    }
  };

  const activeComplaint = complaints.find(
    (c) => c.id.toLowerCase() === trackedId.toLowerCase()
  );

  const stages = [
    { num: 1, label: t.grievance.stage1 },
    { num: 2, label: t.grievance.stage2 },
    { num: 3, label: t.grievance.stage3 },
    { num: 4, label: t.grievance.stage4 },
  ];

  return (
    <section id="grievance-section" className="py-12 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-ukNavy tracking-tight">
            {t.grievance.sectionTitle}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-1">
            {t.grievance.sectionSub}
          </p>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-slate-200 pb-3">
          <button
            type="button"
            onClick={() => setGrievanceTab('register')}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
              grievanceTab === 'register'
                ? 'bg-ukSaffron text-white shadow-md'
                : 'bg-slate-100 text-ukNavy hover:bg-slate-200'
            }`}
          >
            <FilePlus2 className="w-4 h-4" aria-hidden="true" />
            <span>{t.grievance.tabRegister}</span>
          </button>

          <button
            type="button"
            onClick={() => setGrievanceTab('track')}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
              grievanceTab === 'track'
                ? 'bg-ukNavy text-white shadow-md'
                : 'bg-slate-100 text-ukNavy hover:bg-slate-200'
            }`}
          >
            <Search className="w-4 h-4" aria-hidden="true" />
            <span>{t.grievance.tabTrack} ({complaints.length})</span>
          </button>
        </div>

        {/* REGISTER COMPLAINT PANEL */}
        {grievanceTab === 'register' && (
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 sm:p-8 shadow-sm">
            {/* Mandatory No-Affidavit Trust Banner */}
            <div className="mb-6 p-4 rounded-xl bg-emerald-50 border-l-4 border-ukEmerald flex items-start gap-3">
              <ShieldCheck className="w-6 h-6 text-ukEmerald shrink-0 mt-0.5" aria-hidden="true" />
              <p className="text-sm font-bold text-emerald-950">
                {t.grievance.noAffidavitBanner}
              </p>
            </div>

            {/* Success Confirmation Banner */}
            {submittedComplaint && (
              <div className="mb-6 p-5 rounded-xl bg-white border-2 border-ukEmerald shadow-md">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-7 h-7 text-ukEmerald shrink-0" aria-hidden="true" />
                    <div>
                      <h3 className="text-base font-extrabold text-ukNavy">
                        Complaint Registered Successfully!
                      </h3>
                      <p className="text-sm text-slate-600 mt-0.5">
                        Your Tracking ID:{' '}
                        <span className="font-mono font-extrabold text-ukSaffron bg-orange-50 px-2 py-0.5 rounded border border-orange-200">
                          {submittedComplaint.id}
                        </span>
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        Routed to {submittedComplaint.department} ({submittedComplaint.district})
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setTrackedId(submittedComplaint.id);
                      setTrackInput(submittedComplaint.id);
                      setGrievanceTab('track');
                    }}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-ukNavy hover:bg-ukNavyDark text-white text-sm font-bold shrink-0"
                  >
                    <span>Track Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* 3-Step Progress Indicator */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6">
              {[
                { id: 1, label: t.grievance.step1 },
                { id: 2, label: t.grievance.step2 },
                { id: 3, label: t.grievance.step3 },
              ].map((s) => (
                <div
                  key={s.id}
                  className={`p-3 rounded-xl border text-xs sm:text-sm font-bold text-center transition-colors ${
                    step === s.id
                      ? 'bg-ukNavy text-white border-ukNavy'
                      : step > s.id
                      ? 'bg-emerald-50 text-ukEmerald border-emerald-300'
                      : 'bg-white text-slate-500 border-slate-200'
                  }`}
                >
                  {s.label}
                </div>
              ))}
            </div>

            {formError && (
              <div className="mb-4 p-3 rounded-lg bg-rose-50 border border-rose-300 text-rose-800 text-sm font-semibold">
                {formError}
              </div>
            )}

            <form onSubmit={handleSubmitComplaint} className="space-y-5">
              {/* STEP 1: District & Category */}
              {step === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="district-select" className="block text-sm font-bold text-ukNavy mb-1.5">
                      {t.grievance.districtLabel} *
                    </label>
                    <select
                      id="district-select"
                      value={formData.district}
                      onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                      className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-900 focus:border-ukSaffron focus:outline-none"
                    >
                      {UTTARAKHAND_DISTRICTS.map((dist) => (
                        <option key={dist} value={dist}>
                          {dist}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="category-select" className="block text-sm font-bold text-ukNavy mb-1.5">
                      {t.grievance.categoryLabel} *
                    </label>
                    <select
                      id="category-select"
                      value={formData.categoryId}
                      onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                      className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-900 focus:border-ukSaffron focus:outline-none"
                    >
                      {GRIEVANCE_CATEGORIES.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="md:col-span-2 bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-3">
                    <Building2 className="w-5 h-5 text-ukSaffron shrink-0" aria-hidden="true" />
                    <div className="text-sm">
                      <span className="text-slate-500">{t.grievance.departmentLabel}: </span>
                      <strong className="text-ukNavy">{selectedCategory.department}</strong>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Citizen Details */}
              {step === 2 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="citizen-name" className="block text-sm font-bold text-ukNavy mb-1.5">
                      {t.grievance.nameLabel} *
                    </label>
                    <input
                      id="citizen-name"
                      type="text"
                      value={formData.citizenName}
                      onChange={(e) => setFormData({ ...formData, citizenName: e.target.value })}
                      placeholder="e.g., Harshit Raj"
                      className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm focus:border-ukSaffron focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="citizen-mobile" className="block text-sm font-bold text-ukNavy mb-1.5">
                      {t.grievance.mobileLabel} *
                    </label>
                    <input
                      id="citizen-mobile"
                      type="tel"
                      maxLength={10}
                      value={formData.mobile}
                      onChange={(e) =>
                        setFormData({ ...formData, mobile: e.target.value.replace(/\D/g, '') })
                      }
                      placeholder="10-digit mobile number"
                      className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm focus:border-ukSaffron focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="citizen-email" className="block text-sm font-bold text-ukNavy mb-1.5">
                      {t.grievance.emailLabel}
                    </label>
                    <input
                      id="citizen-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm focus:border-ukSaffron focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="citizen-address" className="block text-sm font-bold text-ukNavy mb-1.5">
                      {t.grievance.addressLabel} *
                    </label>
                    <input
                      id="citizen-address"
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="Village / Mohalla / Block"
                      className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm focus:border-ukSaffron focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* STEP 3: Description & Optional Upload */}
              {step === 3 && (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="complaint-subject" className="block text-sm font-bold text-ukNavy mb-1.5">
                      {t.grievance.subjectLabel} *
                    </label>
                    <input
                      id="complaint-subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Short summary of your grievance"
                      className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm focus:border-ukSaffron focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="complaint-desc" className="block text-sm font-bold text-ukNavy mb-1.5">
                      {t.grievance.descriptionLabel} *
                    </label>
                    <textarea
                      id="complaint-desc"
                      rows={4}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Describe the location, duration, and details of the problem..."
                      className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm focus:border-ukSaffron focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="complaint-file" className="block text-sm font-bold text-ukNavy mb-1.5">
                      {t.grievance.uploadLabel}
                    </label>
                    <div className="flex items-center gap-3 bg-white border border-dashed border-slate-300 rounded-xl p-3">
                      <Upload className="w-5 h-5 text-ukSaffron shrink-0" aria-hidden="true" />
                      <input
                        id="complaint-file"
                        type="file"
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            attachmentName: e.target.files?.[0]?.name || '',
                          })
                        }
                        className="text-xs sm:text-sm text-slate-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-orange-50 file:text-ukSaffron hover:file:bg-orange-100"
                      />
                    </div>
                  </div>

                  <label className="flex items-start gap-2.5 text-sm text-slate-700 cursor-pointer pt-1">
                    <input
                      type="checkbox"
                      checked={formData.declared}
                      onChange={(e) => setFormData({ ...formData, declared: e.target.checked })}
                      className="mt-1 h-4 w-4 rounded border-slate-300 accent-ukSaffron"
                    />
                    <span className="font-medium">{t.grievance.declaration}</span>
                  </label>
                </div>
              )}

              {/* Step Navigation Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => {
                      setFormError('');
                      setStep((prev) => prev - 1);
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-ukNavy text-sm font-bold"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>{t.grievance.prevBtn}</span>
                  </button>
                ) : (
                  <div />
                )}

                {step < 3 ? (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-ukNavy hover:bg-ukNavyDark text-white text-sm font-bold shadow-sm"
                  >
                    <span>{t.grievance.nextBtn}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-ukSaffron hover:bg-ukSaffronLight text-white text-sm font-bold shadow-md"
                  >
                    <ClipboardCheck className="w-4 h-4" />
                    <span>{t.grievance.submitBtn}</span>
                  </button>
                )}
              </div>
            </form>
          </div>
        )}

        {/* TRACK APPLICATION / MY COMPLAINTS PANEL */}
        {grievanceTab === 'track' && (
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 sm:p-8 shadow-sm space-y-6">
            {/* Search Bar */}
            <form onSubmit={handleTrackSearch} className="flex flex-col sm:flex-row gap-3">
              <label htmlFor="track-id-input" className="sr-only">
                {t.grievance.trackPlaceholder}
              </label>
              <input
                id="track-id-input"
                type="text"
                value={trackInput}
                onChange={(e) => setTrackInput(e.target.value)}
                placeholder={t.grievance.trackPlaceholder}
                className="flex-1 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium focus:border-ukSaffron focus:outline-none"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-ukNavy hover:bg-ukNavyDark text-white text-sm font-bold shrink-0"
              >
                <Search className="w-4 h-4" />
                <span>{t.grievance.trackBtn}</span>
              </button>
            </form>

            {/* One-Click Sample & Filed Complaint Chips */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-600">{t.grievance.sampleChipsLabel}</span>
              {complaints.map((item) => {
                const isSelected = item.id.toLowerCase() === trackedId.toLowerCase();
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setTrackedId(item.id);
                      setTrackInput(item.id);
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs font-mono font-bold border transition-colors ${
                      isSelected
                        ? 'bg-ukSaffron text-white border-ukSaffron shadow-sm'
                        : 'bg-white text-ukNavy border-slate-300 hover:border-ukSaffron'
                    }`}
                  >
                    {item.id} ({item.district})
                  </button>
                );
              })}
            </div>

            {/* Complaint Detail & 4-Stage Timeline */}
            {activeComplaint ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-6">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-slate-100 pb-4">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-sm font-extrabold text-ukSaffron bg-orange-50 px-2.5 py-0.5 rounded border border-orange-200">
                        {activeComplaint.id}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-ukEmerald border border-emerald-200">
                        {activeComplaint.stage === 4 ? 'Resolved' : 'In Progress'}
                      </span>
                    </div>
                    <h3 className="text-lg font-extrabold text-ukNavy mt-2">
                      {activeComplaint.subject}
                    </h3>
                    <p className="text-sm text-slate-600 mt-1">{activeComplaint.description}</p>
                  </div>
                  <div className="text-xs text-slate-600 space-y-1 shrink-0 bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <p className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-ukSaffron" />
                      <strong>District:</strong> {activeComplaint.district}
                    </p>
                    <p className="flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-ukNavy" />
                      <strong>Dept:</strong> {activeComplaint.department}
                    </p>
                    <p className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-ukEmerald" />
                      <strong>Filed:</strong> {activeComplaint.filedDate}
                    </p>
                  </div>
                </div>

                {/* 4-Stage Visual Timeline */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
                    Live Redressal Progress (4-Stage Timeline)
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    {stages.map((st) => {
                      const completed = activeComplaint.stage >= st.num;
                      const current = activeComplaint.stage === st.num;
                      return (
                        <div
                          key={st.num}
                          className={`p-3.5 rounded-xl border-2 flex items-center sm:flex-col sm:text-center gap-3 transition-all ${
                            completed
                              ? 'bg-emerald-50 border-ukEmerald text-emerald-950'
                              : 'bg-slate-50 border-slate-200 text-slate-400'
                          }`}
                        >
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center font-extrabold text-sm shrink-0 ${
                              completed
                                ? 'bg-ukEmerald text-white'
                                : 'bg-slate-200 text-slate-500'
                            }`}
                          >
                            {completed ? <CheckCircle2 className="w-5 h-5" /> : st.num}
                          </div>
                          <div>
                            <p className="text-xs sm:text-sm font-bold">{st.label}</p>
                            {current && (
                              <span className="inline-block mt-1 text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-ukSaffron text-white">
                                Current Stage
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Officer Action Note & Survey CTA */}
                <div className="bg-orange-50/70 border border-orange-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="text-sm text-slate-800">
                    <span className="font-extrabold text-ukNavy">Latest Department Update: </span>
                    <span>{activeComplaint.officerNote}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveModal({ type: 'survey', complaintId: activeComplaint.id })
                    }
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-ukSaffron hover:bg-ukSaffronLight text-white text-xs font-bold shrink-0"
                  >
                    <Star className="w-4 h-4 fill-white" />
                    <span>{t.grievance.rateService}</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
                <p className="text-sm font-semibold text-slate-600">
                  No complaint found matching <strong className="text-ukNavy">{trackedId}</strong>. Click one of the chips above to inspect a live complaint.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
