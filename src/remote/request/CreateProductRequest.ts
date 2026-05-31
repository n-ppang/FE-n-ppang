export type GroupPurchaseCreateRequest = {
  title: string;
  content: string;
  thumbnailUrl: string;
  totalPrice: number;
  maxParticipants: number;
  openChatLink: string;
};

export type ProductSharingCreateRequest = {
  title: string;
  content: string;
  expirationDate: string;
  thumbnailUrl: string;
};
