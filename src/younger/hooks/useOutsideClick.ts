import { useEffect, MutableRefObject, useCallback } from 'react';

const useOutsideClick = <T extends HTMLElement>(ref: MutableRefObject<T | null>, callback: () => void) => {
  
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (ref.current && ref.current === event.target) callback();
  }, [ref, callback]);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [handleClickOutside]);
};

export default useOutsideClick;
