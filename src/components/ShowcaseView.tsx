import React, { useState } from 'react';
import {
  Palette,
  Sparkles,
  PlusCircle,
  Filter,
  Heart,
  Eye,
  Printer,
  CheckCircle2,
  Clock,
  X
} from 'lucide-react';
import { CREATIVE_PRODUCTS } from '../data/mockData';
import { CreativeProduct } from '../types';

interface ShowcaseViewProps {
  customProducts?: CreativeProduct[];
  isTeacher?: boolean;
}

export const ShowcaseView: React.FC<ShowcaseViewProps> = ({
  customProducts = [],
  isTeacher = false
}) => {
  const [products, setProducts] = useState<CreativeProduct[]>([
    ...customProducts,
    ...CREATIVE_PRODUCTS
  ]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [detailProduct, setDetailProduct] = useState<CreativeProduct | null>(null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  // New product submit form state
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'doc_hieu' | 'toan_tinh_huong' | 'so_do_tu_duy' | 'truyen_tranh' | 'so_tay' | 'khac'>('so_do_tu_duy');
  const [newAuthor, setNewAuthor] = useState('Em Nguyễn Hoàng Nam (3B)');
  const [newDescription, setNewDescription] = useState('');

  const categories = [
    { id: 'all', label: 'Tất cả sản phẩm' },
    { id: 'so_do_tu_duy', label: 'Sơ đồ tư duy' },
    { id: 'truyen_tranh', label: 'Truyện tranh ngắn' },
    { id: 'doc_hieu', label: 'Phiếu đọc hiểu có tranh' },
    { id: 'toan_tinh_huong', label: 'Toán tình huống' },
    { id: 'so_tay', label: 'Sổ tay học tốt' },
  ];

  const filteredProducts = products.filter((p) => {
    if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
    return true;
  });

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setProducts((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, likes: item.likes + 1 } : item
      )
    );
  };

  const handleTeacherApprove = (id: string) => {
    setProducts((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: 'approved' } : item
      )
    );
    if (detailProduct && detailProduct.id === id) {
      setDetailProduct((prev) => (prev ? { ...prev, status: 'approved' } : null));
    }
  };

  const handleSubmitNewProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDescription.trim()) {
      alert('Vui lòng điền đầy đủ tiêu đề và nội dung mô tả sản phẩm.');
      return;
    }

    const created: CreativeProduct = {
      id: `prod_${Date.now()}`,
      title: newTitle,
      category: newCategory,
      categoryLabel: categories.find((c) => c.id === newCategory)?.label || 'Sáng tạo',
      author: newAuthor,
      studentId: 'hs1',
      date: new Date().toLocaleDateString('vi-VN'),
      imageUrl: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=600&q=80',
      description: newDescription,
      content: newDescription,
      status: isTeacher ? 'approved' : 'pending',
      likes: 1
    };

    setProducts([created, ...products]);
    setIsSubmitModalOpen(false);
    setNewTitle('');
    setNewDescription('');
    alert(isTeacher ? 'Đã đăng sản phẩm lên Vườn hoa lớp 3B!' : 'Đã gửi sản phẩm thành công! Cô giáo Lê Phương Uyên sẽ phê duyệt trước khi trưng bày nhé!');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 rounded-3xl p-6 md:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border-4 border-white/20">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-black uppercase tracking-wider backdrop-blur-sm">
            <Palette className="w-4 h-4 text-yellow-300" />
            <span>Triển Lãm Học Liệu Sáng Tạo Lớp 3B</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black font-display">
            Vườn Hoa Sáng Tạo Lớp 3B
          </h2>
          <p className="text-purple-100 text-xs md:text-sm font-medium max-w-xl">
            Nơi trưng bày những sơ đồ tư duy, truyện tranh ngắn, bài toán thực tế và sản phẩm học tập xuất sắc do chính các em học sinh lớp 3B sáng tạo!
          </p>
        </div>

        <button
          onClick={() => setIsSubmitModalOpen(true)}
          className="btn-3d bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-black px-6 py-3.5 rounded-2xl shadow-lg flex items-center gap-2 text-xs md:text-sm shrink-0 cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Gửi sản phẩm mới</span>
        </button>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedCategory(c.id)}
            className={`px-4 py-2 rounded-2xl text-xs font-black whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === c.id
                ? 'bg-purple-600 text-white shadow-sm scale-102'
                : 'bg-white hover:bg-purple-50 text-slate-700 border border-slate-200'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((p) => (
          <div
            key={p.id}
            onClick={() => setDetailProduct(p)}
            className="card-garden bg-white rounded-3xl border-2 border-purple-100 shadow-md hover:shadow-xl overflow-hidden flex flex-col justify-between cursor-pointer"
          >
            {/* Thumbnail */}
            <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
              <img
                src={p.imageUrl}
                alt={p.title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
              <div className="absolute top-3 left-3 flex items-center gap-1.5">
                <span className="text-[10px] font-black uppercase bg-white/90 backdrop-blur-sm text-purple-800 px-2.5 py-1 rounded-full shadow-xs">
                  {p.categoryLabel}
                </span>
              </div>
              <div className="absolute top-3 right-3">
                <span className={`text-[10px] font-black px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1 ${
                  p.status === 'approved'
                    ? 'bg-emerald-500 text-white'
                    : 'bg-amber-400 text-slate-900'
                }`}>
                  {p.status === 'approved' ? (
                    <>
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Cô giáo đã duyệt</span>
                    </>
                  ) : (
                    <>
                      <Clock className="w-3 h-3" />
                      <span>Chờ cô duyệt</span>
                    </>
                  )}
                </span>
              </div>
            </div>

            {/* Info */}
            <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="font-black text-slate-900 text-base font-display line-clamp-1">
                  {p.title}
                </h4>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2 font-medium">
                  {p.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-500">
                <span>Tác giả: {p.author}</span>

                <button
                  onClick={(e) => handleLike(p.id, e)}
                  className="flex items-center gap-1 text-pink-600 hover:scale-110 transition-transform cursor-pointer"
                >
                  <Heart className="w-4 h-4 fill-pink-500" />
                  <span>{p.likes}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {detailProduct && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 md:p-8 space-y-5 shadow-2xl border-4 border-purple-200 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setDetailProduct(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-xs font-black uppercase text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                {detailProduct.categoryLabel}
              </span>
              <h3 className="text-2xl font-black text-slate-900 font-display mt-2">
                {detailProduct.title}
              </h3>
              <p className="text-xs text-slate-500 font-bold">
                Tác giả: {detailProduct.author} • Ngày đăng: {detailProduct.date}
              </p>
            </div>

            <div className="rounded-2xl overflow-hidden max-h-72 w-full border border-slate-200">
              <img
                src={detailProduct.imageUrl}
                alt={detailProduct.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-slate-800 text-xs md:text-sm leading-relaxed font-serif">
              {detailProduct.content || detailProduct.description}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
              <div className="flex items-center gap-2">
                {detailProduct.status === 'pending' && isTeacher && (
                  <button
                    onClick={() => handleTeacherApprove(detailProduct.id)}
                    className="btn-3d bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Cô giáo phê duyệt trưng bày</span>
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="btn-3d bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>In tác phẩm</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Submit New Product Modal */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleSubmitNewProduct}
            className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 space-y-4 shadow-2xl border-4 border-purple-200 relative"
          >
            <button
              type="button"
              onClick={() => setIsSubmitModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <h3 className="text-xl font-black text-slate-900 font-display">
                Gửi Tác Phẩm Vào Vườn Hoa Lớp 3B
              </h3>
              <p className="text-xs text-slate-500">
                Tất cả sản phẩm đều được cô giáo phê duyệt trước khi công khai.
              </p>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Tiêu đề sản phẩm:
              </label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Ví dụ: Sơ đồ tư duy phép nhân 8..."
                className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-bold focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Thể loại:
              </label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as any)}
                className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-bold focus:outline-none focus:border-purple-500 cursor-pointer"
              >
                <option value="so_do_tu_duy">Sơ đồ tư duy</option>
                <option value="truyen_tranh">Truyện tranh ngắn</option>
                <option value="doc_hieu">Phiếu đọc hiểu có tranh</option>
                <option value="toan_tinh_huong">Toán tình huống</option>
                <option value="so_tay">Sổ tay học tốt</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Nội dung hoặc lời giải thích:
              </label>
              <textarea
                rows={4}
                required
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                placeholder="Chia sẻ ý nghĩa hoặc nội dung tác phẩm của em..."
                className="w-full p-3 rounded-xl border border-slate-300 text-xs font-medium focus:outline-none focus:border-purple-500"
              />
            </div>

            <button
              type="submit"
              className="btn-3d w-full py-3 rounded-2xl font-black text-xs md:text-sm text-white bg-purple-600 hover:bg-purple-700 shadow-md cursor-pointer"
            >
              Gửi sản phẩm cho cô duyệt
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
