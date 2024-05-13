import { useQuery } from 'react-query';

import { instance } from '@/services/instance.ts';
import { userSchema } from '@/schemas/user.ts';
import { z } from 'zod';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query.ts';

export const getTournaments = async (): Promise<Array<any>> => {
  return instance().get('tournaments').json();
};

type QueryFnType = typeof getTournaments;

type UseTournamentsOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useTournaments = ({ config }: UseTournamentsOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ['tournaments'],
    queryFn: () => getTournaments(),
    ...config,
  });
};
