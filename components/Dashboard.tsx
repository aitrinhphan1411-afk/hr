
import React, { useEffect, useState, useMemo } from 'react';
import { Language, TranslationSchema, Employee, SurveyResponse, DashboardMetrics } from '../types';
import { supabaseService } from '../services/supabase';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface DashboardProps {
  lang: Language;
  t: TranslationSchema;
  user: Employee;
}

const COLORS = ['#4ddcff', '#00a8cc', '#ffcc00', '#ff6666', '#aaddaa'];

const Dashboard: React.FC<DashboardProps> = ({ lang, t, user }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<DashboardMetrics | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      const responses = await supabaseService.getAllResponses();
      const employees = await supabaseService.getAllEmployees();

      const totalEmployees = employees.length;
      const totalParticipants = responses.length;
      
      // Breakdown by Dept
      const deptCounts: Record<string, number> = {};
      responses.forEach(r => {
        const dept = r.employee?.department || 'Unknown';
        deptCounts[dept] = (deptCounts[dept] || 0) + 1;
      });

      // Breakdown by Level
      const levelCounts: Record<string, number> = {};
      responses.forEach(r => {
        const level = r.employee?.level || 'Unknown';
        levelCounts[level] = (levelCounts[level] || 0) + 1;
      });

      // Engagement Score (avg of q1 rating)
      const scores = responses.map(r => r.answers['q1']).filter(v => typeof v === 'number');
      const engagementScore = scores.length > 0 ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : 0;

      // Non participants
      const participantsEmails = new Set(responses.map(r => r.email));
      const nonParticipants = employees.filter(e => !participantsEmails.has(e.email));

      // Feedback (only show if > 3 responses to maintain anonymity as per HR policy)
      const feedbacks = responses
        .map(r => r.answers['q2'])
        .filter(f => f && f.length > 0);

      setData({
        totalParticipants,
        participationRate: totalEmployees > 0 ? Math.round((totalParticipants / totalEmployees) * 100) : 0,
        engagementScore: Number(engagementScore),
        departmentBreakdown: deptCounts,
        levelBreakdown: levelCounts,
        monthlyTrend: [
          { month: 'Jan', count: 0 },
          { month: 'Feb', count: 0 },
          { month: 'Mar', count: totalParticipants } // Mock trend
        ],
        anonymizedFeedback: feedbacks.length >= 3 ? feedbacks : [],
        nonParticipants
      });
      setLoading(false);
    };

    fetchDashboardData();
  }, []);

  const deptChartData = useMemo(() => {
    if (!data) return [];
    return Object.entries(data.departmentBreakdown).map(([name, value]) => ({ name, value }));
  }, [data]);

  const levelChartData = useMemo(() => {
    if (!data) return [];
    return Object.entries(data.levelBreakdown).map(([name, value]) => ({ name, value }));
  }, [data]);

  if (loading) return <div className="p-8 text-center">Loading analytics...</div>;
  if (!data) return <div className="p-8 text-center">No data available.</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 fade-in space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">{t.admin.dashboard}</h2>
          <p className="text-gray-500">{lang === Language.VI ? 'Dữ liệu thời gian thực từ khảo sát sự kiện' : 'Real-time event survey metrics'}</p>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <p className="text-sm font-medium text-gray-400 mb-1">{lang === Language.VI ? 'Tổng người tham gia' : 'Total Participants'}</p>
          <p className="text-4xl font-bold text-gray-900">{data.totalParticipants}</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <p className="text-sm font-medium text-gray-400 mb-1">{t.admin.participation}</p>
          <div className="flex items-end gap-2">
            <p className="text-4xl font-bold text-gray-900">{data.participationRate}%</p>
          </div>
        </div>
        <div className="bg-[#4ddcff]/10 p-6 rounded-3xl border border-[#4ddcff]/20">
          <p className="text-sm font-medium text-[#00a8cc] mb-1">{t.admin.engagement}</p>
          <p className="text-4xl font-bold text-[#00a8cc]">{data.engagementScore}/5.0</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <p className="text-sm font-medium text-gray-400 mb-1">{lang === Language.VI ? 'Ưu tiên cải thiện' : 'Improvement Priority'}</p>
          <p className="text-xl font-bold text-orange-500 uppercase tracking-wide">
            {data.engagementScore < 3 ? 'High' : (data.engagementScore < 4 ? 'Medium' : 'Low')}
          </p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm h-[400px]">
          <h3 className="text-lg font-bold mb-6">{lang === Language.VI ? 'Tham gia theo Phòng ban' : 'Participation by Department'}</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={deptChartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip cursor={{ fill: '#f9f9f9' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }} />
              <Bar dataKey="value" fill="#4ddcff" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm h-[400px]">
          <h3 className="text-lg font-bold mb-6">{lang === Language.VI ? 'Cơ cấu theo Cấp bậc' : 'Breakdown by Level'}</h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={levelChartData}
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {levelChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Feedback & Non-participants */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Anonymized Feedback */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold mb-6">{t.admin.anonymizedTitle}</h3>
          {data.anonymizedFeedback.length > 0 ? (
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
              {data.anonymizedFeedback.map((f, i) => (
                <div key={i} className="p-4 bg-gray-50 rounded-2xl italic text-gray-600 border-l-4 border-[#4ddcff]">
                  "{f}"
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-400 py-10 text-center">
              {lang === Language.VI 
                ? 'Không có phản hồi nào (hoặc quá ít để đảm bảo tính ẩn danh).' 
                : 'No feedback available (or too few for anonymity).'}
            </div>
          )}
        </div>

        {/* Non-participants List */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold mb-6">{t.admin.nonParticipantsTitle}</h3>
          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
            {data.nonParticipants.length > 0 ? (
              data.nonParticipants.map((emp, i) => (
                <div key={i} className="flex items-center justify-between p-3 border-b border-gray-50 last:border-0">
                  <div className="flex flex-col">
                    <span className="font-semibold text-gray-800">{emp.name}</span>
                    <span className="text-xs text-gray-400">{emp.email}</span>
                  </div>
                  <span className="text-xs font-medium px-2 py-1 bg-gray-100 rounded-full text-gray-500 uppercase">
                    {emp.department}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-green-500 font-medium py-10 text-center">
                {lang === Language.VI ? 'Tất cả nhân viên đã tham gia!' : 'All employees have participated!'}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
