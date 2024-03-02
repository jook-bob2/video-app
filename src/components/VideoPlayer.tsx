'use client';

import 'video.js/dist/video-js.css';
import React, { useEffect, useRef } from 'react';
import videojs, { VideoJsPlayer, VideoJsPlayerOptions } from 'video.js';
import { MimeType } from '@/types/video';

interface VideoOptions extends VideoJsPlayerOptions {
  errorDisplay: boolean;
}

interface Props {
  id: number;
  setPlayerList: React.MutableRefObject<VideoJsPlayer[]>;
  src: string;
  type: MimeType;
  options?: VideoOptions;
}

export default function VideoPlayer({ id, src, type, options, setPlayerList }: Props) {
  const videoRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<VideoJsPlayer | null>(null);

  useEffect(() => {
    const videoEle = document.createElement('video-js') as HTMLVideoElement;
    videoRef.current?.appendChild(videoEle);
    const player = (playerRef.current = videojs(
      videoEle,
      {
        ...options,
        sources: [
          {
            src,
            type,
          },
        ],
      },
      () => {
        if (setPlayerList) setPlayerList.current[id] = player;

        player.on('pause', () => {
          console.log('pause!!!!');
        });

        player.on('waiting', () => {
          console.log('waiting!!!!');
        });

        player.on('loadeddata', () => {});

        player.on('error', () => {
          console.log('error!!!!');
          const code = player?.error()?.code;
          console.log('@@@@@@@@@@@@@@@@@ Player error code :: ', code, '@@@@@@@@@@@@@@@@');
        });

        player.on('dispose', () => {});

        player.on('canplay', () => {});

        player.on('playing', () => {
          console.log('playing');
        });
      },
    ));
  }, []);

  // player clean up
  useEffect(() => {
    const player = playerRef.current;
    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div
      data-vjs-player
      ref={videoRef}></div>
  );
}
