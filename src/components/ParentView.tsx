import React, { useState } from 'react';
import {
  Users,
  Heart,
  Clock,
  Sparkles,
  Send,
  CheckCircle2,
  BookOpen,
  Award,
  MessageCircle,
  Lightbulb
} from 'lucide-react';
import { PARENT_ACTIVITIES, STUDENTS_MOCK, TEACHER_INFO } from '../data/mockData';
import { Student } from '../types';
import confetti from 'canvas-confetti';

export const ParentView: React.FC = () => {
  const [selectedChild, setSelectedChild] = useState<Student>(STUDENTS_MOCK[0]);
  const [encouragementMessage, setEncouragementMessage] = useState('Bố mẹ rất tự hào về con! Hãy tiếp tục chăm chỉ nhé!');
  const [isSentEncouragement, setIsSentEncouragement] = useState(false);
  const [teacherMessage, setTeacherMessage] = useState('');
  const [isSentTeacher, setIsSentTeacher] = useState(false);
  const [completedActivities, setCompletedActivities] = useState<Record<string, boolean>>({});

  const handleSendEncouragement = () => {
    if (!encouragementMessage.trim()) return;
    setIsSentEncouragement(true);
    confetti({ particleCount: 40, spread: 50, origin: { y: 0.6 } });
    setTimeout(() => setIsSentEncouragement(false), 4000);
  };

  const handleSendTeacherMessage = () => {
    if (!teacherMessage.trim()) return;
    setIsSentTeacher(true);
    setTeacherMessage('');
    setTimeout(() => setIsSentTeacher(false), 4000);
  };

  const toggleActivity = (id: string) => {
    setCompletedActivities((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="space-y-6">
      {/* Parent Welcome Banner */}
      <div className="bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-800 rounded-3xl p-6 md:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border-4 border-white/20">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-black uppercase tracking-wider backdrop-blur-sm">
            <Users className="w-4 h-4 text-yellow-300" />
            <span>Góc Kết Nối Phụ Huynh – Lớp 3B</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black font-display">
            Mỗi Ngày Cùng Con Tiến Bộ
          </h2>
          <p className="text-teal-100 text-xs md:text-sm font-medium max-w-xl">
            Đồng hành cùng bé {selectedChild.name} trong các hoạt động học tập 5–10 phút tại nhà. Kết nối chặt chẽ giữa gia đình và cô giáo {TEACHER_INFO.name}.
          </p>
        </div>

        {/* Child Selector (Simulating secure parent login view) */}
        <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20 text-xs font-bold">
          <span className="block text-teal-200 text-[11px] mb-1">
            Tài khoản con em đang theo dõi:
          </span>
          <select
            value={selectedChild.id}
            onChange={(e) => {
              const found = STUDENTS_MOCK.find((s) => s.id === e.target.value);
              if (found) setSelectedChild(found);
            }}
            className="bg-white text-slate-800 px-3 py-1.5 rounded-xl font-bold text-xs focus:outline-none cursor-pointer"
          >
            {STUDENTS_MOCK.map((s) => (
              <option key={s.id} value={s.id}>
                {s.avatar} {s.name} (Lớp {s.class})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Child Daily Progress Snapshot */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border-2 border-teal-100 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{selectedChild.avatar}</span>
            <div>
              <h3 className="text-xl font-black text-slate-900 font-display">
                Tiến Độ Học Tập Của Em {selectedChild.name}
              </h3>
              <p className="text-xs text-slate-500 font-semibold">
                Lớp 3B • GVCN: Cô Lê Phương Uyên
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-extrabold px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full border border-emerald-200">
              {selectedChild.stars} ⭐ Sao vàng
            </span>
            <span className="text-xs font-extrabold px-3 py-1 bg-teal-50 text-teal-800 rounded-full border border-teal-200">
              {selectedChild.completedTasks} Bài học
            </span>
          </div>
        </div>

        {/* Observation from teacher */}
        {selectedChild.circular27Note && (
          <div className="bg-teal-50/70 p-4 rounded-2xl border border-teal-200">
            <span className="text-xs font-black uppercase text-teal-900 block mb-1">
              👩‍🏫 Tin nhắn nhận xét từ Cô giáo Lê Phương Uyên:
            </span>
            <p className="text-xs md:text-sm font-bold text-slate-700 italic leading-relaxed">
              "{selectedChild.circular27Note}"
            </p>
          </div>
        )}
      </div>

      {/* 5-10 Minutes Daily Home Activities */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border-2 border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-50 text-amber-800 text-xs font-black uppercase tracking-wider border border-amber-200 mb-1">
              <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
              <span>Gợi ý sư phạm từ Bé AI</span>
            </div>
            <h3 className="text-xl font-black text-slate-800 font-display">
              Hoạt Động 5–10 Phút Mỗi Ngày Cùng Con
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PARENT_ACTIVITIES.map((act) => {
            const isDone = Boolean(completedActivities[act.id]);
            return (
              <div
                key={act.id}
                className={`p-5 rounded-2xl border-2 transition-all space-y-3 ${
                  isDone ? 'bg-emerald-50/60 border-emerald-300' : 'bg-slate-50/80 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-teal-800 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-teal-600" />
                    {act.durationMinutes} phút
                  </span>

                  <button
                    onClick={() => toggleActivity(act.id)}
                    className={`btn-3d text-xs font-extrabold px-3 py-1 rounded-xl flex items-center gap-1 cursor-pointer ${
                      isDone
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white text-slate-700 border border-slate-300'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{isDone ? 'Đã hoàn thành' : 'Đánh dấu xong'}</span>
                  </button>
                </div>

                <h4 className="font-black text-slate-900 text-base font-display">
                  {act.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {act.description}
                </p>

                <div className="bg-white p-3 rounded-xl border border-slate-200/80 text-xs text-slate-700 space-y-1">
                  <span className="font-extrabold text-teal-900 block">Hướng dẫn:</span>
                  {act.instructions.map((step, sIdx) => (
                    <div key={sIdx} className="flex items-start gap-1.5">
                      <span className="text-teal-600 font-bold">•</span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>

                <p className="text-[11px] text-amber-800 font-bold italic bg-amber-50 p-2 rounded-lg border border-amber-200">
                  💡 Lời khuyên Bé AI: {act.aiTip}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Two Interaction Boxes: Send Encouragement to Child & Message Teacher */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Send Encouragement to Child */}
        <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-3xl p-6 border-2 border-pink-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-pink-600 fill-pink-500" />
            <h3 className="font-extrabold text-slate-800 text-base font-display">
              Gửi Lời Động Viên Tới Bé {selectedChild.name}
            </h3>
          </div>
          <p className="text-xs text-slate-600 font-medium">
            Lời nhắn sẽ xuất hiện rực rỡ trên màn hình học tập của con!
          </p>

          <textarea
            rows={3}
            value={encouragementMessage}
            onChange={(e) => setEncouragementMessage(e.target.value)}
            className="w-full p-3 rounded-2xl border border-pink-200 bg-white text-xs md:text-sm font-semibold focus:outline-none focus:border-pink-500"
          />

          <button
            onClick={handleSendEncouragement}
            className="btn-3d w-full py-2.5 rounded-xl font-black text-xs md:text-sm text-white bg-pink-500 hover:bg-pink-600 shadow-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Gửi lời yêu thương tới con</span>
          </button>

          {isSentEncouragement && (
            <p className="text-xs font-bold text-pink-700 text-center animate-in fade-in">
              ❤️ Đã gửi lời động viên tới bé {selectedChild.name}!
            </p>
          )}
        </div>

        {/* Message to Teacher Uyên */}
        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-3xl p-6 border-2 border-indigo-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-indigo-600" />
            <h3 className="font-extrabold text-slate-800 text-base font-display">
              Gửi Phản Hồi Cho Cô Lê Phương Uyên
            </h3>
          </div>
          <p className="text-xs text-slate-600 font-medium">
            Trao đổi tình hình học tập và sức khỏe của con tại nhà.
          </p>

          <textarea
            rows={3}
            value={teacherMessage}
            onChange={(e) => setTeacherMessage(e.target.value)}
            placeholder="Kính gửi cô Uyên, gia đình xin gửi lời cảm ơn và trao đổi..."
            className="w-full p-3 rounded-2xl border border-indigo-200 bg-white text-xs md:text-sm font-semibold focus:outline-none focus:border-indigo-500"
          />

          <button
            onClick={handleSendTeacherMessage}
            className="btn-3d w-full py-2.5 rounded-xl font-black text-xs md:text-sm text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Gửi tin nhắn cho cô giáo</span>
          </button>

          {isSentTeacher && (
            <p className="text-xs font-bold text-indigo-700 text-center animate-in fade-in">
              ✉️ Tin nhắn đã được gửi tới cô giáo Lê Phương Uyên!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
