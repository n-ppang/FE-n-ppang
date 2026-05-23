import type {
  GroupPurchaseCreateRequest,
  ProductSharingCreateRequest,
} from '@/remote/request/CreateProductRequest';

type Props = {
  type?: 'GROUP_PURCHASE' | 'PRODUCT_SHARING';
  formData: any;
  setFormData: (data: any) => void;
};

const FormContainer = ({ type, formData, setFormData }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUrlChange = (index: number, value: string) => {
    const newImageUrls = [...(formData.imageUrls || [])];
    newImageUrls[index] = value;
    setFormData({ ...formData, imageUrls: newImageUrls });
  };

  const addImageUrlField = () => {
    setFormData({ ...formData, imageUrls: [...(formData.imageUrls || []), ''] });
  };

  const removeImageUrlField = (index: number) => {
    const newImageUrls = (formData.imageUrls as string[]).filter((_, i) => i !== index);
    setFormData({ ...formData, imageUrls: newImageUrls });
  };

  const inputClasses = "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 placeholder:text-gray-400";
  const labelClasses = "mb-1.5 ml-1 block text-sm font-bold text-gray-700";

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
        <div>
          <label className={labelClasses}>이미지 URL</label>
          <input
            name="image_url"
            value={formData.image_url || ''}
            onChange={handleChange}
            type="text"
            className={inputClasses}
          />
        </div>
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
              value={(formData as GroupPurchaseCreateRequest).totalPeople}
              onChange={handleChange}
              type="number"
              placeholder="명"
              className={inputClasses}
            />
          </div>
          <div>
            <label className={labelClasses}>총 금액</label>
            <input
              name="totalAmount"
              value={(formData as GroupPurchaseCreateRequest).totalAmount}
              onChange={handleChange}
              type="number"
              placeholder="원"
              className={inputClasses}
            />
          </div>
          <div className="col-span-2">
            <label className={labelClasses}>오픈채팅방 링크</label>
            <input
              name="openChatLink"
              value={(formData as GroupPurchaseCreateRequest).openChatLink}
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
            value={(formData as ProductSharingCreateRequest).expirationDate}
            onChange={handleChange}
            type="date"
            className={inputClasses}
          />
        </div>
      )}

      <div>
        <label className={labelClasses}>사진 (URL)</label>
        <div className="space-y-3">
          {(formData.imageUrls || []).map((url: string, index: number) => (
            <div key={index} className="flex gap-2">
              <input
                value={url}
                onChange={(e) => handleImageUrlChange(index, e.target.value)}
                type="text"
                placeholder={`이미지 URL #${index + 1}`}
                className={inputClasses}
              />
              <button
                type="button"
                onClick={() => removeImageUrlField(index)}
                className="flex items-center justify-center rounded-xl bg-red-50 px-4 text-sm font-bold text-red-500 transition-colors hover:bg-red-100 active:scale-95"
              >
                삭제
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addImageUrlField}
            className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-200 py-3 text-sm font-bold text-gray-500 transition-all hover:border-blue-300 hover:text-blue-500 active:scale-[0.98]"
          >
            <span className="text-lg">+</span> 사진 추가하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormContainer;
