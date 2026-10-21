import React, { useState } from 'react';
import {
  Volume2,
  VolumeX,
  Sparkles,
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  Mic,
  MicOff,
  RotateCcw,
  Star,
  ChevronRight,
  Info,
  BookOpen
} from 'lucide-react';
import { READING_PASSAGES } from '../data/mockData';
import { ReadingPassage, ReadingQuestion } from '../types';
import { speakVietnamese, stopSpeaking, startVoiceRecognition, isSpeechRecognitionSupported } from '../services/speechService';
import { callGemini } from '../services/geminiClient';
import confetti from 'canvas-confetti';

interface ReadingViewProps {
  onCompleteExercise?: (score: number, starsEarned: number) => void;
}

export const ReadingView: React.FC<ReadingViewProps> = ({ onCompleteExercise }) => {
  const [selectedPassage, setSelectedPassage] = useState<ReadingPassage>(READING_PASSAGES[0]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isNarrating, setIsNarrating] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [customTextAnswer, setCustomTextAnswer] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [stopRecordingFn, setStopRecordingFn] = useState<(() => void) | null>(null);

  // AI Hint & Feedback state
  const [aiHintActive, setAiHintActive] = useState(false);
  const [aiHintText, setAiHintText] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string; points: number } | null>(null);
  const [totalStarsEarned, setTotalStarsEarned] = useState(0);
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});

  const currentQ: ReadingQuestion = selectedPassage.questions[currentQuestionIndex];

  // Handle Reading Voice Narration
  const handleToggleNarration = () => {
    if (isNarrating) {
      stopSpeaking();
      setIsNarrating(false);
    } else {
      setIsNarrating(true);
      speakVietnamese(selectedPassage.audioText, () => {
        setIsNarrating(false);
      });
    }
  };

  // Switch passage
  const handleSelectPassage = (passage: ReadingPassage) => {
    stopSpeaking();
    setIsNarrating(false);
    setSelectedPassage(passage);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setCustomTextAnswer('');
    setAnswerSubmitted(false);
    setFeedback(null);
    setAiHintActive(false);
    setAiHintText('');
  };

  // Ask Bé AI for scaffolding hint
  const handleAskAIHint = async () => {
    setIsAiLoading(true);
    setAiHintActive(true);

    const prompt = `Học sinh lớp 3 đang đọc bài "${selectedPassage.title}" và trả lời câu hỏi mức độ ${currentQ.levelLabel}: "${currentQ.question}".
Em hãy đóng vai Bé AI, đưa ra MỘT gợi ý nhỏ, nhẹ nhàng bằng 1-2 câu tiếng Việt gần gũi, ấm áp để học sinh tự tìm câu trả lời trong bài đọc, TUYỆT ĐỐI KHÔNG TIẾT LỘ ĐÁP ÁN.`;

    const res = await callGemini(
      prompt,
      'Bạn là Bé AI - Người bạn đồng hành thông minh của học sinh lớp 3. Luôn gợi mở, ấm áp, tuyệt đối không cho đáp án trực tiếp.',
      () => currentQ.aiHint
    );

    setAiHintText(res.text);
    setIsAiLoading(false);
    speakVietnamese(res.text);
  };

  // Voice recording toggle
  const handleToggleVoiceInput = () => {
    if (isRecording) {
      if (stopRecordingFn) stopRecordingFn();
      setIsRecording(false);
      setStopRecordingFn(null);
    } else {
      if (!isSpeechRecognitionSupported()) {
        alert('Trình duyệt của bạn chưa hỗ trợ nhận diện giọng nói tiếng Việt. Bạn hãy gõ câu trả lời vào ô nhé!');
        return;
      }
      setIsRecording(true);
      const stop = startVoiceRecognition(
        (transcript) => {
          setCustomTextAnswer((prev) => (prev ? `${prev} ${transcript}` : transcript));
          setIsRecording(false);
          setStopRecordingFn(null);
        },
        () => {
          setIsRecording(false);
          setStopRecordingFn(null);
        }
      );
      setStopRecordingFn(() => stop);
    }
  };

  // Submit Answer
  const handleSubmitAnswer = () => {
    if (currentQ.options && selectedOption === null) {
      alert('Em hãy chọn một đáp án nhé!');
      return;
    }
    if (!currentQ.options && !customTextAnswer.trim()) {
      alert('Em hãy nhập hoặc nói câu trả lời của mình nhé!');
      return;
    }

    setAnswerSubmitted(true);
    let isCorrect = false;

    if (currentQ.options && currentQ.correctOptionIndex !== undefined) {
      isCorrect = selectedOption === currentQ.correctOptionIndex;
    } else {
      // Free text answers at Level 4 are evaluated constructively
      isCorrect = customTextAnswer.trim().length >= 10;
    }

    if (isCorrect) {
      const earned = 3;
      setTotalStarsEarned((prev) => prev + earned);
      setCompletedQuestions((prev) => ({ ...prev, [currentQ.id]: true }));
      setFeedback({
        isCorrect: true,
        message: `Xuất sắc lắm bạn nhỏ ơi! Bé AI thưởng em ${earned} sao vàng! ${currentQ.explanation}`,
        points: earned
      });

      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });

      speakVietnamese(`Hoan hô! Em đã trả lời rất chính xác. Bé AI thưởng em ${earned} ngôi sao!`);
      if (onCompleteExercise) {
        onCompleteExercise(10, earned);
      }
    } else {
      setFeedback({
        isCorrect: false,
        message: `Chưa đúng rồi nè! Đừng buồn nhé, em hãy đọc gợi ý của Bé AI và thử lại một lần nữa nhé!`,
        points: 0
      });
      speakVietnamese('Chưa chính xác rồi. Em hãy đọc lại gợi ý của Bé AI và chọn lại nhé!');
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < selectedPassage.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setCustomTextAnswer('');
      setAnswerSubmitted(false);
      setFeedback(null);
      setAiHintActive(false);
      setAiHintText('');
    }
  };

  const handleRetryQuestion = () => {
    setSelectedOption(null);
    setAnswerSubmitted(false);
    setFeedback(null);
  };

  return (
    <div className="space-y-6">
      {/* Passage Selector Bar */}
      <div className="bg-white rounded-3xl p-5 border-2 border-sky-100 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <BookOpen className="w-5 h-5 text-sky-600" />
          <h2 className="font-extrabold text-slate-800 text-lg font-display">
            Kho Bài Đọc Chuẩn GDPT 2018 (Lớp 3)
          </h2>
          <span className="text-xs bg-sky-100 text-sky-700 font-black px-2 py-0.5 rounded-full">
            5 Bài tuyển chọn
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {READING_PASSAGES.map((p) => {
            const isSelected = p.id === selectedPassage.id;
            return (
              <button
                key={p.id}
                onClick={() => handleSelectPassage(p)}
                className={`p-3 rounded-2xl text-left border-2 transition-all flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-sky-500 text-white border-sky-600 shadow-md scale-[1.02]'
                    : 'bg-slate-50 hover:bg-sky-50/60 text-slate-700 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{p.badgeIcon}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {p.topic}
                  </span>
                </div>
                <h4 className={`font-bold text-xs line-clamp-1 ${isSelected ? 'text-white' : 'text-slate-800'}`}>
                  {p.title}
                </h4>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main 2-Column Reading Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Reading Passage */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 md:p-8 border-2 border-sky-100 shadow-md space-y-6">
          {/* Header of Passage */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-black uppercase text-sky-600 tracking-wider">
                Chủ đề: {selectedPassage.topic}
              </span>
              <h3 className="text-2xl font-black text-slate-900 font-display mt-0.5">
                {selectedPassage.title}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5 font-medium">
                Nguồn: {selectedPassage.author} • Thời gian ước tính: {selectedPassage.estimatedMinutes} phút
              </p>
            </div>

            {/* Read Aloud Voice Button */}
            <button
              onClick={handleToggleNarration}
              className={`btn-3d flex items-center gap-2 px-4 py-2.5 rounded-2xl font-black text-xs md:text-sm shadow-md cursor-pointer ${
                isNarrating
                  ? 'bg-rose-500 hover:bg-rose-600 text-white animate-pulse'
                  : 'bg-sky-500 hover:bg-sky-600 text-white'
              }`}
            >
              {isNarrating ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span>{isNarrating ? 'Dừng đọc' : 'Nghe Bé AI đọc bài'}</span>
            </button>
          </div>

          {/* Passage Illustration */}
          <div className="relative rounded-2xl overflow-hidden h-48 sm:h-60 w-full shadow-inner border border-slate-100">
            <img
              src={selectedPassage.imageUrl}
              alt={selectedPassage.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent flex items-end p-4">
              <span className="text-white text-xs font-bold bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20">
                Lớp 3B – Trường Tiểu học Khoái Châu 1
              </span>
            </div>
          </div>

          {/* Reading Paragraphs */}
          <div className="space-y-4 text-slate-700 text-base md:text-lg leading-relaxed font-serif">
            {selectedPassage.content.map((paragraph, index) => (
              <p key={index} className="indent-6 text-justify">
                <span className="text-xs font-sans font-bold text-sky-600 mr-1.5 select-none bg-sky-50 px-1.5 py-0.5 rounded">
                  Đoạn {index + 1}
                </span>
                {paragraph}
              </p>
            ))}
          </div>

          {/* Vocabulary Box (Giải nghĩa từ khó) */}
          <div className="bg-amber-50/80 rounded-2xl p-4 border border-amber-200">
            <div className="flex items-center gap-1.5 text-xs font-black uppercase text-amber-800 mb-2">
              <Info className="w-4 h-4 text-amber-600" />
              <span>Góc giải nghĩa từ ngữ khó hiểu:</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {selectedPassage.vocabulary.map((vocab, vIdx) => (
                <div key={vIdx} className="bg-white p-2.5 rounded-xl border border-amber-200/60 text-xs">
                  <span className="font-extrabold text-amber-900 block mb-0.5">
                    • {vocab.word}:
                  </span>
                  <span className="text-slate-600">{vocab.meaning}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: AI Questions & Interaction */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 md:p-8 border-2 border-sky-100 shadow-md space-y-6">
          {/* Question Level Badge & Star Progress */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-black px-3 py-1 rounded-full shadow-xs">
                {currentQ.levelLabel}
              </span>
              <span className="text-xs text-slate-400 font-bold">
                Câu {currentQuestionIndex + 1}/{selectedPassage.questions.length}
              </span>
            </div>

            <div className="flex items-center gap-1 text-amber-500 font-black text-sm">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>+{totalStarsEarned} Sao</span>
            </div>
          </div>

          {/* Question Text */}
          <div className="bg-sky-50/70 p-4 rounded-2xl border border-sky-100">
            <p className="text-slate-900 font-extrabold text-base md:text-lg leading-snug">
              {currentQ.question}
            </p>
          </div>

          {/* Multiple Choice Options */}
          {currentQ.options && (
            <div className="space-y-2.5">
              {currentQ.options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                return (
                  <button
                    key={idx}
                    disabled={answerSubmitted}
                    onClick={() => setSelectedOption(idx)}
                    className={`w-full text-left p-3.5 rounded-2xl border-2 transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-blue-50 border-blue-600 text-blue-900 font-extrabold shadow-sm'
                        : 'bg-white border-slate-200 hover:border-sky-300 text-slate-700 font-medium'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs ${
                        isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="text-sm md:text-base leading-snug">{option}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* Free Text / Voice Input for Open Questions */}
          {!currentQ.options && (
            <div className="space-y-3">
              <div className="relative">
                <textarea
                  value={customTextAnswer}
                  disabled={answerSubmitted}
                  onChange={(e) => setCustomTextAnswer(e.target.value)}
                  placeholder="Em hãy viết suy nghĩ của mình ở đây, hoặc bấm nút mic để nói nhé..."
                  rows={4}
                  className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-sky-500 focus:outline-none text-sm md:text-base font-medium resize-none"
                />
                <button
                  type="button"
                  onClick={handleToggleVoiceInput}
                  className={`absolute right-3 bottom-3 p-2 rounded-xl transition-all ${
                    isRecording ? 'bg-rose-500 text-white animate-pulse' : 'bg-slate-100 text-slate-600 hover:bg-sky-100'
                  }`}
                  title={isRecording ? 'Dừng ghi âm' : 'Nói câu trả lời bằng giọng nói'}
                >
                  {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}

          {/* Action Buttons: Ask Bé AI Hint vs Submit */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {!answerSubmitted ? (
              <>
                <button
                  onClick={handleSubmitAnswer}
                  className="btn-3d flex-1 py-3 px-5 rounded-2xl font-black text-sm bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Nộp bài cho Bé AI</span>
                </button>

                <button
                  onClick={handleAskAIHint}
                  disabled={isAiLoading}
                  className="btn-3d py-3 px-4 rounded-2xl font-black text-xs md:text-sm bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 flex items-center gap-1.5 cursor-pointer"
                >
                  <HelpCircle className="w-4 h-4 text-amber-600" />
                  <span>{isAiLoading ? 'Bé AI đang nghĩ...' : 'Hỏi Bé AI gợi ý'}</span>
                </button>
              </>
            ) : (
              <div className="w-full space-y-3">
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
                    <div className="text-xs md:text-sm font-bold leading-relaxed">
                      {feedback.message}
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  {!feedback?.isCorrect && (
                    <button
                      onClick={handleRetryQuestion}
                      className="btn-3d flex-1 py-3 px-4 rounded-2xl font-black text-xs md:text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Thử làm lại câu này</span>
                    </button>
                  )}

                  {currentQuestionIndex < selectedPassage.questions.length - 1 ? (
                    <button
                      onClick={handleNextQuestion}
                      className="btn-3d flex-1 py-3 px-4 rounded-2xl font-black text-xs md:text-sm bg-emerald-500 hover:bg-emerald-600 text-white shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Câu tiếp theo</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <div className="flex-1 p-3 bg-blue-50 text-blue-800 rounded-2xl text-center text-xs font-black">
                      🎉 Hoan hô! Em đã hoàn thành bài đọc này!
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Bé AI Guided Hint Speech Bubble */}
          {aiHintActive && (
            <div className="pt-2 animate-in fade-in duration-300">
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-4 shadow-sm relative">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5 text-xs font-black uppercase text-amber-800">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <span>Gợi mở từ Bé AI (Không làm bài hộ):</span>
                  </div>
                </div>
                <p className="text-xs md:text-sm font-semibold text-slate-800 leading-relaxed">
                  {aiHintText || currentQ.aiHint}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
