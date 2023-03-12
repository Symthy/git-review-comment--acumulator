import {
  AnyVariables,
  cacheExchange,
  createClient,
  dedupExchange,
  fetchExchange,
  useQuery,
  UseQueryArgs,
  UseQueryResponse
} from 'urql';

export const client = createClient({
  url: '',
  suspense: true,
  exchanges: [dedupExchange, cacheExchange, fetchExchange]
});

export const useQueryWrapper = <Data, Variables extends AnyVariables = AnyVariables>(
  args: UseQueryArgs<Variables, Data>
): UseQueryResponse<Data, Variables> => {
  return useQuery<Data, Variables>({
    ...args
  });
};
