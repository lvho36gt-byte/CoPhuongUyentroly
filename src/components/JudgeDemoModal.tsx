import React from 'react';
import {
  Sparkles,
  GraduationCap,
  Users,
  Award,
  ArrowRight,
  CheckCircle2,
  X,
  Compass
} from 'lucide-react';
import { UserRole } from '../types';

interface JudgeDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartDemo: (role: UserRole, targetTab: string) => void;
}

export const JudgeDemoModal: React.FC<JudgeDemoModalProps> = ({
  isOpen,
  onClose,
  onStartDemo
}) => {
  if (!isOpen) return null;

  const demoFlows = [
    {
      role: 'student' as UserRole,
      targetTab: 'reading',
      title: 'Tôi là Học sinh Lớp 3',
      emoji: '👦',
      color: 'from-blue-500 to-sky-600',
      borderColor: 'border-blue-400',
      description: 'Trải nghiệm luồng học sinh tự học:',
      steps: [
        'Nghe Bé AI đọc bài truyền cảm tiếng Việt',
        'Giải câu hỏi mức 1 đến mức 4, thử tính năng hỏi gợi ý',
        'Nhận sao vàng, pháo hoa chúc mừng và huy hiệu vinh danh'
      ],
      buttonLabel: 'Khám phá vai trò Học sinh'
    },
    {
      role: 'teacher' as UserRole,
      targetTab: 'teacher',
      title: 'Tôi là Giáo viên (Cô Uyên)',
      emoji: '👩‍🏫',
      color: 'from-indigo-600 to-purple-600',
      borderColor: 'border-indigo-400',
      description: 'Trải nghiệm công cụ sư phạm số của giáo viên:',
      steps: [
        'Dùng Gemini AI tạo học liệu môn Toán/Tiếng Việt theo GDPT 2018',
        'Xem trước, kiểm duyệt đáp án và giao bài tập cho cả lớp',
        'Tự động gợi ý nhận xét học bạ chuẩn Thông tư 27/2020'
      ],
      buttonLabel: 'Khám phá vai trò Giáo viên'
    },
    {
      role: 'parent' as UserRole,
      targetTab: 'parent',
      title: 'Tôi là Phụ huynh học sinh',
      emoji: '👨‍👩‍👧',
      color: 'from-teal-600 to-emerald-600',
      borderColor: 'border-teal-400',
      description: 'Trải nghiệm cầu nối gia đình – nhà trường:',
      steps: [
        'Theo dõi nhật ký tiến bộ thực tế của con',
        'Thực hiện hoạt động 5–10 phút cha mẹ cùng con mỗi tối',
        'Gửi lời động viên yêu thương tới con và nhắn tin cho cô giáo'
      ],
      buttonLabel: 'Khám phá vai trò Phụ huynh'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-4xl w-full p-6 md:p-8 space-y-6 shadow-2xl border-4 border-yellow-400 relative max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-100 text-slate-900 text-xs font-black uppercase tracking-wider border border-yellow-300">
            <Sparkles className="w-3.5 h-3.5 text-yellow-600" />
            <span>Chế Độ Trình Diễn Trước Ban Giám Khảo</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-black text-slate-900 font-display">
            Trải Nghiệm Nền Tảng "Vườn Học Tập AI"
          </h2>
          <p className="text-xs md:text-sm text-slate-600">
            Xin mời Quý Ban Giám Khảo chọn một trong 3 luồng người dùng để kiểm nghiệm tính thực tế và giá trị đổi mới giáo dục:
          </p>
        </div>

        {/* 3 Flow Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {demoFlows.map((flow, idx) => (
            <div
              key={idx}
              className={`rounded-3xl p-5 border-2 ${flow.borderColor} bg-slate-50/80 hover:bg-white transition-all flex flex-col justify-between shadow-sm hover:shadow-md space-y-4`}
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{flow.emoji}</span>
                  <div>
                    <h3 className="font-black text-slate-900 text-base font-display">
                      {flow.title}
                    </h3>
                  </div>
                </div>

                <p className="text-xs font-bold text-slate-500">
                  {flow.description}
                </p>

                <div className="space-y-2 pt-1 text-xs text-slate-700 font-semibold">
                  {flow.steps.map((st, sIdx) => (
                    <div key={sIdx} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{st}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  onStartDemo(flow.role, flow.targetTab);
                  onClose();
                }}
                className={`btn-3d w-full py-3 rounded-2xl font-black text-xs md:text-sm text-white bg-gradient-to-r ${flow.color} shadow-md flex items-center justify-center gap-1.5 cursor-pointer`}
              >
                <span>{flow.buttonLabel}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Footer info note */}
        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500 font-bold">
          <span>Trường Tiểu học Khoái Châu 1 • Năm học 2025–2026</span>
          <span className="text-emerald-700">✓ Đầy đủ dữ liệu tương tác thực chất</span>
        </div>
      </div>
    </div>
  );
};
