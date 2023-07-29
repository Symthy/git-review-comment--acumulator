import { Client, cacheExchange, fetchExchange } from 'urql';

export const clientOptionBuilder = (url: string, accessToken: string) => {
  return {
    url: url,
    exchanges: [cacheExchange, fetchExchange],
    fetchOptions: {
      headers: {
        authorization: `Bearer ${accessToken}`,
        Accept: '*/*'
      }
    },
    suspense: true
  };
};

export const githubClient = new Client(
  clientOptionBuilder(
    'https://api.github.com/graphql',
    // TDOD: Set the token entered by the user on the GUI
    import.meta.env.DEV ? import.meta.env.VITE_GITHUB_TOKEN : ''
  )
);
