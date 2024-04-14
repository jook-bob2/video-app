'use client';

import { ReactNode, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from 'next-themes';
import { Provider as JotaiProvider } from 'jotai';

const queryClient = new QueryClient();

export default function Provider({ children }: { children: ReactNode }) {
  const [isMount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
  }, []);

  if (!isMount) {
    return null;
  }

  return (
    <JotaiProvider>
      <ThemeProvider attribute='class'>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </ThemeProvider>
    </JotaiProvider>
  );
}
