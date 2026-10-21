import React, { useState } from 'react';
import {
  GraduationCap,
  Users,
  Sparkles,
  PlusCircle,
  FileCheck,
  BarChart3,
  Search,
  CheckCircle2,
  AlertCircle,
  Printer,
  Calendar,
  Send,
  Edit3,
  Clock,
  BookOpen
} from 'lucide-react';
import { STUDENTS_MOCK, TEACHER_ASSIGNMENTS, TEACHER_INFO } from '../data/mockData';
import { Student, TeacherAssignment } from '../types';
import { generateLessonQuizAI, generateTeacherCommentsAI } from '../services/geminiClient';
import confetti from 'canvas-confetti';

export const TeacherView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'students' | 'creator' | 'assign' | 'analytics' | 'comments'>('students');

  // Student management state
  const [studentsList, setStudentsList] = useState<Student[]>(STUDENTS_MOCK);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState<'all' | 'high' | 'medium'>('all');

  // AI Quiz Creator state
  const [creatorSubject, setCreatorSubject] = useState<'Toán' | 'Tiếng Việt'>('Toán');
  const [creatorTopic, setCreatorTopic] = useState('Bảng nhân 8 và giải toán có lời văn');
  const [creatorQuestionCount, setCreatorQuestionCount] = useState(3);
  const [creatorTier, setCreatorTier] = useState('Vận dụng (Mức 3 GDPT 2018)');
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false);
  const [generatedDraft, setGeneratedDraft] = useState<string>('');
  const [isDraftApproved, setIsDraftApproved] = useState(false);

  // Assignment Dispatcher state
  const [assignments, setAssignments] = useState<TeacherAssignment[]>(TEACHER_ASSIGNMENTS);
  const [newAssignTitle, setNewAssignTitle] = useState('');
  const [newAssignGroup, setNewAssignGroup] = useState<'all' | 'need_help' | 'gifted'>('all');
  const [newAssignDeadline, setNewAssignDeadline] = useState('28/10/2026');

  // Circular 27 Evaluation comments state
  const [selectedStudentForComment, setSelectedStudentForComment] = useState<Student>(STUDENTS_MOCK[0]);
  const [isGeneratingComment, setIsGeneratingComment] = useState(false);
  const [suggestedComment, setSuggestedComment] = useState('');
  const [confirmedComment, setConfirmedComment] = useState(STUDENTS_MOCK[0].circular27Note || '');

  // Filter students
  const filteredStudents = studentsList.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase());
    if (filterLevel === 'high') return matchesSearch && s.accuracyRate >= 90;
    if (filterLevel === 'medium') return matchesSearch && s.accuracyRate < 90;
    return matchesSearch;
  });

  // Action: Generate AI Quiz
  const handleGenerateAIQuiz = async () => {
    setIsGeneratingQuiz(true);
    setIsDraftApproved(false);
    const res = await generateLessonQuizAI(
      creatorSubject,
      creatorTopic,
      creatorQuestionCount,
      creatorTier
    );
    setGeneratedDraft(res.text);
    setIsGeneratingQuiz(false);
  };

  // Action: Approve & Dispatch Quiz
  const handleApproveDraft = () => {
    setIsDraftApproved(true);
    const newAsg: TeacherAssignment = {
      id: `asg_${Date.now()}`,
      title: `${creatorSubject}: ${creatorTopic}`,
      subject: creatorSubject,
      targetGroup: 'all',
      deadline: '30/10/2026',
      assignedCount: 10,
      completedCount: 0,
      notes: `Học liệu AI đề xuất đã qua cô giáo Lê Phương Uyên kiểm duyệt chuẩn GDPT 2018.`
    };
    setAssignments([newAsg, ...assignments]);
    confetti({ particleCount: 50, spread: 60 });
  };

  // Action: Generate Circular 27 Note
  const handleGenerateCommentAI = async () => {
    setIsGeneratingComment(true);
    const res = await generateTeacherCommentsAI(
      selectedStudentForComment.name,
      selectedStudentForComment.strengths,
      selectedStudentForComment.needsImprovement,
      selectedStudentForComment.accuracyRate
    );
    setSuggestedComment(res.text);
    setConfirmedComment(res.text);
    setIsGeneratingComment(false);
  };

  const handleSaveConfirmedComment = () => {
    setStudentsList((prev) =>
      prev.map((s) =>
        s.id === selectedStudentForComment.id
          ? { ...s, circular27Note: confirmedComment, isConfirmedNote: true }
          : s
      )
    );
    alert(`Đã lưu nhận xét chính thức cho em ${selectedStudentForComment.name}!`);
  };

  const handlePrintReport = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Teacher Top Banner */}
      <div className="bg-gradient-to-r from-indigo-700 via-blue-700 to-indigo-900 rounded-3xl p-6 md:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border-4 border-white/20">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-black uppercase tracking-wider backdrop-blur-sm">
            <GraduationCap className="w-4 h-4 text-yellow-300" />
            <span>Không gian Sư phạm Số – Cô Lê Phương Uyên</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black font-display">
            Góc Quản Trị & Học Liệu Lớp 3B
          </h2>
          <p className="text-indigo-100 text-xs md:text-sm font-medium">
            {TEACHER_INFO.school} • Đánh giá theo Thông tư 27/2020/TT-BGDĐT
          </p>
        </div>

        {/* 5 Tab Switches */}
        <div className="flex flex-wrap items-center gap-1.5 bg-white/10 backdrop-blur-md p-1.5 rounded-2xl border border-white/20">
          <button
            onClick={() => setActiveTab('students')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'students' ? 'bg-white text-indigo-950 shadow-md' : 'text-white hover:bg-white/20'
            }`}
          >
            👥 Học sinh
          </button>
          <button
            onClick={() => setActiveTab('creator')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'creator' ? 'bg-white text-indigo-950 shadow-md' : 'text-white hover:bg-white/20'
            }`}
          >
            ✨ AI tạo học liệu
          </button>
          <button
            onClick={() => setActiveTab('assign')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'assign' ? 'bg-white text-indigo-950 shadow-md' : 'text-white hover:bg-white/20'
            }`}
          >
            📋 Giao nhiệm vụ
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'analytics' ? 'bg-white text-indigo-950 shadow-md' : 'text-white hover:bg-white/20'
            }`}
          >
            📊 Thống kê tiến bộ
          </button>
          <button
            onClick={() => setActiveTab('comments')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'comments' ? 'bg-white text-indigo-950 shadow-md' : 'text-white hover:bg-white/20'
            }`}
          >
            ✍️ Nhận xét TT27
          </button>
        </div>
      </div>

      {/* TAB 1: QUẢN LÝ HỌC SINH */}
      {activeTab === 'students' && (
        <div className="bg-white rounded-3xl p-6 md:p-8 border-2 border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="w-full sm:w-72 relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Tìm kiếm học sinh..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs font-bold focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500">Lọc theo kết quả:</span>
              <button
                onClick={() => setFilterLevel('all')}
                className={`px-3 py-1 rounded-lg text-xs font-bold ${
                  filterLevel === 'all' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                Tất cả (10)
              </button>
              <button
                onClick={() => setFilterLevel('high')}
                className={`px-3 py-1 rounded-lg text-xs font-bold ${
                  filterLevel === 'high' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                ≥ 90% (5)
              </button>
              <button
                onClick={() => setFilterLevel('medium')}
                className={`px-3 py-1 rounded-lg text-xs font-bold ${
                  filterLevel === 'medium' ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                Cần củng cố (5)
              </button>
            </div>
          </div>

          {/* Student Table */}
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-extrabold border-b border-slate-200">
                <tr>
                  <th className="p-3">Học sinh</th>
                  <th className="p-3">Số bài hoàn thành</th>
                  <th className="p-3">Độ chính xác</th>
                  <th className="p-3">Huy hiệu</th>
                  <th className="p-3">Hoạt động gần nhất</th>
                  <th className="p-3 text-right">Nhận xét TT27</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-bold text-slate-700">
                {filteredStudents.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3 flex items-center gap-2.5">
                      <span className="text-xl">{s.avatar}</span>
                      <div>
                        <span className="font-extrabold text-slate-900 block">{s.name}</span>
                        <span className="text-[10px] text-slate-400">Lớp {s.class}</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md font-extrabold">
                        {s.completedTasks} / {s.totalQuizzes} bài
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-slate-100 rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-full ${
                              s.accuracyRate >= 90 ? 'bg-emerald-500' : 'bg-amber-500'
                            }`}
                            style={{ width: `${s.accuracyRate}%` }}
                          />
                        </div>
                        <span className="font-black text-slate-800">{s.accuracyRate}%</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <span className="bg-purple-50 text-purple-700 px-2 py-0.5 rounded-md">
                        {s.badges.length} huy hiệu
                      </span>
                    </td>
                    <td className="p-3 text-slate-500 max-w-xs truncate">
                      {s.recentActivity}
                    </td>
                    <td className="p-3 text-right">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                          s.isConfirmedNote
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {s.isConfirmedNote ? '✓ Đã duyệt' : 'Chưa duyệt'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: AI TẠO HỌC LIỆU THÔNG MINH */}
      {activeTab === 'creator' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Form input */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 border-2 border-indigo-100 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              <h3 className="font-extrabold text-slate-800 text-base font-display">
                Cấu Hình Đề Xuất Học Liệu
              </h3>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 block mb-1">Môn học:</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setCreatorSubject('Toán')}
                  className={`py-2 rounded-xl text-xs font-black border ${
                    creatorSubject === 'Toán' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-slate-50 text-slate-700'
                  }`}
                >
                  📐 Toán lớp 3
                </button>
                <button
                  onClick={() => setCreatorSubject('Tiếng Việt')}
                  className={`py-2 rounded-xl text-xs font-black border ${
                    creatorSubject === 'Tiếng Việt' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-slate-50 text-slate-700'
                  }`}
                >
                  📖 Tiếng Việt lớp 3
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 block mb-1">Chủ đề bài học:</label>
              <input
                type="text"
                value={creatorTopic}
                onChange={(e) => setCreatorTopic(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 block mb-1">Mức độ nhận thức:</label>
              <select
                value={creatorTier}
                onChange={(e) => setCreatorTier(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option value="Nhận biết (Mức 1 GDPT 2018)">Nhận biết (Mức 1 GDPT 2018)</option>
                <option value="Thông hiểu (Mức 2 GDPT 2018)">Thông hiểu (Mức 2 GDPT 2018)</option>
                <option value="Vận dụng (Mức 3 GDPT 2018)">Vận dụng (Mức 3 GDPT 2018)</option>
                <option value="Vận dụng sáng tạo (Mức 4)">Vận dụng sáng tạo (Mức 4)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 block mb-1">
                Số lượng câu hỏi đề xuất ({creatorQuestionCount}):
              </label>
              <input
                type="range"
                min={2}
                max={5}
                value={creatorQuestionCount}
                onChange={(e) => setCreatorQuestionCount(Number(e.target.value))}
                className="w-full accent-indigo-600"
              />
            </div>

            <button
              onClick={handleGenerateAIQuiz}
              disabled={isGeneratingQuiz}
              className="btn-3d w-full py-3 rounded-2xl font-black text-sm text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span>{isGeneratingQuiz ? 'Bé AI đang biên soạn...' : 'AI Tạo Học Liệu Ngay'}</span>
            </button>
          </div>

          {/* Draft Preview & Teacher Approval */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-extrabold text-slate-800 text-base font-display">
                Bản Thảo Đề Xuất (Cô Uyên Phê Duyệt Trước Khi Giao)
              </h3>
              {isDraftApproved && (
                <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  ✓ Đã duyệt & Giao bài
                </span>
              )}
            </div>

            {generatedDraft ? (
              <div className="space-y-4">
                <textarea
                  rows={12}
                  value={generatedDraft}
                  onChange={(e) => setGeneratedDraft(e.target.value)}
                  className="w-full p-4 rounded-2xl border border-slate-200 bg-slate-50 text-xs font-mono leading-relaxed focus:outline-none focus:border-indigo-500"
                />

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleApproveDraft}
                    disabled={isDraftApproved}
                    className={`btn-3d flex-1 py-3 rounded-2xl font-black text-xs md:text-sm text-white shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                      isDraftApproved ? 'bg-slate-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{isDraftApproved ? 'Đã giao tới Lớp 3B' : 'Phê duyệt & Giao bài cho học sinh'}</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-12 text-center text-slate-400 text-xs font-bold space-y-2">
                <Sparkles className="w-8 h-8 mx-auto text-indigo-300" />
                <p>Nhấn nút "AI Tạo Học Liệu Ngay" ở khung bên trái để nhận đề cương trắc nghiệm/tự luận theo chuẩn GDPT 2018.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: GIAO NHIỆM VỤ HỌC TẬP */}
      {activeTab === 'assign' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm">
            <h3 className="font-extrabold text-slate-800 text-base font-display mb-4">
              Danh Sách Nhiệm Vụ Đang Triển Khai Tại Lớp 3B
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {assignments.map((asg) => (
                <div key={asg.id} className="p-5 rounded-2xl border-2 border-slate-100 bg-slate-50/70 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200">
                      {asg.subject}
                    </span>
                    <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      Hạn: {asg.deadline}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-black text-slate-900 text-sm font-display">{asg.title}</h4>
                    <p className="text-xs text-slate-500 mt-1">{asg.notes}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-600">
                      Tiến độ hoàn thành:
                    </span>
                    <span className="text-indigo-600 font-extrabold">
                      {asg.completedCount} / {asg.assignedCount} học sinh
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: THỐNG KÊ TIẾN BỘ */}
      {activeTab === 'analytics' && (
        <div className="bg-white rounded-3xl p-6 md:p-8 border-2 border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-extrabold text-slate-800 text-lg font-display">
                Báo Cáo Phân Tích Tổng Quan Lớp 3B
              </h3>
              <p className="text-xs text-slate-500">
                Dữ liệu thực nghiệm thu thập từ quá trình học sinh rèn luyện
              </p>
            </div>
            <button
              onClick={handlePrintReport}
              className="btn-3d text-xs font-bold px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>In báo cáo</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-emerald-50/70 p-5 rounded-2xl border border-emerald-200 text-center space-y-1">
              <span className="text-3xl font-black text-emerald-600 font-display">86.3%</span>
              <span className="text-xs font-bold text-emerald-900 block">Độ chính xác trung bình môn Toán</span>
              <p className="text-[11px] text-slate-500 mt-1">Tăng 22.3% so với trước khi dùng AI</p>
            </div>

            <div className="bg-blue-50/70 p-5 rounded-2xl border border-blue-200 text-center space-y-1">
              <span className="text-3xl font-black text-blue-600 font-display">91.0%</span>
              <span className="text-xs font-bold text-blue-900 block">Tỉ lệ hoàn thành bài đọc hiểu</span>
              <p className="text-[11px] text-slate-500 mt-1">Nhờ có giọng đọc truyền cảm và giải nghĩa từ</p>
            </div>

            <div className="bg-purple-50/70 p-5 rounded-2xl border border-purple-200 text-center space-y-1">
              <span className="text-3xl font-black text-purple-600 font-display">18/20</span>
              <span className="text-xs font-bold text-purple-900 block">Học sinh tự sáng tác câu chuyện</span>
              <p className="text-[11px] text-slate-500 mt-1">Phát triển năng lực ngôn ngữ và thẩm mỹ</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: NHẬN XÉT HỌC SINH THÔNG TƯ 27 */}
      {activeTab === 'comments' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 border-2 border-indigo-100 shadow-sm space-y-4">
            <h3 className="font-extrabold text-slate-800 text-base font-display pb-2 border-b border-slate-100">
              Chọn Học Sinh Cần Đánh Giá (Lớp 3B)
            </h3>

            <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
              {studentsList.map((st) => (
                <button
                  key={st.id}
                  onClick={() => {
                    setSelectedStudentForComment(st);
                    setConfirmedComment(st.circular27Note || '');
                    setSuggestedComment('');
                  }}
                  className={`w-full p-3 rounded-2xl text-left border flex items-center justify-between transition-all cursor-pointer ${
                    selectedStudentForComment.id === st.id
                      ? 'bg-indigo-50 border-indigo-500 ring-2 ring-indigo-200'
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">{st.avatar}</span>
                    <div>
                      <span className="text-xs font-extrabold text-slate-900 block">{st.name}</span>
                      <span className="text-[10px] text-slate-400">Chính xác: {st.accuracyRate}%</span>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    st.isConfirmedNote ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {st.isConfirmedNote ? 'Đã có nhận xét' : 'Chưa có'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <h3 className="font-extrabold text-slate-800 text-base font-display">
                  Soạn Lời Nhận Xét Chuẩn Thông Tư 27
                </h3>
                <span className="text-xs text-indigo-600 font-bold">
                  Học sinh: {selectedStudentForComment.name}
                </span>
              </div>

              <button
                onClick={handleGenerateCommentAI}
                disabled={isGeneratingComment}
                className="btn-3d text-xs font-black bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-4 py-2 rounded-xl shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                <span>{isGeneratingComment ? 'Đang tạo...' : 'AI Gợi Ý Nhận Xét'}</span>
              </button>
            </div>

            {suggestedComment && (
              <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 text-xs">
                <span className="font-black text-amber-900 block mb-1">
                  💡 Gợi ý sư phạm của Bé AI (Cô giáo kiểm tra và chỉnh sửa):
                </span>
                <p className="text-slate-700 font-medium leading-relaxed italic">{suggestedComment}</p>
              </div>
            )}

            <div>
              <label className="text-xs font-extrabold text-slate-700 block mb-1">
                Lời nhận xét chính thức của Cô Lê Phương Uyên:
              </label>
              <textarea
                rows={4}
                value={confirmedComment}
                onChange={(e) => setConfirmedComment(e.target.value)}
                placeholder="Nhập lời nhận xét khích lệ, cụ thể theo Thông tư 27..."
                className="w-full p-3.5 rounded-2xl border-2 border-slate-200 text-xs md:text-sm font-semibold focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                onClick={handleSaveConfirmedComment}
                className="btn-3d bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs md:text-sm px-5 py-2.5 rounded-xl shadow-md flex items-center gap-2 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Lưu & Xác nhận vào Học bạ</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
