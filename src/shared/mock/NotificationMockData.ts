export interface Notification {
  id: number;
  title: string; // 공동구매 게시물 제목
  description: string; // 오픈채팅방 링크 등 상세 내용
  date: string; // 알림 날짜
}

export const NOTIFICATION_MOCK_DATA: Notification[] = [
  {
    id: 1,
    title: '[공동구매] 삼다수 2L 6개입 같이 사요!',
    description:
      '오픈채팅방 링크: https://open.kakao.com/o/s1234567\n인원이 모두 모집되었습니다. 채팅방에서 구매 정보를 확인해주세요.',
    date: '2024.05.28',
  },
  {
    id: 2,
    title: '[공동구매] 비비고 왕교자 1.05kg',
    description:
      '오픈채팅방 링크: https://open.kakao.com/o/s7654321\n인원이 모두 모집되었습니다. 채팅방에서 구매 정보를 확인해주세요.',
    date: '2024.05.29',
  },
  {
    id: 3,
    title: '[공동구매] 롤 화장지 30롤 필요하신 분?',
    description:
      '오픈채팅방 링크: https://open.kakao.com/o/s9876543\n인원이 모두 모집되었습니다. 채팅방에서 구매 정보를 확인해주세요.',
    date: '2024.05.30',
  },
];
