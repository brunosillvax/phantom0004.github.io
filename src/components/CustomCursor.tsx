import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Pointer, Type, Circle } from 'lucide-react';

export function CustomCursor() {
  const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'text'>('default');
  const [isTyping, setIsTyping] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 35, stiffness: 300, mass: 0.8 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    let rafId: number;
    let prevX = -100;
    let prevY = -100;
    let typingTimeout: NodeJS.Timeout;

    const moveCursor = (e: MouseEvent) => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }

      const updatePosition = () => {
        const targetX = e.clientX;
        const targetY = e.clientY;
        
        const dx = targetX - prevX;
        const dy = targetY - prevY;
        
        prevX += dx * 0.25;
        prevY += dy * 0.25;
        
        cursorX.set(prevX);
        cursorY.set(prevY);

        if (Math.abs(dx) > 0.01 || Math.abs(dy) > 0.01) {
          rafId = requestAnimationFrame(updatePosition);
        }
      };

      rafId = requestAnimationFrame(updatePosition);
    };

    const updateCursorType = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.matches('input, textarea')) {
        setCursorType('text');
      } else if (target.closest('a, button, [role="button"]')) {
        setCursorType('pointer');
      } else {
        setCursorType('default');
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.matches('input, textarea')) {
        setIsTyping(true);
        if (typingTimeout) clearTimeout(typingTimeout);
        typingTimeout = setTimeout(() => setIsTyping(false), 1000);
      }
    };

    const handleFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (target.matches('input, textarea')) {
        target.style.caretColor = '#22c55e';
      }
    };

    const handleFocusOut = () => {
      setIsTyping(false);
      if (typingTimeout) clearTimeout(typingTimeout);
    };

    const handleSelectStart = (e: Event) => {
      const target = e.target as HTMLElement;
      if (!target.matches('input, textarea')) {
        e.preventDefault();
      }
    };

    window.addEventListener('mousemove', moveCursor, { passive: true });
    window.addEventListener('mouseover', updateCursorType, { passive: true });
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('focusin', handleFocusIn);
    document.addEventListener('focusout', handleFocusOut);
    document.addEventListener('selectstart', handleSelectStart);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', updateCursorType);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('focusin', handleFocusIn);
      document.removeEventListener('focusout', handleFocusOut);
      document.removeEventListener('selectstart', handleSelectStart);
      if (rafId) cancelAnimationFrame(rafId);
      if (typingTimeout) clearTimeout(typingTimeout);
    };
  }, []);

  return (
    <motion.div
      className="cursor-dot"
      style={{
        left: smoothX,
        top: smoothY,
        pointerEvents: 'none',
      }}
    >
      {cursorType === 'default' && (
        <Circle className="w-4 h-4 text-cyan-400" strokeWidth={1.5} />
      )}
      {cursorType === 'pointer' && (
        <Pointer className="w-5 h-5 text-amber-400" strokeWidth={1.5} />
      )}
      {cursorType === 'text' && (
        <div className="relative">
          <Type className="w-5 h-5 text-green-400" strokeWidth={1.5} />
          {isTyping && (
            <div className="absolute -right-12 top-1/2 -translate-y-1/2">
              <div className="flex gap-2">
                <motion.div
                  className="w-2 h-2 rounded-full bg-green-400"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 0.8, repeat: Infinity, delay: 0 }}
                />
                <motion.div
                  className="w-2 h-2 rounded-full bg-green-400"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
                />
                <motion.div
                  className="w-2 h-2 rounded-full bg-green-400"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}