import { useState } from 'react';
import { USER_APPROVAL_MOCK_DATA, type UserApprovalRequest } from '@/shared/mock/UserApprovalMockData';

const UserApprovalPage = () => {
  const [requests, setRequests] = useState<UserApprovalRequest[]>(USER_APPROVAL_MOCK_DATA);

  const handleCheckboxChange = (id: number) => {
    setRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, isApproved: !req.isApproved } : req)),
    );
  };

  const handleApproveAll = () => {
    const approvedCount = requests.filter((r) => r.isApproved).length;
    if (approvedCount === 0) {
      alert('승인할 사용자를 선택해주세요.');
      return;
    }
    alert(`${approvedCount}명의 사용자가 승인되었습니다.`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="mx-auto max-w-2xl px-6 py-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">회원가입 승인 관리</h1>
          <span className="text-sm font-medium text-gray-500">대기 중: {requests.length}명</span>
        </div>

        <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-100 bg-gray-50">
              <tr>
                <th className="px-4 py-4 font-bold text-gray-600">번호</th>
                <th className="px-4 py-4 font-bold text-gray-600">이름</th>
                <th className="px-4 py-4 font-bold text-gray-600">닉네임</th>
                <th className="px-4 py-4 font-bold text-gray-600">기숙사</th>
                <th className="px-4 py-4 font-bold text-gray-600">호수</th>
                <th className="px-4 py-4 font-bold text-gray-600">인증사진</th>
                <th className="px-4 py-4 text-center font-bold text-gray-600">승인</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {requests.map((user, index) => (
                <tr key={user.id} className="transition-colors hover:bg-gray-50/50">
                  <td className="px-4 py-4 font-medium text-gray-500">{index + 1}</td>
                  <td className="px-4 py-4 font-bold text-gray-900">{user.name}</td>
                  <td className="px-4 py-4 text-gray-600">{user.nickname}</td>
                  <td className="px-4 py-4 text-gray-600">{user.dormitory}</td>
                  <td className="px-4 py-4 text-gray-600">{user.roomNumber}</td>
                  <td className="px-4 py-4">
                    <div className="h-10 w-10 overflow-hidden rounded-lg border border-gray-100 bg-gray-100">
                      <img
                        src={user.verificationImageUrl}
                        alt="Verification"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <input
                      type="checkbox"
                      checked={user.isApproved}
                      onChange={() => handleCheckboxChange(user.id)}
                      className="h-5 w-5 cursor-pointer rounded-lg border-gray-200 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button
          onClick={handleApproveAll}
          className="mt-8 w-full rounded-2xl bg-blue-600 py-4 text-sm font-bold text-white shadow-lg shadow-blue-200 transition-all hover:bg-blue-700 active:scale-[0.98]"
        >
          선택한 사용자 승인 완료
        </button>
      </div>
    </div>
  );
};

export default UserApprovalPage;
