/**
 * Client service for Gemini AI Integration
 * Meets strict requirement:
 * - Does not expose API key to client
 * - Connects via server proxy /api/gemini/generate
 * - Honestly distinguishes real Gemini AI vs GDPT 2018 offline pedagogical template
 */

export interface GeminiResponse {
  text: string;
  isRealGemini: boolean;
  model: string;
  source: string;
}

export interface ApiStatus {
  available: boolean;
  model: string;
  provider: string;
}

export const checkGeminiStatus = async (): Promise<ApiStatus> => {
  try {
    const res = await fetch('/api/gemini/status');
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('Cannot reach Gemini status endpoint:', err);
  }
  return { available: false, model: 'gemini-3.8-flash', provider: 'Offline' };
};

const SYSTEM_INSTRUCTION_BE_AI = `
Bạn là "Bé AI - Người bạn học thông minh" đồng hành cùng học sinh lớp 3 trường Tiểu học Khoái Châu 1.
Nguyên tắc sư phạm cốt lõi:
1. "AI là công cụ hỗ trợ – Học sinh là trung tâm của hoạt động học tập."
2. KHÔNG LÀM BÀI HỘ HOẶC TIẾT LỘ NGAY ĐÁP ÁN. Luôn đặt câu hỏi gợi mở, chia nhỏ vấn đề để học sinh tự suy nghĩ và khám phá.
3. Sử dụng tiếng Việt chuẩn mực, giản dị, gần gũi, ấm áp và giàu cảm xúc cho trẻ em 8-9 tuổi (lớp 3).
4. Dùng các câu khen ngợi tích cực: "Bé AI rất khen ngợi em!", "Em đã đi đúng một nửa chặng đường rồi đấy!", "Thử lại một chút xíu nữa là đúng rồi nè!".
5. Bám sát chương trình GDPT 2018 của Bộ Giáo dục & Đào tạo.
`;

export const callGemini = async (
  prompt: string,
  customSystemInstruction?: string,
  fallbackProvider?: () => string
): Promise<GeminiResponse> => {
  try {
    const res = await fetch('/api/gemini/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        systemInstruction: customSystemInstruction || SYSTEM_INSTRUCTION_BE_AI,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.text) {
        return {
          text: data.text,
          isRealGemini: true,
          model: 'gemini-3.8-flash',
          source: 'Gemini 3.8 Flash (Trí tuệ nhân tạo trực tiếp)'
        };
      }
    }
  } catch (err) {
    console.warn('Calling server Gemini failed, falling back to GDPT 2018 pedagogical curriculum:', err);
  }

  // Graceful pedagogical fallback when GEMINI_API_KEY is not configured
  const fallbackText = fallbackProvider ? fallbackProvider() : getGeneralPedagogicalFallback(prompt);
  return {
    text: fallbackText,
    isRealGemini: false,
    model: 'Kho học liệu chuẩn GDPT 2018',
    source: 'Học liệu sư phạm chuẩn GDPT 2018 (Bé AI ngoại tuyến - Chưa kết nối khóa API)'
  };
};

function getGeneralPedagogicalFallback(prompt: string): string {
  const p = prompt.toLowerCase();
  if (p.includes('toán') || p.includes('phép tính') || p.includes('chia') || p.includes('nhân')) {
    return '🌱 Gợi ý từ Bé AI: Em hãy đọc thật kỹ đề bài nhé! Xác định xem bài toán cho biết gì và hỏi điều gì. Với phép tính này, em hãy nhớ lại bảng nhân chia hoặc tính nhẩm từ hàng đơn vị trước. Em thử tính lại một lần nữa xem sao nhé!';
  }
  if (p.includes('đọc hiểu') || p.includes('bài đọc') || p.includes('câu chuyện')) {
    return '📖 Gợi ý từ Bé AI: Bạn nhỏ ơi, em hãy đọc lướt lại đoạn văn có chứa từ khóa của câu hỏi. Tìm những chi tiết miêu tả hành động và cảm xúc của nhân vật để đưa ra câu trả lời đầy đủ và giàu ý nghĩa nhất nhé!';
  }
  if (p.includes('kể chuyện') || p.includes('nhân vật')) {
    return '✨ Gợi ý từ Bé AI: Câu chuyện của em sẽ rất hay đấy! Em hãy tưởng tượng nhân vật chính gặp phải một thử thách bất ngờ (ví dụ: bị lạc đường, gặp mưa to, hoặc cần giải một câu đố). Sau đó, ai đã xuất hiện giúp đỡ nhân vật và bạn ấy học được điều gì quý giá?';
  }
  return '🌟 Bé AI chào em! Em đang làm rất tốt đấy. Hãy tiếp tục suy nghĩ và đặt thêm câu hỏi nếu em cần Bé AI hỗ trợ thêm nhé!';
}

