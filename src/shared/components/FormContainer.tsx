import { useRef, useState } from 'react';

type Props = {
  type?: 'GROUP_PURCHASE' | 'PRODUCT_SHARING';
  formData: any;
  setFormData: (data: any) => void;
};

const FormContainer = ({ type, formData, setFormData }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    // Prevent negative numbers for specific fields
    if (type === 'number' && (name === 'totalPeople' || name === 'totalAmount' || name === 'price')) {
      const numValue = Number(value);
      if (numValue < 0) return;
    }
    
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setFormData({ ...formData, imageUrl: result });
        setImagePreviews([result]);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData({ ...formData, imageUrl: '' });
    setImagePreviews([]);
  };

  const inputClasses =
    'w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 placeholder:text-gray-400';
  const labelClasses = 'mb-1.5 ml-1 block text-sm font-bold text-gray-700';

  // Backwards compatibility for ModifyForm or other generic usages
  if (!type) {
    return (
      <div className="space-y-4">
        <div>
          <label className={labelClasses}>제품명</label>
          <input
            name="name"
            value={formData.name || ''}
            onChange={handleChange}
            type="text"
            className={inputClasses}
          />
        </div>
        <div>
          <label className={labelClasses}>제품 설명</label>
          <textarea
            name="description"
            value={formData.description || ''}
            onChange={handleChange}
            rows={4}
            className={inputClasses}
          />
        </div>
        <div>
          <label className={labelClasses}>가격</label>
          <input
            name="price"
            value={formData.price || 0}
            onChange={handleChange}
            type="number"
            className={inputClasses}
          />
        </div>
        {/* Note: This section might still need file upload if used, but focusing on type-based forms first */}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <label className={labelClasses}>제목</label>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          type="text"
          placeholder="제목을 입력하세요"
          className={inputClasses}
        />
      </div>

      <div>
        <label className={labelClasses}>내용</label>
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="상세 내용을 입력하세요"
          rows={5}
          className={inputClasses}
        />
      </div>

      {type === 'GROUP_PURCHASE' && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClasses}>총 인원수</label>
            <input
              name="totalPeople"
              value={formData.totalPeople || 0}
              onChange={handleChange}
              type="number"
              min="0"
              placeholder="명"
              className={inputClasses}
            />
          </div>
          <div>
            <label className={labelClasses}>총 금액</label>
            <input
              name="totalAmount"
              value={formData.totalAmount || 0}
              onChange={handleChange}
              type="number"
              min="0"
              placeholder="원"
              className={inputClasses}
            />
          </div>
          <div className="col-span-2">
            <label className={labelClasses}>오픈채팅방 링크</label>
            <input
              name="openChatLink"
              value={formData.openChatLink || ''}
              onChange={handleChange}
              type="text"
              placeholder="https://open.kakao.com/..."
              className={inputClasses}
            />
          </div>
        </div>
      )}

      {type === 'PRODUCT_SHARING' && (
        <div>
          <label className={labelClasses}>유통기한</label>
          <input
            name="expirationDate"
            value={formData.expirationDate || ''}
            onChange={handleChange}
            type="date"
            className={inputClasses}
          />
        </div>
      )}

      <div>
        <label className={labelClasses}>사진 등록</label>
        <div className="grid grid-cols-3 gap-3">
          {formData.imageUrl && (
            <div
              className="group relative aspect-square overflow-hidden rounded-xl bg-gray-100 ring-1 ring-gray-200"
            >
              <img src={formData.imageUrl} alt="Upload" className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-1 right-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white shadow-md transition-transform active:scale-90"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          )}
          {!formData.imageUrl && (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex aspect-square flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-gray-200 bg-white text-gray-400 transition-all hover:border-blue-300 hover:bg-blue-50/30 hover:text-blue-500"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span className="text-[10px] font-bold">사진 추가</span>
            </button>
          )}
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
      </div>
    </div>
  );
};

export default FormContainer;
