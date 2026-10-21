import { Student, ReadingPassage, MathQuestion, MathTopic, Badge, CreativeProduct, ParentActivity, TeacherAssignment } from '../types';

export const TEACHER_INFO = {
  name: 'Lê Phương Uyên',
  school: 'Trường Tiểu học Khoái Châu 1',
  classroom: 'Lớp 3B',
  schoolYear: '2025 - 2026',
  program: 'Chương trình GDPT 2018',
  slogan: 'Học vui mỗi ngày – Tự tin khám phá – Sáng tạo cùng AI',
  coreMessage: 'AI là công cụ hỗ trợ – Học sinh là trung tâm của hoạt động học tập.'
};

export const BADGES: Badge[] = [
  {
    id: 'b1',
    title: 'Ngôi sao chăm chỉ',
    description: 'Hoàn thành bài tập 5 ngày liên tiếp trong tuần.',
    icon: '⭐',
    color: 'from-amber-400 to-yellow-500',
    requirement: 'Học đều đặn 5 bài tập'
  },
  {
    id: 'b2',
    title: 'Nhà toán học nhí',
    description: 'Chinh phục 10 bài toán tư duy với độ chính xác trên 80%.',
    icon: '🧮',
    color: 'from-blue-500 to-indigo-600',
    requirement: 'Hoàn thành 10 bài toán'
  },
  {
    id: 'b3',
    title: 'Bạn đọc thông minh',
    description: 'Đọc hiểu xuất sắc 5 văn bản và trả lời câu hỏi vận dụng.',
    icon: '📖',
    color: 'from-emerald-400 to-green-600',
    requirement: 'Đạt điểm cao 5 bài đọc'
  },
  {
    id: 'b4',
    title: 'Nhà kể chuyện sáng tạo',
    description: 'Sáng tác và hoàn thiện 1 câu chuyện hoàn chỉnh tại Xưởng Kể Chuyện.',
    icon: '🎨',
    color: 'from-pink-400 to-rose-500',
    requirement: 'Viết 1 câu chuyện'
  },
  {
    id: 'b5',
    title: 'Chiến binh kiên trì',
    description: 'Không nản lòng khi gặp bài khó, tự sửa đúng sau gợi ý của Bé AI.',
    icon: '🛡️',
    color: 'from-purple-500 to-violet-600',
    requirement: 'Tự sửa bài đúng sau gợi ý'
  },
  {
    id: 'b6',
    title: 'Bông hoa tiến bộ',
    description: 'Có sự cải thiện vượt bậc về tốc độ và chất lượng học tập.',
    icon: '🌸',
    color: 'from-orange-400 to-amber-500',
    requirement: 'Tăng 15% độ chính xác'
  }
];

export const STUDENTS_MOCK: Student[] = [
  {
    id: 'hs1',
    name: 'Nguyễn Hoàng Nam',
    avatar: '👦',
    gender: 'nam',
    class: '3B',
    stars: 88,
    completedTasks: 18,
    totalQuizzes: 20,
    accuracyRate: 90,
    badges: ['b1', 'b2', 'b3', 'b5'],
    skills: { reading: 85, math: 95, logic: 90, creativity: 80, diligence: 92 },
    strengths: ['Tính toán nhẩm nhanh', 'Ham học hỏi', 'Tư duy hình học tốt'],
    needsImprovement: ['Cần đọc kỹ đề bài toán có lời văn'],
    recentActivity: 'Vừa hoàn thành bài tập: Bảng nhân 7',
    circular27Note: 'Em Nam nắm chắc kiến thức Toán, tính nhẩm nhanh và chủ động trong giờ học. Cần rèn thêm kỹ năng đọc diễn cảm trong môn Tiếng Việt.',
    isConfirmedNote: true
  },
  {
    id: 'hs2',
    name: 'Trần Mai Anh',
    avatar: '👧',
    gender: 'nu',
    class: '3B',
    stars: 95,
    completedTasks: 22,
    totalQuizzes: 24,
    accuracyRate: 92,
    badges: ['b1', 'b3', 'b4', 'b6'],
    skills: { reading: 96, math: 85, logic: 88, creativity: 95, diligence: 94 },
    strengths: ['Đọc diễn cảm xuất sắc', 'Sáng tác truyện giàu trí tưởng tượng', 'Chăm chỉ'],
    needsImprovement: ['Rèn luyện thêm phép chia có dư'],
    recentActivity: 'Vừa hoàn thành truyện: Chú thỏ trắng và khu vườn bí mật',
    circular27Note: 'Em Mai Anh có năng khiếu viết văn, ngôn từ trong sáng, giàu cảm xúc. Tích cực tham gia xây dựng bài, có ý thức giúp đỡ bạn bè.',
    isConfirmedNote: true
  },
  {
    id: 'hs3',
    name: 'Lê Bảo Long',
    avatar: '👦',
    gender: 'nam',
    class: '3B',
    stars: 72,
    completedTasks: 14,
    totalQuizzes: 18,
    accuracyRate: 78,
    badges: ['b1', 'b5'],
    skills: { reading: 75, math: 80, logic: 78, creativity: 70, diligence: 85 },
    strengths: ['Kiên trì sửa bài khi có gợi ý', 'Thích vẽ sơ đồ tư duy'],
    needsImprovement: ['Cần củng cố phép cộng trừ có nhớ trong phạm vi 1000'],
    recentActivity: 'Luyện tập: Phép cộng có nhớ',
    circular27Note: 'Em Long có nhiều cố gắng trong học tập, biết lắng nghe gợi ý của giáo viên và Bé AI để tự sửa lỗi. Cần tự tin hơn khi phát biểu.',
    isConfirmedNote: false
  },
  {
    id: 'hs4',
    name: 'Phạm Thuỳ Linh',
    avatar: '👧',
    gender: 'nu',
    class: '3B',
    stars: 84,
    completedTasks: 17,
    totalQuizzes: 19,
    accuracyRate: 89,
    badges: ['b1', 'b3', 'b6'],
    skills: { reading: 90, math: 82, logic: 85, creativity: 88, diligence: 90 },
    strengths: ['Chữ viết nắn nót', 'Đọc hiểu tốt câu hỏi vận dụng'],
    needsImprovement: ['Cần đẩy nhanh tốc độ tính toán'],
    recentActivity: 'Hoàn thành bài đọc: Bó hoa tặng cô',
    circular27Note: 'Em Linh chăm chỉ, cẩn thận trong từng bài làm. Đọc hiểu bài nhanh và rút ra bài học ý nghĩa.',
    isConfirmedNote: true
  },
  {
    id: 'hs5',
    name: 'Vũ Đức Minh',
    avatar: '👦',
    gender: 'nam',
    class: '3B',
    stars: 65,
    completedTasks: 12,
    totalQuizzes: 16,
    accuracyRate: 75,
    badges: ['b5'],
    skills: { reading: 70, math: 76, logic: 74, creativity: 82, diligence: 78 },
    strengths: ['Tò mò, thích công nghệ', 'Sáng tạo trong vẽ tranh'],
    needsImprovement: ['Cần tập trung hơn khi làm bài toán nhiều bước'],
    recentActivity: 'Luyện tập: Hình học và góc vuông',
    circular27Note: 'Em Minh nhanh nhẹn, sáng tạo. Cần rèn tính kiên nhẫn khi đọc các bài toán dài.',
    isConfirmedNote: false
  },
  {
    id: 'hs6',
    name: 'Hoàng Kim Ngân',
    avatar: '👧',
    gender: 'nu',
    class: '3B',
    stars: 90,
    completedTasks: 20,
    totalQuizzes: 21,
    accuracyRate: 95,
    badges: ['b1', 'b2', 'b3', 'b4'],
    skills: { reading: 92, math: 94, logic: 92, creativity: 90, diligence: 96 },
    strengths: ['Học đều các môn', 'Ý thức tự giác rất cao'],
    needsImprovement: ['Nên thử sức nhiều hơn ở câu hỏi sáng tạo mở'],
    recentActivity: 'Hoàn thành: Toán tư duy hình khối',
    circular27Note: 'Em Ngân học lực xuất sắc, tư duy toàn diện, hoàn thành tốt mọi nhiệm vụ được giao.',
    isConfirmedNote: true
  },
  {
    id: 'hs7',
    name: 'Đặng Tuấn Kiệt',
    avatar: '👦',
    gender: 'nam',
    class: '3B',
    stars: 70,
    completedTasks: 13,
    totalQuizzes: 17,
    accuracyRate: 76,
    badges: ['b6'],
    skills: { reading: 72, math: 80, logic: 75, creativity: 75, diligence: 80 },
    strengths: ['Tiến bộ rõ rệt so với đầu năm', 'Thích làm bài toán đố'],
    needsImprovement: ['Cần rèn thêm kỹ năng diễn đạt câu'],
    recentActivity: 'Luyện tập: Bảng chia 8',
    circular27Note: 'Em Kiệt có sự tiến bộ vượt bậc, đã tự tin giải các bài toán nhân chia cơ bản.',
    isConfirmedNote: false
  },
  {
    id: 'hs8',
    name: 'Ngô Hà Phương',
    avatar: '👧',
    gender: 'nu',
    class: '3B',
    stars: 82,
    completedTasks: 16,
    totalQuizzes: 18,
    accuracyRate: 88,
    badges: ['b1', 'b3'],
    skills: { reading: 90, math: 84, logic: 82, creativity: 86, diligence: 88 },
    strengths: ['Giọng đọc to rõ', 'Yêu thích các câu chuyện về thiên nhiên'],
    needsImprovement: ['Cần chú ý đơn vị đo độ dài mm, cm'],
    recentActivity: 'Hoàn thành bài đọc: Ước mơ của hạt mầm nhỏ',
    circular27Note: 'Em Phương chăm ngoan, biết yêu quý môi trường, bài viết sạch đẹp.',
    isConfirmedNote: true
  },
  {
    id: 'hs9',
    name: 'Bùi Gia Huy',
    avatar: '👦',
    gender: 'nam',
    class: '3B',
    stars: 78,
    completedTasks: 15,
    totalQuizzes: 18,
    accuracyRate: 83,
    badges: ['b2', 'b5'],
    skills: { reading: 78, math: 88, logic: 85, creativity: 78, diligence: 82 },
    strengths: ['Thích giải câu đố logic', 'Nắm vững bảng cửu chương'],
    needsImprovement: ['Cần đọc kỹ yêu cầu bài tiếng Việt'],
    recentActivity: 'Hoàn thành: Bài toán tính chu vi hình vuông',
    circular27Note: 'Em Huy tư duy toán tốt, tính toán chuẩn xác. Cần chú ý thêm lỗi chính tả khi viết câu.',
    isConfirmedNote: false
  },
  {
    id: 'hs10',
    name: 'Dương Thảo My',
    avatar: '👧',
    gender: 'nu',
    class: '3B',
    stars: 86,
    completedTasks: 19,
    totalQuizzes: 21,
    accuracyRate: 90,
    badges: ['b1', 'b4', 'b6'],
    skills: { reading: 92, math: 86, logic: 85, creativity: 94, diligence: 90 },
    strengths: ['Kể chuyện truyền cảm', 'Khéo tay, vẽ đẹp'],
    needsImprovement: ['Cần rèn thêm kỹ năng tính nhẩm nhanh'],
    recentActivity: 'Gửi sản phẩm: Sơ đồ tư duy Gia đình yêu thương',
    circular27Note: 'Em My có khiếu thẩm mỹ và khả năng sáng tạo cao. Nhiệt tình trong các hoạt động nhóm.',
    isConfirmedNote: true
  }
];

