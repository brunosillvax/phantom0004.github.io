import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

function CursorEffect() {
  useEffect(() => {
    const cursor = document.querySelector('.cursor-cyber');
    
    const moveCursor = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--x', e.clientX.toString());
      document.documentElement.style.setProperty('--y', e.clientY.toString());
    };

    document.addEventListener('mousemove', moveCursor);
    
    return () => {
      document.removeEventListener('mousemove', moveCursor);
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