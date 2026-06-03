import { useState, useRef } from 'react';
import type { CommentResponse } from '@/remote/response/GetCommentsResponse';

interface CommentSectionProps {
  comments: CommentResponse[];
  currentUserId: number | null;
  onAddComment: (content: string, taggedUserId?: number) => void;
  onDeleteComment: (commentId: number) => void;
}

const CommentSection = ({ comments = [], currentUserId, onAddComment, onDeleteComment }: CommentSectionProps) => {
  const [inputValue, setInputValue] = useState('');
  const [activeMention, setActiveMention] = useState<{ userId: number; nickname: string } | undefined>(undefined);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleReply = (userId: number, nickname: string) => {
    setActiveMention({ userId, nickname });
    setInputValue(`@${nickname} `);
    inputRef.current?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Check if the input starts with the current mention
    let finalContent = inputValue;
    let taggedUserIdToSend = activeMention?.userId;

    if (activeMention && inputValue.startsWith(`@${activeMention.nickname}`)) {
      finalContent = inputValue.replace(`@${activeMention.nickname}`, '').trim();
    } else {
      taggedUserIdToSend = undefined;
    }

    onAddComment(finalContent, taggedUserIdToSend || (currentUserId ?? 0));
    setInputValue('');
    setActiveMention(undefined);
  };

  return (
    <div className="border-t border-gray-100 bg-gray-50/30 px-6 py-10">
      <h3 className="mb-6 text-lg font-bold text-gray-900">댓글 {comments?.length || 0}</h3>

      {/* Comment List */}
      <div className="mb-8 space-y-4">
        {comments && comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.commentId} className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-100">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-[10px] font-bold text-blue-600">
                    {comment.author.nickname[0]}
                  </div>
                  <span className="text-sm font-bold text-gray-900">{comment.author.nickname}</span>
                  <span className="text-[10px] text-gray-400">{comment.createdAt?.split('T')[0]}</span>
                </div>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => handleReply(comment.author.userId, comment.author.nickname)}
                    className="text-xs font-bold text-blue-500 hover:text-blue-600 active:scale-95"
                  >
                    답글
                  </button>
                  {comment.author.userId === currentUserId && (
                    <button 
                      onClick={() => onDeleteComment(comment.commentId)}
                      className="text-xs font-bold text-red-400 hover:text-red-500 active:scale-95"
                    >
                      삭제
                    </button>
                  )}
                </div>
              </div>
              <p className="text-sm leading-relaxed text-gray-600">
                {comment.taggedUser && (
                  <span className="mr-1 font-bold text-blue-500">@{comment.taggedUser.nickname}</span>
                )}
                {comment.content}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-sm text-gray-400 py-4">첫 댓글을 남겨보세요!</p>
        )}
      </div>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="relative">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="댓글을 남겨보세요..."
          className="w-full rounded-2xl border border-gray-200 bg-white px-5 py-4 pr-16 text-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10"
        />
        <button
          type="submit"
          disabled={!inputValue.trim()}
          className="absolute right-2 top-2 bottom-2 rounded-xl bg-blue-600 px-4 text-sm font-black text-white transition-all hover:bg-blue-700 active:scale-95 disabled:bg-gray-200 disabled:text-gray-400"
        >
          등록
        </button>
      </form>
    </div>
  );
};

export default CommentSection;
