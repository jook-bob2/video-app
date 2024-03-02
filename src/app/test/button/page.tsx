'use client';
import useDebouncedClick from '@/hooks/useDebounceClick';
import React from 'react';

export default function TestButton() {
  const { handleClick, isClickable } = useDebouncedClick<number>(async (param) => {
    console.log('콜백함수 실행');
    await fetchData();
    if (param) {
      console.log(`파라미터 : ${JSON.stringify(param)}`);
    }
  });

  const { handleClick: handleClick2, isClickable: isClickable2 } = useDebouncedClick<number>(async (param) => {
    console.log('콜백함수 실행2');
    await fetchData();

    if (param) {
      console.log(`파라미터2 : ${JSON.stringify(param)}`);
    }
  });

  const fetchData = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(console.log('데이터 fetch 완료'));
      }, 500);
    });
  };

  return (
    <section>
      <h1 className='text-xl font-bold'>버튼 테스트</h1>
      <div className='mt-4 mb-4'>
        <Button
          className={'mr-2 bg-sky-500'}
          disabled={!isClickable}
          onClick={() => handleClick()}>
          타이머 적용
        </Button>
        <Button
          className={'ml-2 bg-green-400'}
          disabled={!isClickable2}
          onClick={() => handleClick2(2)}>
          타이머 적용(파라미터)
        </Button>
      </div>
    </section>
  );
}

const Button = ({ ...props }: React.ButtonHTMLAttributes<any>) => {
  return (
    <button
      {...props}
      className={`p-4 text-white bg-orange-500 disabled:bg-gray-400 ${props.className}`}>
      {props.children}
    </button>
  );
};
