export interface Notification {
  id: number;
  title: string; // 공동구매 게시물 제목
  openChatLink: string; // 오픈채팅방 링크
  date: string; // 알림 날짜
}

export const NOTIFICATION_MOCK_DATA: Notification[] = [
  {
    id: 1,
    title: "[공동구매] 삼다수 2L 6개입",
    openChatLink: "https://open.kakao.com/o/s1234567",
    date: "2024.05.28",
  },
  {
    id: 2,
    title: "[공동구매] 비비고 왕교자 1.05kg",
    openChatLink: "https://open.kakao.com/o/s7654321",
    date: "2024.05.29",
  },
  {
    id: 3,
    title: "[공동구매] 롤 화장지 30롤",
    openChatLink: "https://open.kakao.com/o/s9876543",
    date: "2024.05.30",
  },
];
