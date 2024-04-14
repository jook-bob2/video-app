import { ShortsListDto } from '@/types/dtos/shorts';

/**
 * @desc 쇼츠 요청 파라미터
 */
export interface ShortsListRequest {
  pageNum: number;
}

/**
 * @desc 쇼츠 응답 파라미터
 */
export type ShortsListResponse = ShortsListDto[];
