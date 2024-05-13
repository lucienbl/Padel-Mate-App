import { instance } from '@/services/instance.ts';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query.ts';
import { useQuery } from 'react-query';
import { clubSchema } from '@/schemas/club.ts';

export const getClubs = async () => {
  const response: any = await instance().get('clubs').json();
  return response.map((club: any) => clubSchema.parse(club));
};

type QueryFnType = typeof getClubs;

type UseClubsOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useClubs = ({ config }: UseClubsOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ['clubs'],
    queryFn: () => getClubs(),
    ...config,
  });
};
