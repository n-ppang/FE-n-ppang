export type GroupPurchaseCreateRequest = {
  name: string;
  price: number;
  description: string;
  image_url: string;
  totalPrice: number; // 공동구매에만 필요한 필드
  peopleNum: number; // 공동구매에만 필요한 필드
  createdAt: string;
};
