import React, { useState } from 'react';
import {
  Sparkles,
  BookOpen,
  Calculator,
  PenTool,
  Award,
  GraduationCap,
  Users,
  Lightbulb,
  Palette,
  Home,
  Menu,
  X,
  Compass,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { UserRole } from '../types';
import { TEACHER_INFO } from '../data/mockData';

interface HeaderProps {
  currentTab: string;
  onSelectTab: (tabId: string) => void;
  userRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  aiConnected: boolean;
  onOpenJudgeTour: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  userRole,
  onRoleChange,
  aiConnected,
  onOpenJudgeTour
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Trang chủ', icon: Home, color: 'text-blue-600' },
    { id: 'pathways', label: 'Học cùng AI', icon: Compass, color: 'text-emerald-600' },
    { id: 'reading', label: 'Đọc hiểu', icon: BookOpen, color: 'text-sky-600' },
    { id: 'math', label: 'Toán tư duy', icon: Calculator, color: 'text-amber-600' },
    { id: 'story', label: 'Kể chuyện', icon: PenTool, color: 'text-pink-600' },
    { id: 'showcase', label: 'Sản phẩm sáng tạo', icon: Palette, color: 'text-purple-600' },
    { id: 'progress', label: 'Tiến bộ của em', icon: Award, color: 'text-orange-600' },
    { id: 'teacher', label: 'Góc giáo viên', icon: GraduationCap, color: 'text-indigo-600' },
    { id: 'parent', label: 'Kết nối phụ huynh', icon: Users, color: 'text-teal-600' },
    { id: 'innovation', label: 'Giải pháp đổi mới', icon: Lightbulb, color: 'text-rose-600' },
  ];

  const handleNavClick = (id: string) => {
    onSelectTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-sky-100 shadow-sm">
      {/* Top Banner Ribbon */}
      <div className="bg-gradient-to-r from-[#0877E8] via-[#35C96D] to-[#9554E8] text-white px-4 py-1.5 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-bold tracking-wide">
            <span className="bg-white/20 px-2 py-0.5 rounded-full text-[11px] font-black uppercase">
              {TEACHER_INFO.classroom}
            </span>
            <span>{TEACHER_INFO.school}</span>
            <span className="hidden sm:inline opacity-80">|</span>
            <span className="hidden sm:inline">GVCN: {TEACHER_INFO.name}</span>
          </div>

          <div className="flex items-center gap-3">
            {/* AI Status Badge */}
            <div
              className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold ${
                aiConnected
                  ? 'bg-emerald-400/30 text-emerald-100 border border-emerald-300/40'
                  : 'bg-amber-400/30 text-amber-100 border border-amber-300/40'
              }`}
              title={
                aiConnected
                  ? 'Đã kết nối Gemini 3.8 Flash thời gian thực'
                  : 'Đang dùng kho sư phạm chuẩn GDPT 2018 (Ngoại tuyến)'
              }
            >
              {aiConnected ? (
                <>
                  <CheckCircle2 className="w-3 h-3 text-emerald-300" />
                  <span>Gemini AI: Sẵn sàng</span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-3 h-3 text-amber-300" />
                  <span>Học liệu chuẩn GDPT 2018</span>
                </>
              )}
            </div>

            {/* Quick Demo Tour button for judges */}
            <button
              onClick={onOpenJudgeTour}
              className="bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-black px-3 py-0.5 rounded-full text-xs shadow-md transition-transform hover:scale-105 active:scale-95 flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5 text-slate-900" />
              <span>Trải nghiệm nhanh</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 py-2.5">
        <div className="flex items-center justify-between gap-4">
          {/* Logo & Slogan */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group transition-transform"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#0877E8] to-[#38BDF8] p-1.5 shadow-md shadow-sky-200 flex items-center justify-center transform group-hover:rotate-6 transition-transform">
              <span className="text-2xl">🌱</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg md:text-xl tracking-tight text-slate-900 font-display">
                  VƯỜN HỌC TẬP AI
                </span>
                <span className="bg-pink-100 text-pink-700 text-[10px] font-black px-1.5 py-0.5 rounded-md">
                  LỚP 3
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-500 hidden sm:block">
                Học vui mỗi ngày – Tự tin khám phá – Sáng tạo cùng AI
              </p>
            </div>
          </button>

          {/* Role Switcher Pill */}
          <div className="hidden lg:flex items-center bg-slate-100/90 p-1 rounded-2xl border border-slate-200 text-xs font-bold">
            <span className="px-2 text-slate-400 font-semibold text-[11px]">Vai trò:</span>
            <button
              onClick={() => onRoleChange('student')}
              className={`px-3 py-1 rounded-xl transition-all ${
                userRole === 'student'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-blue-600'
              }`}
            >
              👦 Học sinh (Nam)
            </button>
            <button
              onClick={() => onRoleChange('teacher')}
              className={`px-3 py-1 rounded-xl transition-all ${
                userRole === 'teacher'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-indigo-600'
              }`}
            >
              👩‍🏫 Giáo viên (Cô Uyên)
            </button>
            <button
              onClick={() => onRoleChange('parent')}
              className={`px-3 py-1 rounded-xl transition-all ${
                userRole === 'parent'
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-teal-600'
              }`}
            >
              👨‍👩‍👧 Phụ huynh
            </button>
            <button
              onClick={() => onRoleChange('judge')}
              className={`px-3 py-1 rounded-xl transition-all ${
                userRole === 'judge'
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'text-slate-600 hover:text-amber-600'
              }`}
            >
              🏆 Giám khảo
            </button>
          </div>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-700 bg-sky-50 border border-sky-100 hover:bg-sky-100 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center justify-between gap-1 mt-3 pt-2 border-t border-slate-100 overflow-x-auto no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs md:text-sm font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md shadow-sky-200'
                    : 'text-slate-600 hover:bg-sky-50 hover:text-blue-600'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : item.color}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b-2 border-sky-100 px-4 py-4 space-y-4 shadow-xl">
          {/* Mobile Role Switcher */}
          <div className="bg-sky-50/80 p-3 rounded-2xl border border-sky-100">
            <p className="text-xs font-bold text-slate-500 mb-2">Chọn vai trò trải nghiệm:</p>
            <div className="grid grid-cols-2 gap-2 text-xs font-bold">
              <button
                onClick={() => onRoleChange('student')}
                className={`p-2 rounded-xl text-center border ${
                  userRole === 'student' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-700'
                }`}
              >
                👦 Học sinh 3B
              </button>
              <button
                onClick={() => onRoleChange('teacher')}
                className={`p-2 rounded-xl text-center border ${
                  userRole === 'teacher' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-700'
                }`}
              >
                👩‍🏫 Cô giáo Uyên
              </button>
              <button
                onClick={() => onRoleChange('parent')}
                className={`p-2 rounded-xl text-center border ${
                  userRole === 'parent' ? 'bg-teal-600 text-white border-teal-600' : 'bg-white text-slate-700'
                }`}
              >
                👨‍👩‍👧 Phụ huynh
              </button>
              <button
                onClick={() => onRoleChange('judge')}
                className={`p-2 rounded-xl text-center border ${
                  userRole === 'judge' ? 'bg-amber-500 text-white border-amber-500' : 'bg-white text-slate-700'
                }`}
              >
                🏆 Giám khảo
              </button>
            </div>
          </div>

          {/* Mobile Nav Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-bold text-left transition-all ${
                    isActive
                      ? 'bg-sky-500 text-white shadow-sm'
                      : 'text-slate-700 hover:bg-sky-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : item.color}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
