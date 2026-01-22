
import React from 'react';
import { Language, Employee, UserRole } from '../types';

interface HeaderProps {
  lang: Language;
  setLang: (l: Language) => void;
  user: Employee | null;
  onLogout: () => void;
  onGoToDashboard: () => void;
  onGoToSurvey: () => void;
}

const Header: React.FC<HeaderProps> = ({ lang, setLang, user, onLogout, onGoToDashboard, onGoToSurvey }) => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-100 h-16 z-50 px-4 md:px-8 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <h1 className="text-[#4ddcff] font-bold text-xl tracking-tight cursor-pointer" onClick={onGoToSurvey}>
          HR INSIGHT
        </h1>
        {user && (
          <nav className="hidden md:flex gap-4 ml-8 text-sm font-medium">
            <button 
              onClick={onGoToSurvey} 
              className="text-gray-600 hover:text-[#4ddcff] transition-colors"
            >
              {lang === Language.VI ? 'Khảo sát' : 'Survey'}
            </button>
            {user.role === UserRole.ADMIN && (
              <button 
                onClick={onGoToDashboard}
                className="text-gray-600 hover:text-[#4ddcff] transition-colors"
              >
                {lang === Language.VI ? 'Quản trị' : 'Admin'}
              </button>
            )}
          </nav>
        )}
      </div>

      <div className="flex items-center gap-4">
        {/* Language Toggle */}
        <div className="flex bg-gray-100 p-1 rounded-lg">
          <button 
            onClick={() => setLang(Language.VI)}
            className={`px-3 py-1 text-xs font-semibold rounded ${lang === Language.VI ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'}`}
          >
            VN
          </button>
          <button 
            onClick={() => setLang(Language.EN)}
            className={`px-3 py-1 text-xs font-semibold rounded ${lang === Language.EN ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'}`}
          >
            EN
          </button>
        </div>

        {user && (
          <button 
            onClick={onLogout}
            className="text-sm font-medium text-red-500 hover:text-red-600 transition-colors"
          >
            {lang === Language.VI ? 'Thoát' : 'Logout'}
          </button>
        )}

        {/* Brand Logo - Preserved Aspect Ratio & Color */}
        <div className="ml-2">
          <img 
            src="https://picsum.photos/id/191/100/100" 
            alt="Company Logo" 
            className="h-10 w-auto object-contain"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
