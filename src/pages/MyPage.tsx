const MyPage = () => {
  // Mock user data
  const user = {
    name: '김유진',
    studentId: 'C233243',
    nickname: '행복다람쥐',
    dormitory: '제1기숙사',
    roomNumber: '101',
    password: '********',
  };

  const handleEdit = (field: string) => {
    alert(`${field} 수정 기능은 준비 중입니다.`);
  };

  const infoRowClasses = 'flex justify-between items-center py-4 border-b border-gray-50';
  const labelClasses = 'text-sm font-medium text-gray-500';
  const valueClasses = 'text-sm font-bold text-gray-900';
  const editBtnClasses =
    'ml-3 text-[11px] font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg hover:bg-blue-100 transition-colors';

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
              <button onClick={() => handleEdit('닉네임')} className={editBtnClasses}>
                수정
              </button>
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
          <div className={infoRowClasses}>
            <div className="flex items-center">
              <span className={labelClasses}>비밀번호</span>
              <button onClick={() => handleEdit('비밀번호')} className={editBtnClasses}>
                수정
              </button>
            </div>
            <span className={valueClasses}>{user.password}</span>
          </div>
        </div>

        <button
          onClick={() => alert('로그아웃 되었습니다.')}
          className="mt-8 w-full rounded-2xl bg-red-50 py-4 text-sm font-bold text-red-500 transition-colors hover:bg-red-100"
        >
          로그아웃
        </button>
      </div>
    </div>
  );
};

export default MyPage;
