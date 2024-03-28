import React, { useEffect } from 'react';

const ClickOutside = ({ isActive, className, onClickOutside, children }) => {
  const handleClickOutside = (event) => {
    if (isActive && !event.target.closest(className)) {
      // Thay '.your-menu-class' bằng class của menu của bạn
      onClickOutside();
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [isActive, onClickOutside]);

  return <>{children}</>;
};

export default ClickOutside;
