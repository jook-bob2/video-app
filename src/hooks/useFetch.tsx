import { get, post } from '@/net/rest';
import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';

type MethodType = 'GET' | 'POST';
interface FetchType {
  key: string | null;
  method: MethodType;
}

const fetcher = async <T, E>({ key, method }: FetchType) => {
  if (key) {
    const url = key.split('?')[0];
    const search = key.split('?')[1] || '';
    const searchParams = new URLSearchParams(search);
    const params = JSON.parse(searchParams.get('params') || 'null');
    console.log('params : ', params);
    if (method === 'GET') {
      return get<T, E>(url, params);
    } else if (method === 'POST') {
      return post<T, E>(url, params);
    }
  }
};

export default function useFetch<T, E>(key: string | string[] | null, method: 'GET', options?: UseQueryOptions) {
  let k = '';
  if (key instanceof Array) {
    k = key[0];
  } else if (typeof key === 'string') {
    k = key;
  }

  return useQuery({
    queryKey: [key] || '',
    queryFn: () => fetcher<T, E>({ key: k, method }),
    ...options,
  }) as UseQueryResult<T, E>;
}
