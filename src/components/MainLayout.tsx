import Link from 'next/link';
import React from 'react';
import ThemeToggle from './ui/ThemeToggle';

interface Props {
  children: React.ReactNode;
}

export default function MainLayout({ children }: Props) {
  return (
    <div>
      <header className='p-4 text-white dark:text-dark-text-1 bg-gradient-to-r from-pink-300 to-orange-300 dark:from-dark-bg dark:to-dark-bg-1'>
        <div className='flex items-center justify-between mx-auto'>
          <div className='text-xl font-bold'>
            <Link href={'/'}>로고</Link>
          </div>
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
          <ThemeToggle />
        </div>
      </header>
      <main className='p-8 bg-slate-200 dark:bg-dark-bg'>{children}</main>
      <footer className='p-4 text-white dark:text-dark-text bg-gradient-to-r from-pink-300 to-orange-300 dark:from-dark-bg dark:to-dark-bg-1'>
        <div className='container flex items-center justify-center mx-auto'>
          <p>&copy; 2023 Next.js 14 경험해보기</p>
        </div>
      </footer>
    </div>
  );
}
