import type { UserDomain } from '@/domain/Uesr';
import { api } from '../axiosInstance';
import type { GetUserResponse } from '../response/getUserResponse';
import { toUserDomain } from '../mapper/UserMapper';

export const getUserData = async (): Promise<UserDomain> => {
  const res = await api.get<GetUserResponse>('/user/profile');
  return toUserDomain(res.data);
};
