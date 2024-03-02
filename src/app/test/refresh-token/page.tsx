'use client';
import React, { useState } from 'react';

interface ResponseType {
  statusCd: number;
  data: {
    refreshToken: string;
  };
  msg: string;
}

let lock = false;
let is401 = true;
let subscribers: ((token: string) => void)[] = [];
const cacheToken: { [key: string]: string } = {};

function subscribeTokenRefresh(cb: (token: string) => void) {
  subscribers.push(cb);
}

function onRefreshed(token: string) {
  subscribers.forEach((cb) => cb(token));
}

export default function RefreshToken() {
  const [multipleCnt, setMultipleCnt] = useState(1);
  const [token, setToken] = useState('');

  const fetchRefresh = (): Promise<string> => {
    if (cacheToken.refreshToken) {
      console.log('캐시 된 토큰', cacheToken);
      setTimeout(() => {
        delete cacheToken.refreshToken;
      }, 1000);

      return Promise.resolve(cacheToken.refreshToken);
    }

    return new Promise((resolve) => {
      setTimeout(() => {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < charactersLength; i++) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        cacheToken.refreshToken = result;

        resolve(result);
      }, 500);
    });
  };

  // 리프레쉬 토큰 발급
  const getRefreshToken = async () => {
    if (lock) {
      const token = await fetchRefresh();
      console.log('result token : ', token);
      // lock = false;
      console.log('락 해제');
      onRefreshed(token);
      subscribers = [];

      // is401 = false;

      return token;
    }
  };

  // 만료 된 토큰으로 호출하는 경우
  const fetchData = async (): Promise<ResponseType> => {
    if (is401) {
      if (lock) {
        console.log('나머지는 구독 했습니다.');
        subscribeTokenRefresh((token) => {
          console.log('token : ', token);
          return Promise.resolve({ statusCd: 200, data: { refreshToken: token }, msg: 'SUCCESS' });
        });
      }

      console.log('락 설정');
      lock = true;

      const refreshToken = await getRefreshToken();

      if (refreshToken) {
        return Promise.resolve({ statusCd: 200, data: { refreshToken }, msg: 'SUCCESS' });
      }
      return Promise.reject({ statusCd: 401, data: null, msg: 'UnAuthorization error' });
    }

    return new Promise((resolve) => {
      setTimeout(async () => {
        is401 = true;
        resolve({ statusCd: 200, data: { refreshToken: 'test' }, msg: 'SUCCESS' });
      }, 500);
    });
  };

  // 한 개 api call
  const onClickApiCallOne = async () => {
    const response = await fetchData();
    console.log('response ', response);
    setToken(response.data.refreshToken);
  };

  // 여러 개 api call
  const onClickApiCallMultiple = async () => {
    const promises = [];

    for (let i = 0; i < multipleCnt; i++) {
      promises.push(fetchData());
    }

    const response = await Promise.all(promises);

    response.forEach((response) => {
      console.log('refreshToken : ', response.data.refreshToken);
      setToken(response.data.refreshToken);
    });
  };

  const onClickMultipleCountControl = (type: 'add' | 'minus') => {
    if (type === 'add') setMultipleCnt(multipleCnt + 1);
    if (type === 'minus') setMultipleCnt(multipleCnt - 1);
  };

  return (
    <section className='flex flex-col items-center justify-center'>
      <h1 className='text-2xl'>Refresh token 테스트</h1>
      <div className='flex flex-row justify-between'>
        <div className='items-start m-4'>
          <button
            className='p-4 text-white bg-slate-600'
            onClick={onClickApiCallOne}>
            API Call(단일)
          </button>
        </div>
        <div className='items-end m-4'>
          <button
            className='p-4 bg-blue-600'
            onClick={() => onClickMultipleCountControl('minus')}>
            -
          </button>

          <button
            className='p-4 bg-red-600'
            onClick={() => onClickMultipleCountControl('add')}>
            +
          </button>
          <p>Multiple count : {multipleCnt}개</p>
          <button
            className='p-4 text-white bg-orange-400'
            onClick={onClickApiCallMultiple}>
            APIs Call(복수)
          </button>
        </div>
      </div>

      <div>
        <span>
          리프레쉬 토큰 : <span>{token}</span>
        </span>
      </div>
    </section>
  );
}
