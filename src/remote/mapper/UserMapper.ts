import type { GetUserResponse } from '../response/getUserResponse';
import type { UserDomain } from '@/domain/Uesr';

export const toUserDomain = (response: GetUserResponse): UserDomain => ({
  id: response.id,
  name: response.name,
  email: response.email,
  profile_url: response.profile_url,
});
