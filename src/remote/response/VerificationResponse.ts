export interface PageResponse<T> {
  content: T[];
  pageNumber: number;
  totalPages: number;
  totalElements: number;
}

export interface VerificationRequestResponse {
  verificationId: number;
  imageUrl: string;
  status: string;
  rejectReason: string | null;
  createdAt: string;
  user: {
    userId: number;
    studentId: string;
    name: string;
    nickname: string;
    dormitory: string;
    roomNumber: string;
  };
  // UI 전용 필드 (선택 상태 관리용)
  isApproved?: boolean;
}

export type VerificationListResponse = PageResponse<VerificationRequestResponse>;
