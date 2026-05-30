export interface UserApprovalRequest {
  id: number;
  name: string;
  nickname: string;
  dormitory: string;
  roomNumber: string;
  verificationImageUrl: string;
  isApproved: boolean;
}

export const USER_APPROVAL_MOCK_DATA: UserApprovalRequest[] = [
  {
    id: 1,
    name: "김철수",
    nickname: "철수짱",
    dormitory: "제1기숙사",
    roomNumber: "101",
    verificationImageUrl: "https://via.placeholder.com/150",
    isApproved: false,
  },
  {
    id: 2,
    name: "이영희",
    nickname: "영희하이",
    dormitory: "제2기숙사",
    roomNumber: "205",
    verificationImageUrl: "https://via.placeholder.com/150",
    isApproved: false,
  },
  {
    id: 3,
    name: "박지성",
    nickname: "캡틴박",
    dormitory: "제3기숙사",
    roomNumber: "303",
    verificationImageUrl: "https://via.placeholder.com/150",
    isApproved: false,
  },
];
