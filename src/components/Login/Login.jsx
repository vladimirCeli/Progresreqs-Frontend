import { useRef, useState, useEffect, useCallback } from "react";

import { useNavigate, useLocation, Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useInput from "../../hooks/useInput";
import useToggle from "../../hooks/useToggle";
import { Eye, EyeOff } from "react-feather";
import { login } from "../../Services/Fetch";
const Login = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/listsprojects";

  const userRef = useRef();

  const [values, handleChange] = useInput("user", {
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState("");
  const [check, toggleCheck] = useToggle("persist", false);

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  useEffect(() => {
    if (errors) setErrors("");
  }, [values]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors("");

    try {
      // Usar AbortController solo para casos excepcionales
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const resp = await fetch(login, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
          'Accept': 'application/json', // Optimización: Especificar tipo de respuesta esperada
          'Cache-Control': 'no-cache' // Optimización: Evitar cache
        },
        credentials: "include",
        signal: controller.signal,
        priority: "high" // Optimización: Alta prioridad para la petición
      });

      clearTimeout(timeoutId);

      const data = await resp.json();

      if (!resp.ok) {
        throw new Error(data.message || 'Error en la autenticación');
      }

      // Optimización: Destructuring directo de la respuesta
      const { rol_id, token: accessToken } = data;
      
      // Optimización: Actualizar estado y navegar de inmediato
      setAuth({ 
        username: values.username, 
        accessToken, 
        roles: rol_id 
      });

      // Navegación inmediata
      navigate(
        rol_id === 1 ? "/managequestionnaire" : 
        rol_id === 2 ? "/listsprojects" : 
        from, 
        { replace: true }
      );

    } catch (error) {
      console.error('Error en login:', error);
      setErrors(
        error.name === 'AbortError'
          ? "Tiempo de espera agotado. Por favor, inténtelo de nuevo."
          : error.message || "Error al procesar la solicitud."
      );
    } finally {
      setLoading(false);
    }
  }, [values, setAuth, navigate, from]);

  return (
    <section className=" flex items-center justify-center relative overflow-hidden md:p-32">
    <div className="w-96 bg-gray-50 rounded-2xl shadow-lg max-w-md p-8 flex flex-col items-center space-y-6 bg-opacity-75">
        <Link to="/">
        <img
              src="../../../img/unl.png"
              alt="Logo Universidad Nacional de Loja"
              className="h-16 w-36 md:h-24 md:w-64"
              style={{ padding: "15px 0 0 0" }}
            />
        </Link>
        <h2 className="font-bold text-2xl">Iniciar sesión</h2>
        <p className="text-sm text-center">
          Si eres miembro, inicia sesión fácilmente.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          <input
            className="p-3 rounded-xl border w-full"
            type="text"
            name="username"
            placeholder="Nombre de usuario"
            required
            ref={userRef}
            {...handleChange}
          />
          <div className="relative">
            <input
              className="p-3 rounded-xl border w-full"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Contraseña"
              required
              {...handleChange}
            />
            <button
              type="button"
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>
          <div className="flex items-center gap-2">
            <input
              className="rounded-xl"
              type="checkbox"
              name="persist"
              id="persist"
              checked={check}
              onChange={toggleCheck}
            />
            <label htmlFor="persist">Mantener sesión iniciada</label>
          </div>
          {errors && <p className="text-red-500">{errors}</p>}
          <button
            type="submit"
            disabled={loading}
            className={`bg-indigo-700 hover:bg-indigo-600 text-white font-bold py-3 rounded-xl w-full transition duration-300 ease-in-out ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Cargando..." : "Iniciar sesión"}
          </button>
        </form>
        <Link
          to="/request-password-reset"
          className="text-sm border-b border-gray-400 py-4"
        >
          ¿Olvidó su contraseña?
        </Link>
        <div className="text-sm flex justify-center items-center ">
          <p>¿No tiene cuenta?</p>
          <Link to="/register" className="text-blue-500 ml-2">
            <button className="py-2 px-4 bg-white border rounded-xl hover:scale-105 duration-300">
              Registrarse
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Login;
