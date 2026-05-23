import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import SubmitBlueButton from '@/shared/components/SubmitBlueButton';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    studentId: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = (e: React.FormEvent) => {
    if (e) e.preventDefault();

    // Simple mandatory check
    if (!formData.studentId.trim() || !formData.password.trim()) {
      alert('학번과 비밀번호를 모두 입력해주세요.');
      return;
    }

    console.log('Login data:', formData);
    alert('로그인되었습니다!');
    navigate('/');
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
