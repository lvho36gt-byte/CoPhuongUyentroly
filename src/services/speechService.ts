/**
 * Speech Synthesis & Recognition Services for Grade 3 Vietnamese EdTech
 */

let currentUtterance: SpeechSynthesisUtterance | null = null;

export const isSpeechSynthesisSupported = (): boolean => {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
};

export const isSpeechRecognitionSupported = (): boolean => {
  return typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window);
};

export const stopSpeaking = (): void => {
  if (isSpeechSynthesisSupported()) {
    window.speechSynthesis.cancel();
    currentUtterance = null;
  }
};

export const speakVietnamese = (text: string, onEnd?: () => void): void => {
  if (!isSpeechSynthesisSupported()) {
    console.warn('Speech synthesis not supported in this browser.');
    if (onEnd) onEnd();
    return;
  }

  stopSpeaking();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'vi-VN';
  utterance.rate = 0.92; // Slightly gentler pace for 8-9 year old primary students
  utterance.pitch = 1.05; // Friendly and cheerful tone

  // Attempt to select Vietnamese voice if available
  const voices = window.speechSynthesis.getVoices();
  const viVoice = voices.find(v => v.lang.includes('vi') || v.lang.includes('VI'));
  if (viVoice) {
    utterance.voice = viVoice;
  }

  utterance.onend = () => {
    currentUtterance = null;
    if (onEnd) onEnd();
  };

  utterance.onerror = (e) => {
    console.warn('Speech synthesis error:', e);
    currentUtterance = null;
    if (onEnd) onEnd();
  };

  currentUtterance = utterance;
  window.speechSynthesis.speak(utterance);
};

export const startVoiceRecognition = (
  onResult: (transcript: string) => void,
  onError?: (err: any) => void
): (() => void) => {
  if (!isSpeechRecognitionSupported()) {
    if (onError) onError(new Error('Trình duyệt chưa hỗ trợ ghi âm trực tiếp.'));
    return () => {};
  }

  const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.lang = 'vi-VN';
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.onresult = (event: any) => {
    if (event.results && event.results[0] && event.results[0][0]) {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
    }
  };

  recognition.onerror = (event: any) => {
    console.warn('Speech recognition error:', event);
    if (onError) onError(event);
  };

  try {
    recognition.start();
  } catch (err) {
    if (onError) onError(err);
  }

  return () => {
    try {
      recognition.stop();
    } catch (_) {}
  };
};