export const READING_PASSAGES: ReadingPassage[] = [
  {
    id: 'rd1',
    title: 'Ngôi trường thân yêu của em',
    topic: 'Mái trường thân yêu',
    author: 'Phỏng tác GDPT 2018',
    estimatedMinutes: 7,
    imageUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=600&q=80',
    badgeIcon: '🏫',
    audioText: 'Ngôi trường của em nằm nép mình bên rặng tre xanh. Mỗi buổi sáng sớm, tiếng trống trường vang lên rộn rã như giục giã chúng em nhanh bước. Trong sân trường, những tán phượng vĩ và bàng xòe bóng mát cho chúng em vui chơi. Dưới sự dạy dỗ tận tình của các thầy cô giáo, lớp 3B của chúng em luôn ngập tràn tiếng cười và tình yêu thương bạn bè.',
    content: [
      'Ngôi trường của em nằm nép mình bên rặng tre xanh mát. Mỗi buổi sáng sớm, tiếng trống trường vang lên từng hồi rộn rã như giục giã chúng em nhanh bước chân vào lớp.',
      'Sân trường rợp bóng những hàng bàng và phượng vĩ. Giờ ra chơi, chúng em cùng nhau đọc sách dưới gốc cây, chơi trò nhảy dây và chia sẻ những câu chuyện vui.',
      'Lớp học 3B của chúng em luôn sạch sẽ, ngăn nắp. Trên tường có góc trưng bày “Bông hoa điểm tốt” và tranh vẽ của cả lớp. Dưới sự dìu dắt tận tình của cô giáo Uyên, chúng em ngày càng tự tin, biết yêu quý thầy cô và gắn bó với bạn bè.'
    ],
    vocabulary: [
      { word: 'Rộn rã', meaning: 'Âm thanh vang lên liên tiếp, vui vẻ và sôi nổi.' },
      { word: 'Ngăn nắp', meaning: 'Được sắp xếp gọn gàng, có thứ tự đâu ra đấy.' },
      { word: 'Tận tình', meaning: 'Hết lòng chăm lo, dạy dỗ chu đáo và ân cần.' }
    ],
    questions: [
      {
        id: 'q1',
        level: 1,
        levelLabel: 'Mức 1: Nhận biết',
        question: 'Ngôi trường của bạn nhỏ nằm ở đâu?',
        options: [
          'Nép mình bên bờ sông lớn',
          'Nép mình bên rặng tre xanh mát',
          'Nằm ngay cạnh chợ thị trấn',
          'Nằm trên ngọn đồi cao'
        ],
        correctOptionIndex: 1,
        sampleAnswer: 'Ngôi trường nằm nép mình bên rặng tre xanh mát.',
        aiHint: 'Em hãy đọc lại câu đầu tiên của đoạn 1 nhé!',
        explanation: 'Câu mở đầu đoạn 1 nêu rõ: "Ngôi trường của em nằm nép mình bên rặng tre xanh mát."'
      },
      {
        id: 'q2',
        level: 2,
        levelLabel: 'Mức 2: Thông hiểu',
        question: 'Giờ ra chơi, các bạn học sinh thường làm gì dưới bóng cây sân trường?',
        options: [
          'Chỉ ngồi im một chỗ đợi vào lớp',
          'Chạy ra cổng trường mua đồ ăn vặt',
          'Đọc sách, chơi nhảy dây và chia sẻ chuyện vui',
          'Tập thể dục nhịp điệu cùng thầy cô'
        ],
        correctOptionIndex: 2,
        sampleAnswer: 'Các bạn cùng nhau đọc sách dưới gốc cây, chơi nhảy dây và chia sẻ chuyện vui.',
        aiHint: 'Em hãy tìm từ khóa "Giờ ra chơi" ở đoạn thứ 2.',
        explanation: 'Đoạn 2 nhắc đến việc đọc sách dưới gốc cây, chơi trò nhảy dây và kể chuyện vui.'
      },
      {
        id: 'q3',
        level: 3,
        levelLabel: 'Mức 3: Vận dụng',
        question: 'Để giữ gìn lớp học luôn sạch đẹp như lớp 3B, em và các bạn nên làm những việc gì?',
        options: [
          'Để rác dưới hộc bàn cho tiện',
          'Tự giác trực nhật, bỏ rác đúng nơi quy định và kê ngay ngắn bàn ghế',
          'Chỉ dọn dẹp khi cô giáo nhắc nhở',
          'Vẽ hình lên mặt bàn để trang trí'
        ],
        correctOptionIndex: 1,
        sampleAnswer: 'Em sẽ tự giác trực nhật sạch sẽ, vứt rác đúng nơi quy định, kê bàn ghế ngay ngắn và giữ gìn góc học tập.',
        aiHint: 'Em hãy liên hệ với những việc bản thân vẫn làm hàng ngày khi ở lớp học nhé!',
        explanation: 'Trực nhật, giữ vệ sinh chung và xếp bàn ghế ngay ngắn là hành động thiết thực của học sinh.'
      },
      {
        id: 'q4',
        level: 4,
        levelLabel: 'Mức 4: Sáng tạo',
        question: 'Nếu được giới thiệu về lớp học của mình với một người bạn mới đến, em sẽ nói điều gì yêu thích nhất?',
        options: [
          'Em sẽ kể về góc trưng bày bài học và tình cảm ấm áp của cô giáo cùng bạn bè',
          'Em sẽ không nói gì cả',
          'Em chỉ nói lớp mình rất đông bạn',
          'Em sẽ bảo bạn tự đi tìm hiểu'
        ],
        correctOptionIndex: 0,
        sampleAnswer: 'Em sẽ tự hào giới thiệu lớp mình có cô giáo rất hiền, các bạn đoàn kết và góc học tập nhiều sản phẩm sáng tạo.',
        aiHint: 'Bé AI khuyên em hãy chọn những nét đẹp nhất, đáng tự hào nhất về tình thầy trò và bạn bè nhé!',
        explanation: 'Câu trả lời thể hiện tình cảm yêu quý lớp học và tinh thần mến khách.'
      }
    ]
  },
  {
    id: 'rd2',
    title: 'Bó hoa tặng cô',
    topic: 'Tình cảm thầy trò',
    author: 'Truyện đọc Tiểu học',
    estimatedMinutes: 6,
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80',
    badgeIcon: '💐',
    audioText: 'Nhân ngày Nhà giáo Việt Nam hai mươi tháng mười một, các bạn học sinh lớp 3 rủ nhau đi hái những bông hoa đồng nội rực rỡ nhất để tặng cô giáo. Bó hoa có hoa cúc vàng, hoa xuyến chi trắng và những nhánh cỏ may tím biếc. Nhận bó hoa đơn sơ nhưng chứa chan tình cảm, đôi mắt cô lấp lánh niềm vui. Cô ôm từng bạn vào lòng và nói: Các con chính là những bông hoa đẹp nhất của cô.',
    content: [
      'Nhân ngày Nhà giáo Việt Nam 20 - 11, các bạn nhỏ lớp 3 rủ nhau ra triền đê sau làng để hái những bông hoa đồng nội rực rỡ nhất tặng cô giáo.',
      'Bó hoa có những cánh hoa cúc dại vàng ươm như ánh nắng, hoa xuyến chi trắng muốt và những cọng cỏ may tím biếc được buộc gọn gàng bằng sợi rơm vàng.',
      'Khi các bạn mang bó hoa đến lớp, cô giáo vô cùng ngạc nhiên và xúc động. Đôi mắt cô lấp lánh niềm hạnh phúc. Cô mỉm cười hiền hậu, ôm từng bạn vào lòng và nói: "Cảm ơn các con! Những bông hoa điểm mười và sự tiến bộ từng ngày của các con chính là bó hoa đẹp nhất dành tặng cô."'
    ],
    vocabulary: [
      { word: 'Đồng nội', meaning: 'Khu vực đồng cỏ, ruộng vườn tự nhiên ở làng quê.' },
      { word: 'Xúc động', meaning: 'Cảm giác rung động sâu sắc trong lòng khi gặp điều đáng quý.' },
      { word: 'Hiền hậu', meaning: 'Hiền lành và nhân hậu, tốt bụng.' }
    ],
    questions: [
      {
        id: 'q2_1',
        level: 1,
        levelLabel: 'Mức 1: Nhận biết',
        question: 'Các bạn nhỏ hái hoa tặng cô nhân dịp ngày lễ nào?',
        options: [
          'Ngày Quốc tế Thiếu nhi 1 - 6',
          'Ngày Nhà giáo Việt Nam 20 - 11',
          'Ngày Phụ nữ Việt Nam 20 - 10',
          'Tết Trung thu'
        ],
        correctOptionIndex: 1,
        sampleAnswer: 'Các bạn hái hoa tặng cô nhân ngày Nhà giáo Việt Nam 20 - 11.',
        aiHint: 'Đoạn đầu tiên nhắc đến ngày lễ tri ân thầy cô giáo nào nhỉ?',
        explanation: 'Ngày 20-11 là ngày Nhà giáo Việt Nam được nhắc ngay ở câu đầu.'
      },
      {
        id: 'q2_2',
        level: 2,
        levelLabel: 'Mức 2: Thông hiểu',
        question: 'Vì sao cô giáo lại nói rằng: "Những bông hoa điểm mười và sự tiến bộ của các con chính là bó hoa đẹp nhất"?',
        options: [
          'Vì cô không thích những bông hoa đồng nội',
          'Vì đối với thầy cô, sự chăm ngoan và tiến bộ của học trò là món quà ý nghĩa nhất',
          'Vì điểm mười có thể mua được quà to hơn',
          'Vì cô muốn các bạn phải học thật nhiều bài khó'
        ],
        correctOptionIndex: 1,
        sampleAnswer: 'Vì đối với thầy cô giáo, niềm vui lớn nhất là thấy học trò của mình chăm ngoan, tiến bộ và trưởng thành mỗi ngày.',
        aiHint: 'Thầy cô luôn mong ước điều gì nhất ở mỗi học sinh chúng mình?',
        explanation: 'Thầy cô luôn hạnh phúc nhất khi học sinh chăm ngoan, đạt nhiều kết quả tốt.'
      },
      {
        id: 'q2_3',
        level: 3,
        levelLabel: 'Mức 3: Vận dụng',
        question: 'Em có thể làm gì trong ngày thường để thể hiện lòng biết ơn với thầy cô?',
        options: [
          'Chỉ cần tặng quà vào các ngày lễ',
          'Chăm chú nghe giảng, làm bài đầy đủ và lễ phép chào hỏi',
          'Chờ cô gọi mới chịu làm bài',
          'Nói chuyện riêng trong giờ học'
        ],
        correctOptionIndex: 1,
        sampleAnswer: 'Em chăm chú nghe giảng, chăm chỉ làm bài tập, vâng lời và luôn lễ phép chào hỏi thầy cô.',
        aiHint: 'Hành động nhỏ hàng ngày của em trong lớp học là gì?',
        explanation: 'Thái độ chăm ngoan, tôn sư trọng đạo được thể hiện từ những việc nhỏ hàng ngày.'
      },
      {
        id: 'q2_4',
        level: 4,
        levelLabel: 'Mức 4: Sáng tạo',
        question: 'Hãy chọn một lời chúc ý nghĩa nhất mà em muốn gửi tới cô giáo Lê Phương Uyên:',
        options: [
          'Kính chúc cô luôn mạnh khỏe, hạnh phúc và luôn là người mẹ hiền dìu dắt chúng em!',
          'Chúc cô có thật nhiều bánh kẹo ngon',
          'Chúc cô không giao bài tập về nhà nữa',
          'Chúc cô đi chơi vui vẻ'
        ],
        correctOptionIndex: 0,
        sampleAnswer: 'Kính chúc cô Uyên luôn dồi dào sức khỏe, luôn tươi cười và tràn đầy nhiệt huyết dìu dắt chúng em.',
        aiHint: 'Bé AI gợi ý lời chúc chân thành, ấm áp chứa đựng lòng biết ơn sâu sắc.',
        explanation: 'Lời chúc ấm áp, thể hiện tình cảm kính trọng cô giáo.'
      }
    ]
  },
  {
    id: 'rd3',
    title: 'Hai người bạn và chú gấu',
    topic: 'Tình bạn đẹp',
    author: 'Truyện ngụ ngôn chọn lọc',
    estimatedMinutes: 5,
    imageUrl: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=600&q=80',
    badgeIcon: '🐻',
    audioText: 'Hai người bạn cùng nhau đi dạo trong rừng. Bỗng nhiên, một chú gấu to lớn xuất hiện. Một người nhanh chân trèo tót lên cành cây cao rồi trốn kỹ. Người kia không kịp chạy, liền nằm lăn ra đất, nín thở giả vờ chết. Chú gấu đến gần, ghé mõm ngửi khắp người rồi bỏ đi vì tưởng anh đã chết. Khi gấu đi xa, người trên cây tụt xuống hỏi đùa: Gấu vừa ghé tai cậu nói gì thế? Người bạn đáp: Gấu bảo tớ đừng bao giờ đi chung đường với kẻ bỏ rơi bạn bè khi gặp hoạn nạn.',
    content: [
      'Có hai người bạn thân cùng nhau đi bộ qua một khu rừng vắng. Đang vui vẻ trò chuyện, bỗng nhiên một chú gấu to lớn từ trong bụi cây xông ra.',
      'Một người bạn nhanh chân vội vàng trèo tót lên cành cây cao rồi ẩn nấp kín đáo, quên mất người bạn đi cùng mình. Người bạn còn lại không kịp chạy trốn, nhớ ra loài gấu không bao giờ ăn xác chết, anh liền nằm lăn ra đất, nín thở giả vờ chết.',
      'Chú gấu tiến lại gần, ngửi khắp mặt và tai anh một lúc lâu rồi lững thững quay gót bỏ đi. Khi nguy hiểm đã qua, người trên cây trèo xuống, cười cười hỏi: "Gấu vừa ghé tai thì thầm với cậu điều gì đấy?". Người bạn nghiêm nghị đáp: "Gấu dặn tớ: Đừng bao giờ kết bạn với người sẵn sàng bỏ rơi bạn bè trong lúc hiểm nguy."'
    ],
    vocabulary: [
      { word: 'Hiểm nguy', meaning: 'Tình huống nguy hiểm đến tính mạng hoặc an toàn.' },
      { word: 'Lững thững', meaning: 'Dáng đi thong thả, bước đi chậm rãi từng bước.' },
      { word: 'Nghiêm nghị', meaning: 'Nét mặt nghiêm túc, đứng đắn, không đùa cợt.' }
    ],
    questions: [
      {
        id: 'q3_1',
        level: 1,
        levelLabel: 'Mức 1: Nhận biết',
        question: 'Khi chú gấu xuất hiện, người bạn thứ nhất đã làm gì?',
        options: [
          'Nhanh chân trèo tót lên cây cao trốn một mình',
          'Cầm gậy đuổi chú gấu đi',
          'Kéo bạn cùng chạy trốn',
          'Đứng lại che chở cho bạn'
        ],
        correctOptionIndex: 0,
        sampleAnswer: 'Người bạn thứ nhất nhanh chân trèo tót lên cành cây cao để trốn một mình.',
        aiHint: 'Em hãy đọc lại đoạn 2: "Một người bạn nhanh chân..."',
        explanation: 'Người bạn thứ nhất chỉ lo thân mình, trèo lên cây cao trốn.'
      },
      {
        id: 'q3_2',
        level: 2,
        levelLabel: 'Mức 2: Thông hiểu',
        question: 'Người bạn nằm dưới đất đã thoát nạn nhờ điều gì?',
        options: [
          'Nhờ có người thợ săn đến cứu kịp',
          'Nhờ sự bình tĩnh, thông minh giả vờ chết',
          'Vì chú gấu không thích ăn cỏ',
          'Vì người bạn trên cây ném đá xua gấu'
        ],
        correctOptionIndex: 1,
        sampleAnswer: 'Anh thoát nạn nhờ bình tĩnh nhớ ra đặc tính của gấu và nằm nín thở giả vờ chết.',
        aiHint: 'Anh ấy đã nhớ ra điều gì về loài gấu khi nằm xuống?',
        explanation: 'Sự bình tĩnh và kiến thức về loài gấu giúp anh vượt qua hiểm nguy.'
      },
      {
        id: 'q3_3',
        level: 3,
        levelLabel: 'Mức 3: Vận dụng',
        question: 'Câu chuyện khuyên chúng ta bài học gì về tình bạn?',
        options: [
          'Khi gặp khó khăn chỉ cần lo cho bản thân mình',
          'Bạn bè thật sự phải biết yêu thương, chia sẻ và giúp đỡ nhau lúc khó khăn hoạn nạn',
          'Không nên đi vào rừng chơi nữa',
          'Nên leo cây thật giỏi để chạy trốn'
        ],
        correctOptionIndex: 1,
        sampleAnswer: 'Tình bạn chân chính là cùng nhau vượt qua khó khăn, không bỏ rơi bạn bè lúc hiểm nguy.',
        aiHint: 'Câu nói cuối cùng của người bạn mang thông điệp gì?',
        explanation: 'Tình bạn đẹp là luôn đồng hành, sẻ chia và giúp đỡ nhau khi gặp gian nan.'
      },
      {
        id: 'q3_4',
        level: 4,
        levelLabel: 'Mức 4: Sáng tạo',
        question: 'Nếu em là người bạn trèo lên cây lúc đó, em sẽ hành động như thế nào cho đúng tinh thần tình bạn?',
        options: [
          'Em sẽ gọi bạn cùng trèo lên hoặc tìm cách cùng bạn trốn an toàn',
          'Em vẫn sẽ trèo một mình vì an toàn là trên hết',
          'Em sẽ nhảy xuống đấm chú gấu',
          'Em sẽ hét thật to rồi ngất đi'
        ],
        correctOptionIndex: 0,
        sampleAnswer: 'Em sẽ chìa tay kéo bạn cùng leo lên cây, hoặc cùng bạn tìm cách giữ an toàn.',
        aiHint: 'Bé AI khen bạn nào biết nghĩ cho bạn bè và đoàn kết để cùng nhau an toàn!',
        explanation: 'Biết chia sẻ và tương trợ bạn bè trong lúc hoạn nạn là hành vi chuẩn mực.'
      }
    ]
  },
  {
    id: 'rd4',
    title: 'Giọt sương sớm và bông cúc vàng',
    topic: 'Thiên nhiên quanh em',
    author: 'Văn học thiếu nhi',
    estimatedMinutes: 6,
    imageUrl: 'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?auto=format&fit=crop&w=600&q=80',
    badgeIcon: '🌼',
    audioText: 'Giọt sương sớm long lanh đậu trên cánh hoa cúc vàng óng ánh. Khi mặt trời tỏa những tia nắng ấm áp, giọt sương bừng sáng như viên ngọc nhỏ. Bông cúc ngẩng cao đầu đón gió mát. Giọt sương khẽ nói: Tôi sắp tan vào không khí rồi, nhưng tôi rất vui vì đã làm bạn rạng rỡ suốt buổi sớm mai. Bông cúc mỉm cười: Cảm ơn bạn giọt sương tốt bụng, hương thơm của tôi sẽ mang theo tình bạn ngọt ngào của chúng mình bay xa.',
    content: [
      'Đêm qua, một giọt sương nhỏ bé rơi nhẹ xuống và nằm ngoan ngoãn trên cánh hoa cúc vàng rực rỡ trong khu vườn.',
      'Sáng sớm, khi vầng thái dương vừa thức giấc, chiếu những tia nắng vàng ấm áp xuống trần gian, giọt sương bừng sáng lấp lánh hệt như một viên pha lê tuyệt đẹp. Hoa cúc ngẩng cao đầu đón gió mai, cảm nhận từng dòng nước mát lành từ giọt sương thấm vào cánh hoa.',
      'Đến trưa, nắng ấm dần lên, giọt sương biết mình sắp hóa thành hơi nước bay lên trời xanh. Giọt sương khẽ nói: "Tạm biệt bạn hoa cúc nhé! Tôi rất hạnh phúc vì đã góp phần làm bạn thêm rực rỡ buổi ban mai." Hoa cúc rung rinh cánh vàng: "Cảm ơn bạn! Ngày mai khi gió mát về, bạn hãy lại ghé thăm tôi nhé!"'
    ],
    vocabulary: [
      { word: 'Thái dương', meaning: 'Mặt trời, nguồn ánh sáng ấm áp cho vạn vật.' },
      { word: 'Pha lê', meaning: 'Chất thủy tinh trong suốt, lấp lánh phản chiếu ánh sáng.' },
      { word: 'Rung rinh', meaning: 'Chuyển động nhẹ nhàng qua lại liên tiếp theo làn gió.' }
    ],
    questions: [
      {
        id: 'q4_1',
        level: 1,
        levelLabel: 'Mức 1: Nhận biết',
        question: 'Giọt sương sớm nằm ở đâu khi đêm xuống?',
        options: [
          'Đậu trên phiến lá sen',
          'Nằm trên cánh hoa cúc vàng rực rỡ',
          'Rơi xuống mặt đất ẩm ướt',
          'Đậu trên cửa sổ lớp học'
        ],
        correctOptionIndex: 1,
        sampleAnswer: 'Giọt sương nằm ngoan ngoãn trên cánh hoa cúc vàng rực rỡ.',
        aiHint: 'Đọc câu đầu đoạn 1 để tìm nơi giọt sương đậu nhé!',
        explanation: 'Giọt sương rơi nhẹ xuống và đậu trên cánh hoa cúc vàng.'
      },
      {
        id: 'q4_2',
        level: 2,
        levelLabel: 'Mức 2: Thông hiểu',
        question: 'Dưới ánh nắng mặt trời buổi sáng, giọt sương trông giống vật gì?',
        options: [
          'Giống một viên kẹo ngọt',
          'Lấp lánh hệt như một viên pha lê tuyệt đẹp',
          'Giống như một chiếc gương tròn',
          'Giống một hạt cát vàng'
        ],
        correctOptionIndex: 1,
        sampleAnswer: 'Giọt sương lấp lánh hệt như một viên pha lê tuyệt đẹp.',
        aiHint: 'Đoạn 2 có hình ảnh so sánh: "lấp lánh hệt như một..."',
        explanation: 'Tác giả so sánh giọt sương sáng lấp lánh với viên pha lê.'
      },
      {
        id: 'q4_3',
        level: 3,
        levelLabel: 'Mức 3: Vận dụng',
        question: 'Qua lời tạm biệt của giọt sương và hoa cúc, em cảm nhận được điều gì?',
        options: [
          'Cả hai đều buồn bã và tức giận',
          'Sự biết ơn, trân trọng vẻ đẹp và tình bạn trong sáng giữa vạn vật thiên nhiên',
          'Giọt sương không muốn bay đi',
          'Hoa cúc không quan tâm đến giọt sương'
        ],
        correctOptionIndex: 1,
        sampleAnswer: 'Em cảm nhận được sự biết ơn, niềm vui cống hiến và tình bạn đẹp đẽ giữa vạn vật.',
        aiHint: 'Hãy chú ý đến cách hai bạn nói lời cảm ơn và hẹn gặp lại nhau.',
        explanation: 'Cuộc trò chuyện toát lên vẻ đẹp của lòng biết ơn và sự gắn kết thiên nhiên.'
      },
      {
        id: 'q4_4',
        level: 4,
        levelLabel: 'Mức 4: Sáng tạo',
        question: 'Em hãy tưởng tượng khi hóa thành mây trên trời, giọt sương sẽ kể gì cho các bạn mây nghe về hoa cúc vàng?',
        options: [
          'Kể về một người bạn hoa cúc vàng tươi tắn, dịu dàng và luôn biết nói lời cảm ơn',
          'Kể rằng hoa cúc rất kiêu ngạo',
          'Nói rằng dưới mặt đất rất chán',
          'Không kể gì vì giọt sương đã quên hết'
        ],
        correctOptionIndex: 0,
        sampleAnswer: 'Giọt sương sẽ hào hứng kể về người bạn hoa cúc vàng dịu dàng, thơm ngát và ấm áp dưới mặt đất.',
        aiHint: 'Bé AI tin trí tưởng tượng của em sẽ làm câu chuyện của giọt sương bay bổng kỳ diệu!',
        explanation: 'Tưởng tượng phong phú, giữ trọn tình cảm đẹp đẽ giữa các nhân vật.'
      }
    ]
  },
  {
    id: 'rd5',
    title: 'Ước mơ của hạt mầm nhỏ',
    topic: 'Những ước mơ nhỏ & Bảo vệ môi trường',
    author: 'Truyện sinh thái thiếu nhi',
    estimatedMinutes: 6,
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80',
    badgeIcon: '🌱',
    audioText: 'Một hạt mầm bé xíu vùi mình sâu trong lòng đất mẹ. Mỗi ngày, đất mẹ ủ ấm, bác giun đất xới tơi xốp, còn chị mây gửi tặng những giọt mưa ngọt lành. Hạt mầm ấp ủ ước mơ lớn lên thành cây xanh tỏa bóng mát cho muôn loài, nở hoa thơm ngát và đón đàn chim về làm tổ ca hát. Nhờ sự kiên trì, hạt mầm nứt vỏ, vươn chồi non xanh biếc đón ánh ban mai.',
    content: [
      'Có một hạt mầm bé xíu nằm vùi mình sâu trong lòng đất mẹ ấm áp. Xung quanh tối om nhưng hạt mầm không hề sợ hãi.',
      'Mỗi ngày, đất mẹ ủ ấm cho hạt mầm, bác giun đất cần mẫn xới đất cho tơi xốp, còn chị mây gửi tặng những hạt mưa rào tươi mát. Hạt mầm có một ước mơ cháy bỏng: vươn cao thành một cây cổ thụ tỏa bóng mát rượi cho các bạn học sinh vui chơi, đơm hoa kết trái và đón những chú chim sâu về làm tổ hót líu lo.',
      'Rồi một buổi sớm mùa xuân ấm áp, với tất cả sức sống kiên cường, hạt mầm nứt vỏ, nhú lên hai chiếc lá mầm xanh nõn nà vẫy chào ánh mặt trời. Khu vườn reo vui đón chào một mầm sống mới đầy hy vọng.'
    ],
    vocabulary: [
      { word: 'Ấp ủ', meaning: 'Giữ kín trong lòng một mong muốn, ước mơ đẹp đẽ.' },
      { word: 'Cần mẫn', meaning: 'Chăm chỉ, nhẫn nại làm việc một cách đều đặn.' },
      { word: 'Nõn nà', meaning: 'Mượt mà, non tơ và tươi tắn đầy sức sống.' }
    ],
    questions: [
      {
        id: 'q5_1',
        level: 1,
        levelLabel: 'Mức 1: Nhận biết',
        question: 'Ai đã giúp đỡ hạt mầm khi còn ở trong lòng đất?',
        options: [
          'Chỉ có một mình hạt mầm tự lớn',
          'Đất mẹ ủ ấm, bác giun xới đất và chị mây tặng mưa mát',
          'Những chú kiến lửa chăm chỉ',
          'Cơn gió bão mùa đông'
        ],
        correctOptionIndex: 1,
        sampleAnswer: 'Đất mẹ, bác giun đất và chị mây đã cùng nhau chăm sóc hạt mầm.',
        aiHint: 'Đoạn 2 liệt kê những người bạn đã giúp đỡ hạt mầm đấy!',
        explanation: 'Đoạn 2 nêu rõ sự giúp đỡ của Đất mẹ, bác giun đất và chị mây.'
      },
      {
        id: 'q5_2',
        level: 2,
        levelLabel: 'Mức 2: Thông hiểu',
        question: 'Ước mơ cháy bỏng của hạt mầm là gì?',
        options: [
          'Ở mãi trong lòng đất cho ấm áp',
          'Lớn lên thành cây to tỏa bóng mát, cho quả ngọt và đón chim về làm tổ',
          'Biến thành một hòn đá cứng cáp',
          'Bay theo gió đi khắp nơi'
        ],
        correctOptionIndex: 1,
        sampleAnswer: 'Hạt mầm ước mơ trở thành cây xanh tỏa bóng mát cho bạn nhỏ, nở hoa thơm và đón đàn chim hót líu lo.',
        aiHint: 'Đoạn 2 giải thích ước mơ của hạt mầm.',
        explanation: 'Ước mơ của hạt mầm là cống hiến bóng mát, quả ngọt và sự sống cho muôn loài.'
      },
      {
        id: 'q5_3',
        level: 3,
        levelLabel: 'Mức 3: Vận dụng',
        question: 'Để bảo vệ cây xanh trong vườn trường và khu phố, chúng mình cần làm gì?',
        options: [
          'Bẻ cành cây để làm đồ chơi',
          'Tưới nước, chăm sóc, không bẻ cành bứt lá và trồng thêm cây xanh',
          'Khắc tên lên thân cây để lưu kỷ niệm',
          'Bỏ rác vào gốc cây'
        ],
        correctOptionIndex: 1,
        sampleAnswer: 'Em sẽ tưới nước, chăm sóc cây, không hái hoa bẻ cành và tích cực tham gia phong trào "Tết trồng cây" của trường.',
        aiHint: 'Cây xanh cần được chăm sóc như thế nào để mau lớn và khỏe mạnh?',
        explanation: 'Chăm sóc, tưới cây và bảo vệ cây xanh giúp môi trường trong lành.'
      },
      {
        id: 'q5_4',
        level: 4,
        levelLabel: 'Mức 4: Sáng tạo',
        question: 'Ước mơ của riêng em khi lớn lên là gì? Em sẽ cố gắng như thế nào để đạt được?',
        options: [
          'Em ước mơ trở thành bác sĩ/cô giáo/kỹ sư và em sẽ chăm chỉ học tập, rèn luyện ngay từ hôm nay',
          'Em không có ước mơ gì cả',
          'Em chờ lớn lên rồi mới tính',
          'Em muốn ở nhà chơi điện tử'
        ],
        correctOptionIndex: 0,
        sampleAnswer: 'Em ước mơ trở thành cô giáo/bác sĩ/nhà khoa học có ích, và em đang cố gắng học tập chăm chỉ mỗi ngày như hạt mầm nỗ lực vươn lên.',
        aiHint: 'Bé AI rất tự hào về ước mơ của em! Hãy chia sẻ ước mơ đẹp của mình nhé!',
        explanation: 'Câu trả lời thể hiện ước mơ tích cực và tinh thần nỗ lực vươn lên.'
      }
    ]
  }
];

