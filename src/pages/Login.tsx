import { signInWithGithub } from '@/remote/api/LoginApi';
import { toast } from 'react-toastify';

const Login = () => {
  const handleLogin = async () => {
    const { data, error } = await signInWithGithub(window.location.origin);
    console.log('data, error', data, error);

    if (error) {
      toast.error('로그인 실패');
      return;
    }

    toast.success('로그인 성공!');
  };
  return (
    <div className="flex h-[300px] items-center justify-center">
      <button
        className="flex cursor-pointer items-center justify-center rounded-xl bg-gray-800 px-3 py-1 text-white"
        onClick={handleLogin}
      >
        Login With Github!
      </button>
    </div>
  );
};

export default Login;
