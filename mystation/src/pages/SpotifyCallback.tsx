import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CLIENT_ID = "d0d04f92a7d7456393e677a9ccf4341c";
const REDIRECT_URI = "https://my-station-8ad14.web.app/callback";

export default function SpotifyCallback() {
    const navigate = useNavigate();

    useEffect(() => {
        const code = new URLSearchParams(window.location.search).get("code");
        const codeVerifier = localStorage.getItem("spotify_code_verifier");

        if (!code || !codeVerifier) {
            console.error("Faltan code o code_verifier. Reintentando login...");
            localStorage.removeItem("spotify_code_verifier");
            navigate("/");
            return;
        }

        const fetchToken = async () => {
            const body = new URLSearchParams({
                grant_type: "authorization_code",
                code: code,
                redirect_uri: REDIRECT_URI,
                client_id: CLIENT_ID,
                code_verifier: codeVerifier
            });

            try {
                const response = await fetch("https://accounts.spotify.com/api/token", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: body.toString(),
                });

                const data = await response.json();
                console.log("Spotify token response:", data);

                // ✅ Verificación estricta del token
                if (!data.access_token) {
                    console.error("No se recibió access_token:", data);
                    localStorage.removeItem("spotify_code_verifier"); // Previene códigos viejos
                    navigate("/");
                    return;
                }

                localStorage.setItem("spotify_access_token", data.access_token);

                if (data.refresh_token) {
                    localStorage.setItem("spotify_refresh_token", data.refresh_token);
                }

                // Verificar formato del token
                const authHeader = `Bearer ${data.access_token}`;
                if (!authHeader.startsWith("Bearer ")) {
                    console.error("Formato inválido del access token.");
                    localStorage.removeItem("spotify_code_verifier");
                    navigate("/");
                    return;
                }

                console.log("Intentando obtener perfil con access token:", data.access_token);

                const profileRes = await fetch("https://api.spotify.com/v1/me", {
                    headers: {
                        Authorization: authHeader,
                    },
                });

                console.log("Status de respuesta perfil:", profileRes.status);

                if (profileRes.status === 401) {
                    console.error("Token inválido o expirado. Reautenticando...");
                    localStorage.removeItem("spotify_access_token");
                    localStorage.removeItem("spotify_code_verifier");
                    navigate("/");
                    return;
                }

                const profileData = await profileRes.json();
                console.log("Datos crudos del perfil:", profileData);

                if (profileData.error?.message === "invalid_token") {
                    console.error("Token inválido detectado. Reinicia el proceso.");
                    localStorage.removeItem("spotify_access_token");
                    localStorage.removeItem("spotify_code_verifier");
                    navigate("/");
                    return;
                }

                localStorage.setItem("spotify_user", JSON.stringify(profileData));

                navigate("/");
            } catch (error) {
                console.error("Error en la autenticación con Spotify:", error);
                localStorage.removeItem("spotify_code_verifier");
                navigate("/");
            }
        };

        fetchToken();
    }, [navigate]);

    return <div>Conectando con Spotify...</div>;
}
