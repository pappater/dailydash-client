import { useEffect } from 'react';
import useStore from '../store/store';

const useAuth = () => {
  const { user, setUser } = useStore();

  useEffect(() => {
    // Check authentication and set user
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, [setUser]);

  return { user };
};

export default useAuth;
