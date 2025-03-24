import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

function CursorEffect() {
  useEffect(() => {
    const cursor = document.querySelector('.cursor-cyber') as HTMLElement;

    const moveCursor = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--x', e.clientX.toString());
      document.documentElement.style.setProperty('--y', e.clientY.toString());

      if (cursor) {
        cursor.style.opacity = '1';
      }
    };

    const hideCursor = () => {
      if (cursor) {
        cursor.style.opacity = '0';
      }
    };

    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', hideCursor);
    document.addEventListener('mouseenter', moveCursor);
    document.addEventListener('blur', hideCursor); 


    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', hideCursor);
      document.removeEventListener('mouseenter', moveCursor);
      document.removeEventListener('blur', hideCursor);
    };
  }, []);

  return null;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CursorEffect />
    <App />
  </StrictMode>
);