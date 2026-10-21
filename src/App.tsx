import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HomeView } from './components/HomeView';
import { LearningPathwaysView } from './components/LearningPathwaysView';
import { ReadingView } from './components/ReadingView';
import { MathView } from './components/MathView';
import { StoryView } from './components/StoryView';
import { ShowcaseView } from './components/ShowcaseView';
import { ProgressView } from './components/ProgressView';
import { TeacherView } from './components/TeacherView';
import { ParentView } from './components/ParentView';
import { InnovationView } from './components/InnovationView';
import { JudgeDemoModal } from './components/JudgeDemoModal';
import { UserRole, CreativeProduct } from './types';
import { STUDENTS_MOCK, TEACHER_INFO } from './data/mockData';
import { checkGeminiStatus } from './services/geminiClient';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [userRole, setUserRole] = useState<UserRole>('student');
  const [isJudgeModalOpen, setIsJudgeModalOpen] = useState(false);
  const [aiConnected, setAiConnected] = useState(false);

  // Global shared state
  const [currentStudent, setCurrentStudent] = useState(STUDENTS_MOCK[0]);
  const [customShowcaseProducts, setCustomShowcaseProducts] = useState<CreativeProduct[]>([]);

  // Check Gemini AI backend connectivity on mount
  useEffect(() => {
    checkGeminiStatus().then((status) => {
      setAiConnected(status.available);
    });
  }, []);

  // Callback when student completes an exercise
  const handleCompleteExercise = (score: number, starsEarned: number) => {
    setCurrentStudent((prev) => ({
      ...prev,
      stars: prev.stars + starsEarned,
      completedTasks: prev.completedTasks + 1,
      totalQuizzes: prev.totalQuizzes + 1,
      accuracyRate: Math.min(100, Math.round(((prev.stars + starsEarned) / ((prev.totalQuizzes + 1) * 3)) * 100))
    }));
  };

  // Callback when a new story is created in StoryView
  const handleSaveToClassShowcase = (story: CreativeProduct) => {
    setCustomShowcaseProducts((prev) => [story, ...prev]);
  };

  // Handler from Judge Demo modal
  const handleStartJudgeTour = (role: UserRole, targetTab: string) => {
    setUserRole(role);
    setCurrentTab(targetTab);
  };

  // Automatically scroll to top on tab change
  const handleSelectTab = (tabId: string) => {
    setCurrentTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRoleChange = (role: UserRole) => {
    setUserRole(role);
    if (role === 'teacher') {
      setCurrentTab('teacher');
    } else if (role === 'parent') {
      setCurrentTab('parent');
    } else if (role === 'judge') {
      setIsJudgeModalOpen(true);
    } else {
      setCurrentTab('home');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F9FF] text-slate-800 font-sans selection:bg-pink-200 selection:text-pink-900">
      {/* Top Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        userRole={userRole}
        onRoleChange={handleRoleChange}
        aiConnected={aiConnected}
        onOpenJudgeTour={() => setIsJudgeModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 md:py-8">
        {currentTab === 'home' && (
          <HomeView
            onNavigate={handleSelectTab}
            onOpenJudgeTour={() => setIsJudgeModalOpen(true)}
          />
        )}

        {currentTab === 'pathways' && (
          <LearningPathwaysView onNavigate={handleSelectTab} />
        )}

        {currentTab === 'reading' && (
          <ReadingView onCompleteExercise={handleCompleteExercise} />
        )}

        {currentTab === 'math' && (
          <MathView onRecordScore={handleCompleteExercise} />
        )}

        {currentTab === 'story' && (
          <StoryView onSaveToClassShowcase={handleSaveToClassShowcase} />
        )}

        {currentTab === 'showcase' && (
          <ShowcaseView
            customProducts={customShowcaseProducts}
            isTeacher={userRole === 'teacher'}
          />
        )}

        {currentTab === 'progress' && (
          <ProgressView
            currentStudent={currentStudent}
            onNavigateToLesson={handleSelectTab}
          />
        )}

        {currentTab === 'teacher' && <TeacherView />}

        {currentTab === 'parent' && <ParentView />}

        {currentTab === 'innovation' && <InnovationView />}
      </main>

      {/* Footer */}
      <footer className="no-print bg-slate-900 text-slate-300 py-10 px-4 mt-auto border-t-4 border-sky-500">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-800 text-center md:text-left">
            <div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <span className="text-2xl">🌱</span>
                <span className="font-black text-xl text-white font-display">
                  VƯỜN HỌC TẬP AI – LỚP 3B
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {TEACHER_INFO.school} • GVCN: {TEACHER_INFO.name} • {TEACHER_INFO.schoolYear}
              </p>
            </div>

            <div className="space-y-1 text-center md:text-right text-xs">
              <p className="font-bold text-yellow-300">
                “{TEACHER_INFO.slogan}”
              </p>
              <p className="text-slate-400 italic">
                “{TEACHER_INFO.coreMessage}”
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
            <p>
              Phần mềm dự thi Đổi mới Sáng tạo Giáo dục Tiểu học 2026. Bám sát Chương trình GDPT 2018.
            </p>
            <div className="flex items-center gap-4">
              <button
                onClick={() => handleSelectTab('innovation')}
                className="hover:text-yellow-300 transition-colors"
              >
                Hồ sơ giải pháp đổi mới
              </button>
              <span>•</span>
              <button
                onClick={() => setIsJudgeModalOpen(true)}
                className="hover:text-yellow-300 transition-colors font-bold text-white"
              >
                Trình diễn Ban Giám Khảo
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Judge Interactive Guided Tour Modal */}
      <JudgeDemoModal
        isOpen={isJudgeModalOpen}
        onClose={() => setIsJudgeModalOpen(false)}
        onStartDemo={handleStartJudgeTour}
      />
    </div>
  );
}
