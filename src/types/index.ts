export type UserRole = 'student' | 'teacher' | 'parent' | 'judge';

export interface Student {
  id: string;
  name: string;
  avatar: string;
  gender: 'nam' | 'nu';
  class: string;
  stars: number;
  completedTasks: number;
  totalQuizzes: number;
  accuracyRate: number; // percentage
  badges: string[];
  skills: {
    reading: number; // 0 - 100
    math: number;
    logic: number;
    creativity: number;
    diligence: number;
  };
  strengths: string[];
  needsImprovement: string[];
  recentActivity: string;
  circular27Note?: string;
  isConfirmedNote?: boolean;
}

export type QuestionLevel = 1 | 2 | 3 | 4; // 1: Nhận biết, 2: Thông hiểu, 3: Vận dụng, 4: Sáng tạo

export interface ReadingQuestion {
  id: string;
  level: QuestionLevel;
  levelLabel: string;
  question: string;
  options?: string[]; // If multiple choice
  correctOptionIndex?: number;
  sampleAnswer: string;
  aiHint: string;
  explanation: string;
}

export interface ReadingPassage {
  id: string;
  title: string;
  topic: string;
  author: string;
  estimatedMinutes: number;
  imageUrl: string;
  badgeIcon: string;
  content: string[]; // Paragraphs
  audioText: string;
  vocabulary: {
    word: string;
    meaning: string;
  }[];
  questions: ReadingQuestion[];
}

export type MathTier = 'hat_mam' | 'mam_xanh' | 'hoa_tri_thuc'; // Basic, Intermediate, Advanced

export interface MathQuestion {
  id: string;
  topicId: string;
  tier: MathTier;
  tierName: string;
  question: string;
  imageUrl?: string;
  type: 'multiple_choice' | 'fill_in' | 'matching';
  options?: string[];
  correctAnswer: string | number;
  aiHint: string;
  explanation: string;
}

export interface MathTopic {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  badge: string;
  questionCount: number;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  requirement: string;
}

export interface CreativeProduct {
  id: string;
  title: string;
  category: 'doc_hieu' | 'toan_tinh_huong' | 'so_do_tu_duy' | 'truyen_tranh' | 'so_tay' | 'khac';
  categoryLabel: string;
  author: string;
  studentId: string;
  date: string;
  imageUrl: string;
  description: string;
  content?: string;
  status: 'approved' | 'pending';
  likes: number;
}

export interface ParentActivity {
  id: string;
  title: string;
  durationMinutes: number;
  category: 'doc_sach' | 'toan_thuc_te' | 'giao_tiep' | 'khoa_hoc';
  description: string;
  instructions: string[];
  aiTip: string;
}

export interface TeacherAssignment {
  id: string;
  title: string;
  subject: 'Toán' | 'Tiếng Việt' | 'Sáng tạo';
  targetGroup: 'all' | 'need_help' | 'gifted';
  deadline: string;
  assignedCount: number;
  completedCount: number;
  notes: string;
}
