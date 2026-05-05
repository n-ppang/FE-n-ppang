/**
 * 최근 본 상품 플로터 노출 정책
 * - 블랙 리스트 방식
 */
const HIDE_ON: RegExp[] = [
  /^\/login(\/|$)/,
  /^\/mypage(\/|$)/,
];

export function shouldShowRecentFloater(pathname: string): boolean {
  return !HIDE_ON.some((re) => re.test(pathname));
}
