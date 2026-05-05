import type { CreateProductRequest } from '@/remote/request/CreateProductRequest';

type Props = {
  formData: CreateProductRequest;
  setFormData: (data: CreateProductRequest) => void;
};

const FormContainer = ({ formData, setFormData }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form className="flex flex-col bg-gray-100">
      <div>
        <div> 제품명: </div>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          type="text"
          placeholder="Item Name"
          className="m-2 border p-2"
        />
      </div>
      <div>
        <div> 제품 설명: </div>
        <input
          name="description"
          value={formData.description}
          onChange={handleChange}
          type="textarea"
          placeholder="Item Description"
          className="m-2 w-[90%] border p-2"
        />
      </div>
      <div>
        <div> 가격: </div>
        <input
          name="price"
          value={formData.price}
          onChange={handleChange}
          type="number"
          placeholder="Item Price"
          className="m-2 border p-2"
        />
      </div>
      <div>
        <div> 이미지 업로드: </div>
        <input type="url" name="image_url" onChange={handleChange} className="m-2 border p-2" />
      </div>
    </form>
  );
};

export default FormContainer;
