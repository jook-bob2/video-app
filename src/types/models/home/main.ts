import { MimeType } from '@/types/video';

/**
 * @desc 메인 비디오 목록 요청
 */
export interface MainVideoListRequest {}

/**
 * @desc 메인 비디오 목록 응답
 */
export interface MainVideoListResponse {
  videoList: {
    desc: string;
    sources: string[];
    subtitle: string;
    thumb: string;
    title: string;
    type: MimeType;
  }[];
}
