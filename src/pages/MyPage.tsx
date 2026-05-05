import { type UserDomain } from '@/domain/Uesr';
import { signOut } from '@/remote/api/LoginApi';
import { getUserData } from '@/remote/api/UserApi';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MyPage = () => {
  const [userData, setUserData] = useState<UserDomain>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  const nav = useNavigate();

  // getUserData
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await getUserData();
        setUserData(res);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    await signOut();
    nav('/login', { replace: true });
  };
  
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error!!</div>;
  if (!userData) return <div>Error!!</div>;

  return (
    <div className="mt-30 flex items-center justify-center">
      <div className="flex h-[200px] w-[60%] flex-row items-center justify-center gap-10 rounded-2xl border border-gray-400">
        <div className="size-30 border-1 border-gray-400 rounded-full">
          <img src={userData.profile_url} />
        </div>
        <div className="flex flex-col items-start gap-2">
          <div>{userData.name} 님</div>
          <div>{userData.email}</div>
          <button onClick={handleLogout} className="cursor-pointer">
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
