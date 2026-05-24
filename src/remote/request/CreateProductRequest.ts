export type GroupPurchaseCreateRequest = {
  title: string;
  content: string;
  totalPeople: number;
  totalAmount: number;
  imageUrl: string;
  openChatLink: string;
};

export type ProductSharingCreateRequest = {
  title: string;
  content: string;
  expirationDate: string;
  imageUrl: string;
};
