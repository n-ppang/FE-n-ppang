import { useEffect, useState } from 'react';
import { mypage } from '../remote/api/UserApi';
import { useNavigate } from 'react-router-dom';

interface UserData {
  name: string;
  studentId: string;
  nickname: string;
  dormitory: string;
  roomNumber: string;
}

const MyPage = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await mypage();
        setUser(data);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        alert('사용자 정보를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    alert('로그아웃 되었습니다.');
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-gray-500">로딩 중...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-gray-500">사용자 정보를 찾을 수 없습니다.</p>
      </div>
    );
  }

  const infoRowClasses = 'flex justify-between items-center py-4 border-b border-gray-50';
  const labelClasses = 'text-sm font-medium text-gray-500';
  const valueClasses = 'text-sm font-bold text-gray-900';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-md px-6 py-8">
        <h1 className="mb-8 text-2xl font-bold text-gray-900">마이페이지</h1>

        <div className="space-y-1 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className={infoRowClasses}>
            <span className={labelClasses}>이름</span>
            <span className={valueClasses}>{user.name}</span>
          </div>
          <div className={infoRowClasses}>
            <span className={labelClasses}>학번</span>
            <span className={valueClasses}>{user.studentId}</span>
          </div>
          <div className={infoRowClasses}>
            <div className="flex items-center">
              <span className={labelClasses}>닉네임</span>
            </div>
            <span className={valueClasses}>{user.nickname}</span>
          </div>
          <div className={infoRowClasses}>
            <span className={labelClasses}>기숙사</span>
            <span className={valueClasses}>{user.dormitory}</span>
          </div>
          <div className={infoRowClasses}>
            <span className={labelClasses}>호수</span>
            <span className={valueClasses}>{user.roomNumber}</span>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <button
            onClick={() => navigate('/mypage/posts')}
            className="flex w-full items-center justify-between rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all hover:bg-gray-50 active:scale-[0.98]"
          >
            <span className="text-sm font-bold text-gray-700">내가 작성한 게시글 목록</span>
            <span className="text-gray-400">〉</span>
          </button>

          <button
            onClick={() => navigate('/mypage/participations')}
            className="flex w-full items-center justify-between rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all hover:bg-gray-50 active:scale-[0.98]"
          >
            <span className="text-sm font-bold text-gray-700">내가 참여한 게시글 목록</span>
            <span className="text-gray-400">〉</span>
          </button>
        </div>

        <button
          onClick={handleLogout}
          className="mt-8 w-full rounded-2xl bg-red-50 py-4 text-sm font-bold text-red-500 transition-colors hover:bg-red-100"
        >
          로그아웃
        </button>
      </div>
    </div>
  );
};

export default MyPage;