export const MATH_TOPICS: MathTopic[] = [
  {
    id: 'mt1',
    title: 'Phép cộng và phép trừ trong phạm vi 1000',
    description: 'Cộng trừ có nhớ và không nhớ các số có ba chữ số',
    icon: '➕',
    color: 'from-blue-500 to-cyan-500',
    badge: 'Cơ bản & Nâng cao',
    questionCount: 6
  },
  {
    id: 'mt2',
    title: 'Bảng nhân và bảng chia (6, 7, 8, 9)',
    description: 'Nắm chắc bảng cửu chương, ứng dụng tìm một phần mấy',
    icon: '✖️',
    color: 'from-emerald-500 to-teal-500',
    badge: 'Cốt lõi Lớp 3',
    questionCount: 6
  },
  {
    id: 'mt3',
    title: 'Tính nhẩm thần tốc',
    description: 'Phương pháp nhẩm tròn chục, tròn trăm và quy luật số học',
    icon: '⚡',
    color: 'from-amber-500 to-yellow-500',
    badge: 'Phản xạ nhanh',
    questionCount: 5
  },
  {
    id: 'mt4',
    title: 'Giải toán có lời văn (1 - 2 bước tính)',
    description: 'Bài toán gấp lên nhiều lần, giảm đi nhiều lần, bài toán thực tế',
    icon: '📝',
    color: 'from-orange-500 to-rose-500',
    badge: 'Tư duy tổng hợp',
    questionCount: 6
  },
  {
    id: 'mt5',
    title: 'Hình học và Đo lường',
    description: 'Góc vuông, góc không vuông, chu vi hình vuông, hình chữ nhật, g, kg, ml, l',
    icon: '📐',
    color: 'from-purple-500 to-indigo-500',
    badge: 'Trực quan sinh động',
    questionCount: 5
  },
  {
    id: 'mt6',
    title: 'Toán tư duy logic & Giải quyết vấn đề',
    description: 'Quy luật dãy số, bài toán que tính, suy luận tình huống',
    icon: '🧩',
    color: 'from-pink-500 to-violet-500',
    badge: 'Thử thách IQ',
    questionCount: 5
  }
];

