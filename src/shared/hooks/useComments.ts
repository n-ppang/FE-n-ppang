import { useState, useCallback } from 'react';
import type { CommentResponse } from '@/remote/response/GetCommentsResponse';
import { createComment, deleteComment, getComments } from '@/remote/api/CommentApi';

export const useComments = (postId: number, initialComments: CommentResponse[]) => {
  const [comments, setComments] = useState<CommentResponse[]>(initialComments);

  const refreshComments = useCallback(async () => {
    try {
      const data = await getComments(postId);
      setComments(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    }
  }, [postId]);

  const handleAddComment = async (content: string, taggedUserId?: number) => {
    try {
      await createComment(postId, {
        content,
        taggedUserId: taggedUserId ?? 0, // Using 0 if no tag, as per typical API patterns or handle appropriately
      });
      await refreshComments();
    } catch (error) {
      console.error('Failed to add comment:', error);
      alert('댓글 등록에 실패했습니다.');
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    if (!window.confirm('댓글을 삭제하시겠습니까?')) return;
    
    try {
      await deleteComment(postId, commentId);
      await refreshComments();
    } catch (error) {
      console.error('Failed to delete comment:', error);
      alert('댓글 삭제에 실패했습니다.');
    }
  };

  return {
    comments,
    setComments,
    handleAddComment,
    handleDeleteComment,
    refreshComments,
  };
};
