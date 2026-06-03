import { useEffect, useState } from 'react';
import { getUserList, approveUser } from '@/remote/api/AdminApi';
import type { VerificationRequestResponse } from '@/remote/response/VerificationResponse';

const UserApprovalPage = () => {
  const [requests, setRequests] = useState<VerificationRequestResponse[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const data = await getUserList();
      // 'PENDING' 상태인 요청만 필터링하고 UI용 선택 상태(isApproved) 추가
      const pendingRequests = data.content
        .filter((item) => item.status === 'PENDING')
        .map((item) => ({
          ...item,
          isApproved: false,
        }));
      setRequests(pendingRequests);
    } catch (error) {
      console.error('Failed to fetch verification requests:', error);
      alert('목록을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleCheckboxChange = (id: number) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.verificationId === id ? { ...req, isApproved: !req.isApproved } : req,
      ),
    );
  };

  const handleApproveAll = async () => {
    const selectedUsers = requests.filter((r) => r.isApproved);
    if (selectedUsers.length === 0) {
      alert('승인할 사용자를 선택해주세요.');
      return;
    }

    try {
      // API 엔드포인트에 따라 verificationId 또는 userId 사용
      await Promise.all(selectedUsers.map((req) => approveUser(req.verificationId)));
      alert(`${selectedUsers.length}명의 사용자가 승인되었습니다.`);
      fetchRequests();
    } catch (error) {
      console.error('Failed to approve users:', error);
      alert('일부 사용자의 승인에 실패했습니다.');
    }
  };

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center">로딩 중...</div>;
  }

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
              {requests.map((req, index) => (
                <tr key={req.verificationId} className="transition-colors hover:bg-gray-50/50">
                  <td className="px-4 py-4 font-medium text-gray-500">{index + 1}</td>
                  <td className="px-4 py-4 font-bold text-gray-900">{req.user.name}</td>
                  <td className="px-4 py-4 text-gray-600">{req.user.nickname}</td>
                  <td className="px-4 py-4 text-gray-600">{req.user.dormitory}</td>
                  <td className="px-4 py-4 text-gray-600">{req.user.roomNumber}</td>
                  <td className="px-4 py-4">
                    <div className="h-10 w-10 overflow-hidden rounded-lg border border-gray-100 bg-gray-100">
                      <img
                        src={req.imageUrl}
                        alt="Verification"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <input
                      type="checkbox"
                      checked={req.isApproved}
                      onChange={() => handleCheckboxChange(req.verificationId)}
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