export const MATH_QUESTIONS: MathQuestion[] = [
  // TOPIC 1: Cộng trừ trong phạm vi 1000
  {
    id: 'mq1_1',
    topicId: 'mt1',
    tier: 'hat_mam',
    tierName: '🌱 Hạt mầm (Cơ bản)',
    question: 'Tính kết quả của phép tính: 345 + 230 = ?',
    type: 'multiple_choice',
    options: ['575', '565', '585', '475'],
    correctAnswer: '575',
    aiHint: 'Em hãy cộng từng hàng từ phải sang trái: 5 + 0 = 5; 4 + 3 = 7; 3 + 2 = 5.',
    explanation: '345 + 230 = 575.'
  },
  {
    id: 'mq1_2',
    topicId: 'mt1',
    tier: 'hat_mam',
    tierName: '🌱 Hạt mầm (Cơ bản)',
    question: 'Tính kết quả: 864 - 421 = ?',
    type: 'multiple_choice',
    options: ['443', '433', '453', '441'],
    correctAnswer: '443',
    aiHint: 'Trừ lần lượt hàng đơn vị (4 - 1 = 3), hàng chục (6 - 2 = 4), hàng trăm (8 - 4 = 4).',
    explanation: '864 - 421 = 443.'
  },
  {
    id: 'mq1_3',
    topicId: 'mt1',
    tier: 'mam_xanh',
    tierName: '🌿 Mầm xanh (Vừa sức)',
    question: 'Tìm x biết: x + 258 = 612',
    type: 'multiple_choice',
    options: ['354', '364', '870', '356'],
    correctAnswer: '354',
    aiHint: 'Muốn tìm số hạng chưa biết, em lấy tổng trừ đi số hạng đã biết: x = 612 - 258.',
    explanation: 'x = 612 - 258 = 354.'
  },
  {
    id: 'mq1_4',
    topicId: 'mt1',
    tier: 'mam_xanh',
    tierName: '🌿 Mầm xanh (Vừa sức)',
    question: 'Tính: 486 - 197 = ?',
    type: 'fill_in',
    correctAnswer: 289,
    aiHint: 'Chú ý phép trừ có nhớ: 16 - 7 = 9 (nhớ 1 sang hàng chục). Thử lại bằng cách cộng ngược nhé!',
    explanation: '486 - 197 = 289.'
  },
  {
    id: 'mq1_5',
    topicId: 'mt1',
    tier: 'hoa_tri_thuc',
    tierName: '🌸 Hoa tri thức (Vận dụng)',
    question: 'Một trường tiểu học có 425 học sinh nữ, số học sinh nam ít hơn số học sinh nữ là 38 bạn. Hỏi toàn trường có bao nhiêu học sinh?',
    type: 'multiple_choice',
    options: ['812 học sinh', '788 học sinh', '850 học sinh', '774 học sinh'],
    correctAnswer: '812 học sinh',
    aiHint: 'Bài toán có 2 bước: Bước 1 tìm số học sinh nam (425 - 38). Bước 2 cộng cả nam và nữ.',
    explanation: 'Số học sinh nam là: 425 - 38 = 387 (học sinh). Toàn trường có: 425 + 387 = 812 (học sinh).'
  },
  {
    id: 'mq1_6',
    topicId: 'mt1',
    tier: 'hoa_tri_thuc',
    tierName: '🌸 Hoa tri thức (Vận dụng)',
    question: 'Điền số thích hợp vào chỗ chấm: 340 + ... = 1000 - 160',
    type: 'fill_in',
    correctAnswer: 500,
    aiHint: 'Em tính vế phải trước: 1000 - 160 = 840. Sau đó tìm số cần điền bằng cách lấy 840 - 340.',
    explanation: 'Vế phải: 1000 - 160 = 840. Số cần điền là: 840 - 340 = 500.'
  },

  // TOPIC 2: Bảng nhân và chia
  {
    id: 'mq2_1',
    topicId: 'mt2',
    tier: 'hat_mam',
    tierName: '🌱 Hạt mầm (Cơ bản)',
    question: 'Kết quả của phép nhân 7 × 8 là:',
    type: 'multiple_choice',
    options: ['56', '54', '48', '63'],
    correctAnswer: '56',
    aiHint: 'Nhớ lại bảng nhân 7: 7 × 7 = 49, thêm 7 nữa là bao nhiêu?',
    explanation: '7 × 8 = 56.'
  },
  {
    id: 'mq2_2',
    topicId: 'mt2',
    tier: 'hat_mam',
    tierName: '🌱 Hạt mầm (Cơ bản)',
    question: 'Kết quả của phép chia 54 : 6 là:',
    type: 'multiple_choice',
    options: ['9', '8', '7', '6'],
    correctAnswer: '9',
    aiHint: 'Mấy nhân với 6 thì bằng 54 nhỉ? Nhớ lại bảng nhân 6 nào!',
    explanation: '54 : 6 = 9 vì 6 × 9 = 54.'
  },
  {
    id: 'mq2_3',
    topicId: 'mt2',
    tier: 'mam_xanh',
    tierName: '🌿 Mầm xanh (Vừa sức)',
    question: 'Có 48 cái kẹo chia đều cho 6 bạn. Hỏi mỗi bạn nhận được bao nhiêu cái kẹo?',
    type: 'multiple_choice',
    options: ['8 cái kẹo', '7 cái kẹo', '9 cái kẹo', '6 cái kẹo'],
    correctAnswer: '8 cái kẹo',
    aiHint: 'Chia đều 48 cho 6 bạn nghĩa là thực hiện phép tính 48 : 6.',
    explanation: 'Mỗi bạn nhận được: 48 : 6 = 8 (cái kẹo).'
  },
  {
    id: 'mq2_4',
    topicId: 'mt2',
    tier: 'mam_xanh',
    tierName: '🌿 Mầm xanh (Vừa sức)',
    question: 'Một hộp bút có 9 chiếc bút chì. Hỏi 7 hộp bút như thế có tất cả bao nhiêu chiếc bút chì?',
    type: 'fill_in',
    correctAnswer: 63,
    aiHint: 'Muốn tìm số bút trong 7 hộp, em lấy số bút của 1 hộp nhân với 7: 9 × 7.',
    explanation: '7 hộp có: 9 × 7 = 63 (chiếc bút).'
  },
  {
    id: 'mq2_5',
    topicId: 'mt2',
    tier: 'hoa_tri_thuc',
    tierName: '🌸 Hoa tri thức (Vận dụng)',
    question: 'Một phép chia có số chia là 7, thương là 8 và số dư lớn nhất có thể. Tìm số bị chia.',
    type: 'multiple_choice',
    options: ['62', '63', '56', '60'],
    correctAnswer: '62',
    aiHint: 'Số chia là 7 thì số dư lớn nhất có thể là mấy? (Số dư luôn nhỏ hơn số chia). Sau đó tính: Số bị chia = Thương × Số chia + Số dư.',
    explanation: 'Số chia là 7 nên số dư lớn nhất là 6. Số bị chia là: 8 × 7 + 6 = 56 + 6 = 62.'
  },
  {
    id: 'mq2_6',
    topicId: 'mt2',
    tier: 'hoa_tri_thuc',
    tierName: '🌸 Hoa tri thức (Vận dụng)',
    question: 'Tính giá trị biểu thức: 72 : 8 × 6 = ?',
    type: 'fill_in',
    correctAnswer: 54,
    aiHint: 'Biểu thức chỉ có nhân và chia, em thực hiện lần lượt từ trái sang phải: 72 : 8 trước, rồi lấy kết quả nhân với 6.',
    explanation: '72 : 8 = 9; 9 × 6 = 54.'
  },

  // TOPIC 3: Tính nhẩm thần tốc
  {
    id: 'mq3_1',
    topicId: 'mt3',
    tier: 'hat_mam',
    tierName: '🌱 Hạt mầm (Cơ bản)',
    question: 'Nhẩm nhanh: 400 + 300 = ?',
    type: 'multiple_choice',
    options: ['700', '600', '800', '750'],
    correctAnswer: '700',
    aiHint: '4 trăm cộng 3 trăm bằng 7 trăm.',
    explanation: '400 + 300 = 700.'
  },
  {
    id: 'mq3_2',
    topicId: 'mt3',
    tier: 'hat_mam',
    tierName: '🌱 Hạt mầm (Cơ bản)',
    question: 'Nhẩm nhanh: 30 × 5 = ?',
    type: 'fill_in',
    correctAnswer: 150,
    aiHint: '3 chục nhân 5 bằng 15 chục. 15 chục là 150.',
    explanation: '30 × 5 = 150.'
  },
  {
    id: 'mq3_3',
    topicId: 'mt3',
    tier: 'mam_xanh',
    tierName: '🌿 Mầm xanh (Vừa sức)',
    question: 'Nhẩm nhanh: 480 : 6 = ?',
    type: 'multiple_choice',
    options: ['80', '70', '90', '60'],
    correctAnswer: '80',
    aiHint: '48 chục chia 6 bằng 8 chục. 8 chục là 80.',
    explanation: '480 : 6 = 80.'
  },
  {
    id: 'mq3_4',
    topicId: 'mt3',
    tier: 'mam_xanh',
    tierName: '🌿 Mầm xanh (Vừa sức)',
    question: 'Nhẩm nhanh: 120 + 80 + 350 = ?',
    type: 'fill_in',
    correctAnswer: 550,
    aiHint: 'Kết hợp (120 + 80) trước để được số tròn trăm là 200, sau đó 200 + 350.',
    explanation: '(120 + 80) + 350 = 200 + 350 = 550.'
  },
  {
    id: 'mq3_5',
    topicId: 'mt3',
    tier: 'hoa_tri_thuc',
    tierName: '🌸 Hoa tri thức (Vận dụng)',
    question: 'Tìm cách tính nhanh nhất: 2 × 7 × 5 = ?',
    type: 'fill_in',
    correctAnswer: 70,
    aiHint: 'Ghép (2 × 5) thành 10 trước, rồi lấy 10 × 7 nhé!',
    explanation: '(2 × 5) × 7 = 10 × 7 = 70.'
  },

  // TOPIC 4: Giải toán có lời văn
  {
    id: 'mq4_1',
    topicId: 'mt4',
    tier: 'hat_mam',
    tierName: '🌱 Hạt mầm (Cơ bản)',
    question: 'Mẹ hái được 35 quả cam, mẹ đem chia đều vào 5 giỏ. Hỏi mỗi giỏ có bao nhiêu quả cam?',
    type: 'multiple_choice',
    options: ['7 quả', '6 quả', '8 quả', '5 quả'],
    correctAnswer: '7 quả',
    aiHint: 'Chia đều 35 vào 5 giỏ, ta làm phép chia: 35 : 5.',
    explanation: 'Mỗi giỏ có số quả cam là: 35 : 5 = 7 (quả).'
  },
  {
    id: 'mq4_2',
    topicId: 'mt4',
    tier: 'mam_xanh',
    tierName: '🌿 Mầm xanh (Vừa sức)',
    question: 'Năm nay con 8 tuổi, tuổi của bố gấp 4 lần tuổi con. Hỏi bố bao nhiêu tuổi?',
    type: 'multiple_choice',
    options: ['32 tuổi', '36 tuổi', '28 tuổi', '40 tuổi'],
    correctAnswer: '32 tuổi',
    aiHint: 'Gấp 4 lần nghĩa là lấy số tuổi của con nhân với 4.',
    explanation: 'Bố có số tuổi là: 8 × 4 = 32 (tuổi).'
  },
  {
    id: 'mq4_3',
    topicId: 'mt4',
    tier: 'mam_xanh',
    tierName: '🌿 Mầm xanh (Vừa sức)',
    question: 'Một cuộn dây dài 72 m, người ta cắt đi 1/8 cuộn dây đó. Hỏi cuộn dây còn lại dài bao nhiêu mét?',
    type: 'multiple_choice',
    options: ['63 m', '9 m', '64 m', '56 m'],
    correctAnswer: '63 m',
    aiHint: 'Bước 1: Tính đoạn dây đã cắt (72 : 8 = 9 m). Bước 2: Tính đoạn dây còn lại (72 - 9).',
    explanation: 'Đoạn dây đã cắt là: 72 : 8 = 9 (m). Đoạn dây còn lại là: 72 - 9 = 63 (m).'
  },
  {
    id: 'mq4_4',
    topicId: 'mt4',
    tier: 'hoa_tri_thuc',
    tierName: '🌸 Hoa tri thức (Vận dụng)',
    question: 'Lớp 3B trồng được 45 cây xanh, lớp 3A trồng được gấp đôi lớp 3B. Hỏi cả hai lớp trồng được tất cả bao nhiêu cây xanh?',
    type: 'fill_in',
    correctAnswer: 135,
    aiHint: 'Bước 1: Tìm số cây lớp 3A (45 × 2 = 90). Bước 2: Cộng số cây của cả 2 lớp.',
    explanation: 'Lớp 3A trồng được: 45 × 2 = 90 (cây). Cả hai lớp trồng được: 45 + 90 = 135 (cây).'
  },
  {
    id: 'mq4_5',
    topicId: 'mt4',
    tier: 'hoa_tri_thuc',
    tierName: '🌸 Hoa tri thức (Vận dụng)',
    question: 'Có 5 gói bánh như nhau, mỗi gói nặng 200 g và 1 gói kẹo nặng 250 g. Hỏi tất cả các gói bánh và kẹo nặng bao nhiêu gam?',
    type: 'fill_in',
    correctAnswer: 1250,
    aiHint: 'Tính khối lượng 5 gói bánh trước: 200 × 5 = 1000 g. Sau đó cộng với 250 g của gói kẹo.',
    explanation: 'Khối lượng 5 gói bánh là: 200 × 5 = 1000 (g). Tất cả nặng: 1000 + 250 = 1250 (g).'
  },
  {
    id: 'mq4_6',
    topicId: 'mt4',
    tier: 'hoa_tri_thuc',
    tierName: '🌸 Hoa tri thức (Vận dụng)',
    question: 'Cô giáo có 24 quyển vở chia đều cho 4 bạn. Mỗi bạn có bao nhiêu quyển vở?',
    type: 'multiple_choice',
    options: ['6 quyển vở', '8 quyển vở', '5 quyển vở', '7 quyển vở'],
    correctAnswer: '6 quyển vở',
    aiHint: 'Chia đều 24 quyển vở cho 4 bạn nghĩa là ta lấy 24 chia cho 4.',
    explanation: 'Mỗi bạn có số quyển vở là: 24 : 4 = 6 (quyển vở).'
  },

  // TOPIC 5: Hình học và đo lường
  {
    id: 'mq5_1',
    topicId: 'mt5',
    tier: 'hat_mam',
    tierName: '🌱 Hạt mầm (Cơ bản)',
    question: 'Hình vuông có cạnh dài 6 cm. Chu vi của hình vuông đó là:',
    type: 'multiple_choice',
    options: ['24 cm', '36 cm', '18 cm', '12 cm'],
    correctAnswer: '24 cm',
    aiHint: 'Muốn tính chu vi hình vuông, ta lấy độ dài một cạnh nhân với 4.',
    explanation: 'Chu vi hình vuông là: 6 × 4 = 24 (cm).'
  },
  {
    id: 'mq5_2',
    topicId: 'mt5',
    tier: 'hat_mam',
    tierName: '🌱 Hạt mầm (Cơ bản)',
    question: '1 mét bằng bao nhiêu mi-li-mét (mm)?',
    type: 'multiple_choice',
    options: ['1000 mm', '100 mm', '10 mm', '10000 mm'],
    correctAnswer: '1000 mm',
    aiHint: '1 m = 10 dm = 100 cm = 1000 mm.',
    explanation: '1 m = 1000 mm.'
  },
  {
    id: 'mq5_3',
    topicId: 'mt5',
    tier: 'mam_xanh',
    tierName: '🌿 Mầm xanh (Vừa sức)',
    question: 'Một mảnh đất hình chữ nhật có chiều dài 20 m, chiều rộng 12 m. Tính chu vi mảnh đất đó.',
    type: 'fill_in',
    correctAnswer: 64,
    aiHint: 'Muốn tính chu vi hình chữ nhật, ta lấy (chiều dài + chiều rộng) rồi nhân với 2.',
    explanation: 'Chu vi là: (20 + 12) × 2 = 32 × 2 = 64 (m).'
  },
  {
    id: 'mq5_4',
    topicId: 'mt5',
    tier: 'mam_xanh',
    tierName: '🌿 Mầm xanh (Vừa sức)',
    question: 'Đồng hồ chỉ mấy giờ khi kim ngắn chỉ qua số 3 một chút và kim dài chỉ vào số 6?',
    type: 'multiple_choice',
    options: ['3 giờ 30 phút (3 giờ rưỡi)', '3 giờ 6 phút', '6 giờ 15 phút', '4 giờ 30 phút'],
    correctAnswer: '3 giờ 30 phút (3 giờ rưỡi)',
    aiHint: 'Kim dài chỉ vào số 6 ứng với 30 phút. Kim ngắn qua số 3 là 3 giờ.',
    explanation: 'Đồng hồ chỉ 3 giờ 30 phút hay còn gọi là 3 giờ rưỡi.'
  },
  {
    id: 'mq5_5',
    topicId: 'mt5',
    tier: 'hoa_tri_thuc',
    tierName: '🌸 Hoa tri thức (Vận dụng)',
    question: 'Một hình tam giác có 3 cạnh đều bằng nhau và chu vi bằng 27 cm. Hỏi độ dài mỗi cạnh là bao nhiêu cm?',
    type: 'fill_in',
    correctAnswer: 9,
    aiHint: 'Chu vi tam giác là tổng độ dài 3 cạnh. Vì 3 cạnh bằng nhau nên mỗi cạnh bằng: 27 : 3.',
    explanation: 'Độ dài mỗi cạnh tam giác là: 27 : 3 = 9 (cm).'
  },

  // TOPIC 6: Toán tư duy logic
  {
    id: 'mq6_1',
    topicId: 'mt6',
    tier: 'hat_mam',
    tierName: '🌱 Hạt mầm (Cơ bản)',
    question: 'Tìm số tiếp theo trong dãy số sau: 3, 6, 9, 12, 15, ...',
    type: 'multiple_choice',
    options: ['18', '17', '16', '20'],
    correctAnswer: '18',
    aiHint: 'Quan sát quy luật: mỗi số sau đều hơn số liền trước 3 đơn vị (bảng nhân 3).',
    explanation: 'Quy luật cộng thêm 3: 15 + 3 = 18.'
  },
  {
    id: 'mq6_2',
    topicId: 'mt6',
    tier: 'mam_xanh',
    tierName: '🌿 Mầm xanh (Vừa sức)',
    question: 'Hôm nay là thứ Ba ngày 12. Hỏi thứ Ba tuần sau là ngày mấy?',
    type: 'fill_in',
    correctAnswer: 19,
    aiHint: 'Một tuần có 7 ngày. Em lấy ngày hiện tại cộng thêm 7 ngày: 12 + 7.',
    explanation: '12 + 7 = 19.'
  },
  {
    id: 'mq6_3',
    topicId: 'mt6',
    tier: 'mam_xanh',
    tierName: '🌿 Mầm xanh (Vừa sức)',
    question: 'Bạn An có 12 viên bi đỏ và 18 viên bi xanh. Bạn An muốn chia đều tất cả số bi vào 5 túi. Hỏi mỗi túi có bao nhiêu viên bi?',
    type: 'multiple_choice',
    options: ['6 viên bi', '5 viên bi', '7 viên bi', '8 viên bi'],
    correctAnswer: '6 viên bi',
    aiHint: 'Bước 1: Tính tổng số bi An có (12 + 18 = 30). Bước 2: Lấy 30 chia đều cho 5 túi.',
    explanation: 'Tổng số bi là: 12 + 18 = 30 (viên bi). Mỗi túi có: 30 : 5 = 6 (viên bi).'
  },
  {
    id: 'mq6_4',
    topicId: 'mt6',
    tier: 'hoa_tri_thuc',
    tierName: '🌸 Hoa tri thức (Vận dụng)',
    question: 'Nếu 1 con gà và 1 con thỏ có tổng cộng 6 chân. Biết con gà có 2 chân, con thỏ có 4 chân. Hỏi 2 con gà và 3 con thỏ có tất cả bao nhiêu chân?',
    type: 'fill_in',
    correctAnswer: 16,
    aiHint: '2 con gà có: 2 × 2 = 4 chân. 3 con thỏ có: 3 × 4 = 12 chân. Tổng cộng là 4 + 12.',
    explanation: '2 con gà có 4 chân, 3 con thỏ có 12 chân. Tổng số chân là 4 + 12 = 16 (chân).'
  },
  {
    id: 'mq6_5',
    topicId: 'mt6',
    tier: 'hoa_tri_thuc',
    tierName: '🌸 Hoa tri thức (Vận dụng)',
    question: 'Có một cây cầu gỗ chỉ cho phép tối đa 3 bạn đi cùng lúc. Có 9 bạn muốn qua cầu. Hỏi ít nhất cần bao nhiêu lượt đi để tất cả các bạn qua được cầu?',
    type: 'fill_in',
    correctAnswer: 3,
    aiHint: 'Lấy tổng số 9 bạn chia cho số bạn tối đa mỗi lượt (3 bạn): 9 : 3.',
    explanation: 'Số lượt ít nhất là: 9 : 3 = 3 (lượt).'
  }
];

