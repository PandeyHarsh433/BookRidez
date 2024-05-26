import { useState, useEffect } from "react";

const useAuth = (getCookies) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const auth = await getCookies();
        setIsLoggedIn(auth?.loggedIn);
        setUserRole(auth?.role);
        setUserId(auth?.userId);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // console.log(isLoggedIn, userRole, userId, loading);

  return { isLoggedIn, userRole, userId, loading, error };
};

export default useAuth;
