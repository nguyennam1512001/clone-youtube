import React, { useEffect, useRef } from 'react';

function EndOfListObserver({ onEndOfListReached, setEndOfListReached }) {
  const endOfListRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Here, we have reached the end of the list
          onEndOfListReached();
          setEndOfListReached(true);
        } else {
          setEndOfListReached(false);
        }
      },
      { threshold: 0.5 },
    );

    if (endOfListRef.current) {
      observer.observe(endOfListRef.current);
    }

    return () => {
      if (endOfListRef.current) {
        observer.unobserve(endOfListRef.current);
      }
    };
  }, []);

  return <div ref={endOfListRef} style={{ width: '100%', height: '80px' }}></div>;
}

export default EndOfListObserver;
