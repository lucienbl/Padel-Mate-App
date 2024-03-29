import { useQuery } from 'react-query';

import { instance } from '@/services/instance.ts';
import { userSchema } from '@/schemas/user.ts';
import { z } from 'zod';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query.ts';

export const getUsers = async (): Promise<z.infer<typeof userSchema>> => {
  const response = await instance.get('users').json();
  return userSchema.parse(response);
};

type QueryFnType = typeof getUsers;

type UseUsersOptions = {
  discussionId: string;
  config?: QueryConfig<QueryFnType>;
};

export const useUsers = ({ config }: UseUsersOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ['users'],
    queryFn: () => getUsers(),
    ...config,
  });
};
