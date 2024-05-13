import {
  ExtractFnReturnType,
  MutationConfig,
  queryClient,
} from '@/lib/react-query';
import { instance } from '@/services/instance';
import { useMutation } from 'react-query';

const createTournament = async (data: any): Promise<any> => {
  const response = await instance().post('tournaments', {
    json: data,
  });
  return response.json();
};

type QueryFnType = typeof createTournament;

type UseCreateTournamentOptions = {
  config?: MutationConfig<QueryFnType>;
};

export const useCreateTournament = ({ config }: UseCreateTournamentOptions) => {
  return useMutation<
    ExtractFnReturnType<QueryFnType>,
    string,
    Parameters<QueryFnType>[0],
    any
  >({
    onMutate: async newData => {
      await queryClient.cancelQueries({ queryKey: ['tournaments'] });

      const previousState = queryClient.getQueryData<Array<any>>([
        'tournaments',
      ]);

      queryClient.setQueryData(
        ['tournaments'],
        [...(previousState ?? []), newData],
      );

      return {
        previousState,
      };
    },
    // @ts-ignore
    onError: (error, _, context) => {
      if (context?.previousState) {
        queryClient.setQueryData(['tournaments'], context.previousState);
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['tournaments'],
      });
    },
    ...config,
    mutationFn: createTournament,
  });
};
