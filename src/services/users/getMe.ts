import { userSchema } from '@/schemas/user.ts';
import { instance } from '@/services/instance.ts';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query.ts';
import { useQuery } from 'react-query';

export const getMe = async () => {
  const response = await instance().get('@me').json();
  return userSchema.parse(response);
};

type QueryFnType = typeof getMe;

type UseMeOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useMe = ({ config }: UseMeOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ['me'],
    queryFn: () => getMe(),
    ...config,
  });
};
