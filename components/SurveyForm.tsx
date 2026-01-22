
import React, { useState, useEffect } from 'react';
import { Language, TranslationSchema, Employee } from '../types.ts';
import { supabaseService } from '../services/supabase.ts';

interface SurveyFormProps {
  lang: Language;
  t: TranslationSchema;
  user: Employee;
  onSubmitSuccess: () => void;
}

const SurveyForm: React.FC<SurveyFormProps> = ({ lang, t, user, onSubmitSuccess }) => {
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkStatus = async () => {
      const duplicate = await supabaseService.checkDuplicateSubmission(user.email, 'bday-survey-2024');
      setIsDuplicate(duplicate);
      setLoading(false);
    };
    checkStatus();
  }, [user.email]);

  const handleRatingChange = (qId: string, value: number) => {
    setAnswers(prev => ({ ...prev, [qId]: value }));
  };

  const handleTextChange = (qId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [qId]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isDuplicate) return;

    setSubmitting(true);
    const success = await supabaseService.submitResponse({
      email: user.email,
      survey_id: 'bday-survey-2024',
      answers
    });

    if (success) {
      onSubmitSuccess();
    } else {
      alert('Error submitting response. Please try again.');
      setSubmitting(false);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading survey...</div>;

  if (isDuplicate) {
    return (
      <div className="max-w-2xl mx-auto p-8 text-center mt-12 bg-white rounded-3xl shadow-sm border border-gray-100 fade-in">
        <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-4">{t.survey.duplicate}</h2>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 fade-in">
      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">{t.survey.title}</h2>
        <p className="text-gray-500 mb-10">
          {lang === Language.VI 
            ? `Chào ${user.name}, hãy chia sẻ cảm nghĩ của bạn về sự kiện sinh nhật vừa qua.` 
            : `Hello ${user.name}, please share your thoughts on the recent birthday event.`}
        </p>

        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Question 1: Rating */}
          <div className="space-y-4">
            <label className="block text-lg font-semibold text-gray-800">
              1. {lang === Language.VI ? 'Bạn cảm thấy thế nào về bầu không khí của buổi tiệc?' : 'How did you feel about the party atmosphere?'}
            </label>
            <div className="flex justify-between max-w-md">
              {[1, 2, 3, 4, 5].map(v => (
                <button
                  key={v}
                  type="button"
                  onClick={() => handleRatingChange('q1', v)}
                  className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-bold transition-all ${
                    answers['q1'] === v ? 'border-[#4ddcff] bg-[#4ddcff] text-white' : 'border-gray-200 text-gray-400 hover:border-[#4ddcff]'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
            <div className="flex justify-between max-w-md text-xs text-gray-400 uppercase tracking-widest px-1">
              <span>{lang === Language.VI ? 'Tệ' : 'Bad'}</span>
              <span>{lang === Language.VI ? 'Tuyệt vời' : 'Excellent'}</span>
            </div>
          </div>

          {/* Question 2: Open-ended */}
          <div className="space-y-4">
            <label className="block text-lg font-semibold text-gray-800">
              2. {lang === Language.VI ? 'Điều gì làm bạn ấn tượng nhất?' : 'What impressed you the most?'}
              <span className="ml-2 text-sm text-gray-400 font-normal">{t.survey.optional}</span>
            </label>
            <textarea 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#4ddcff] focus:border-transparent outline-none h-32"
              placeholder={lang === Language.VI ? 'Nhập ý kiến của bạn...' : 'Your comments...'}
              value={answers['q2'] || ''}
              onChange={(e) => handleTextChange('q2', e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={submitting || !answers['q1']}
            className="w-full bg-[#4ddcff] text-white font-bold py-4 rounded-xl hover:bg-[#3ec3e6] disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-lg shadow-[#4ddcff]/20"
          >
            {submitting ? t.survey.submitting : t.survey.submit}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SurveyForm;
