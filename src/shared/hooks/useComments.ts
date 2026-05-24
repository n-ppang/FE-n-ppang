import { useState } from 'react';
import type { Comment } from '@/shared/mock/CommentMockData';

export const useComments = (initialComments: Comment[]) => {
  const [comments, setComments] = useState<Comment[]>(initialComments);

  const handleAddComment = (content: string, mention?: string) => {
    const now = new Date();
    const kstDate = new Date(now.getTime() + 9 * 60 * 60 * 1000);
    const newComment: Comment = {
      id: Date.now().toString(),
      author: '나 (User)',
      content,
      mention,
      createdAt: kstDate.toISOString().replace('T', ' ').substring(0, 16),
    };
    setComments([...comments, newComment]);
  };

  const handleDeleteComment = (commentId: string) => {
    if (window.confirm('댓글을 삭제하시겠습니까?')) {
      setComments(comments.filter((c) => c.id !== commentId));
    }
  };

  return {
    comments,
    handleAddComment,
    handleDeleteComment,
  };
};
