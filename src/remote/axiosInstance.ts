import axios from 'axios';

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 🚀 요청 인터셉터 추가: API를 호출할 때마다 실행됩니다.
api.interceptors.request.use(
  (config) => {
    // 로컬 스토리지에서 토큰을 가져옵니다 (프로젝트에서 사용하는 Key 이름으로 변경하세요)
    const token = localStorage.getItem('accessToken');

    // 토큰이 존재한다면 Authorization 헤더에 주입
    if (token && config.headers) {
      // Bearer 방식인 경우 아래와 같이 조합합니다.
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
