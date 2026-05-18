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

  // Backwards compatibility for ModifyForm or other generic usages
  if (!type) {
    return (
      <form className="flex flex-col gap-4 bg-gray-100 p-6 rounded-lg">
        <div className="flex flex-col">
          <label>제품명</label>
          <input
            name="name"
            value={formData.name || ''}
            onChange={handleChange}
            type="text"
            className="border p-2"
          />
        </div>
        <div className="flex flex-col">
          <label>제품 설명</label>
          <textarea
            name="description"
            value={formData.description || ''}
            onChange={handleChange}
            className="border p-2"
          />
        </div>
        <div className="flex flex-col">
          <label>가격</label>
          <input
            name="price"
            value={formData.price || 0}
            onChange={handleChange}
            type="number"
            className="border p-2"
          />
        </div>
        <div className="flex flex-col">
          <label>이미지 URL</label>
          <input
            name="image_url"
            value={formData.image_url || ''}
            onChange={handleChange}
            type="text"
            className="border p-2"
          />
        </div>
      </form>
    );
  }

  return (
    <form className="flex flex-col gap-4 bg-gray-50 p-6 rounded-lg shadow-sm">
      <div className="flex flex-col gap-1">
        <label className="font-semibold text-gray-700">제목</label>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          type="text"
          placeholder="제목을 입력하세요"
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="font-semibold text-gray-700">내용</label>
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="내용을 입력하세요"
          className="border p-2 rounded h-32 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {type === 'GROUP_PURCHASE' && (
        <>
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-gray-700">총 인원수</label>
            <input
              name="totalPeople"
              value={(formData as GroupPurchaseCreateRequest).totalPeople}
              onChange={handleChange}
              type="number"
              placeholder="총 인원수"
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-gray-700">총 금액 (나누기 전)</label>
            <input
              name="totalAmount"
              value={(formData as GroupPurchaseCreateRequest).totalAmount}
              onChange={handleChange}
              type="number"
              placeholder="총 금액"
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-gray-700">오픈채팅방 링크</label>
            <input
              name="openChatLink"
              value={(formData as GroupPurchaseCreateRequest).openChatLink}
              onChange={handleChange}
              type="text"
              placeholder="https://open.kakao.com/..."
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </>
      )}

      {type === 'PRODUCT_SHARING' && (
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-gray-700">유통기한</label>
          <input
            name="expirationDate"
            value={(formData as ProductSharingCreateRequest).expirationDate}
            onChange={handleChange}
            type="date"
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      )}

      <div className="flex flex-col gap-2">
        <label className="font-semibold text-gray-700">사진 (URL)</label>
        {(formData.imageUrls || []).map((url: string, index: number) => (
          <div key={index} className="flex gap-2">
            <input
              value={url}
              onChange={(e) => handleImageUrlChange(index, e.target.value)}
              type="text"
              placeholder={`이미지 URL #${index + 1}`}
              className="flex-1 border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="button"
              onClick={() => removeImageUrlField(index)}
              className="bg-red-400 text-white px-3 rounded hover:bg-red-500"
            >
              삭제
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addImageUrlField}
          className="bg-gray-200 text-gray-700 p-2 rounded hover:bg-gray-300 transition-colors"
        >
          + 사진 추가하기
        </button>
      </div>
    </form>
  );
};

export default FormContainer;
