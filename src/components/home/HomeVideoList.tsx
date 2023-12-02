'use client';

import { MainVideoListResponse } from '@/types/models/home/main';
import useFetch from '@/hooks/useFetch';
import React, { useRef, useState } from 'react';
import ErrorBoundary from '../ErrorBoundary';
import { HomeVideoListSkeleton } from '../ui/skeletons';
import { ResponseType } from '@/types/network';
import Image from 'next/image';
import { isMobile } from 'react-device-detect';
import VideoPlayer from '../VideoPlayer';
import { VideoJsPlayer } from 'video.js';

export default function HomeVideoList() {
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const playerList = useRef<VideoJsPlayer[]>([]);

  const { data, isLoading, error } = useFetch<ResponseType<MainVideoListResponse>, any>(`/videos`, 'GET');

  if (isLoading) {
    return <HomeVideoListSkeleton />;
  }

  if (error) {
    return <ErrorBoundary error={error} />;
  }

  if (!data || data?.data?.videoList?.length < 1) {
    return <div>데이터가 없습니다.</div>;
  }

  const onMouseEnter = (idx: number) => {
    setTimer(
      setTimeout(() => {
        playVideo(idx);
      }, 750),
    );
  };

  function onMouseLeave(idx: number) {
    if (timer) {
      clearTimeout(timer);
      stopVideo(idx);
    }
  }

  const playVideo = (idx: number) => {
    console.log('play video', playerList.current[idx]);
    playerList.current[idx].play();
  };

  const stopVideo = (idx: number) => {
    console.log('stop video', playerList.current[idx]);
    playerList.current[idx].pause();
  };

  return (
    <div className='grid gap-4 grid-cols-1 laptop:grid-cols-3 desktop:grid-cols-5'>
      {data?.data?.videoList?.map((video, index) => (
        <div
          key={index}
          className='bg-white rounded-lg shadow-md p-4'>
          <div
            onMouseEnter={() => onMouseEnter(index)}
            onMouseLeave={() => onMouseLeave(index)}
            className={'cursor-pointer'}>
            <VideoPlayer
              id={index}
              setPlayerList={playerList}
              src={video.sources[0]}
              type={video.type}
              options={{
                muted: true,
                bigPlayButton: isMobile ? true : false,
                autoplay: false,
                defaultVolume: 0,
                loop: false,
                aspectRatio: '16:9',
                errorDisplay: false,
                controls: true,
              }}
            />
          </div>
          <div className='mt-2 mb-2'>
            <h2
              className='text-lg font-medium truncate'
              title={video.title}>
              {video.title}
            </h2>
            <p
              className='text-gray-500 truncate'
              title={video.desc}>
              {video.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
