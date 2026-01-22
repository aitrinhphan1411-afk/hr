
import React, { useState } from 'react';
import { Language, TranslationSchema, Employee } from '../types.ts';
import { supabaseService } from '../services/supabase.ts';

interface LoginProps {
  lang: Language;
  t: TranslationSchema;
  onLogin: (user: Employee) => void;
}

const Login: React.FC<LoginProps> = ({ lang, t, onLogin }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const user = await supabaseService.login(email);
      if (user) {
        onLogin(user);
      } else {
        setError(lang === Language.VI 
          ? 'Email không tồn tại trong hệ thống nội bộ.' 
          : 'Email not found in internal system.');
      }
    } catch (err) {
      setError('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 h-[calc(100vh-10rem)] flex items-center">
      <div className="grid md:grid-cols-2 gap-12 items-center w-full">
        {/* Left Side: Trust & Illustration */}
        <div className="hidden md:block fade-in">
          <h2 className="text-4xl font-bold text-gray-800 mb-6 leading-tight">
            {lang === Language.VI ? 'Tiếng nói của bạn thay đổi văn hóa của chúng ta' : 'Your voice shapes our culture'}
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-md">
            {t.login.description}
          </p>
          <div className="bg-[#4ddcff]/10 p-6 rounded-2xl border border-[#4ddcff]/20">
            <div className="flex items-center gap-4 text-[#00a8cc]">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="font-medium">{t.login.trustNote}</span>
            </div>
          </div>
        </div>

        {/* Right Side: Login Card */}
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 fade-in">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{t.login.title}</h3>
            <p className="text-gray-500 md:hidden">{t.login.description}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input 
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.login.emailPlaceholder}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#4ddcff] focus:border-transparent outline-none transition-all"
              />
            </div>
            
            {error && (
              <p className="text-red-500 text-sm font-medium">{error}</p>
            )}

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-[#4ddcff] text-white font-bold py-4 rounded-xl hover:bg-[#3ec3e6] disabled:opacity-50 transition-colors shadow-lg shadow-[#4ddcff]/20"
            >
              {loading ? (lang === Language.VI ? 'Đang xử lý...' : 'Processing...') : t.login.submit}
            </button>
          </form>

          <p className="mt-8 text-center text-xs text-gray-400">
            {lang === Language.VI ? 'Chỉ dành cho nhân viên chính thức' : 'Internal use only'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
