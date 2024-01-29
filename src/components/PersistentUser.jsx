import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";
import useLocalStorage from "../hooks/useLocalStorage";

const PersistentUser = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();
  const [persist] = useLocalStorage("persist", false);

  useEffect(() => {
    let isMounted = true;
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.error(error);
      } finally {
        isMounted && setIsLoading(false);
      }
    };
    !auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false);
    return () => (isMounted = false);
  }, []);

  useEffect(() => { }, [isLoading]);
  return (
    <>{!persist ? <Outlet /> : isLoading ? <div className="flex items-center justify-center h-screen">
      <div className="">
        <p className="text-2xl font-semibold mb-4">Cargando...</p>
      </div>
    </div> : <Outlet />}</>
  );
};

export default PersistentUser;