export const CREATIVE_PRODUCTS: CreativeProduct[] = [
  {
    id: 'cp1',
    title: 'Sơ đồ tư duy: Gia đình yêu thương',
    category: 'so_do_tu_duy',
    categoryLabel: 'Sơ đồ tư duy',
    author: 'Dương Thảo My',
    studentId: 'hs10',
    date: '18/10/2026',
    imageUrl: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=600&q=80',
    description: 'Sơ đồ nhánh màu sắc tóm tắt các hoạt động gắn kết tình cảm ông bà, cha mẹ và con cái.',
    content: 'Cây tri thức gồm 3 nhánh lớn: 1. Việc tốt giúp đỡ bố mẹ (quét nhà, rửa ấm chén); 2. Lời nói yêu thương kính trọng; 3. Bữa cơm gia đình ấm cúng đầm ấm.',
    status: 'approved',
    likes: 28
  },
  {
    id: 'cp2',
    title: 'Truyện tranh: Chú thỏ trắng và khu vườn bí mật',
    category: 'truyen_tranh',
    categoryLabel: 'Truyện tranh ngắn',
    author: 'Trần Mai Anh',
    studentId: 'hs2',
    date: '17/10/2026',
    imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80',
    description: 'Câu chuyện tự sáng tác tại Xưởng Kể Chuyện của Bé về lòng dũng cảm và bảo vệ hoa cỏ.',
    content: 'Chú thỏ trắng nhút nhát một ngày nọ lạc vào khu vườn mùa thu. Nhờ sự giúp đỡ của Robot AI tí hon, thỏ đã giải được câu đố về phép tính nhân để tưới nước cứu sống bông hoa cúc vàng.',
    status: 'approved',
    likes: 35
  },
  {
    id: 'cp3',
    title: 'Phiếu đọc hiểu minh họa: Bó hoa tặng cô',
    category: 'doc_hieu',
    categoryLabel: 'Phiếu đọc hiểu có tranh',
    author: 'Phạm Thuỳ Linh',
    studentId: 'hs4',
    date: '15/10/2026',
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80',
    description: 'Tranh vẽ màu sáp những đóa hoa cúc dại dâng tặng cô giáo Uyên cùng câu trả lời mức 4.',
    content: 'Bức tranh vẽ cô giáo mỉm cười dịu hiền ôm lấy bạn nhỏ, phía dưới là dòng chữ: "Kính chúc cô luôn là vầng trăng soi sáng ước mơ chúng em".',
    status: 'approved',
    likes: 42
  },
  {
    id: 'cp4',
    title: 'Bài toán tình huống: Giúp mẹ đi chợ thông minh',
    category: 'toan_tinh_huong',
    categoryLabel: 'Bài toán tình huống',
    author: 'Nguyễn Hoàng Nam',
    studentId: 'hs1',
    date: '14/10/2026',
    imageUrl: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=600&q=80',
    description: 'Ứng dụng phép nhân và phép cộng tiền tệ khi tính giá tiền mua 3 mớ rau và 2 kg cam.',
    content: 'Đề bài tình huống do em Nam tự đặt: "Mẹ đưa Nam 100.000 đồng. Nam mua 3 mớ rau giá 10.000 đồng/mớ và 2 kg cam giá 25.000 đồng/kg. Hỏi Nam mang về gửi mẹ bao nhiêu tiền thừa?". Lời giải: 100.000 - (30.000 + 50.000) = 20.000 đồng.',
    status: 'approved',
    likes: 31
  },
  {
    id: 'cp5',
    title: 'Sổ tay học tốt: 5 Bí quyết nhớ bảng cửu chương',
    category: 'so_tay',
    categoryLabel: 'Sổ tay học tốt',
    author: 'Hoàng Kim Ngân',
    studentId: 'hs6',
    date: '12/10/2026',
    imageUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=600&q=80',
    description: 'Mẹo tính bảng 9 bằng các ngón tay và phương pháp cộng dồn vui nhộn.',
    content: 'Bí kíp 1: Dùng 10 ngón tay tính bảng nhân 9. Bí kíp 2: Bảng nhân 7 là gấp đôi bảng 7 rồi cộng thêm 7. Bí kíp 3: Đố vui cùng bố mẹ mỗi tối 10 phút.',
    status: 'approved',
    likes: 50
  }
];

