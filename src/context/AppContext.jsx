import React, { createContext, useContext, useState, useEffect } from 'react';
import { TRANSLATIONS } from '../data/translations';
import { INITIAL_COMPLAINTS } from '../data/services';

const AppContext = createContext(null);

const STORAGE_KEY_COMPLAINTS = 'sugam_1905_complaints_v1';
const STORAGE_KEY_SURVEYS = 'sugam_1905_surveys_v1';

export function AppProvider({ children }) {
  const [lang, setLang] = useState('en');
  const [highContrast, setHighContrast] = useState(false);
  const [fontScale, setFontScale] = useState('normal'); // 'small' | 'normal' | 'large'
  const [searchQuery, setSearchQuery] = useState('');
  const [activePillar, setActivePillar] = useState('all');
  const [grievanceTab, setGrievanceTab] = useState('register'); // 'register' | 'track'
  const [trackedId, setTrackedId] = useState('UK-1905-2026-1001');
  const [user, setUser] = useState(null); // { role: 'citizen' | 'officer', name, identifier }

  // Active modals
  const [activeModal, setActiveModal] = useState(null);
  // Possible values: null | { type: 'login' } | { type: 'whatsapp' } | { type: 'certificate', tab: 'verify' | 'download' } | { type: 'manual', tab: 'manual' | 'cpgrams' } | { type: 'survey', complaintId?: string } | { type: 'info', page: 'about' | 'govOrder' | 'privacy' | 'contact' } | { type: 'service', service: object }

  // Persistent complaints in localStorage
  const [complaints, setComplaints] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_COMPLAINTS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // Fallback to initial sample complaints
    }
    return INITIAL_COMPLAINTS;
  });

  // Persistent surveys in localStorage
  const [surveys, setSurveys] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SURVEYS);
      if (saved) return JSON.parse(saved);
    } catch {
      // Ignore storage errors
    }
    return [];
  });

  // Sync High Contrast class to <html>
  useEffect(() => {
    const root = document.documentElement;
    if (highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
  }, [highContrast]);

  // Sync Font Size to <html>
  useEffect(() => {
    const root = document.documentElement;
    if (fontScale === 'small') root.style.fontSize = '14px';
    else if (fontScale === 'large') root.style.fontSize = '18px';
    else root.style.fontSize = '16px';
  }, [fontScale]);

  // Persist complaints
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_COMPLAINTS, JSON.stringify(complaints));
    } catch {
      // Ignore quota errors
    }
  }, [complaints]);

  // Persist surveys
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_SURVEYS, JSON.stringify(surveys));
    } catch {
      // Ignore quota errors
    }
  }, [surveys]);

  const addComplaint = (newComplaint) => {
    setComplaints((prev) => [newComplaint, ...prev]);
    setTrackedId(newComplaint.id);
  };

  const addSurvey = (surveyEntry) => {
    setSurveys((prev) => [surveyEntry, ...prev]);
  };

  const scrollToSection = (elementId) => {
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  return (
    <AppContext.Provider
      value={{
        lang,
        setLang,
        t,
        highContrast,
        setHighContrast,
        fontScale,
        setFontScale,
        searchQuery,
        setSearchQuery,
        activePillar,
        setActivePillar,
        grievanceTab,
        setGrievanceTab,
        trackedId,
        setTrackedId,
        complaints,
        addComplaint,
        surveys,
        addSurvey,
        user,
        setUser,
        activeModal,
        setActiveModal,
        scrollToSection,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}
