import { useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { closeRecentFloater, toggleRecentFloater } from '@/features/ui/uiSlice';
import { shouldShowRecentFloater } from '@/shared/routePolicy/recentFloaterPolicy';

const RecentlyViewedFloater = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const items = useAppSelector((s) => s.recentlyViewed.items);
  const isOpen = useAppSelector((s) => s.ui.recentFloaterOpen);

  const visible = useMemo(() => shouldShowRecentFloater(pathname), [pathname]);

  // 페이지 이동이나 캐시 변경이 발생할 경우 열린 UI 닫기
  useEffect(() => {
    dispatch(closeRecentFloater());
  }, [pathname, dispatch])

  // 정책상 숨김 페이지거나, 최근 본이 비어있으면 플로터 자체 숨김
  if (!visible || items.length === 0) return null;

  return (
    <div className="fixed right-6 bottom-6 z-50 flex flex-col items-end">
      {/* 확장 패널 */}
      {isOpen && (
        <div className="mb-3 w-50 rounded-2xl border border-gray-200 bg-white shadow-lg">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="text-sm font-semibold">최근 본 상품</div>
            <button
              onClick={() => dispatch(closeRecentFloater())}
              className="rounded-md px-2 py-1 text-sm hover:bg-gray-100"
              aria-label="close"
            >
              ✕
            </button>
          </div>

          <div className="max-h-72 overflow-auto px-2 pb-2">
            {items.slice(0, 3).map((p) => {
              const thumb = (p.thumbnailUrl ?? '').trim();
              const hasThumb = thumb.length > 0 && thumb.toLowerCase() !== 'null';

              // 제품명에서 1~2글자 뽑아 placeholder 에 표시
              const label = (p.title ?? '').trim().slice(0, 2).toUpperCase() || 'NA';

              return (
                <button
                  key={String(p.id)}
                  onClick={() => {
                    navigate(`/shop/detail/${p.id}`);
                  }}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left hover:bg-gray-50"
                >
                  {hasThumb ? (
                    <img
                      src={p.thumbnailUrl}
                      alt={p.title}
                      className="h-10 w-10 rounded-md object-cover"
                    />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-200 text-xs font-semibold text-gray-600">
                      {label}
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium">{p.title}</div>
                    <div className="text-xs text-gray-500">{p.price.toLocaleString()}원</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 플로팅 버튼 */}
      <button
        onClick={() => dispatch(toggleRecentFloater())}
        className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-3 shadow-lg hover:bg-gray-50"
      >
        <span className="text-sm font-medium">최근 본</span>
        <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs">{items.length}</span>
      </button>
    </div>
  );
};

export default RecentlyViewedFloater;