export const PARENT_ACTIVITIES: ParentActivity[] = [
  {
    id: 'pa1',
    title: 'Cùng con đọc một câu chuyện trước giờ ngủ',
    durationMinutes: 10,
    category: 'doc_sach',
    description: 'Dành 10 phút ấm áp bên con để đọc một mẩu chuyện ngắn và hỏi con bài học rút ra.',
    instructions: [
      'Cho con tự chọn một bài đọc trong Vườn Học Tập AI.',
      'Cha mẹ đọc một đoạn, con đọc nối tiếp một đoạn.',
      'Hỏi con: "Nhân vật nào làm con ấn tượng nhất và vì sao?".'
    ],
    aiTip: 'Khen ngợi khi con đọc to, tròn vành rõ chữ; không ngắt lời khi con đang chia sẻ cảm xúc hồn nhiên.'
  },
  {
    id: 'pa2',
    title: 'Tìm phép nhân và phép chia trong gian bếp',
    durationMinutes: 7,
    category: 'toan_thuc_te',
    description: 'Học toán từ những đồ vật thân thuộc khi chuẩn bị bữa cơm gia đình.',
    instructions: [
      'Đố con: "Nhà mình có 4 người, mỗi người 1 đôi đũa. Hỏi cần lấy tất cả bao nhiêu chiếc đũa?".',
      'Đố con chia đều 12 múi bưởi cho cả nhà.',
      'Cùng con giải thích vì sao 4 × 2 = 8 chiếc đũa.'
    ],
    aiTip: 'Toán học thực tế giúp trẻ 8 tuổi cảm nhận môn Toán rất gần gũi, không còn là những con số khô khan.'
  },
  {
    id: 'pa3',
    title: 'Kể lại một việc tốt con đã làm hôm nay',
    durationMinutes: 5,
    category: 'giao_tiep',
    description: 'Rèn luyện kỹ năng diễn đạt tự tin và bồi dưỡng phẩm chất nhân ái cho trẻ.',
    instructions: [
      'Hỏi con bằng giọng ấm áp: "Hôm nay ở lớp 3B có điều gì làm con vui nhất?".',
      'Lắng nghe con kể việc đã giúp bạn, nhặt rác hay tưới cây.',
      'Tặng con một cái ôm ấm áp và lời khen ngợi chân thành.'
    ],
    aiTip: 'Sự ghi nhận của cha mẹ là nguồn động lực mạnh mẽ nhất giúp con tự tin và hướng thiện.'
  },
  {
    id: 'pa4',
    title: 'Quan sát thiên nhiên và dự đoán thời tiết',
    durationMinutes: 8,
    category: 'khoa_hoc',
    description: 'Cùng con nhìn ngắm bầu trời, giọt sương trên lá cây hoặc kiến chuyển tổ.',
    instructions: [
      'Cùng con bước ra ban công hoặc sân vườn hít thở không khí.',
      'Quan sát xem mây hôm nay màu gì, gió thổi về hướng nào.',
      'Gợi mở con nhớ lại bài đọc "Giọt sương sớm và bông cúc vàng".'
    ],
    aiTip: 'Khuyến khích con dùng những từ ngữ miêu tả sinh động mà con đã học trong môn Tiếng Việt.'
  }
];

