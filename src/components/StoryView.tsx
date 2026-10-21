import React, { useState } from 'react';
import {
  Sparkles,
  BookOpen,
  Printer,
  Share2,
  CheckCircle2,
  Mic,
  MicOff,
  ChevronRight,
  ChevronLeft,
  Lightbulb,
  Heart
} from 'lucide-react';
import { callGemini } from '../services/geminiClient';
import { speakVietnamese, startVoiceRecognition, isSpeechRecognitionSupported } from '../services/speechService';
import confetti from 'canvas-confetti';

interface StoryViewProps {
  onSaveToClassShowcase?: (story: any) => void;
}

export const StoryView: React.FC<StoryViewProps> = ({ onSaveToClassShowcase }) => {
  const [currentStep, setCurrentStep] = useState(1);

  // Activity 1: Characters
  const characters = [
    { id: 'c1', name: 'Bạn Học Sinh Lớp 3', desc: 'Chăm ngoan, đeo khăn quàng đỏ', icon: '👦' },
    { id: 'c2', name: 'Chú Mèo Dũng Cảm', desc: 'Nhanh nhẹn, mắt biếc tinh anh', icon: '🐱' },
    { id: 'c3', name: 'Chú Thỏ Trắng Thông Minh', desc: 'Tai dài, yêu thích đọc sách', icon: '🐰' },
    { id: 'c4', name: 'Robot AI Tí Hon', desc: 'Mắt sáng xanh, biết giải toán', icon: '🤖' },
    { id: 'c5', name: 'Cô Giáo Dịu Hiền', desc: 'Áo dài xanh, nụ cười ấm áp', icon: '👩‍🏫' },
    { id: 'c6', name: 'Nhân Vật Em Tự Nghĩ', desc: 'Siêu nhân bảo vệ cây xanh', icon: '✨' },
  ];

  // Activity 2: Settings
  const settings = [
    { id: 's1', name: 'Lớp Học 3B Thông Minh', desc: 'Bảng tương tác, rực rỡ tranh hoa', icon: '🏫', bg: 'from-blue-100 to-sky-200' },
    { id: 's2', name: 'Khu Vườn Hoa Thơm Ngát', desc: 'Bướm bay lượn, giọt sương mai', icon: '🌺', bg: 'from-pink-100 to-rose-200' },
    { id: 's3', name: 'Rừng Xanh Kỳ Thú', desc: 'Cây cổ thụ tỏa bóng, suối reo', icon: '🌲', bg: 'from-emerald-100 to-green-200' },
    { id: 's4', name: 'Mái Ấm Gia Đình', desc: 'Căn bếp ấm áp, bữa cơm sum vầy', icon: '🏡', bg: 'from-amber-100 to-orange-200' },
    { id: 's5', name: 'Thư Viện Sách Diệu Kỳ', desc: 'Hàng ngàn cuốn truyện cổ tích', icon: '📚', bg: 'from-purple-100 to-violet-200' },
    { id: 's6', name: 'Thế Giới Tương Lai 2050', desc: 'Xe bay năng lượng mặt trời', icon: '🚀', bg: 'from-indigo-100 to-cyan-200' },
  ];

  const [selectedCharacter, setSelectedCharacter] = useState(characters[0]);
  const [selectedSetting, setSelectedSetting] = useState(settings[0]);

  // Activity 3: Story Plot Parts
  const [title, setTitle] = useState('Cuộc phiêu lưu kỳ thú của bạn nhỏ');
  const [part1Beginning, setPart1Beginning] = useState('Vào một buổi sáng mùa thu trong lành, tại lớp 3B trường Tiểu học Khoái Châu 1...');
  const [part2Challenge, setPart2Challenge] = useState('Bỗng nhiên, một cơn gió cuốn bay mất bài kiểm tra toán của cả lớp ra ngoài sân trường...');
  const [part3Solution, setPart3Solution] = useState('Với sự giúp đỡ của Robot Bé AI và các bạn cùng lớp, chúng em đã đoàn kết vượt qua thử thách...');
  const [part4Lesson, setPart4Lesson] = useState('Câu chuyện nhắc nhở chúng em rằng: Đoàn kết là sức mạnh và sự kiên trì sẽ chiến thắng mọi khó khăn.');

  // AI Suggestion State
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiInspiration, setAiInspiration] = useState('');
  const [activeVoiceField, setActiveVoiceField] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  // Request AI for plot ideas (Support only, does not write whole story)
  const handleAskAIInspiration = async (type: 'beginning' | 'challenge' | 'solution' | 'lesson') => {
    setIsAiLoading(true);
    let prompt = '';
    if (type === 'beginning') {
      prompt = `Gợi ý 2 ý tưởng mở đầu câu chuyện ngắn lớp 3 về nhân vật ${selectedCharacter.name} ở bối cảnh ${selectedSetting.name}. Giọng điệu hồn nhiên, trong sáng.`;
    } else if (type === 'challenge') {
      prompt = `Gợi ý một tình huống khó khăn, bất ngờ thú vị cho nhân vật ${selectedCharacter.name} ở ${selectedSetting.name} mà học sinh lớp 3 có thể tự giải quyết.`;
    } else if (type === 'solution') {
      prompt = `Gợi ý cách nhân vật ${selectedCharacter.name} dùng sự thông minh, lòng tốt hoặc sự giúp đỡ của bạn bè để vượt qua thử thách.`;
    } else {
      prompt = `Gợi ý một bài học đạo đức ý nghĩa, giản dị cho trẻ em từ câu chuyện của ${selectedCharacter.name}.`;
    }

    const res = await callGemini(
      prompt,
      'Bạn là Bé AI cố vấn xưởng kể chuyện lớp 3. Đưa ra gợi ý gợi mở, không viết nguyên bài văn để bé tự sáng tác.',
      () => `Bé AI gợi ý: Em hãy để ${selectedCharacter.name} bất ngờ phát hiện ra một điều bí mật ở ${selectedSetting.name}, sau đó cùng bạn bè tìm cách giải quyết bằng lòng trung thực nhé!`
    );

    setAiInspiration(res.text);
    setIsAiLoading(false);
    speakVietnamese(res.text);
  };

  // Voice recording helper for textareas
  const handleVoiceRecord = (fieldName: string, setter: (val: string) => void, currentVal: string) => {
    if (activeVoiceField === fieldName) {
      setActiveVoiceField(null);
      return;
    }
    if (!isSpeechRecognitionSupported()) {
      alert('Trình duyệt chưa hỗ trợ ghi âm trực tiếp. Bạn hãy gõ câu văn vào ô nhé!');
      return;
    }
    setActiveVoiceField(fieldName);
    startVoiceRecognition(
      (transcript) => {
        setter(currentVal ? `${currentVal} ${transcript}` : transcript);
        setActiveVoiceField(null);
      },
      () => setActiveVoiceField(null)
    );
  };

  // Save story to showcase
  const handleSaveStory = () => {
    const fullStory = {
      id: `story_${Date.now()}`,
      title,
      category: 'truyen_tranh',
      categoryLabel: 'Truyện tranh ngắn',
      author: 'Em Nguyễn Hoàng Nam (Lớp 3B)',
      studentId: 'hs1',
      date: new Date().toLocaleDateString('vi-VN'),
      imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80',
      description: `Nhân vật: ${selectedCharacter.name} • Bối cảnh: ${selectedSetting.name}`,
      content: `${part1Beginning}\n\n${part2Challenge}\n\n${part3Solution}\n\nBài học: ${part4Lesson}`,
      status: 'pending', // Teacher must approve
      likes: 1
    };

    if (onSaveToClassShowcase) {
      onSaveToClassShowcase(fullStory);
    }
    setIsSaved(true);

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    speakVietnamese('Tuyệt vời! Câu chuyện của em đã được gửi tới cô giáo Uyên để phê duyệt đưa vào Vườn hoa sáng tạo lớp 3B!');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Studio Header */}
      <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 rounded-3xl p-6 md:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border-4 border-white/20">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-black uppercase tracking-wider backdrop-blur-sm">
            <BookOpen className="w-4 h-4 text-yellow-300" />
            <span>Xưởng Kể Chuyện Của Bé Lớp 3B</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black font-display">
            Thế Giới Sáng Tạo: Bé Tự Viết Truyện Hay
          </h2>
          <p className="text-pink-100 text-xs md:text-sm font-medium max-w-xl">
            Tự do chọn nhân vật, bối cảnh và thắt nút câu chuyện. Bé AI luôn đồng hành gợi ý những ý tưởng bất ngờ và xuất bản tác phẩm!
          </p>
        </div>

        {/* Step Indicator Pills */}
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/20">
          {[1, 2, 3, 4].map((step) => (
            <button
              key={step}
              onClick={() => setCurrentStep(step)}
              className={`w-9 h-9 rounded-xl font-black text-xs flex items-center justify-center transition-all cursor-pointer ${
                currentStep === step
                  ? 'bg-yellow-400 text-slate-900 shadow-md scale-110'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              {step}
            </button>
          ))}
        </div>
      </div>

      {/* Step Wizard Container */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border-2 border-pink-100 shadow-md">
        {/* STEP 1: CHỌN NHÂN VẬT */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="text-center max-w-xl mx-auto space-y-1">
              <span className="text-xs font-black uppercase tracking-wider text-pink-600 bg-pink-50 px-3 py-1 rounded-full">
                Hoạt động 1: Khởi nguồn ý tưởng
              </span>
              <h3 className="text-2xl font-black text-slate-800 font-display">
                Chọn Nhân Vật Chính Cho Câu Chuyện
              </h3>
              <p className="text-xs md:text-sm text-slate-500">
                Ai sẽ là người bạn đồng hành cùng em trong chuyến phiêu lưu lần này?
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {characters.map((char) => {
                const isSelected = selectedCharacter.id === char.id;
                return (
                  <button
                    key={char.id}
                    onClick={() => setSelectedCharacter(char)}
                    className={`p-5 rounded-3xl text-left border-3 transition-all flex flex-col justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-pink-50/80 border-pink-500 shadow-lg scale-102 ring-4 ring-pink-100'
                        : 'bg-slate-50 hover:bg-pink-50/40 border-slate-200'
                    }`}
                  >
                    <span className="text-4xl mb-3 block transform group-hover:scale-110 transition-transform">
                      {char.icon}
                    </span>
                    <div>
                      <h4 className="font-black text-slate-900 text-base font-display">
                        {char.name}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 font-medium leading-relaxed">
                        {char.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={() => setCurrentStep(2)}
                className="btn-3d bg-pink-500 hover:bg-pink-600 text-white font-black px-6 py-3 rounded-2xl shadow-md flex items-center gap-2 text-sm cursor-pointer"
              >
                <span>Tiếp tục: Chọn bối cảnh</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: CHỌN BỐI CẢNH */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="text-center max-w-xl mx-auto space-y-1">
              <span className="text-xs font-black uppercase tracking-wider text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                Hoạt động 2: Không gian kỳ thú
              </span>
              <h3 className="text-2xl font-black text-slate-800 font-display">
                Chọn Bối Cảnh Diễn Ra Câu Chuyện
              </h3>
              <p className="text-xs md:text-sm text-slate-500">
                Câu chuyện của em sẽ diễn ra ở đâu?
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {settings.map((set) => {
                const isSelected = selectedSetting.id === set.id;
                return (
                  <button
                    key={set.id}
                    onClick={() => setSelectedSetting(set)}
                    className={`p-5 rounded-3xl text-left border-3 transition-all flex flex-col justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-purple-50/80 border-purple-500 shadow-lg scale-102 ring-4 ring-purple-100'
                        : 'bg-slate-50 hover:bg-purple-50/40 border-slate-200'
                    }`}
                  >
                    <span className="text-4xl mb-3 block">{set.icon}</span>
                    <div>
                      <h4 className="font-black text-slate-900 text-base font-display">
                        {set.name}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 font-medium leading-relaxed">
                        {set.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                onClick={() => setCurrentStep(1)}
                className="btn-3d bg-slate-100 hover:bg-slate-200 text-slate-700 font-black px-5 py-3 rounded-2xl flex items-center gap-2 text-sm cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Quay lại</span>
              </button>

              <button
                onClick={() => setCurrentStep(3)}
                className="btn-3d bg-purple-600 hover:bg-purple-700 text-white font-black px-6 py-3 rounded-2xl shadow-md flex items-center gap-2 text-sm cursor-pointer"
              >
                <span>Tiếp tục: Sáng tác câu chuyện</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: SÁNG TÁC THEO SƯỜN GỢI MỞ */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <span className="text-xs font-black uppercase text-pink-600 tracking-wider">
                  Hoạt động 3: Sáng tác cùng Bé AI
                </span>
                <h3 className="text-xl font-black text-slate-800 font-display">
                  Sườn Kể Chuyện 4 Đoạn
                </h3>
                <p className="text-xs text-slate-500">
                  Nhân vật: <strong className="text-pink-600">{selectedCharacter.name}</strong> • Bối cảnh: <strong className="text-purple-600">{selectedSetting.name}</strong>
                </p>
              </div>

              {/* Title Input */}
              <div className="w-full sm:w-80">
                <label className="text-xs font-bold text-slate-600 block mb-1">
                  Tiêu đề câu chuyện của em:
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border-2 border-pink-200 font-bold text-sm text-slate-800 focus:outline-none focus:border-pink-500"
                />
              </div>
            </div>

            {/* AI Inspiration Banner if any */}
            {aiInspiration && (
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 rounded-2xl p-4 text-xs md:text-sm">
                <div className="flex items-center gap-2 font-black text-amber-800 mb-1">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>Bé AI gợi ý ý tưởng:</span>
                </div>
                <p className="text-slate-700 font-medium leading-relaxed">{aiInspiration}</p>
              </div>
            )}

            {/* 4 Plot Cards */}
            <div className="space-y-4">
              {/* Part 1: Mở đầu */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-sky-700 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-sky-500 text-white flex items-center justify-center text-[10px]">1</span>
                    Đoạn 1: Câu chuyện bắt đầu như thế nào?
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleAskAIInspiration('beginning')}
                      disabled={isAiLoading}
                      className="text-[11px] font-bold text-amber-700 hover:text-amber-800 bg-amber-100 px-2.5 py-1 rounded-lg flex items-center gap-1"
                    >
                      <Lightbulb className="w-3 h-3 text-amber-600" />
                      <span>Hỏi Bé AI</span>
                    </button>
                    <button
                      onClick={() => handleVoiceRecord('p1', setPart1Beginning, part1Beginning)}
                      className={`p-1.5 rounded-lg text-xs ${
                        activeVoiceField === 'p1' ? 'bg-rose-500 text-white animate-pulse' : 'bg-white text-slate-600'
                      }`}
                      title="Nói giọng nói"
                    >
                      <Mic className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <textarea
                  rows={2}
                  value={part1Beginning}
                  onChange={(e) => setPart1Beginning(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 bg-white text-sm focus:outline-none focus:border-sky-500"
                />
              </div>

              {/* Part 2: Khó khăn / Thử thách */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-amber-700 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px]">2</span>
                    Đoạn 2: Nhân vật gặp phải khó khăn gì?
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleAskAIInspiration('challenge')}
                      disabled={isAiLoading}
                      className="text-[11px] font-bold text-amber-700 hover:text-amber-800 bg-amber-100 px-2.5 py-1 rounded-lg flex items-center gap-1"
                    >
                      <Lightbulb className="w-3 h-3 text-amber-600" />
                      <span>Hỏi Bé AI</span>
                    </button>
                    <button
                      onClick={() => handleVoiceRecord('p2', setPart2Challenge, part2Challenge)}
                      className={`p-1.5 rounded-lg text-xs ${
                        activeVoiceField === 'p2' ? 'bg-rose-500 text-white animate-pulse' : 'bg-white text-slate-600'
                      }`}
                      title="Nói giọng nói"
                    >
                      <Mic className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <textarea
                  rows={2}
                  value={part2Challenge}
                  onChange={(e) => setPart2Challenge(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 bg-white text-sm focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Part 3: Giải quyết khó khăn */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-emerald-700 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px]">3</span>
                    Đoạn 3: Nhân vật giải quyết khó khăn ra sao?
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleAskAIInspiration('solution')}
                      disabled={isAiLoading}
                      className="text-[11px] font-bold text-amber-700 hover:text-amber-800 bg-amber-100 px-2.5 py-1 rounded-lg flex items-center gap-1"
                    >
                      <Lightbulb className="w-3 h-3 text-amber-600" />
                      <span>Hỏi Bé AI</span>
                    </button>
                    <button
                      onClick={() => handleVoiceRecord('p3', setPart3Solution, part3Solution)}
                      className={`p-1.5 rounded-lg text-xs ${
                        activeVoiceField === 'p3' ? 'bg-rose-500 text-white animate-pulse' : 'bg-white text-slate-600'
                      }`}
                      title="Nói giọng nói"
                    >
                      <Mic className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <textarea
                  rows={2}
                  value={part3Solution}
                  onChange={(e) => setPart3Solution(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 bg-white text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Part 4: Bài học rút ra */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-rose-700 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-rose-500 text-white flex items-center justify-center text-[10px]">4</span>
                    Đoạn 4: Câu chuyện mang đến bài học gì?
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleAskAIInspiration('lesson')}
                      disabled={isAiLoading}
                      className="text-[11px] font-bold text-amber-700 hover:text-amber-800 bg-amber-100 px-2.5 py-1 rounded-lg flex items-center gap-1"
                    >
                      <Lightbulb className="w-3 h-3 text-amber-600" />
                      <span>Hỏi Bé AI</span>
                    </button>
                    <button
                      onClick={() => handleVoiceRecord('p4', setPart4Lesson, part4Lesson)}
                      className={`p-1.5 rounded-lg text-xs ${
                        activeVoiceField === 'p4' ? 'bg-rose-500 text-white animate-pulse' : 'bg-white text-slate-600'
                      }`}
                      title="Nói giọng nói"
                    >
                      <Mic className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <textarea
                  rows={2}
                  value={part4Lesson}
                  onChange={(e) => setPart4Lesson(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 bg-white text-sm focus:outline-none focus:border-rose-500"
                />
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                onClick={() => setCurrentStep(2)}
                className="btn-3d bg-slate-100 hover:bg-slate-200 text-slate-700 font-black px-5 py-3 rounded-2xl flex items-center gap-2 text-sm cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Quay lại</span>
              </button>

              <button
                onClick={() => setCurrentStep(4)}
                className="btn-3d bg-gradient-to-r from-pink-500 to-rose-600 text-white font-black px-6 py-3 rounded-2xl shadow-md flex items-center gap-2 text-sm cursor-pointer"
              >
                <span>Xem trước & Xuất bản sách</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: TẠO SẢN PHẨM & XUẤT BẢN */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div className="text-center max-w-xl mx-auto space-y-1">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                Hoạt động 4: Tác phẩm hoàn chỉnh
              </span>
              <h3 className="text-2xl font-black text-slate-800 font-display">
                Cuốn Sách Truyện Của Em
              </h3>
              <p className="text-xs md:text-sm text-slate-500">
                Xem lại câu chuyện, in ra giấy hoặc gửi vào Vườn hoa sáng tạo lớp 3B.
              </p>
            </div>

            {/* Storybook Display Card (Print friendly) */}
            <div className="max-w-2xl mx-auto bg-gradient-to-b from-[#FFFDF9] to-[#FFF9F2] p-8 md:p-10 rounded-3xl border-4 border-amber-200 shadow-xl space-y-6 relative overflow-hidden">
              <div className="absolute top-3 right-3 text-3xl opacity-20">📖</div>

              {/* Story Book Cover Header */}
              <div className="text-center pb-4 border-b-2 border-amber-200/60 space-y-1">
                <span className="text-xs font-bold text-amber-800 uppercase tracking-widest bg-amber-100/80 px-3 py-0.5 rounded-full">
                  Bộ sưu tập sáng tác Lớp 3B
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-display mt-2">
                  {title}
                </h2>
                <p className="text-xs font-semibold text-slate-500">
                  Tác giả: Em Nguyễn Hoàng Nam • GVCN hướng dẫn: Cô Lê Phương Uyên
                </p>
              </div>

              {/* Character & Setting Tags */}
              <div className="flex items-center justify-center gap-3 text-xs font-bold text-slate-700">
                <span className="bg-pink-100 px-3 py-1 rounded-full border border-pink-200">
                  {selectedCharacter.icon} {selectedCharacter.name}
                </span>
                <span className="bg-purple-100 px-3 py-1 rounded-full border border-purple-200">
                  {selectedSetting.icon} {selectedSetting.name}
                </span>
              </div>

              {/* Story Content in Book Format */}
              <div className="space-y-4 text-slate-800 text-sm md:text-base leading-relaxed font-serif text-justify">
                <p className="indent-6">{part1Beginning}</p>
                <p className="indent-6">{part2Challenge}</p>
                <p className="indent-6">{part3Solution}</p>
                <div className="bg-amber-100/60 p-4 rounded-2xl border border-amber-300 font-sans text-xs md:text-sm text-amber-950 font-bold">
                  🌱 Bài học ý nghĩa: {part4Lesson}
                </div>
              </div>

              {/* Sign-off footer */}
              <div className="pt-4 border-t border-amber-200/60 flex items-center justify-between text-[11px] text-slate-400 font-sans font-bold">
                <span>Vườn Học Tập AI – Trường TH Khoái Châu 1</span>
                <span>Ngày hoàn thành: {new Date().toLocaleDateString('vi-VN')}</span>
              </div>
            </div>

            {/* Notification when saved */}
            {isSaved && (
              <div className="max-w-xl mx-auto bg-emerald-50 border-2 border-emerald-300 p-4 rounded-2xl flex items-center gap-3 text-emerald-900 text-xs md:text-sm font-bold">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>
                  Đã lưu truyện thành công và gửi tới cô giáo Uyên duyệt trưng bày tại Vườn hoa sáng tạo!
                </span>
              </div>
            )}

            {/* Action Buttons: Print, Share to Class Showcase, Edit */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <button
                onClick={() => setCurrentStep(3)}
                className="btn-3d bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-5 py-3 rounded-2xl flex items-center gap-2 text-xs md:text-sm cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Chỉnh sửa lại</span>
              </button>

              <button
                onClick={handlePrint}
                className="btn-3d bg-white hover:bg-slate-50 text-slate-800 border-2 border-slate-300 font-black px-5 py-3 rounded-2xl flex items-center gap-2 text-xs md:text-sm shadow-sm cursor-pointer"
              >
                <Printer className="w-4 h-4 text-slate-600" />
                <span>In sách truyện</span>
              </button>

              <button
                onClick={handleSaveStory}
                disabled={isSaved}
                className={`btn-3d font-black px-6 py-3 rounded-2xl shadow-md flex items-center gap-2 text-xs md:text-sm cursor-pointer ${
                  isSaved
                    ? 'bg-emerald-600 text-white cursor-default'
                    : 'bg-gradient-to-r from-pink-500 to-rose-600 text-white'
                }`}
              >
                <Share2 className="w-4 h-4" />
                <span>{isSaved ? 'Đã gửi duyệt' : 'Gửi vào Vườn hoa lớp 3B'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
