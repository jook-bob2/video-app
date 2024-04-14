'use client';
import SlideContainer from '@/components/ui/SlideContainer';
import VideoPlayer from '@/components/VideoPlayer';
import useFetch from '@/hooks/useFetch';
import { ShortsListDto } from '@/types/dtos/shorts';
import { ShortsListResponse } from '@/types/models/shorts';
import { ResponseType } from '@/types/network';
import _ from 'lodash-es';
import { useParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import Swiper from 'swiper';
import { SwiperSlide } from 'swiper/react';
import { VideoJsPlayer } from 'video.js';

export default function ShortsPage() {
  const { id } = useParams();

  const [pageData, setPageData] = useState({
    pageNum: Math.ceil(Number(id) / 3) || 1,
    pageSize: 3,
    totalCnt: 12,
  }); // 페이지 데이터
  const [shorts, setShorts] = useState<ShortsListDto[]>([]); // 쇼츠 리스트
  const [currentIndex, setCurrentIndex] = useState(0); // 현재 인덱스
  const [_player, setPlayer] = useState({
    isMuted: false, // 음소거 여부
    isPlaying: false, // 재생 여부
  }); // 플레이어 설정

  const playerRef = useRef<VideoJsPlayer | null>(null); // 플레이어 ref

  // 데이터 fetching
  const { data } = useFetch<ResponseType<ShortsListResponse>, any>(
    pageData.pageNum > 0 ? `/shorts-${pageData.pageNum}` : null,
    'GET',
  );

  /**
   * @desc 스크롤 숨김
   */
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  /**
   * @desc 데이터 상태 변경 하기
   */
  useEffect(() => {
    const shortsList = data?.data || [];

    if (shortsList?.length > 0) {
      const arr = _.unionBy([...shorts, ...shortsList], 'id');
      console.log('arr ', arr);
      setShorts([...arr]);
    }
  }, [data]);

  /**
   * @desc 비디오 재생 준비 완료 시 플레이어 설정
   * @param player
   */
  const onReady = (player: VideoJsPlayer) => {
    playerRef.current = player;

    if (player) {
      player.on('loadeddata', async () => {
        console.log('loadeddata ');
        try {
          await player.play();

          const isMuted = _player.isMuted;

          player.muted(isMuted);

          setPlayer({
            isMuted,
            isPlaying: true,
          });
        } catch (error) {
          console.error('플레이어 재생 오류 발생');
          player.muted(true);
          await player.play();
          setPlayer({
            isMuted: true,
            isPlaying: true,
          });
        }
      });

      player.on('dispose', () => {
        console.log('dispose');
      });
    }
  };

  /**
   * @desc 음소거 설정
   */
  const onClickMute = () => {
    if (playerRef.current) {
      if (playerRef.current.muted()) {
        // 음소거 상태면, 음소거 설정
        playerRef.current.muted(false);
        setPlayer({
          ..._player,
          isMuted: false,
        });
      } else {
        // 음소거 상태가 아니면, 음소거 해제
        playerRef.current.muted(true);
        setPlayer({
          ..._player,
          isMuted: true,
        });
      }
    }
  };

  /**
   * @desc 재생 설정
   */
  const onClickPlay = () => {
    if (playerRef.current) {
      if (playerRef.current.paused()) {
        // 일시정지 상태면, 재생
        playerRef.current.play();
        setPlayer({
          ..._player,
          isPlaying: true,
        });
      } else {
        // 일시정지 상태가 아니면, 일시정지
        playerRef.current.pause();
        setPlayer({
          ..._player,
          isPlaying: false,
        });
      }
    }
  };

  /**
   * @desc 슬라이드 change 이벤트
   * @param swiper
   */
  const onSlideChange = (swiper: Swiper) => {
    const prev = swiper.previousIndex;
    const cur = swiper.activeIndex;

    setCurrentIndex(swiper.activeIndex);

    if (swiper?.isEnd) {
      if (pageData.totalCnt >= pageData.pageSize * pageData.pageNum + 1) {
        console.log('다음 페이지 설정');
        setPageData({
          ...pageData,
          pageNum: pageData.pageNum + 1,
        });
      }
    }

    if (prev < cur) {
      // 아래로 이동
      if (pageData.totalCnt >= pageData.pageSize * pageData.pageNum) {
        history.pushState(null, '', `/shorts/${shorts[currentIndex + 1].id}`);
      }
    } else if (prev > cur) {
      // 위로 이동
      if (pageData.pageSize > 1) {
        history.pushState(null, '', `/shorts/${shorts[currentIndex - 1].id}`);
      }
    }
  };

  return (
    <section className='flex items-center justify-center w-full h-full'>
      <SlideContainer
        loop={false}
        className='h-[100vh] w-[100vw]'
        onSlideChange={onSlideChange}
        options={{
          direction: 'vertical',
          mousewheel: true,
          spaceBetween: 0,
          centeredSlides: true,
          autoplay: false,
        }}>
        {shorts.map((s, index) => (
          <SwiperSlide
            key={index}
            className='flex items-center justify-center'>
            <div className='w-[30vw] h-full flex justify-center items-center'>
              {currentIndex === index ? (
                <VideoPlayer
                  type={s.type}
                  id={index}
                  src={s.sources[0]}
                  options={{
                    bigPlayButton: false,
                    autoplay: true,
                    defaultVolume: 1.0,
                    loop: true,
                    errorDisplay: false,
                    controls: true,
                    controlBar: false,
                    userActions: {
                      doubleClick: false,
                    },
                  }}
                  onReady={onReady}
                  className='flex items-center justify-center w-full h-full bg-black'
                />
              ) : (
                <>
                  {s.thumb && (
                    <img
                      className='object-cover w-full h-full bg-black'
                      src={s.thumb}
                    />
                  )}
                </>
              )}
              {_player.isMuted ? (
                <button
                  onClick={onClickMute}
                  className='mx-4'>
                  <p>음소거O</p>
                </button>
              ) : (
                <button
                  onClick={onClickMute}
                  className='mx-4'>
                  <p>음소거X</p>
                </button>
              )}
              {_player.isPlaying ? (
                <button
                  className='mx-4'
                  onClick={onClickPlay}>
                  <p>재생중O</p>
                </button>
              ) : (
                <button
                  className='mx-4'
                  onClick={onClickPlay}>
                  <p>재생중X</p>
                </button>
              )}
            </div>
          </SwiperSlide>
        ))}
      </SlideContainer>
    </section>
  );
}
