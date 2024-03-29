import { userSchema } from '@/schemas/user.ts';
import { instance } from '@/services/instance.ts';

export const getMe = async () => {
  const response = await instance.get('@me').json();
  return userSchema.parse(response);
};