export const TEACHER_ASSIGNMENTS: TeacherAssignment[] = [
  {
    id: 'asg1',
    title: 'Chinh phục Bảng nhân 7 và Bảng chia 7',
    subject: 'Toán',
    targetGroup: 'all',
    deadline: '24/10/2026',
    assignedCount: 10,
    completedCount: 8,
    notes: 'Rèn luyện kỹ năng tính nhẩm nhanh và giải bài toán gấp lên nhiều lần.'
  },
  {
    id: 'asg2',
    title: 'Đọc hiểu bài: Ngôi trường thân yêu của em',
    subject: 'Tiếng Việt',
    targetGroup: 'all',
    deadline: '22/10/2026',
    assignedCount: 10,
    completedCount: 9,
    notes: 'Yêu cầu trả lời đủ 4 mức câu hỏi, đặc biệt là câu hỏi liên hệ thực tế lớp 3B.'
  },
  {
    id: 'asg3',
    title: 'Ôn tập phép cộng trừ có nhớ trong phạm vi 1000',
    subject: 'Toán',
    targetGroup: 'need_help',
    deadline: '25/10/2026',
    assignedCount: 3,
    completedCount: 2,
    notes: 'Dành riêng cho nhóm học sinh cần củng cố kỹ năng đặt tính và nhớ số.'
  },
  {
    id: 'asg4',
    title: 'Sáng tác truyện tranh ngắn: Tình bạn tuổi thơ',
    subject: 'Sáng tạo',
    targetGroup: 'gifted',
    deadline: '26/10/2026',
    assignedCount: 4,
    completedCount: 3,
    notes: 'Khuyến khích các em tự viết lời thoại và chọn tranh minh họa sinh động.'
  }
];

