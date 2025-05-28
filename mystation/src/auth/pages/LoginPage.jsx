import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../contexts/UserProvider";
import { redirectToSpotifyLogin } from "../spotifyAuth";
import { signInWithGoogle, signInWithFacebook } from "../../firebase/auth";

export const LoginPage = () => {
  const { login, loginWithFirebase, userState } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Redireccionar si ya está autenticado
    if (userState.logged && userState.user) {
      navigate("/");
    }
  }, [userState.logged, userState.user, navigate]);

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.origin !== "http://127.0.0.1:3000") return;
      const user = event.data;
      if (user?.email) {
        login(user);
        navigate("/");
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [login, navigate]);

  // Debugging useEffect
  useEffect(() => {
    console.log("Estado actual de usuario:", userState);
  }, [userState]);

  const handleProviderSelect = async (provider) => {
    try {
      setIsLoading(true);
      let user = null;

      if (provider === "google") {
        user = await signInWithGoogle();
      } else if (provider === "facebook") {
        user = await signInWithFacebook();
      } else if (provider === "spotify") {
        redirectToSpotifyLogin();
        return;
      }

      if (user?.email) {
        login(user);
        navigate("/");
      }
    } catch (error) {
      console.error(`Error al iniciar sesión con ${provider}:`, error);
      setError(`Error al iniciar sesión con ${provider}. Por favor, intenta de nuevo.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailLogin = async () => {
    try {
      if (!email.trim()) {
        setError("Por favor ingresa un correo electrónico");
        return;
      }

      if (!password.trim()) {
        setError("Por favor ingresa tu contraseña");
        return;
      }

      setError(null);
      setIsLoading(true);
      await loginWithFirebase({ email, password });

      // Verificar si hay mensajes de error en el contexto del usuario
      if (userState.errorMessage) {
        setError(userState.errorMessage);
        return;
      }

      // Log de éxito y redirección
      console.log("Inicio de sesión exitoso, redirigiendo a /");
      navigate("/");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);

      // Determinar el tipo de error para mostrar un mensaje más específico
      if (error.code === "auth/invalid-credential" || error.code === "auth/wrong-password") {
        setError("Credenciales incorrectas. Por favor verifica tu email y contraseña.");
      } else if (error.code === "auth/user-not-found") {
        setError("No existe una cuenta con este correo electrónico.");
      } else if (error.code === "auth/too-many-requests") {
        setError("Demasiados intentos fallidos. Por favor intenta más tarde.");
      } else {
        setError("Error al iniciar sesión: " + (error.message || "Verifica tus credenciales"));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="card col-md-4 position-relative">
        <h4 className="card-title mb-4">Login</h4>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleEmailLogin();
          }}
        >
          <label>Email</label>
          <input
            className="form-control mb-2"
            type="email"
            placeholder="Escribe tu correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
            disabled={isLoading}
          />

          <input
            className="form-control mb-3"
            type="password"
            placeholder="Escribe tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            disabled={isLoading}
          />

          <button
            type="submit"
            className="btn btn-primary btn-lg d-block w-100 mb-3"
            disabled={isLoading}
          >
            {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
          </button>
          
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
        </form>

        <div className="text-center">
          <hr />
          <p>O continúa con</p>
          <button
            onClick={() => handleProviderSelect("google")}
            className="btn btn-outline-danger w-100 mb-2"
            disabled={isLoading}
          >
            Google
          </button>
          <button
            onClick={() => handleProviderSelect("facebook")}
            className="btn btn-outline-primary w-100 mb-2"
            disabled={isLoading}
          >
            Facebook
          </button>
          <button
            onClick={() => handleProviderSelect("spotify")}
            className="btn btn-outline-success w-100"
            disabled={isLoading}
          >
            Spotify
          </button>
        </div>

        <div className="text-center mt-3">
          <span>¿No tienes cuenta?</span>
          <Link to="/register"> Regístrate aquí</Link>
        </div>
      </div>

      <style>{`
                .login-container {
                    min-height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-image: 
                        linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9)),
                        url('https://maldita.es/uploads/images/2024/06/665efad1a992dspotify-algoritmo-2-png.png');
                    background-size: cover;
                    background-position: center;
                    background-repeat: no-repeat;
                }
                .card {
                    background: white;
                    padding: 2rem;
                    border-radius: 12px;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
                    z-index: 1;
                }
                .card-title {
                    color: rgb(7, 87, 31);
                    font-weight: bold;
                    text-align: center;
                }
                .btn-primary {
                    background-color: rgb(10, 48, 15);
                    border: none;
                }
                .btn-primary:hover {
                    background-color: rgb(8, 36, 19);
                }
            `}</style>
    </div>
  );
};

export default LoginPage;
