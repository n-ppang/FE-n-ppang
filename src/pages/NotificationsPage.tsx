import { NOTIFICATION_MOCK_DATA } from '@/shared/mock/NotificationMockData';

const NotificationsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-md px-6 py-8">
        <h1 className="mb-6 text-2xl font-bold text-gray-900">알림</h1>
        <div className="space-y-4">
          {NOTIFICATION_MOCK_DATA.length > 0 ? (
            NOTIFICATION_MOCK_DATA.map((notification) => (
              <div
                key={notification.id}
                className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all hover:shadow-md"
              >
                <div className="mb-2 flex items-start justify-between">
                  <h2 className="text-sm leading-tight font-bold text-gray-900">
                    {notification.title}
                  </h2>
                  <span className="ml-2 text-[10px] font-medium whitespace-nowrap text-gray-400">
                    {notification.date}
                  </span>
                </div>
                <p className="text-xs leading-relaxed whitespace-pre-line text-gray-600">
                  {notification.description}
                </p>
              </div>
            ))
          ) : (
            <div className="rounded-2xl border border-gray-100 bg-white p-4 py-12 text-center text-gray-500 shadow-sm">
              새로운 알림이 없습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
