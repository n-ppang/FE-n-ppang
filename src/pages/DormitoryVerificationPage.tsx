import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import SubmitBlueButton from '@/shared/components/SubmitBlueButton';
import { verification } from '@/remote/api/AuthApi';

const DormitoryVerificationPage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

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

  const handleVerify = async () => {
    if (!profileImage || !imagePreview) {
      alert('인증 사진을 업로드해주세요.');
      return;
    }

    try {
      await verification({ imageUrl: imagePreview });
      alert('인증 요청이 완료되었습니다! 관리자 승인 후 로그인이 가능합니다.');
      navigate('/login');
    } catch (error) {
      console.error('Verification process failed:', error);
      alert('인증 요청에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const labelClasses = 'mb-1.5 ml-1 block text-sm font-bold text-gray-700';

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="mx-auto max-w-md px-6 py-12">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-black tracking-tight text-gray-900">기숙사 인증</h1>
          <p className="mt-2 text-sm text-gray-500">nppang 이용을 위해 기숙사 학생 인증이 필요해요.</p>
        </div>

        <div className="space-y-6">
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
            />
          </div>

          <div className="pt-4">
            <SubmitBlueButton onClick={handleVerify} text="인증하기" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DormitoryVerificationPage;
