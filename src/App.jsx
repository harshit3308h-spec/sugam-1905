import React from 'react';
import AccessibilityBar from './components/AccessibilityBar';
import Header from './components/Header';
import Hero from './components/Hero';
import ServicesSection from './components/ServicesSection';
import GrievanceSection from './components/GrievanceSection';
import InfoModals from './components/InfoModals';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <AccessibilityBar />
      <Header />
      <main id="main-content" className="flex-1">
        <Hero />
        <ServicesSection />
        <GrievanceSection />
      </main>
      <Footer />
      <InfoModals />
    </div>
  );
}
