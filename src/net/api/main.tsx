import { get } from '../rest';

/**
 * @desc 비디오 목록 조회
 * @returns
 */
export async function fetchVideoList() {
  const response = await get('/videos');
  return response;
}
