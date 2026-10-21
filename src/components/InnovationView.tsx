import React, { useState } from 'react';
import {
  Lightbulb,
  Award,
  TrendingUp,
  FileText,
  CheckCircle2,
  Users,
  Compass,
  Sparkles,
  Printer,
  Edit2
} from 'lucide-react';
import { INNOVATION_DATA, TEACHER_INFO } from '../data/mockData';

export const InnovationView: React.FC = () => {
  // Configurable experimental stats for teachers/judges
  const [stats, setStats] = useState(INNOVATION_DATA.baselineStats);
  const [isEditingStats, setIsEditingStats] = useState(false);

  const highlights = [
    {
      title: 'AI Hướng Dẫn – Không Làm Thay',
      desc: 'Bé AI đóng vai trò người bạn đồng hành sư phạm, chỉ đưa ra các câu hỏi gợi mở, chia nhỏ vấn đề, tuyệt đối không giải hộ để học sinh chủ động tư duy.',
      icon: '🤖'
    },
    {
      title: 'Học Sinh Là Trung Tâm',
      desc: 'Mỗi học sinh được học theo nhịp độ riêng, tự chọn bài đọc, bài toán và nhân vật sáng tạo theo sở thích cá nhân.',
      icon: '🎯'
    },
    {
      title: 'Phân Hóa Nhiệm Vụ 3 Mức Độ',
      desc: 'Hạt mầm (Cơ bản) – Mầm xanh (Vừa sức) – Hoa tri thức (Vận dụng), giúp mọi đối tượng học sinh đều tìm thấy niềm vui tiến bộ.',
      icon: '🌱'
    },
    {
      title: 'Hỗ Trợ Giáo Viên Toàn Diện',
      desc: 'Giúp cô giáo Lê Phương Uyên tạo học liệu thông minh theo chuẩn GDPT 2018 và gợi ý nhận xét học bạ chuẩn mực theo Thông tư 27.',
      icon: '👩‍🏫'
    },
    {
      title: 'Cầu Nối Nhà Trường – Gia Đình',
      desc: 'Phụ huynh nắm bắt tiến độ thực tế của con và cùng con thực hiện các hoạt động kết nối 5–10 phút mỗi ngày.',
      icon: '🏡'
    },
    {
      title: 'Xưởng Sáng Tạo Thực Chất',
      desc: 'Khuyến khích học sinh viết truyện, vẽ tranh, vẽ sơ đồ tư duy và lưu giữ thành tích đáng tự hào tại Vườn hoa sáng tạo.',
      icon: '🎨'
    }
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Contest Header Banner */}
      <div className="bg-gradient-to-r from-rose-600 via-red-600 to-amber-600 rounded-3xl p-6 md:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border-4 border-white/20">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-black uppercase tracking-wider backdrop-blur-sm">
            <Award className="w-4 h-4 text-yellow-300" />
            <span>{INNOVATION_DATA.contestTitle}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black font-display tracking-tight leading-tight">
            {INNOVATION_DATA.title}
          </h1>

          <p className="text-rose-100 text-sm md:text-base font-semibold max-w-2xl">
            Tác giả: <strong className="text-white">{INNOVATION_DATA.author}</strong> • Đơn vị: <strong className="text-white">{INNOVATION_DATA.school}</strong> • Đối tượng: <strong className="text-white">{INNOVATION_DATA.targetClass}</strong>
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="btn-3d bg-white hover:bg-rose-50 text-slate-900 font-black px-6 py-3.5 rounded-2xl shadow-lg flex items-center gap-2 text-xs md:text-sm shrink-0 cursor-pointer"
        >
          <Printer className="w-4 h-4 text-rose-600" />
          <span>In Báo Cáo Thuyết Minh</span>
        </button>
      </div>

      {/* 1. Bối cảnh & 2. Vấn đề thực tiễn */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-6 md:p-8 border-2 border-slate-200 shadow-sm space-y-3">
          <span className="text-xs font-black uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full">
            1. Bối Cảnh Triển Khai
          </span>
          <h3 className="text-xl font-black text-slate-800 font-display">
            Yêu cầu đổi mới theo GDPT 2018
          </h3>
          <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-medium text-justify">
            Chương trình GDPT 2018 đối với lớp 3 chuyển trọng tâm từ truyền thụ kiến thức sang phát triển phẩm chất và năng lực người học. Học sinh 8–9 tuổi có sự phân hóa rõ rệt về tốc độ tiếp thu, cần học liệu trực quan, tương tác và sinh động để khơi gợi niềm đam mê khám phá.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 md:p-8 border-2 border-slate-200 shadow-sm space-y-3">
          <span className="text-xs font-black uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
            2. Vấn Đề Thực Tiễn
          </span>
          <h3 className="text-xl font-black text-slate-800 font-display">
            Khó khăn của học sinh & giáo viên
          </h3>
          <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-medium text-justify">
            Một số học sinh còn rụt rè, chưa tự tin diễn đạt hoặc lúng túng khi giải bài toán có lời văn. Giáo viên gặp nhiều áp lực trong việc phân hóa bài tập theo từng nhóm trình độ và theo dõi tiến bộ hàng ngày của từng em nếu chỉ sử dụng phương pháp giấy bút truyền thống.
          </p>
        </div>
      </div>

      {/* 3. Giải pháp & 4. 6 Điểm Nổi Bật Đột Phá */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border-2 border-slate-200 shadow-sm space-y-6">
        <div className="max-w-2xl space-y-1">
          <span className="text-xs font-black uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            3 & 4. Giải Pháp Sư Phạm Sáng Tạo
          </span>
          <h3 className="text-2xl font-black text-slate-800 font-display">
            Mô Hình "Vườn Học Tập AI" – 6 Điểm Khác Biệt
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((h, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl border-2 border-slate-100 bg-slate-50/70 hover:bg-white hover:border-blue-300 transition-all space-y-2.5 shadow-2xs"
            >
              <div className="w-12 h-12 rounded-xl bg-white shadow-xs flex items-center justify-center text-2xl border border-slate-200">
                {h.icon}
              </div>
              <h4 className="font-black text-slate-900 text-base font-display">
                {h.title}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {h.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Tính khả thi & Khả năng nhân rộng */}
      <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-3xl p-6 md:p-8 border-2 border-indigo-200 shadow-sm space-y-3">
        <span className="text-xs font-black uppercase tracking-wider text-indigo-700 bg-indigo-100 px-3 py-1 rounded-full">
          5. Khả Năng Triển Khai & Nhân Rộng
        </span>
        <h3 className="text-xl font-black text-slate-800 font-display">
          Tính Khả Thi Cao Trong Mọi Điều Kiện Trường Lớp
        </h3>
        <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
          Nền tảng chạy trực tiếp trên trình duyệt web thông qua máy tính bàn phòng tin học, máy tính bảng hoặc điện thoại thông minh của phụ huynh. Mô hình hoạt động ổn định kể cả khi ngoại tuyến nhờ kho học liệu chuẩn GDPT 2018 tích hợp sẵn, dễ dàng nhân rộng cho các khối lớp 1, 2, 4, 5 trên toàn địa bàn huyện Khoái Châu.
        </p>
      </div>

      {/* 6. Kết Quả Thực Nghiệm & Minh Chứng Trước - Sau Tác Động */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border-2 border-rose-100 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full">
              6. Minh Chứng & Số Liệu Thực Nghiệm
            </span>
            <h3 className="text-2xl font-black text-slate-800 font-display mt-1">
              So Sánh Đối Chứng Trước & Sau Khi Áp Dụng (Lớp 3B)
            </h3>
          </div>

          <button
            onClick={() => setIsEditingStats(!isEditingStats)}
            className="btn-3d text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer"
          >
            <Edit2 className="w-3.5 h-3.5 text-slate-600" />
            <span>{isEditingStats ? 'Đóng chế độ chỉnh sửa' : 'Tùy chỉnh số liệu khảo sát'}</span>
          </button>
        </div>

        {/* Interactive Stats Editor for Teachers/Judges */}
        {isEditingStats && (
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-bold">
            <div>
              <label className="block text-slate-500 mb-1">Tự giác học trước (%):</label>
              <input
                type="number"
                value={stats.selfDirectedRateBefore}
                onChange={(e) => setStats({ ...stats, selfDirectedRateBefore: Number(e.target.value) })}
                className="w-full p-2 rounded-lg border bg-white"
              />
            </div>
            <div>
              <label className="block text-slate-500 mb-1">Tự giác học sau (%):</label>
              <input
                type="number"
                value={stats.selfDirectedRateAfter}
                onChange={(e) => setStats({ ...stats, selfDirectedRateAfter: Number(e.target.value) })}
                className="w-full p-2 rounded-lg border bg-white"
              />
            </div>
            <div>
              <label className="block text-slate-500 mb-1">Chính xác toán trước (%):</label>
              <input
                type="number"
                value={stats.mathAccuracyBefore}
                onChange={(e) => setStats({ ...stats, mathAccuracyBefore: Number(e.target.value) })}
                className="w-full p-2 rounded-lg border bg-white"
              />
            </div>
            <div>
              <label className="block text-slate-500 mb-1">Chính xác toán sau (%):</label>
              <input
                type="number"
                value={stats.mathAccuracyAfter}
                onChange={(e) => setStats({ ...stats, mathAccuracyAfter: Number(e.target.value) })}
                className="w-full p-2 rounded-lg border bg-white"
              />
            </div>
          </div>
        )}

        {/* Visual Comparison Charts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200 text-center space-y-2">
            <span className="text-xs font-black uppercase text-blue-800 block">
              Ý Thức Tự Học Tại Nhà
            </span>
            <div className="flex items-center justify-center gap-3">
              <span className="text-slate-400 font-bold text-sm">{stats.selfDirectedRateBefore}%</span>
              <span className="text-xl font-bold text-blue-600">→</span>
              <span className="text-3xl font-black text-blue-700 font-display">{stats.selfDirectedRateAfter}%</span>
            </div>
            <span className="text-[11px] font-extrabold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full inline-block">
              +{(stats.selfDirectedRateAfter - stats.selfDirectedRateBefore).toFixed(0)}% Tăng trưởng
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 text-center space-y-2">
            <span className="text-xs font-black uppercase text-amber-800 block">
              Độ Chính Xác Môn Toán
            </span>
            <div className="flex items-center justify-center gap-3">
              <span className="text-slate-400 font-bold text-sm">{stats.mathAccuracyBefore}%</span>
              <span className="text-xl font-bold text-amber-600">→</span>
              <span className="text-3xl font-black text-amber-700 font-display">{stats.mathAccuracyAfter}%</span>
            </div>
            <span className="text-[11px] font-extrabold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full inline-block">
              +{(stats.mathAccuracyAfter - stats.mathAccuracyBefore).toFixed(0)}% Tăng trưởng
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-center space-y-2">
            <span className="text-xs font-black uppercase text-emerald-800 block">
              Hứng Thú Với Bài Đọc
            </span>
            <div className="flex items-center justify-center gap-3">
              <span className="text-slate-400 font-bold text-sm">{stats.readingEngagementBefore}%</span>
              <span className="text-xl font-bold text-emerald-600">→</span>
              <span className="text-3xl font-black text-emerald-700 font-display">{stats.readingEngagementAfter}%</span>
            </div>
            <span className="text-[11px] font-extrabold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full inline-block">
              +{(stats.readingEngagementAfter - stats.readingEngagementBefore).toFixed(0)}% Tăng trưởng
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-purple-50/70 border border-purple-200 text-center space-y-2">
            <span className="text-xs font-black uppercase text-purple-800 block">
              Phụ Huynh Đồng Hành
            </span>
            <div className="flex items-center justify-center gap-3">
              <span className="text-slate-400 font-bold text-sm">{stats.parentInvolvementBefore}%</span>
              <span className="text-xl font-bold text-purple-600">→</span>
              <span className="text-3xl font-black text-purple-700 font-display">{stats.parentInvolvementAfter}%</span>
            </div>
            <span className="text-[11px] font-extrabold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full inline-block">
              +{(stats.parentInvolvementAfter - stats.parentInvolvementBefore).toFixed(0)}% Tăng trưởng
            </span>
          </div>
        </div>

        {/* Real Feedback from Parents & Students */}
        <div className="pt-4 border-t border-slate-100 space-y-3">
          <h4 className="font-black text-slate-800 text-base font-display">
            Ý Kiến Đánh Giá Của Phụ Huynh & Học Sinh Thực Tế
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {INNOVATION_DATA.testimonials.map((t, idx) => (
              <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-2">
                <span className="font-extrabold text-indigo-900 block">
                  • {t.role}:
                </span>
                <p className="text-slate-600 italic leading-relaxed">
                  "{t.text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
