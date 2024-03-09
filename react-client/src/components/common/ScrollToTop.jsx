import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/*
 component ensures that when the user navigates to a new page within the application, 
 the viewport scrolls to the top of the page automatically.
  */
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export default ScrollToTop;
