import { Link } from 'react-router-dom';

const TopBar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-md items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2 transition-transform active:scale-95">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white shadow-blue-200 shadow-lg">
            <span className="text-lg font-black">N</span>
          </div>
          <span className="text-xl font-black tracking-tighter text-gray-900">
            nppang
          </span>
        </Link>

        <nav className="flex items-center gap-3">
          <Link
            to="/notifications"
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-50 text-gray-500 transition-all hover:bg-gray-100 hover:text-blue-600 active:scale-90"
            aria-label="알림"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </Link>
          <Link
            to="/login"
            className="text-xs font-bold text-gray-500 transition-colors hover:text-blue-600"
          >
            로그인
          </Link>
          <Link
            to="/signup"
            className="rounded-xl bg-blue-50 px-3 py-2 text-xs font-bold text-blue-600 transition-all hover:bg-blue-100 active:scale-95"
          >
            회원가입
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default TopBar;