export const generateTeacherCommentsAI = async (
  studentName: string,
  strengths: string[],
  needsImprovement: string[],
  recentScore: number
): Promise<GeminiResponse> => {
  const prompt = `Viết một lời nhận xét học bạ tiểu học theo đúng tinh thần Thông tư 27/2020/TT-BGDĐT cho học sinh lớp 3:
- Tên học sinh: ${studentName}
- Điểm mạnh: ${strengths.join(', ')}
- Nội dung cần rèn luyện: ${needsImprovement.join(', ')}
- Tỉ lệ hoàn thành bài tập: ${recentScore}%
Yêu cầu: Ngắn gọn (2-3 câu), chuẩn mực sư phạm, khen ngợi sự nỗ lực, chỉ rõ hướng rèn luyện nhẹ nhàng, tôn trọng sự tiến bộ cá nhân của học sinh.`;

  return callGemini(
    prompt,
    'Bạn là chuyên gia sư phạm tiểu học, am hiểu sâu sắc Thông tư 27/2020/TT-BGDĐT của Bộ GD&ĐT Việt Nam.',
    () => `Em ${studentName} có ý thức học tập chăm chỉ, tích cực tương tác và phát huy tốt các điểm mạnh (${strengths.slice(0, 2).join(', ')}). Em cần tiếp tục rèn luyện thêm về ${needsImprovement[0] || 'kỹ năng tính nhẩm'} để đạt kết quả xuất sắc hơn trong học kỳ này.`
  );
};

export const generateLessonQuizAI = async (
  subject: string,
  topic: string,
  questionCount: number,
  tier: string
): Promise<GeminiResponse> => {
  const prompt = `Đề xuất ${questionCount} câu hỏi môn ${subject} chủ đề "${topic}" dành cho học sinh lớp 3 (mức độ: ${tier}) bám sát chương trình GDPT 2018.
Mỗi câu hỏi gồm:
1. Nội dung câu hỏi
2. 4 lựa chọn (A, B, C, D)
3. Đáp án đúng
4. Lời giải thích & gợi ý sư phạm cho Bé AI hướng dẫn học sinh khi trả lời sai.`;

  return callGemini(
    prompt,
    'Bạn là chuyên gia biên soạn sách giáo khoa và học liệu tiểu học lớp 3 GDPT 2018.',
    () => `[ĐỀ XUẤT HỌC LIỆU GDPT 2018 - MÔN ${subject.toUpperCase()}]
Chủ đề: ${topic} (Mức độ: ${tier})

Câu 1: Một mảnh vườn hình chữ nhật có chiều dài 15 m, chiều rộng 8 m. Chu vi của mảnh vườn đó là:
A. 23 m
B. 46 m
C. 120 m
D. 30 m
* Đáp án đúng: B (46 m)
* Gợi ý của Bé AI: "Chu vi hình chữ nhật bằng (chiều dài + chiều rộng) nhân đôi đó em!"

Câu 2: Bạn An có 24 bông hoa, bạn chia đều cho 3 lọ hoa. Hỏi mỗi lọ có bao nhiêu bông hoa?
A. 6 bông
B. 7 bông
C. 8 bông
D. 9 bông
* Đáp án đúng: C (8 bông)
* Gợi ý của Bé AI: "Chia đều 24 bông cho 3 lọ là phép chia 24 : 3 nhé!"`
  );
};