export const INNOVATION_DATA = {
  title: 'BÁO CÁO GIẢI PHÁP ĐỔI MỚI GIÁO DỤC',
  author: 'Cô giáo Lê Phương Uyên',
  school: 'Trường Tiểu học Khoái Châu 1',
  targetClass: 'Lớp 3B (Năm học 2025 - 2026)',
  contestTitle: 'Hội thi Giáo viên Sáng tạo và Đổi mới Giáo dục Tiểu học',
  baselineStats: {
    totalStudents: 32,
    selfDirectedRateBefore: 42, // %
    selfDirectedRateAfter: 89, // %
    mathAccuracyBefore: 64, // %
    mathAccuracyAfter: 88, // %
    readingEngagementBefore: 51, // %
    readingEngagementAfter: 92, // %
    parentInvolvementBefore: 38, // %
    parentInvolvementAfter: 85, // %
  },
  testimonials: [
    {
      role: 'Phụ huynh em Nguyễn Hoàng Nam',
      text: 'Trước đây mỗi tối nhắc con học bài rất vất vả. Từ ngày có Vườn Học Tập AI, cháu tự giác bật máy tính, làm bài toán tư duy rồi hào hứng khoe huy hiệu với bố mẹ!'
    },
    {
      role: 'Phụ huynh em Trần Mai Anh',
      text: 'Tôi rất bất ngờ khi con tự viết được một câu chuyện ngắn hoàn chỉnh và được cô giáo phê duyệt treo ở Vườn hoa sáng tạo lớp 3B. Bé tự tin hẳn lên!'
    },
    {
      role: 'Học sinh Lê Bảo Long (Lớp 3B)',
      text: 'Em thích nhất Bé AI vì mỗi lần em làm sai bài toán, Bé AI không chê mà còn gợi ý cho em từng bước để em tự sửa đúng!'
    }
  ]
};
