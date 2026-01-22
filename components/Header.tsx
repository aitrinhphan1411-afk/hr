import React from 'react';
import { Language, Employee, UserRole } from '../types.ts';

interface HeaderProps {
  lang: Language;
  setLang: (l: Language) => void;
  user: Employee | null;
  onLogout: () => void;
  onGoToDashboard: () => void;
  onGoToSurvey: () => void;
}

const Header: React.FC<HeaderProps> = ({ lang, setLang, user, onLogout, onGoToDashboard, onGoToSurvey }) => {
  // Mynavi TechTus Vietnam Logo
  const companyLogo = "https://i.ibb.co/L9p6z0Y/mynavi-logo.png";

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-100 h-16 z-50 px-4 md:px-8 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => user?.role === UserRole.ADMIN ? onGoToDashboard() : onGoToSurvey()}
        >
          <h1 className="text-[#4ddcff] font-extrabold text-xl tracking-tighter">
            HR INSIGHT
          </h1>
        </div>
        
        {user && (
          <nav className="hidden md:flex gap-1 ml-4">
            <button 
              onClick={onGoToSurvey} 
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${location.hash !== '#admin' ? 'text-[#4ddcff] bg-[#4ddcff]/5' : 'text-gray-500 hover:text-[#4ddcff] hover:bg-gray-50'}`}
            >
              {lang === Language.VI ? 'Khảo sát' : 'Survey'}
            </button>
            {user.role === UserRole.ADMIN && (
              <button 
                onClick={onGoToDashboard}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${location.hash === '#admin' ? 'text-[#4ddcff] bg-[#4ddcff]/5' : 'text-gray-500 hover:text-[#4ddcff] hover:bg-gray-50'}`}
              >
                {lang === Language.VI ? 'Quản trị' : 'Admin'}
              </button>
            )}
          </nav>
        )}
      </div>

      <div className="flex items-center gap-4">
        {/* Language Toggle */}
        <div className="flex bg-gray-100 p-1 rounded-xl">
          <button 
            onClick={() => setLang(Language.VI)}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${lang === Language.VI ? 'bg-white shadow-sm text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
          >
            VN
          </button>
          <button 
            onClick={() => setLang(Language.EN)}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${lang === Language.EN ? 'bg-white shadow-sm text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
          >
            EN
          </button>
        </div>

        {user && (
          <div className="flex items-center gap-3 pl-4 border-l border-gray-100">
            <div className="hidden sm:block text-right">
              <p className="text-xs font-bold text-gray-900 leading-none mb-1">{user.name}</p>
              <p className="text-[10px] text-gray-400 leading-none uppercase tracking-wider">{user.department}</p>
            </div>
            <button 
              onClick={onLogout}
              className="p-2 text-gray-400 hover:text-red-500 transition-colors"
              title={lang === Language.VI ? 'Đăng xuất' : 'Logout'}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        )}

        {/* Brand Logo - Preserved Aspect Ratio */}
        <div className="ml-2 flex items-center h-10">
          <img 
            src={companyLogo} 
            alt="Mynavi TechTus Vietnam" 
            className="h-full w-auto object-contain"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;