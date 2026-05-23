import { useNavigate } from 'react-router-dom';

interface ItemContainerProps {
  id: string;
  model: 'group-purchase' | 'product-sharing';
  title: string;
  price?: number;
  peopleClosed?: number;
  totalPeople?: number;
  expirationDate?: string;
  createdAt: string;
}

const ItemContainer = ({
  id,
  model,
  title,
  price,
  peopleClosed,
  totalPeople,
  expirationDate,
  createdAt,
}: ItemContainerProps) => {
  const navigate = useNavigate();
  const daysLeft = expirationDate
    ? Math.ceil((new Date(expirationDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    : undefined;

  const isExpiringSoon = daysLeft !== undefined && daysLeft <= 3;

  const handleClick = () => {
    if (model === 'group-purchase') {
      navigate(`/group-purchases/${id}`);
    } else {
      navigate(`/sharing-products/${id}`);
    }
  };

  return (
    <div 
      onClick={handleClick}
      className="mb-4 flex w-full cursor-pointer overflow-hidden rounded-2xl bg-white shadow-[0_2px_10px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] ring-1 ring-gray-100 transition-all hover:scale-[1.01] hover:shadow-lg active:scale-[0.99]"
    >
      {/* Image Section */}
      <div className="relative h-28 w-28 flex-shrink-0 bg-gray-50 sm:h-32 sm:w-32">
        <img
          className="h-full w-full object-cover"
          src={`https://placehold.co/400x400/f8fafc/64748b?text=${encodeURIComponent(title[0])}`}
          alt={title}
        />
        {model === 'product-sharing' && daysLeft !== undefined && (
          <div
            className={`absolute top-2 left-2 rounded-lg px-2 py-1 text-[10px] font-bold text-white shadow-sm backdrop-blur-sm ${
              isExpiringSoon ? 'bg-red-500/90' : 'bg-blue-500/90'
            }`}
          >
            D-{daysLeft < 0 ? 'Day' : daysLeft}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex flex-1 flex-col justify-between p-3 sm:p-4">
        <div>
          <h3 className="mb-1 line-clamp-1 text-sm font-bold text-gray-900 sm:text-base">{title}</h3>
          
          {model === 'group-purchase' && (
            <div className="space-y-1">
              <div className="text-base font-black text-blue-600 sm:text-lg">
                인당 {price?.toLocaleString()}원
              </div>
              <div className="flex items-center gap-2 text-[11px] text-gray-400 sm:text-xs">
                <span className="font-semibold text-gray-600">{peopleClosed}</span>
                <span>/</span>
                <span>{totalPeople}명 모집</span>
                <div className="ml-auto h-1.5 w-12 overflow-hidden rounded-full bg-gray-100 sm:w-16">
                  <div 
                    className="h-full bg-blue-500 transition-all duration-500" 
                    style={{ width: `${Math.min(100, ((peopleClosed || 0) / (totalPeople || 1)) * 100)}%` }}
                  />
                </div>
              </div>
            </div>
          )}

          {model === 'product-sharing' && (
            <div className="space-y-0.5 sm:space-y-1">
              <div className="text-[11px] font-medium text-gray-500 sm:text-xs">
                유통기한: <span className="text-gray-700">{expirationDate}</span>
              </div>
              <div className={`text-[10px] sm:text-[11px] ${isExpiringSoon ? 'font-bold text-red-500' : 'text-gray-400'}`}>
                {daysLeft !== undefined && daysLeft <= 0 ? '오늘 나눔이 종료돼요!' : `${daysLeft}일 남았어요`}
              </div>
            </div>
          )}
        </div>

        <div className="mt-2 flex items-center justify-between border-t border-gray-50 pt-2 text-[10px] text-gray-400">
          <span className="flex items-center gap-1">
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {createdAt}
          </span>
          <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
            model === 'group-purchase' ? 'bg-blue-50 text-blue-500' : 'bg-green-50 text-green-500'
          }`}>
            {model === 'group-purchase' ? 'Group' : 'Share'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ItemContainer;
