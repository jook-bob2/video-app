import React from 'react';

interface Props {
  children: React.ReactNode;
}

export default function MainLayout({ children }: Props) {
  return (
    <div>
      <header className='bg-gradient-to-r from-pink-300 to-orange-300 text-white p-4'>
        <div className='container mx-auto flex justify-between items-center'>
          <div className='text-xl font-bold'>로고</div>
          <nav className='space-x-4'>
            <a
              href='#'
              className='hover:underline'>
              홈
            </a>
            <a
              href='#'
              className='hover:underline'>
              서비스
            </a>
            <a
              href='#'
              className='hover:underline'>
              포트폴리오
            </a>
            <a
              href='#'
              className='hover:underline'>
              문의하기
            </a>
          </nav>
        </div>
      </header>
      <main className='p-8 bg-slate-200'>{children}</main>
      <footer className='bg-gradient-to-r from-pink-300 to-orange-300 text-white p-4'>
        <div className='container mx-auto flex justify-center items-center'>
          <p>&copy; 2023 Next.js 14 경험해보기</p>
        </div>
      </footer>
    </div>
  );
}
