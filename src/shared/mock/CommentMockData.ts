export type Comment = {
  id: string;
  author: string;
  content: string;
  createdAt: string;
  mention?: string;
};

export const GroupPurchaseCommentsMockData: Record<string, Comment[]> = {
  'gp-1': [
    {
      id: 'c1',
      author: '김철수',
      content: '저도 참여하고 싶어요!',
      createdAt: '2023-01-02 10:00',
    },
    {
      id: 'c2',
      author: '이영희',
      content: '어디서 모이나요?',
      createdAt: '2023-01-02 11:30',
    },
    {
      id: 'c3',
      author: '박지민',
      mention: '이영희',
      content: '기숙사 정문 앞에서 모여요!',
      createdAt: '2023-01-02 12:00',
    },
  ],
};

export const SharingCommentsMockData: Record<string, Comment[]> = {
  'ps-1': [
    {
      id: 'c4',
      author: '최유진',
      content: '아직 나눔 가능한가요?',
      createdAt: '2023-01-02 14:00',
    },
  ],
};
