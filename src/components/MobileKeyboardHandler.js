import React, { useEffect, useState } from 'react';

const MobileKeyboardHandler = ({ children }) => {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      const newHeight = window.innerHeight;
      const heightDifference = windowHeight - newHeight;
      
      // If height decreased significantly, keyboard is likely visible
      if (heightDifference > 150) {
        setIsKeyboardVisible(true);
      } else if (heightDifference < -50) {
        setIsKeyboardVisible(false);
      }
      
      setWindowHeight(newHeight);
    };

    const handleFocusIn = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        // Small delay to let keyboard appear
        setTimeout(() => {
          const newHeight = window.innerHeight;
          if (windowHeight - newHeight > 100) {
            setIsKeyboardVisible(true);
          }
        }, 300);
      }
    };

    const handleFocusOut = () => {
      setIsKeyboardVisible(false);
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('focusin', handleFocusIn);
    document.addEventListener('focusout', handleFocusOut);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('focusin', handleFocusIn);
      document.removeEventListener('focusout', handleFocusOut);
    };
  }, [windowHeight]);

  return (
    <div className={`mobile-keyboard-handler ${isKeyboardVisible ? 'keyboard-visible' : ''}`}>
      {children}
    </div>
  );
};

export default MobileKeyboardHandler;
