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

        <nav className="flex items-center gap-4">
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
