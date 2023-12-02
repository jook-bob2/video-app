import { get, post } from '@/net/rest';
import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';

type MethodType = 'GET' | 'POST';

const fetcher = async <T, E>(key: string, method: MethodType) => {
  const url = key.split('?')[0];
  const search = key.split('?')[1] || '';
  const searchParams = new URLSearchParams(search);
  const params = JSON.parse(searchParams.get('params') || 'null');

  if (method === 'GET') {
    return get<T, E>(url, params);
  } else if (method === 'POST') {
    return post<T, E>(url, params);
  }
};

export default function useFetch<T, E>(key: string, method: 'GET', options?: UseQueryOptions) {
  return useQuery({
    queryKey: key,
    queryFn: () => fetcher<T, E>(key, method),
    ...options,
  }) as UseQueryResult<T, E>;
}
