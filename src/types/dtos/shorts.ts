import { MimeType } from '../video';

/**
 * @desc 쇼츠 목록 데이터
 */
export interface ShortsListDto {
  id: number;
  desc: string;
  sources: string[];
  subtitle: string;
  thumb: string;
  title: string;
  type: MimeType;
}
