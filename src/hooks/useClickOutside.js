// useClickOutside.js
import { useEffect } from 'react';

const useClickOutside = (btnRef, onClickOutside) => {
  const handleClickOutside = (e) => {
    if (btnRef.current && !btnRef.current.contains(e.target)) {
      onClickOutside();
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [btnRef, onClickOutside]);
};

export default useClickOutside;
