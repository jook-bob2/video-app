'use client';

import { debounce } from 'lodash-es';
import videojs from 'video.js';
import { useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import 'video.js/dist/video-js.css';
import styled from 'styled-components';
import useFetch from '@/hooks/useFetch';
import { ResponseType } from '@/types/network';
import { MainVideoListResponse } from '@/types/models/home/main';
import LiveViewServerStyle from '@/components/live/view/LiveViewServer.style';
import useMediaQuery from '@/hooks/useMediaQuery';

export default function LiveView() {
  const searchParam = useSearchParams();
  const userId = searchParam.get('mcid');
  const videoRef = useRef<HTMLDivElement | null>(null);
  const watermarkRef = useRef<HTMLDivElement | null>(null);
  const [showWatermark, setShowWatermark] = useState(false);
  const [source, setSource] = useState({
    src: '',
    type: '',
  });

  const isMobile = useMediaQuery('(max-width: 767px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
  const isPC = useMediaQuery('(min-width: 1024px)');

  const { data } = useFetch<ResponseType<MainVideoListResponse>, any>(!source.src ? `/videos` : '', 'GET');

  useEffect(() => {
    const onMessage = (e: MessageEvent<{ message: string; data: { test: string } }>) => {
      const message = e.data?.message;
      const origin = e.origin;
      // if (origin === 'http://localhost:3000' && message) {
      //   alert('on message origin : ' + origin + '; data : ' + JSON.stringify(e.data.data));
      // }
      if (message) {
        alert('on message origin : ' + origin + '; data : ' + JSON.stringify(e.data.data));
      }
    };
    window.addEventListener('message', onMessage);

    return () => {
      window.removeEventListener('message', onMessage);
    };
  }, []);

  useEffect(() => {
    window.addEventListener('storage', onOtherTabStorage);

    return () => {
      window.removeEventListener('storage', onOtherTabStorage);
    };
  }, []);

  // 다른 탭 로그인 여부 감지
  const onOtherTabStorage = debounce(
    useCallback((e: StorageEvent) => {
      console.log(`#################### Storage in AppContainer ####################`);
      console.log('e.key ', e.key);
      console.log('e.newValue ', e.newValue);
      // if (e.key === 'isSigned' && e.newValue) {
      //   const { value } = JSON.parse(e.newValue);
      //   if (value !== undefined && value !== null) {
      //     location.reload();
      //   }
      // }
    }, []),
    250,
  );

  useEffect(() => {
    const videoList = data?.data?.videoList || [];
    if (videoList.length > 0) {
      const firstVideo = videoList[0];
      setSource({
        src: firstVideo.sources[0],
        type: firstVideo.type,
      });
    }
  }, [data]);

  useEffect(() => {
    if (source.src) {
      const videoElement = document.createElement('video-js') as HTMLVideoElement;
      videoRef?.current?.appendChild(videoElement);

      const player = videojs(videoElement, {
        muted: true,
        bigPlayButton: false,
        autoplay: true,
        defaultVolume: 0,
        loop: false,
        aspectRatio: '16:9',
        controls: true,
        sources: [
          {
            src: source.src,
            type: source.type,
          },
        ],
      });

      player.on('loadedmetadata', () => {
        setShowWatermark(true);
      });

      player.on('play', () => {
        const updateWatermarkPosition = () => {
          const videoEle = document.querySelector('video');
          if (videoEle && watermarkRef?.current) {
            const videoWidth = videoEle.videoWidth;
            const videoHeight = videoEle.videoHeight;
            let maxX, maxY;
            const watermarkWidth = watermarkRef.current.offsetWidth;
            const watermarkHeight = watermarkRef.current.offsetHeight;

            // Adjust position for PCs
            if (videoWidth / videoHeight > 16 / 9) {
              // Landscape video
              maxX = videoWidth - watermarkWidth;
              maxY = videoHeight - watermarkHeight;
            } else {
              // Portrait video
              maxX = videoWidth - watermarkWidth;
              maxY = videoHeight - watermarkHeight;

              // Ensure watermark stays within the video area
              if (maxY < 0) maxY = 0;
            }

            const randomX = Math.floor(Math.random() * maxX);
            const randomY = Math.floor(Math.random() * maxY);

            watermarkRef.current.style.transform = `translate(${randomX}px, ${randomY}px)`;
          }
        };

        updateWatermarkPosition();

        const interval = setInterval(updateWatermarkPosition, 5000);

        return () => {
          clearInterval(interval);
        };
      });
      return () => {
        player.dispose();
      };
    }
  }, [source]);

  return (
    <section>
      <div className='w-100 h-100'>
        <button
          onClick={() => {
            window.open('/callback', '_blank', 'width=500, height=500');
          }}>
          새창 열기
        </button>
        <button
          onClick={() => {
            const data = window.localStorage.getItem('isSigned');
            let value;
            if (data) {
              value = JSON.parse(data)?.value;
            }
            console.log('isSigned ', value);
            window.localStorage.setItem('isSigned', JSON.stringify({ value: !value }));
          }}>
          로그인 세션
        </button>
      </div>

      <LiveViewServerStyle.Container>
        {/* 탑 */}
        <LiveViewServerStyle.LiveTop>
          {/* 왼쪽 영역 */}
          <LiveViewServerStyle.Left>
            {/* 비디오 영역 */}
            {/* <LiveViewServerStyle.VideoArea isVertical={true}> */}

            <VideoWrapper>
              <h1>비디오 영역</h1>
              {/* {showWatermark && <Watermark ref={watermarkRef}>{userId}</Watermark>} */}
              {showWatermark && (
                <div
                  className='absolute w-full h-full bg-transparent'
                  // ref={watermarkWrapperRef}
                  style={{ visibility: 'visible' }}
                  id={'watermark_id'}>
                  {/* 워터마크 */}
                  <div
                    ref={watermarkRef}
                    className='absolute z-50 block text-xs text-white bg-transparent bg-red-800 select-none whitespace-nowrap'
                    style={{ visibility: 'visible', opacity: '.3' }}>
                    {userId}
                  </div>
                </div>
              )}
              <div
                data-vjs-player
                className='my-auto data-vjs-player'>
                <div
                  ref={videoRef}
                  className={`video-js-wrap`}
                />
              </div>
            </VideoWrapper>
            {/* </LiveViewServerStyle.VideoArea> */}
            {/* MC 정보 영역 */}
            <LiveViewServerStyle.McInfoArea className='hidden laptop:flex'>
              <LiveViewServerStyle.MCInfoWrapper>
                <LiveViewServerStyle.MCInfo>
                  {/* 방송자 정보 */}
                  <div className='mc-info-wrap'>
                    {/* mc정보 레이어 */}
                    <span>닉네임</span>
                  </div>

                  {/* 방송 정보 - 시작시간, 누적, 즐찾, 추천수 */}
                </LiveViewServerStyle.MCInfo>
              </LiveViewServerStyle.MCInfoWrapper>
            </LiveViewServerStyle.McInfoArea>

            {/* 모바일 채팅 영역 */}
          </LiveViewServerStyle.Left>
          {/* 오른쪽 영역 */}
          <LiveViewServerStyle.Right>
            {/* 채팅 영역 */}
            <LiveViewServerStyle.ChatArea>
              <LiveViewServerStyle.ChatHeader>
                <strong className='text-sm'>채팅</strong>
              </LiveViewServerStyle.ChatHeader>
              <LiveViewServerStyle.ChatContent>
                <LiveViewServerStyle.ChatBody />
                <LiveViewServerStyle.ChatForm>
                  <div className='flex flex-row justify-between w-full'>
                    <div className='flex flex-row items-start'>
                      <div className='flex items-center gap-1 mb-1'></div>
                    </div>
                    <div className='flex flex-row items-end'>
                      <div className='flex items-center gap-1 mb-1'></div>
                    </div>
                  </div>
                  <LiveViewServerStyle.ChatInputBox>
                    <LiveViewServerStyle.ChatInput placeholder={'메시지를 입력하세요.'} />
                  </LiveViewServerStyle.ChatInputBox>
                </LiveViewServerStyle.ChatForm>
              </LiveViewServerStyle.ChatContent>
            </LiveViewServerStyle.ChatArea>
          </LiveViewServerStyle.Right>
        </LiveViewServerStyle.LiveTop>
      </LiveViewServerStyle.Container>
    </section>
  );
}

const VideoWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%;
`;
