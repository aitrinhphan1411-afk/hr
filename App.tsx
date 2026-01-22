
import React, { useState, useEffect, useMemo } from 'react';
import { Language, Employee, UserRole } from './types';
import { translations } from './services/i18n';
import Login from './components/Login';
import SurveyForm from './components/SurveyForm';
import Dashboard from './components/Dashboard';
import ThankYou from './components/ThankYou';
import Header from './components/Header';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('app_lang');
    return (saved as Language) || Language.VI;
  });

  const [user, setUser] = useState<Employee | null>(() => {
    const saved = sessionStorage.getItem('app_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [view, setView] = useState<'LOGIN' | 'SURVEY' | 'DASHBOARD' | 'THANKS'>('LOGIN');

  useEffect(() => {
    localStorage.setItem('app_lang', lang);
    document.documentElement.lang = lang === Language.VI ? 'vi' : 'en';
  }, [lang]);

  useEffect(() => {
    if (user) {
      if (user.role === UserRole.ADMIN) {
        setView('DASHBOARD');
      } else {
        setView('SURVEY');
      }
      sessionStorage.setItem('app_user', JSON.stringify(user));
    } else {
      setView('LOGIN');
      sessionStorage.removeItem('app_user');
    }
  }, [user]);

  const t = useMemo(() => translations[lang], [lang]);

  const handleLogout = () => setUser(null);

  const renderContent = () => {
    switch (view) {
      case 'LOGIN':
        return <Login lang={lang} t={t} onLogin={setUser} />;
      case 'SURVEY':
        return <SurveyForm lang={lang} t={t} user={user!} onSubmitSuccess={() => setView('THANKS')} />;
      case 'DASHBOARD':
        return <Dashboard lang={lang} t={t} user={user!} />;
      case 'THANKS':
        return <ThankYou t={t} onBackHome={() => setView('SURVEY')} />;
      default:
        return <Login lang={lang} t={t} onLogin={setUser} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header 
        lang={lang} 
        setLang={setLang} 
        user={user} 
        onLogout={handleLogout}
        onGoToDashboard={() => setView('DASHBOARD')}
        onGoToSurvey={() => setView('SURVEY')}
      />
      <main className="flex-grow pt-20">
        {renderContent()}
      </main>
      <footer className="py-6 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} HR Insight Platform. All Rights Reserved.
      </footer>
    </div>
  );
};

export default App;
