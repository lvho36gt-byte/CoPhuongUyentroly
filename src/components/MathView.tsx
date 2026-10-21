import React, { useState } from 'react';
import {
  Calculator,
  Sparkles,
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Star,
  ChevronRight,
  ChevronLeft,
  Trophy,
  ArrowRight
} from 'lucide-react';
import { MATH_TOPICS, MATH_QUESTIONS } from '../data/mockData';
import { MathTopic, MathQuestion, MathTier } from '../types';
import { callGemini } from '../services/geminiClient';
import { speakVietnamese } from '../services/speechService';
import confetti from 'canvas-confetti';

interface MathViewProps {
  onRecordScore?: (score: number, starsEarned: number) => void;
}

export const MathView: React.FC<MathViewProps> = ({ onRecordScore }) => {
  const [selectedTopic, setSelectedTopic] = useState<MathTopic>(MATH_TOPICS[0]);
  const [selectedTier, setSelectedTier] = useState<MathTier | 'all'>('all');
  const [currentIndex, setCurrentIndex] = useState(0);

  // User input states
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [fillInAnswer, setFillInAnswer] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);

  // Scaffolding AI Hint state
  const [aiHintActive, setAiHintActive] = useState(false);
  const [aiHintText, setAiHintText] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Progress metrics
  const [stars, setStars] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  // Filter questions by topic and tier
  const filteredQuestions = MATH_QUESTIONS.filter((q) => {
    if (q.topicId !== selectedTopic.id) return false;
    if (selectedTier !== 'all' && q.tier !== selectedTier) return false;
    return true;
  });

  const currentQ: MathQuestion | undefined = filteredQuestions[currentIndex] || filteredQuestions[0];

  const handleSelectTopic = (topic: MathTopic) => {
    setSelectedTopic(topic);
    setCurrentIndex(0);
    resetQuestionState();
  };

  const handleSelectTier = (tier: MathTier | 'all') => {
    setSelectedTier(tier);
    setCurrentIndex(0);
    resetQuestionState();
  };

  const resetQuestionState = () => {
    setSelectedOption(null);
    setFillInAnswer('');
    setIsSubmitted(false);
    setFeedback(null);
    setAiHintActive(false);
    setAiHintText('');
  };

  // Deterministic Code-based Math Verification
  const handleSubmit = () => {
    if (!currentQ) return;

    let userAnswer: string = '';
    if (currentQ.type === 'multiple_choice') {
      if (!selectedOption) {
        alert('Em hãy chọn một phương án trả lời nhé!');
        return;
      }
      userAnswer = selectedOption.trim();
    } else {
      if (!fillInAnswer.trim()) {
        alert('Em hãy điền số kết quả vào ô trống nhé!');
        return;
      }
      userAnswer = fillInAnswer.trim();
    }

    setIsSubmitted(true);
    const expected = String(currentQ.correctAnswer).trim().toLowerCase();
    const normalizedUser = userAnswer.toLowerCase();

    // Check exact match (or numeric equality)
    const isExact =
      normalizedUser === expected ||
      (Number(normalizedUser) === Number(expected) && !isNaN(Number(expected)));

    if (isExact) {
      const earned = currentQ.tier === 'hoa_tri_thuc' ? 5 : currentQ.tier === 'mam_xanh' ? 4 : 3;
      setStars((prev) => prev + earned);
      setCorrectCount((prev) => prev + 1);

      setFeedback({
        isCorrect: true,
        message: `Chính xác 100%! Bạn thật giỏi! Bé AI tặng bạn +${earned} sao vàng! Lời giải: ${currentQ.explanation}`
      });

      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });

      speakVietnamese(`Hoan hô! Em đã giải chính xác bài toán rồi. Bé AI thưởng em ${earned} ngôi sao!`);
      if (onRecordScore) {
        onRecordScore(10, earned);
      }
    } else {
      // Guided feedback without revealing the answer!
      setFeedback({
        isCorrect: false,
        message: `Chưa chính xác rồi bạn nhỏ ơi! Đừng lo lắng, em hãy đọc gợi ý của Bé AI và thử tính lại một lần nữa nhé!`
      });
      speakVietnamese('Chưa đúng rồi. Em hãy đọc gợi ý của Bé AI và thử tính lại nhé!');
      // Automatically provide the AI hint
      setAiHintActive(true);
      setAiHintText(currentQ.aiHint);
    }
  };

  // Ask Bé AI for additional smart hint
  const handleAskAIHint = async () => {
    if (!currentQ) return;
    setIsAiLoading(true);
    setAiHintActive(true);

    const prompt = `Bài toán lớp 3: "${currentQ.question}".
Đề bài yêu cầu tìm kết quả chính xác.
Hãy đóng vai Bé AI, đưa ra MỘT gợi ý sư phạm ngắn gọn, ấm áp (1-2 câu tiếng Việt) giúp học sinh lớp 3 nhận ra bước tính hoặc quy luật, TUYỆT ĐỐI KHÔNG NÓI RA ĐÁP ÁN CUỐI CÙNG.`;

    const res = await callGemini(
      prompt,
      'Bạn là Bé AI - Bạn học thông minh lớp 3. Gợi ý từng bước, không làm bài hộ.',
      () => currentQ.aiHint
    );

    setAiHintText(res.text);
    setIsAiLoading(false);
    speakVietnamese(res.text);
  };

  const handleNext = () => {
    if (currentIndex < filteredQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      resetQuestionState();
    }
  };

  const handleRetry = () => {
    setSelectedOption(null);
    setFillInAnswer('');
    setIsSubmitted(false);
    setFeedback(null);
  };

  return (
    <div className="space-y-6">
      {/* Topics Bar */}
      <div className="bg-white rounded-3xl p-5 border-2 border-amber-100 shadow-sm">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-amber-600" />
            <h2 className="font-extrabold text-slate-800 text-lg font-display">
              Hành Trình Chinh Phục Toán Học Lớp 3
            </h2>
          </div>
          <div className="flex items-center gap-1.5 bg-amber-50 text-amber-800 font-extrabold text-xs px-3 py-1 rounded-full border border-amber-200">
            <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
            <span>+{stars} Sao Tích Lũy</span>
          </div>
        </div>

        {/* 6 Topic Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {MATH_TOPICS.map((topic) => {
            const isSelected = selectedTopic.id === topic.id;
            return (
              <button
                key={topic.id}
                onClick={() => handleSelectTopic(topic)}
                className={`p-3 rounded-2xl text-left border-2 transition-all flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-amber-500 text-white border-amber-600 shadow-md scale-102'
                    : 'bg-slate-50 hover:bg-amber-50/50 text-slate-700 border-slate-200'
                }`}
              >
                <div className="text-2xl mb-1">{topic.icon}</div>
                <h4 className={`font-black text-xs line-clamp-2 leading-tight ${isSelected ? 'text-white' : 'text-slate-800'}`}>
                  {topic.title}
                </h4>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tier Filter Pills (Hạt mầm / Mầm xanh / Hoa tri thức) */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
          <span>Chọn mức thử thách:</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => handleSelectTier('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
              selectedTier === 'all'
                ? 'bg-slate-800 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Tất cả bài tập ({filteredQuestions.length})
          </button>
          <button
            onClick={() => handleSelectTier('hat_mam')}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
              selectedTier === 'hat_mam'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            🌱 Hạt mầm (Cơ bản)
          </button>
          <button
            onClick={() => handleSelectTier('mam_xanh')}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
              selectedTier === 'mam_xanh'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-blue-50 text-blue-800 hover:bg-blue-100'
            }`}
          >
            🌿 Mầm xanh (Vừa sức)
          </button>
          <button
            onClick={() => handleSelectTier('hoa_tri_thuc')}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
              selectedTier === 'hoa_tri_thuc'
                ? 'bg-pink-600 text-white shadow-xs'
                : 'bg-pink-50 text-pink-800 hover:bg-pink-100'
            }`}
          >
            🌸 Hoa tri thức (Vận dụng)
          </button>
        </div>
      </div>

      {/* Main Quiz Area */}
      {currentQ ? (
        <div className="bg-white rounded-3xl p-6 md:p-8 border-2 border-amber-200 shadow-md space-y-6">
          {/* Header of Quiz Card */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                {currentQ.tierName}
              </span>
              <span className="text-xs font-bold text-slate-400">
                Câu {currentIndex + 1} / {filteredQuestions.length}
              </span>
            </div>

            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
              Chủ đề: {selectedTopic.title}
            </span>
          </div>

          {/* Question Text Box */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50/60 p-6 rounded-2xl border border-amber-200/80">
            <p className="text-slate-900 font-extrabold text-lg md:text-xl leading-relaxed">
              {currentQ.question}
            </p>
          </div>

          {/* Question Input Forms */}
          {currentQ.type === 'multiple_choice' && currentQ.options && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedOption === opt;
                return (
                  <button
                    key={idx}
                    disabled={isSubmitted && feedback?.isCorrect}
                    onClick={() => setSelectedOption(opt)}
                    className={`p-4 rounded-2xl border-2 text-left transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-amber-100 border-amber-500 text-amber-950 font-black shadow-sm ring-2 ring-amber-300'
                        : 'bg-slate-50 hover:bg-amber-50/50 border-slate-200 text-slate-800 font-bold'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black ${
                        isSelected ? 'bg-amber-500 text-white' : 'bg-white text-slate-700 border border-slate-200'
                      }`}>
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="text-base">{opt}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {currentQ.type === 'fill_in' && (
            <div className="max-w-md mx-auto bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center space-y-3">
              <label className="text-xs md:text-sm font-extrabold text-slate-700 block">
                Nhập kết quả hoặc số thích hợp:
              </label>
              <div className="flex items-center justify-center gap-2">
                <input
                  type="text"
                  disabled={isSubmitted && feedback?.isCorrect}
                  value={fillInAnswer}
                  onChange={(e) => setFillInAnswer(e.target.value)}
                  placeholder="Ví dụ: 24"
                  className="w-40 text-center text-2xl font-black px-4 py-3 rounded-2xl border-2 border-amber-300 bg-white focus:outline-none focus:border-amber-500 shadow-inner"
                />
              </div>
            </div>
          )}

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {!isSubmitted || !feedback?.isCorrect ? (
              <>
                <button
                  onClick={handleSubmit}
                  className="btn-3d flex-1 py-3.5 px-6 rounded-2xl font-black text-sm md:text-base bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Kiểm tra đáp án</span>
                </button>

                <button
                  onClick={handleAskAIHint}
                  disabled={isAiLoading}
                  className="btn-3d py-3.5 px-5 rounded-2xl font-black text-xs md:text-sm bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 flex items-center gap-1.5 cursor-pointer"
                >
                  <HelpCircle className="w-4 h-4 text-blue-600" />
                  <span>{isAiLoading ? 'Bé AI đang tính...' : 'Hỏi Bé AI gợi ý'}</span>
                </button>
              </>
            ) : null}
          </div>

          {/* Feedback & Detailed explanation after completion */}
          {feedback && (
            <div
              className={`p-4 rounded-2xl border-2 flex items-start gap-3 ${
                feedback.isCorrect
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                  : 'bg-rose-50 border-rose-300 text-rose-900'
              }`}
            >
              {feedback.isCorrect ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              )}
              <div className="flex-1 text-xs md:text-sm font-bold leading-relaxed">
                {feedback.message}
              </div>
            </div>
          )}

          {/* Bé AI Smart Hint Bubble */}
          {aiHintActive && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-4 text-xs md:text-sm">
              <div className="flex items-center gap-1.5 font-black text-blue-800 mb-1">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>Gợi ý từng bước từ Bé AI (Không tiết lộ đáp án):</span>
              </div>
              <p className="text-slate-700 font-semibold leading-relaxed">
                {aiHintText || currentQ.aiHint}
              </p>
            </div>
          )}

          {/* Navigation Controls between questions */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              onClick={() => {
                if (currentIndex > 0) {
                  setCurrentIndex(currentIndex - 1);
                  resetQuestionState();
                }
              }}
              disabled={currentIndex === 0}
              className="btn-3d px-4 py-2 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 flex items-center gap-1 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Câu trước</span>
            </button>

            {isSubmitted && !feedback?.isCorrect && (
              <button
                onClick={handleRetry}
                className="btn-3d px-4 py-2 rounded-xl text-xs font-bold text-amber-800 bg-amber-100 hover:bg-amber-200 flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Thử làm lại</span>
              </button>
            )}

            <button
              onClick={handleNext}
              disabled={currentIndex >= filteredQuestions.length - 1}
              className="btn-3d px-5 py-2.5 rounded-xl text-xs font-black text-white bg-amber-500 hover:bg-amber-600 disabled:opacity-40 shadow-sm flex items-center gap-1 cursor-pointer"
            >
              <span>Câu kế tiếp</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-10 text-center border-2 border-slate-200">
          <p className="text-slate-600 font-bold">Không có bài tập nào thuộc mức này.</p>
        </div>
      )}
    </div>
  );
};
