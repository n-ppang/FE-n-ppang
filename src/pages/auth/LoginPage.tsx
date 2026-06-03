import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import SubmitBlueButton from '@/shared/components/SubmitBlueButton';
import { login } from '@/remote/api/AuthApi';
import type { LoginRequest } from '@/remote/request/auth/LoginRequest';
import { useAuthStore } from '@/shared/hooks/useAuthStore';

const LoginPage = () => {
  const navigate = useNavigate();
  const { setLoggedIn, fetchMe } = useAuthStore();
  const [formData, setFormData] = useState<LoginRequest>({
    studentId: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!formData.studentId.trim() || !formData.password.trim()) {
      alert('학번과 비밀번호를 모두 입력해주세요.');
      return;
    }

    try {
      const response = await login(formData);
      const token = response.accessToken || response.token;

      if (token) {
        localStorage.setItem('accessToken', token);
        setLoggedIn(true);
        const userData = await fetchMe(); // 로그인 직후 내 정보(role 포함) 가져오기
        alert('로그인에 성공했습니다!');
        console.log('Login response:', response); // 디버깅용 로그
        if (userData.data.role === 'ROLE_ADMIN') {
          navigate('/admin/approvals');
        } else {
          navigate('/');
        }
      } else {
        throw new Error('토큰을 찾을 수 없습니다.');
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.errorMessage || error.message || '알 수 없는 오류가 발생했습니다.';
      alert(`로그인에 실패했습니다.\n${errorMessage}`);
    }
  };

  const inputClasses =
    'w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 placeholder:text-gray-400';
  const labelClasses = 'mb-1.5 ml-1 block text-sm font-bold text-gray-700';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-md px-6 py-20">
        <div className="mb-10 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-200">
            <span className="text-2xl font-black">N</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-gray-900">로그인</h1>
          <p className="mt-2 text-sm text-gray-500">다시 만나서 반가워요!</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className={labelClasses}>학번</label>
            <input
              name="studentId"
              value={formData.studentId}
              onChange={handleChange}
              placeholder="학번을 입력하세요"
              className={inputClasses}
              required
            />
          </div>

          <div>
            <label className={labelClasses}>비밀번호</label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="비밀번호를 입력하세요"
              className={inputClasses}
              required
            />
          </div>

          <div className="pt-4">
            <SubmitBlueButton onClick={() => {}} text="로그인하기" />
          </div>
        </form>

        <div className="mt-10 space-y-4 text-center text-sm">
          <p className="text-gray-500">
            아직 계정이 없으신가요?{' '}
            <Link to="/signup" className="font-bold text-blue-600 hover:underline">
              회원가입
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
