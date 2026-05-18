export type GroupPurchaseCreateRequest = {
  title: string;
  content: string;
  totalPeople: number;
  totalAmount: number;
  imageUrls: string[];
  openChatLink: string;
};

export type ProductSharingCreateRequest = {
  title: string;
  content: string;
  expirationDate: string;
  imageUrls: string[];
};
