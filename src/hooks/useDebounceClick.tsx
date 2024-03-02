import { useState, useCallback } from 'react';

/**
 * 콜백 함수의 타입 정의
 * @template T - 콜백 함수의 파라미터 타입
 */
type CallbackFunction<T = any> = (param?: T) => void;

/**
 * 디바운스 기능을 하는 커스텀 훅
 * @template T - 클릭 핸들러의 파라미터 타입
 * @param callback - 클릭 시 실행할 콜백 함수
 * @param delay - 클릭 이벤트 간격을 조절하는 딜레이 (기본값 : 250ms)
 * @returns {Object} - 클릭 핸들러와 클릭 가능 여부를 포함한 객체
 */
function useDebouncedClick<T = any>(callback: CallbackFunction<T>, delay = 250) {
  /**
   * 클릭 가능 여부를 관리하는 상태
   */
  const [isClickable, setIsClickable] = useState(true);

  /**
   * 디바운스된 클릭 핸들러
   * @param param - 클릭 시 콜백 함수에 전달할 옵셔널 파라미터
   */
  const handleClick = useCallback(
    async (param?: T) => {
      // 클릭 가능한 상태인 경우에만 콜백 실행
      if (isClickable) {
        // 클릭 불가능 상태로 변경
        setIsClickable(false);
        // 콜백 함수 호출
        await callback(param);
        // 주어진 딜레이 이후에 클릭 가능한 상태로 변경
        setTimeout(() => {
          setIsClickable(true);
        }, delay);
      }
    },
    [callback, isClickable, delay],
  );

  // 클릭 핸들러와 클릭 가능 여부를 반환
  return { handleClick, isClickable };
}

export default useDebouncedClick;
