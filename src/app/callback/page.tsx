'use client';

import React, { useEffect } from 'react';

export default function Callback() {
  useEffect(() => {
    window.opener.postMessage({
      message: 'callback',
      data: {
        test: '1',
      },
    });
    // self.close();
  }, []);
  return <div>콜백 페이지</div>;
}
