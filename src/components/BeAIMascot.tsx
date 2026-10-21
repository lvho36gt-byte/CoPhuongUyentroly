import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles, MessageCircleHeart } from 'lucide-react';
import { speakVietnamese, stopSpeaking } from '../services/speechService';

interface BeAIMascotProps {
  message?: string;
  subMessage?: string;
  size?: 'sm' | 'md' | 'lg';
  isFloating?: boolean;
  onTalk?: () => void;
  className?: string;
}

export const BeAIMascot: React.FC<BeAIMascotProps> = ({
  message = 'Chào bạn nhỏ! Mình là Bé AI, người bạn đồng hành của lớp 3B đây!',
  subMessage,
  size = 'md',
  isFloating = false,
  className = ''
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleToggleSpeak = () => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      speakVietnamese(message + (subMessage ? ` ${subMessage}` : ''), () => {
        setIsSpeaking(false);
      });
    }
  };

  const getRobotDimensions = () => {
    switch (size) {
      case 'sm':
        return 'w-16 h-16';
      case 'lg':
        return 'w-32 h-32 md:w-36 md:h-36';
      default:
        return 'w-24 h-24 md:w-28 md:h-28';
    }
  };

  return (
    <div className={`flex items-start gap-4 ${isFloating ? 'animate-float' : ''} ${className}`}>
      {/* 3D-feel SVG Cute AI Robot */}
      <div className="relative group shrink-0">
        <div className={`relative ${getRobotDimensions()} transition-transform duration-300 group-hover:scale-105`}>
          <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-xl" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4FACFE" />
                <stop offset="100%" stopColor="#0877E8" />
              </linearGradient>
              <linearGradient id="faceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1E293B" />
                <stop offset="100%" stopColor="#0F172A" />
              </linearGradient>
              <linearGradient id="earGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF9545" />
                <stop offset="100%" stopColor="#FF5B9D" />
              </linearGradient>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Antenna */}
            <line x1="80" y1="32" x2="80" y2="14" stroke="#94A3B8" strokeWidth="4" strokeLinecap="round" />
            <circle cx="80" cy="12" r="7" fill="#FFD447" className="animate-pulse" filter="url(#glow)" />

            {/* Left Ear / Headphone */}
            <rect x="18" y="55" width="12" height="30" rx="6" fill="url(#earGrad)" />
            {/* Right Ear / Headphone */}
            <rect x="130" y="55" width="12" height="30" rx="6" fill="url(#earGrad)" />

            {/* Robot Head Body */}
            <rect x="26" y="32" width="108" height="84" rx="28" fill="url(#bodyGrad)" stroke="#FFFFFF" strokeWidth="3" />

            {/* Visor / Face Screen */}
            <rect x="38" y="44" width="84" height="60" rx="18" fill="url(#faceGrad)" />

            {/* Sparkling Blue Eyes */}
            <ellipse cx="60" cy="70" rx="10" ry="12" fill="#38BDF8" filter="url(#glow)" />
            <circle cx="63" cy="67" r="4" fill="#FFFFFF" />
            <circle cx="58" cy="74" r="1.5" fill="#FFFFFF" />

            <ellipse cx="100" cy="70" rx="10" ry="12" fill="#38BDF8" filter="url(#glow)" />
            <circle cx="103" cy="67" r="4" fill="#FFFFFF" />
            <circle cx="98" cy="74" r="1.5" fill="#FFFFFF" />

            {/* Rosy Cheeks */}
            <ellipse cx="48" cy="85" rx="5" ry="3" fill="#FF5B9D" opacity="0.8" />
            <ellipse cx="112" cy="85" rx="5" ry="3" fill="#FF5B9D" opacity="0.8" />

            {/* Cheerful Smiling Mouth */}
            <path d="M72 86 Q80 94 88 86" stroke="#35C96D" strokeWidth="3" strokeLinecap="round" fill="none" />

            {/* Cute Hands Waving */}
            <circle cx="20" cy="98" r="9" fill="#0877E8" stroke="#FFFFFF" strokeWidth="2" />
            <circle cx="140" cy="88" r="9" fill="#0877E8" stroke="#FFFFFF" strokeWidth="2" className="animate-bounce" />

            {/* Collar Star */}
            <polygon points="80,122 83,128 89,129 84,133 86,139 80,136 74,139 76,133 71,129 77,128" fill="#FFD447" />
          </svg>

          {/* Active Voice Pulse indicator */}
          {isSpeaking && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500"></span>
            </span>
          )}
        </div>

        {/* Voice Read-Aloud Button */}
        <button
          onClick={handleToggleSpeak}
          title={isSpeaking ? 'Dừng đọc' : 'Nghe Bé AI nói'}
          className={`mt-2 mx-auto flex items-center justify-center gap-1 text-xs px-2.5 py-1 rounded-full font-bold shadow-md transition-all ${
            isSpeaking
              ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse'
              : 'bg-white hover:bg-sky-50 text-sky-700 border border-sky-200'
          }`}
        >
          {isSpeaking ? (
            <>
              <VolumeX className="w-3.5 h-3.5" />
              <span>Dừng</span>
            </>
          ) : (
            <>
              <Volume2 className="w-3.5 h-3.5" />
              <span>Nghe giọng</span>
            </>
          )}
        </button>
      </div>

      {/* Speech Bubble with friendly advice */}
      {message && (
        <div className="flex-1 bg-white border-2 border-sky-100 rounded-2xl p-4 shadow-lg shadow-sky-100/50 relative">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1.5 text-xs font-black tracking-wide uppercase text-sky-600">
              <MessageCircleHeart className="w-4 h-4 text-pink-500" />
              <span>Bé AI Nhắn Nhủ:</span>
            </div>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
              <Sparkles className="w-3 h-3 text-amber-500" />
              Bạn đồng hành Lớp 3B
            </span>
          </div>

          <p className="text-slate-700 text-sm md:text-base font-semibold leading-relaxed">
            {message}
          </p>

          {subMessage && (
            <p className="text-xs md:text-sm text-slate-500 mt-2 pt-2 border-t border-slate-100 italic">
              💡 {subMessage}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
