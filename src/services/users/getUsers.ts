import { useQuery } from 'react-query';

import { instance } from '@/services/instance.ts';
import { userSchema } from '@/schemas/user.ts';
import { z } from 'zod';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query.ts';

export const getUsers = async (): Promise<
  Array<z.infer<typeof userSchema>>
> => {
  const response: any = await instance().get('users').json();
  return response.map((user: any) => userSchema.parse(user));
};

type QueryFnType = typeof getUsers;

type UseUsersOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useUsers = ({ config }: UseUsersOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ['users'],
    queryFn: () => getUsers(),
    ...config,
  });
};
