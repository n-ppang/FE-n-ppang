export type CommentResponse = {
  commentId: number;
  content: string;
  author: {
    userId: number;
    nickname: string;
    roomNumber: string;
  };
  taggedUser: {
    userId: number;
    nickname: string;
    roomNumber: string;
  };
  createdAt: string;
};

export type GetCommentsListResponse = {
  comments: CommentResponse[];
};
