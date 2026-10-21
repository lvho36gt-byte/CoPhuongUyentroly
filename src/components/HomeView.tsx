import React from 'react';
import {
  BookOpen,
  Calculator,
  PenTool,
  Award,
  Users,
  Sparkles,
  ArrowRight,
  Flame,
  CheckCircle2,
  Compass,
  Star,
  GraduationCap
} from 'lucide-react';
import { BeAIMascot } from './BeAIMascot';
import { TEACHER_INFO } from '../data/mockData';

interface HomeViewProps {
  onNavigate: (tabId: string) => void;
  onOpenJudgeTour: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate, onOpenJudgeTour }) => {
  const learningZones = [
    {
      id: 'reading',
      title: 'Đọc hiểu cùng AI',
      subtitle: 'Khám phá văn bản & rèn luyện tư duy 4 mức độ',
      icon: BookOpen,
      iconEmoji: '📖',
      color: 'from-blue-500 to-sky-600',
      bgColor: 'bg-blue-50 border-blue-200',
      textColor: 'text-blue-700',
      tags: ['Giọng đọc Việt', 'Giải nghĩa từ khó', 'Bé AI gợi mở'],
      actionText: 'Vào đọc sách'
    },
    {
      id: 'story',
      title: 'Kể chuyện sáng tạo',
      subtitle: 'Xưởng sáng tác truyện tranh, nhân vật & xuất bản PDF',
      icon: PenTool,
      iconEmoji: '🎨',
      color: 'from-pink-500 to-rose-600',
      bgColor: 'bg-pink-50 border-pink-200',
      textColor: 'text-pink-700',
      tags: ['4 bước kể chuyện', 'Minh họa sinh động', 'Xuất bản sách'],
      actionText: 'Vào xưởng sáng tác'
    },
    {
      id: 'math',
      title: 'Toán tư duy vui',
      subtitle: 'Hạt mầm – Mầm xanh – Hoa tri thức với gợi ý thông minh',
      icon: Calculator,
      iconEmoji: '🧮',
      color: 'from-amber-500 to-orange-600',
      bgColor: 'bg-amber-50 border-amber-200',
      textColor: 'text-amber-700',
      tags: ['3 mức độ phân hóa', 'Chấm điểm chính xác', 'Không lộ đáp án'],
      actionText: 'Chinh phục toán'
    },
    {
      id: 'progress',
      title: 'Theo dõi tiến bộ',
      subtitle: 'Hành trình trưởng thành, sao thưởng & 6 huy hiệu vinh danh',
      icon: Award,
      iconEmoji: '🌟',
      color: 'from-purple-500 to-violet-600',
      bgColor: 'bg-purple-50 border-purple-200',
      textColor: 'text-purple-700',
      tags: ['Biểu đồ trực quan', 'Huy hiệu danh giá', 'Gợi ý cá nhân hóa'],
      actionText: 'Xem hành trình'
    },
    {
      id: 'parent',
      title: 'Kết nối gia đình',
      subtitle: 'Gợi ý 5–10 phút mỗi ngày cha mẹ cùng con tiến bộ',
      icon: Users,
      iconEmoji: '👨‍👩‍👧',
      color: 'from-teal-500 to-emerald-600',
      bgColor: 'bg-teal-50 border-teal-200',
      textColor: 'text-teal-700',
      tags: ['Hoạt động tại nhà', 'Gửi lời động viên', 'Cầu nối giáo viên'],
      actionText: 'Góc phụ huynh'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Khởi động',
      desc: 'Hứng thú cùng Bé AI qua hình ảnh, âm thanh và câu đố vui đầu giờ.',
      color: 'bg-amber-500',
      icon: '🚀'
    },
    {
      number: '02',
      title: 'Khám phá',
      desc: 'Tiếp nhận kiến thức qua văn bản chuẩn GDPT 2018 và tương tác với AI.',
      color: 'bg-sky-500',
      icon: '🔍'
    },
    {
      number: '03',
      title: 'Luyện tập',
      desc: 'Củng cố kỹ năng với bài tập phân hóa 3 mức độ Hạt mầm – Mầm xanh – Hoa tri thức.',
      color: 'bg-emerald-500',
      icon: '✏️'
    },
    {
      number: '04',
      title: 'Vận dụng',
      desc: 'Tự tay sáng tạo câu chuyện, sơ đồ tư duy hoặc giải toán thực tế tại lớp 3B.',
      color: 'bg-pink-500',
      icon: '🎨'
    },
    {
      number: '05',
      title: 'Đánh giá',
      desc: 'Nhận phản hồi tức thì, tự đánh giá, nhận huy hiệu và định hướng tiếp theo.',
      color: 'bg-purple-500',
      icon: '🏆'
    }
  ];

  return (
    <div className="space-y-10 pb-16">
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0877E8] via-[#2F80ED] to-[#795290] text-white p-6 md:p-10 shadow-2xl border-4 border-white/30">
        {/* Floating Garden background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-emerald-400/20 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Heading and Actions */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-black tracking-wider uppercase border border-white/30">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span>Nền tảng Giáo dục Đổi mới Sáng tạo 2026</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-display tracking-tight leading-tight">
              VƯỜN HỌC TẬP AI
              <span className="block text-2xl sm:text-3xl md:text-4xl text-yellow-300 mt-1">
                AI ĐỒNG HÀNH CÙNG HỌC SINH LỚP 3
              </span>
            </h1>

            <p className="text-sky-100 text-base md:text-lg font-medium leading-relaxed max-w-xl">
              Khẩu hiệu: <span className="font-bold text-white">“{TEACHER_INFO.slogan}”</span>
              <br />
              Thông điệp giáo dục: <span className="italic text-yellow-200">“{TEACHER_INFO.coreMessage}”</span>
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigate('reading')}
                className="btn-3d bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-black px-6 py-3 rounded-2xl shadow-lg shadow-yellow-500/30 flex items-center gap-2 text-sm md:text-base cursor-pointer"
              >
                <span>Bắt đầu học</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('math')}
                className="btn-3d bg-white/20 hover:bg-white/30 text-white font-extrabold px-5 py-3 rounded-2xl border border-white/40 backdrop-blur-sm text-sm md:text-base flex items-center gap-2 cursor-pointer"
              >
                <Calculator className="w-4 h-4 text-yellow-300" />
                <span>Luyện tập Toán tư duy</span>
              </button>

              <button
                onClick={() => onNavigate('progress')}
                className="btn-3d bg-emerald-500 hover:bg-emerald-400 text-white font-extrabold px-5 py-3 rounded-2xl shadow-md text-sm md:text-base flex items-center gap-2 cursor-pointer"
              >
                <Award className="w-4 h-4 text-amber-200" />
                <span>Xem thành tích</span>
              </button>
            </div>

            {/* School & Teacher Credential Pill */}
            <div className="pt-2 flex items-center gap-2 text-xs text-sky-100 font-semibold">
              <GraduationCap className="w-4 h-4 text-yellow-300" />
              <span>Đơn vị: {TEACHER_INFO.school} • GVCN: {TEACHER_INFO.name} • {TEACHER_INFO.classroom}</span>
            </div>
          </div>

          {/* Right Column: Interactive Bé AI Mascot */}
          <div className="lg:col-span-5 bg-white/10 backdrop-blur-md p-5 rounded-3xl border border-white/20 shadow-xl">
            <BeAIMascot
              size="lg"
              isFloating
              message="Xin chào! Mình là Bé AI. Hôm nay chúng mình cùng khám phá những điều thú vị nhé!"
              subMessage="Nhấn vào nút 'Nghe giọng' để mình đọc to cho bạn nghe nè!"
            />

            {/* Quick action bar for Demo */}
            <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between text-xs font-bold text-white">
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
                30+ Bài toán chuẩn GDPT
              </span>
              <button
                onClick={onOpenJudgeTour}
                className="underline hover:text-yellow-300 transition-colors cursor-pointer"
              >
                Khám phá bản demo ngay →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5-Step Learning Cycle (Quy trình học tập 5 bước) */}
      <section className="bg-white rounded-3xl p-6 md:p-8 border-2 border-sky-100 shadow-xl space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-black uppercase tracking-wider border border-emerald-200">
            <Compass className="w-3.5 h-3.5" />
            <span>Mô hình Sư phạm Hiện đại</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 font-display">
            Quy trình Học tập 5 Bước cùng Bé AI
          </h2>
          <p className="text-sm md:text-base text-slate-600">
            Thiết kế khoa học giúp học sinh lớp 3 chủ động tiếp thu, tự tin vận dụng và phát triển năng lực toàn diện.
          </p>
        </div>

        {/* 5 Journey Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="group relative bg-[#F8FAFC] hover:bg-white rounded-2xl p-5 border-2 border-slate-100 hover:border-sky-300 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`w-9 h-9 rounded-xl ${step.color} text-white font-black text-xs flex items-center justify-center shadow-md`}>
                    {step.number}
                  </span>
                  <span className="text-2xl transform group-hover:scale-125 transition-transform">
                    {step.icon}
                  </span>
                </div>
                <h3 className="font-extrabold text-slate-800 text-base mb-1.5 font-display">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1 text-[11px] font-bold text-sky-600">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Bước {idx + 1} của hành trình</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5 Main Learning Zones Cards */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-black uppercase tracking-wider border border-blue-200 mb-2">
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              <span>5 Khu Vườn Tri Thức Thông Minh</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 font-display">
              Các Khu Vực Học Tập Đầy Màu Sắc
            </h2>
          </div>
          <p className="text-sm font-semibold text-slate-500">
            Học sinh được lựa chọn hoạt động theo sở thích và nhịp độ riêng
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {learningZones.map((zone) => {
            const Icon = zone.icon;
            return (
              <div
                key={zone.id}
                className={`card-garden rounded-3xl p-6 border-2 ${zone.bgColor} shadow-lg hover:shadow-2xl flex flex-col justify-between transition-all`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${zone.color} text-white flex items-center justify-center text-2xl shadow-md`}>
                      {zone.iconEmoji}
                    </div>
                    <span className="text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/80 text-slate-700 border border-slate-200 shadow-xs">
                      Phân hệ chuẩn
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-black text-slate-800 font-display mb-1.5">
                      {zone.title}
                    </h3>
                    <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-medium">
                      {zone.subtitle}
                    </p>
                  </div>

                  {/* Feature Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {zone.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[11px] font-bold bg-white text-slate-700 px-2 py-0.5 rounded-lg border border-slate-200/80 shadow-2xs"
                      >
                        ✓ {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    onClick={() => onNavigate(zone.id)}
                    className={`btn-3d w-full py-3 px-4 rounded-2xl font-black text-sm text-white bg-gradient-to-r ${zone.color} shadow-md flex items-center justify-center gap-2 cursor-pointer`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{zone.actionText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}

          {/* Special Card: Competition Innovation Solution */}
          <div className="card-garden rounded-3xl p-6 border-2 bg-gradient-to-br from-rose-50 to-amber-50 border-rose-200 shadow-lg flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-rose-500 to-amber-500 text-white flex items-center justify-center text-2xl shadow-md">
                  🏆
                </div>
                <span className="text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-rose-100 text-rose-800 border border-rose-200">
                  Hội thi Sáng tạo
                </span>
              </div>

              <div>
                <h3 className="text-xl font-black text-slate-800 font-display mb-1.5">
                  Giải Pháp Đổi Mới Giáo Dục
                </h3>
                <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-medium">
                  Hồ sơ thuyết minh, số liệu thực nghiệm trước – sau tác động và minh chứng sản phẩm học sinh Lớp 3B.
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="text-[11px] font-bold bg-white text-slate-700 px-2 py-0.5 rounded-lg border border-slate-200">
                  ✓ Bối cảnh GDPT 2018
                </span>
                <span className="text-[11px] font-bold bg-white text-slate-700 px-2 py-0.5 rounded-lg border border-slate-200">
                  ✓ Số liệu thực nghiệm
                </span>
                <span className="text-[11px] font-bold bg-white text-slate-700 px-2 py-0.5 rounded-lg border border-slate-200">
                  ✓ Tính khả thi cao
                </span>
              </div>
            </div>

            <div className="pt-6">
              <button
                onClick={() => onNavigate('innovation')}
                className="btn-3d w-full py-3 px-4 rounded-2xl font-black text-sm text-white bg-gradient-to-r from-rose-600 to-amber-600 shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Xem hồ sơ giải pháp</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Judge Tour Callout Banner */}
      <section className="bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-500 rounded-3xl p-6 md:p-8 text-slate-900 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border-4 border-white">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-white shadow-lg flex items-center justify-center text-3xl shrink-0">
            🎯
          </div>
          <div className="space-y-1">
            <h3 className="text-xl md:text-2xl font-black font-display">
              Chế độ Trình diễn dành cho Ban Giám Khảo
            </h3>
            <p className="text-xs md:text-sm font-bold text-slate-800">
              Trải nghiệm nhanh luồng 3 đối tượng: Học sinh làm bài → Giáo viên tạo học liệu & nhận xét Thông tư 27 → Phụ huynh đồng hành tại nhà.
            </p>
          </div>
        </div>

        <button
          onClick={onOpenJudgeTour}
          className="btn-3d bg-slate-900 hover:bg-slate-800 text-white font-black px-6 py-3.5 rounded-2xl shadow-lg shrink-0 flex items-center gap-2 text-sm cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-yellow-300" />
          <span>Bắt đầu Trình diễn Ngay</span>
        </button>
      </section>
    </div>
  );
};
