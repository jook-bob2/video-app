'use client';

import { ThemeContextType } from '@/types/themes';
import Image from 'next/image';
import React from 'react';
import { useTheme } from 'next-themes';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme() as ThemeContextType;

  const onClickChangeTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button onClick={() => onClickChangeTheme()}>
      <Image
        src={theme === 'dark' ? '/images/dark-mode.png' : '/images/light-mode.png'}
        width={32}
        height={32}
        alt={'Theme'}
      />
    </button>
  );
}
