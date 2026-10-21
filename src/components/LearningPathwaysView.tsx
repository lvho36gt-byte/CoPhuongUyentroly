import React, { useState } from 'react';
import {
  Compass,
  Sparkles,
  BookOpen,
  Calculator,
  PenTool,
  Award,
  CheckCircle2,
  ArrowRight,
  HelpCircle
} from 'lucide-react';
import { BeAIMascot } from './BeAIMascot';
import confetti from 'canvas-confetti';

interface LearningPathwaysViewProps {
  onNavigate: (tabId: string) => void;
}

export const LearningPathwaysView: React.FC<LearningPathwaysViewProps> = ({ onNavigate }) => {
  // Warmup Riddle state
  const [warmupAnswer, setWarmupAnswer] = useState<string | null>(null);
  const [warmupFeedback, setWarmupFeedback] = useState<string | null>(null);

  const warmupRiddle = {
    question: 'Bé AI đố bạn: Vừa bằng hạt đỗ, ăn giỗ cả làng. Là con gì?',
    options: ['Con kiến', 'Con ruồi', 'Con muỗi', 'Con sâu'],
    correct: 'Con ruồi',
    explanation: 'Dân gian có câu đố vui: Con ruồi rất nhỏ bé nhưng mâm cỗ nào cũng bay tới dự trước!'
  };

  const handleSelectWarmup = (opt: string) => {
    setWarmupAnswer(opt);
    if (opt === warmupRiddle.correct) {
      setWarmupFeedback('🎉 Hoan hô bạn nhỏ! Bạn đã giải đúng câu đố khởi động rồi đấy!');
      confetti({ particleCount: 30, spread: 45 });
    } else {
      setWarmupFeedback('💡 Chưa đúng rồi nè! Bạn hãy thử suy nghĩ lại một chút nhé!');
    }
  };

  const pathwayNodes = [
    {
      step: 1,
      title: 'Bước 1: Khởi động hào hứng',
      desc: 'Làm quen với Bé AI, giải câu đố vui và khởi động tinh thần học tập.',
      badge: 'Khởi động',
      color: 'from-amber-400 to-orange-500',
      icon: '🚀',
      action: () => {}
    },
    {
      step: 2,
      title: 'Bước 2: Khám phá tri thức',
      desc: 'Đọc văn bản bài học, nghe giọng đọc tiếng Việt và tra cứu từ khó.',
      badge: 'Đọc hiểu',
      color: 'from-blue-500 to-cyan-500',
      icon: '📖',
      action: () => onNavigate('reading')
    },
    {
      step: 3,
      title: 'Bước 3: Luyện tập phân hóa',
      desc: 'Thử sức với các bài toán 3 mức độ: Hạt mầm – Mầm xanh – Hoa tri thức.',
      badge: 'Toán học',
      color: 'from-emerald-500 to-green-600',
      icon: '🧮',
      action: () => onNavigate('math')
    },
    {
      step: 4,
      title: 'Bước 4: Vận dụng sáng tạo',
      desc: 'Tự tay sáng tác câu chuyện ở Xưởng Kể Chuyện và gửi vào Vườn hoa lớp 3B.',
      badge: 'Sáng tạo',
      color: 'from-pink-500 to-rose-600',
      icon: '🎨',
      action: () => onNavigate('story')
    },
    {
      step: 5,
      title: 'Bước 5: Tự đánh giá & Vinh danh',
      desc: 'Tổng kết số sao, mở khóa 6 huy hiệu danh giá và nhận đề xuất tiếp theo.',
      badge: 'Tiến bộ',
      color: 'from-purple-500 to-violet-600',
      icon: '🏆',
      action: () => onNavigate('progress')
    }
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 rounded-3xl p-6 md:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border-4 border-white/20">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-black uppercase tracking-wider backdrop-blur-sm">
            <Compass className="w-4 h-4 text-yellow-300" />
            <span>Học Cùng AI – Phương Pháp 5 Bước</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black font-display">
            Lộ Trình Học Tập Thông Minh Lớp 3B
          </h2>
          <p className="text-emerald-100 text-xs md:text-sm font-medium max-w-xl">
            Đi qua 5 chặng hành trình từ Khởi động → Khám phá → Luyện tập → Vận dụng → Đánh giá để mỗi ngày đều có bước tiến vượt bậc!
          </p>
        </div>
      </div>

      {/* Mini-Game: Warmup Riddle (Bước 1 Khởi động) */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border-2 border-amber-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center font-black text-xs">
              01
            </span>
            <h3 className="font-extrabold text-slate-800 text-base font-display">
              Trạm Khởi Động: Câu Đố Vui Của Bé AI
            </h3>
          </div>
          <span className="text-xs bg-amber-100 text-amber-800 font-bold px-2.5 py-0.5 rounded-full">
            Khơi gợi hứng thú
          </span>
        </div>

        <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200">
          <p className="text-slate-900 font-bold text-sm md:text-base">
            {warmupRiddle.question}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {warmupRiddle.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectWarmup(opt)}
              className={`p-3 rounded-2xl border-2 font-bold text-xs md:text-sm transition-all cursor-pointer ${
                warmupAnswer === opt
                  ? 'bg-amber-500 text-white border-amber-600 shadow-md'
                  : 'bg-slate-50 hover:bg-amber-50 border-slate-200 text-slate-700'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>

        {warmupFeedback && (
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 flex items-center justify-between">
            <span>{warmupFeedback}</span>
            <span className="text-slate-500 italic">{warmupRiddle.explanation}</span>
          </div>
        )}
      </div>

      {/* 5 Journey Nodes */}
      <div className="space-y-4">
        <h3 className="text-xl font-black text-slate-800 font-display">
          5 Chặng Hành Trình Tiếp Theo
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {pathwayNodes.map((node) => (
            <div
              key={node.step}
              className="bg-white rounded-3xl p-5 border-2 border-slate-100 hover:border-sky-300 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${node.color} text-white flex items-center justify-center text-2xl shadow-sm`}>
                    {node.icon}
                  </div>
                  <span className="text-[10px] font-black uppercase bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
                    {node.badge}
                  </span>
                </div>

                <h4 className="font-black text-slate-900 text-base font-display mb-1">
                  {node.title}
                </h4>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  {node.desc}
                </p>
              </div>

              {node.step > 1 && (
                <button
                  onClick={node.action}
                  className="btn-3d w-full py-2.5 rounded-xl font-black text-xs text-slate-800 bg-slate-100 hover:bg-sky-50 hover:text-sky-700 flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>Bắt đầu chặng</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
