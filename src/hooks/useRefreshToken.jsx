import useAuth from './useAuth'
import { useContext,useCallback } from 'react'
import { refreshApi } from '../Services/Fetch'
import AuthContext
 from '../context/AuthProvider';
const useRefreshToken = () => {
  const { setAuth } = useContext(AuthContext);

  const refresh = useCallback(async () => {
    try {
      const response = await fetch(refreshApi, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('No se pudo refrescar el token');
      }

      const data = await response.json();
      const { username, rol_id: roles, token: accessToken } = data;

      setAuth((prev) => ({
        ...prev,
        username,
        accessToken,
        roles,
      }));

      return data;
    } catch (error) {
      console.error(error);
    }
  }, [setAuth]);

  return refresh;
};

export default useRefreshToken;