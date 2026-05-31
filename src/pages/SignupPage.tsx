import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import SubmitBlueButton from '@/shared/components/SubmitBlueButton';
import { signup } from '@/remote/api/AuthApi';
import type { SignupRequest } from '@/remote/request/auth/SignupRequest';

const SignupPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<SignupRequest>({
    studentId: '',
    name: '',
    nickname: '',
    password: '',
    dormitory: '',
    roomNumber: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // 호수(roomNumber) 필드는 숫자만 입력 가능하도록 필터링
    if (name === 'roomNumber') {
      const numericValue = value.replace(/[^0-9]/g, '');
      setFormData((prev) => ({ ...prev, [name]: numericValue }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e: React.FormEvent) => {
    if (e) e.preventDefault();

    // Simple mandatory check
    const isAllFieldsFilled = Object.values(formData).every((val) => val.trim() !== '');
    if (!isAllFieldsFilled) {
      alert('모든 필드를 채워주세요.');
      return;
    }

    try {
      await signup(formData);
      alert('회원가입 기본 정보가 저장되었습니다. 기숙사 인증 단계로 이동합니다.');
      navigate('/signup/verification');
    } catch (error) {
      console.error('Signup process failed:', error);
      alert('회원가입에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const inputClasses =
    'w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 placeholder:text-gray-400';
  const labelClasses = 'mb-1.5 ml-1 block text-sm font-bold text-gray-700';

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="mx-auto max-w-md px-6 py-12">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-black tracking-tight text-gray-900">회원가입</h1>
          <p className="mt-2 text-sm text-gray-500">nppang에 오신 것을 환영합니다!</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-6">
          <div>
            <label className={labelClasses}>학번</label>
            <input
              name="studentId"
              value={formData.studentId}
              onChange={handleChange}
              placeholder="학번 8자리를 입력하세요"
              className={inputClasses}
              required
            />
          </div>

          <div>
            <label className={labelClasses}>이름</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="실명을 입력하세요"
              className={inputClasses}
              required
            />
          </div>

          <div>
            <label className={labelClasses}>닉네임</label>
            <input
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
              placeholder="사용할 닉네임을 입력하세요"
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

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClasses}>기숙사 이름</label>
              <select
                name="dormitory"
                value={formData.dormitory}
                onChange={handleChange}
                className={inputClasses}
                required
              >
                <option value="" disabled>
                  기숙사 선택
                </option>
                <option value="제1기숙사">제1기숙사</option>
                <option value="제2기숙사">제2기숙사</option>
                <option value="제3기숙사">제3기숙사</option>
              </select>
            </div>
            <div>
              <label className={labelClasses}>호수</label>
              <input
                name="roomNumber"
                value={formData.roomNumber}
                onChange={handleChange}
                placeholder="예: 101"
                inputMode="numeric"
                className={inputClasses}
                required
              />
            </div>
          </div>

          <div className="pt-4">
            <SubmitBlueButton onClick={() => {}} text="가입하고 인증하기" />
          </div>
        </form>

        <p className="mt-8 text-center text-sm text-gray-500">
          이미 계정이 있으신가요?{' '}
          <Link to="/login" className="font-bold text-blue-600 hover:underline">
            로그인
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
