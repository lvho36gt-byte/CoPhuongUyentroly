import React, { useState } from 'react';
import {
  Award,
  Star,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  BookOpen,
  Calculator,
  Compass,
  Zap,
  Info
} from 'lucide-react';
import { BADGES, STUDENTS_MOCK } from '../data/mockData';
import { Student } from '../types';
import confetti from 'canvas-confetti';

interface ProgressViewProps {
  currentStudent?: Student;
  onNavigateToLesson?: (tabId: string) => void;
}

export const ProgressView: React.FC<ProgressViewProps> = ({
  currentStudent = STUDENTS_MOCK[0],
  onNavigateToLesson
}) => {
  const [selectedStudent, setSelectedStudent] = useState<Student>(currentStudent);
  const [selectedBadge, setSelectedBadge] = useState<string | null>(null);

  const handleInspectBadge = (badgeId: string) => {
    setSelectedBadge(badgeId);
    if (selectedStudent.badges.includes(badgeId)) {
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.6 }
      });
    }
  };

  const getSkillBar = (label: string, value: number, color: string) => (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs font-bold">
        <span className="text-slate-700">{label}</span>
        <span className="font-extrabold text-slate-900">{value}%</span>
      </div>
      <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden p-0.5 border border-slate-200">
        <div
          className={`h-full rounded-full transition-all duration-700 ${color}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Student Profile Overview Card */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden border-4 border-white/20">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-md border-2 border-white/40 flex items-center justify-center text-4xl shadow-inner">
              {selectedStudent.avatar}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl md:text-3xl font-black font-display">
                  {selectedStudent.name}
                </h2>
                <span className="bg-yellow-400 text-slate-900 text-xs font-black px-2.5 py-0.5 rounded-full shadow-xs">
                  Lớp {selectedStudent.class}
                </span>
              </div>
              <p className="text-sky-100 text-xs md:text-sm font-semibold mt-1">
                Trường Tiểu học Khoái Châu 1 • GVCN: Cô Lê Phương Uyên
              </p>
              <div className="mt-2 flex items-center gap-3 text-xs font-bold text-yellow-200">
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-300 text-yellow-300" />
                  {selectedStudent.stars} Ngôi sao tích lũy
                </span>
                <span>•</span>
                <span>{selectedStudent.badges.length}/6 Huy hiệu đạt được</span>
              </div>
            </div>
          </div>

          {/* Student Switcher for Demo testing */}
          <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20 text-xs font-bold">
            <span className="block text-sky-200 text-[11px] mb-1">
              Xem hồ sơ học sinh khác trong lớp 3B:
            </span>
            <select
              value={selectedStudent.id}
              onChange={(e) => {
                const found = STUDENTS_MOCK.find((s) => s.id === e.target.value);
                if (found) setSelectedStudent(found);
              }}
              className="bg-white text-slate-800 px-3 py-1.5 rounded-xl font-bold text-xs focus:outline-none cursor-pointer"
            >
              {STUDENTS_MOCK.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.avatar} {s.name} ({s.class})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 4 Metric Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border-2 border-blue-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-2xl font-black shrink-0">
            📚
          </div>
          <div>
            <span className="text-xs font-bold text-slate-400 block">Số bài đã học</span>
            <span className="text-2xl font-black text-slate-800 font-display">
              {selectedStudent.completedTasks} bài
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border-2 border-emerald-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-2xl font-black shrink-0">
            🎯
          </div>
          <div>
            <span className="text-xs font-bold text-slate-400 block">Nhiệm vụ hoàn thành</span>
            <span className="text-2xl font-black text-slate-800 font-display">
              {selectedStudent.totalQuizzes} câu
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border-2 border-amber-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-2xl font-black shrink-0">
            ⭐
          </div>
          <div>
            <span className="text-xs font-bold text-slate-400 block">Độ chính xác</span>
            <span className="text-2xl font-black text-emerald-600 font-display">
              {selectedStudent.accuracyRate}%
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border-2 border-purple-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center text-2xl font-black shrink-0">
            🏆
          </div>
          <div>
            <span className="text-xs font-bold text-slate-400 block">Huy hiệu đạt được</span>
            <span className="text-2xl font-black text-purple-600 font-display">
              {selectedStudent.badges.length} / 6
            </span>
          </div>
        </div>
      </div>

      {/* 2 Columns: Competency Radar / Progress Bars & Personalized Next Recommendation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: 5 Core Competencies Progress */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 md:p-8 border-2 border-sky-100 shadow-md space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-sky-600" />
              <h3 className="font-extrabold text-slate-800 text-lg font-display">
                Các Kỹ Năng Đang Tiến Bộ (GDPT 2018)
              </h3>
            </div>
            <span className="text-xs text-slate-400 font-bold">Đánh giá theo Thông tư 27</span>
          </div>

          <div className="space-y-4">
            {getSkillBar('Đọc hiểu & Cảm thụ văn học', selectedStudent.skills.reading, 'bg-gradient-to-r from-sky-400 to-blue-600')}
            {getSkillBar('Tính toán & Kỹ năng số học', selectedStudent.skills.math, 'bg-gradient-to-r from-emerald-400 to-teal-600')}
            {getSkillBar('Tư duy logic & Giải quyết vấn đề', selectedStudent.skills.logic, 'bg-gradient-to-r from-amber-400 to-orange-500')}
            {getSkillBar('Sáng tạo câu chuyện & Trực quan', selectedStudent.skills.creativity, 'bg-gradient-to-r from-pink-400 to-rose-500')}
            {getSkillBar('Tính kiên trì & Tự học', selectedStudent.skills.diligence, 'bg-gradient-to-r from-purple-400 to-indigo-600')}
          </div>

          {/* Strengths & Improvement Points */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200">
              <span className="text-xs font-black uppercase text-emerald-800 block mb-2">
                🌟 Điểm mạnh nổi bật:
              </span>
              <ul className="space-y-1 text-xs font-bold text-slate-700">
                {selectedStudent.strengths.map((str, sIdx) => (
                  <li key={sIdx} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-blue-50/70 p-4 rounded-2xl border border-blue-200">
              <span className="text-xs font-black uppercase text-blue-800 block mb-2">
                🌱 Nội dung cần củng cố:
              </span>
              <ul className="space-y-1 text-xs font-bold text-slate-700">
                {selectedStudent.needsImprovement.map((imp, iIdx) => (
                  <li key={iIdx} className="flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>{imp}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right: Personalized AI Next Recommendation */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 md:p-8 border-2 border-amber-100 shadow-md space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <h3 className="font-extrabold text-slate-800 text-lg font-display">
              Bé AI Đề Xuất Bài Học Tiếp Theo
            </h3>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-5 border-2 border-amber-200 space-y-3">
            <span className="text-xs font-black uppercase text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-md inline-block">
              Cá nhân hóa theo kết quả học
            </span>
            <p className="text-sm font-extrabold text-slate-800 leading-relaxed">
              “Em {selectedStudent.name} ơi! Em đã làm rất tốt các bài tính toán nhẩm. Để tiến bộ hơn nữa, em hãy thử luyện thêm 5 câu chia đều và bài toán có lời văn cùng Bé AI nhé!”
            </p>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => onNavigateToLesson && onNavigateToLesson('math')}
                className="btn-3d w-full py-2.5 px-4 rounded-xl font-black text-xs text-white bg-amber-500 hover:bg-amber-600 shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calculator className="w-4 h-4" />
                <span>Luyện tập Toán tư duy ngay</span>
              </button>

              <button
                onClick={() => onNavigateToLesson && onNavigateToLesson('reading')}
                className="btn-3d w-full py-2.5 px-4 rounded-xl font-black text-xs text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span>Đọc bài mới: Bó hoa tặng cô</span>
              </button>
            </div>
          </div>

          {/* Teacher Official Note under Circular 27 */}
          {selectedStudent.circular27Note && (
            <div className="bg-indigo-50/70 p-4 rounded-2xl border border-indigo-200 space-y-1.5">
              <span className="text-xs font-black uppercase text-indigo-900 block">
                👩‍🏫 Lời nhận xét của Cô giáo Lê Phương Uyên:
              </span>
              <p className="text-xs font-bold text-slate-700 italic leading-relaxed">
                "{selectedStudent.circular27Note}"
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 6 Badges Showcase (Hệ thống vinh danh) */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border-2 border-purple-100 shadow-md space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-xl md:text-2xl font-black text-slate-800 font-display flex items-center gap-2">
              <span>Hệ Thống 6 Huy Hiệu Vinh Danh</span>
              <span className="text-xs bg-purple-100 text-purple-700 font-black px-2.5 py-0.5 rounded-full">
                Khen ngợi nỗ lực cá nhân
              </span>
            </h3>
            <p className="text-xs md:text-sm text-slate-500 mt-0.5">
              Nhấp vào huy hiệu để xem điều kiện và nhận pháo hoa chúc mừng!
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {BADGES.map((b) => {
            const isUnlocked = selectedStudent.badges.includes(b.id);
            return (
              <button
                key={b.id}
                onClick={() => handleInspectBadge(b.id)}
                className={`p-4 rounded-3xl text-center border-3 transition-all flex flex-col items-center justify-between cursor-pointer ${
                  isUnlocked
                    ? 'bg-gradient-to-b from-white to-purple-50/40 border-purple-400 shadow-md scale-102 hover:shadow-lg'
                    : 'bg-slate-50 border-slate-200 opacity-60 hover:opacity-80'
                }`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-2 shadow-sm ${
                  isUnlocked ? 'bg-gradient-to-tr ' + b.color + ' text-white animate-pulse-subtle' : 'bg-slate-200 grayscale'
                }`}>
                  {b.icon}
                </div>

                <div>
                  <h4 className={`font-black text-xs font-display ${isUnlocked ? 'text-slate-900' : 'text-slate-500'}`}>
                    {b.title}
                  </h4>
                  <span className={`text-[10px] font-bold mt-1 inline-block px-2 py-0.5 rounded-full ${
                    isUnlocked ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {isUnlocked ? 'Đã đạt được' : 'Chưa mở khóa'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Badge detail card if clicked */}
        {selectedBadge && (
          <div className="bg-purple-50 p-4 rounded-2xl border border-purple-200 flex items-center justify-between text-xs font-bold text-purple-950">
            <div className="flex items-center gap-3">
              <span className="text-2xl">
                {BADGES.find((b) => b.id === selectedBadge)?.icon}
              </span>
              <div>
                <strong className="block text-sm text-purple-900">
                  {BADGES.find((b) => b.id === selectedBadge)?.title}
                </strong>
                <span>
                  {BADGES.find((b) => b.id === selectedBadge)?.description}
                </span>
              </div>
            </div>
            <span className="bg-white px-3 py-1 rounded-xl text-purple-700 shadow-2xs">
              Tiêu chí: {BADGES.find((b) => b.id === selectedBadge)?.requirement}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
