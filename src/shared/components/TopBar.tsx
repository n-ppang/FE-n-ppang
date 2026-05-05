import { Link } from 'react-router-dom';

const TopBar = () => {
  return (
    <div className="w-full">
      <div className="absolute top-0 flex h-10 w-full items-center justify-center bg-gray-400">
        <div className="flex w-full flex-row items-center justify-between px-10">
          <Link className="text-lg font-bold" to="/">
            HongikShop
          </Link>
          <div className="flex flex-row gap-10">
            <Link to="/login">Login</Link>
            <Link to="/mypage">MyPage</Link>
          </div>
        </div>
      </div>
      <div className="h-10">dddsfsf</div>
    </div>
  );
};

export default TopBar;
