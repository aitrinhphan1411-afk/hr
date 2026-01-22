
import React from 'react';
import { TranslationSchema } from '../types';

interface ThankYouProps {
  t: TranslationSchema;
  onBackHome: () => void;
}

const ThankYou: React.FC<ThankYouProps> = ({ t, onBackHome }) => {
  return (
    <div className="max-w-lg mx-auto px-4 pt-20 text-center fade-in">
      <div className="bg-white p-10 md:p-16 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col items-center">
        <div className="w-24 h-24 bg-[#4ddcff]/10 text-[#4ddcff] rounded-full flex items-center justify-center mb-8">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-6">{t.thanks.title}</h2>
        <p className="text-lg text-gray-600 mb-10 leading-relaxed">
          {t.thanks.message}
        </p>
        <button 
          onClick={onBackHome}
          className="text-[#4ddcff] font-semibold hover:underline decoration-2 underline-offset-4"
        >
          {t.thanks.backHome}
        </button>
      </div>
    </div>
  );
};

export default ThankYou;
