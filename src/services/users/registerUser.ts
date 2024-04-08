import { userSchema } from '@/schemas/user.ts';
import { instance } from '@/services/instance.ts';

export type RegisterUserBody = {
  firebaseUid: string;
  firstName: string;
  lastName: string;
  birthdate: string;
};

export const registerUser = async ({
  firebaseUid,
  firstName,
  lastName,
  birthdate,
}: RegisterUserBody) => {
  const response = await instance()
    .post('users/register', {
      json: {
        firebaseUid,
        firstName,
        lastName,
        birthdate,
      },
    })
    .json();
  return userSchema.parse(response);
};
