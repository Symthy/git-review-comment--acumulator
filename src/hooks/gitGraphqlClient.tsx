import { useMemo } from 'react';
import { AnyVariables, createClient, useQuery, UseQueryArgs, UseQueryResponse } from 'urql';

// Todo
export const useGithubQuery = <Data, Variables extends AnyVariables = AnyVariables>(
  args: UseQueryArgs<Variables, Data>
): UseQueryResponse<Data, Variables> => {
  const context = useMemo(() => {
    return {
      url: 'https://api.github.com/graphql',
      fetchOptions: {
        headers: {
          authorization: `Bearer ${import.meta.env.DEV ? import.meta.env.VITE_GITHUB_TOKEN : ''}`
        }
      }
    };
  }, []);

  return useQuery<Data, Variables>({
    ...args,
    context
  });
};

export const useGitLabQuery = <Data, Variables extends AnyVariables = AnyVariables>(
  args: UseQueryArgs<Variables, Data>
): UseQueryResponse<Data, Variables> => {
  const context = useMemo(() => {
    return {
      url: `${import.meta.env.VITE_GITLAB_URL}/api/graphql`,
      fetchOptions: {
        headers: {
          authorization: `Bearer ${import.meta.env.DEV ? import.meta.env.VITE_GITLAB_TOKEN : ''}`
        }
      }
    };
  }, []);
  return useQuery<Data, Variables>({
    ...args,
    context
  });
};

// ref: useQuery の引数の context はキャッシュでなければ Too-many rerender の原因になる (2023/2/11)
// https://github.com/urql-graphql/urql/blob/a1c0d68cd28fbbc0592119ae6d83d9b85a1c644d/packages/preact-urql/src/hooks/useQuery.ts#L147
