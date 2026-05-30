import { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import SubmitBlueButton from '@/shared/components/SubmitBlueButton';

const SignupPage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    studentId: '',
    name: '',
    nickname: '',
    password: '',
    dormitory: '',
    roomNumber: '',
  });

  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSignup = (e: React.FormEvent) => {
    if (e) e.preventDefault();

    // Simple mandatory check
    const isAllFieldsFilled = Object.values(formData).every((val) => val.trim() !== '');
    if (!isAllFieldsFilled || !profileImage) {
      alert('모든 필드를 채워주세요.');
      return;
    }

    console.log('Signup data:', { ...formData, profileImage });
    alert('회원가입 기능이 아직 준비되지 않았습니다.');
    navigate('/login');
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

          <div>
            <label className={labelClasses}>기숙사 학생 인증 사진</label>
            <p className="mb-3 ml-1 text-[11px] leading-relaxed font-medium text-blue-500">
              기숙사 학생 카드나 기숙사 홈페이지의 내 정보와 같은 사진이 필요해요.
            </p>

            <div
              onClick={() => fileInputRef.current?.click()}
              className="group relative flex aspect-video w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-gray-200 bg-white transition-all hover:border-blue-300 hover:bg-blue-50/30"
            >
              {imagePreview ? (
                <>
                  <img src={imagePreview} alt="Preview" className="h-full w-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                    <span className="text-xs font-bold text-white">사진 변경하기</span>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center gap-2 text-gray-400">
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-xs font-bold">인증 사진 업로드</span>
                </div>
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
              required
            />
          </div>

          <div className="pt-4">
            <SubmitBlueButton onClick={() => {}} text="가입하기" />
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
