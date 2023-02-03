import { cacheExchange, createClient, dedupExchange, fetchExchange } from 'urql';

export const client = createClient({
  url: '',
  suspense: true,
  exchanges: [dedupExchange, cacheExchange, fetchExchange]
});
