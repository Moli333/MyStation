// src/pages/Callback.jsx
import { useEffect } from "react";
import axios from "axios";
import { useSpotify } from "../auth/contexts/SpotifyContext";
import { useNavigate } from "react-router-dom";

const CLIENT_ID = "d0d04f92a7d7456393e677a9ccf4341c";

const REDIRECT_URI = "https://my-station-8ad14.web.app/callback";

const Callback = () => {
    const { setTokens } = useSpotify();
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");
        const codeVerifier = localStorage.getItem("spotify_code_verifier");

        if (!code || !codeVerifier) {
            console.error("Faltan 'code' o 'code_verifier'.");
            localStorage.removeItem("spotify_code_verifier");
            navigate("/");
            return;
        }

        exchangeCodeForToken(code, codeVerifier);
    }, []);

    const exchangeCodeForToken = async (code, codeVerifier) => {
        try {
            const body = new URLSearchParams({
                grant_type: "authorization_code",
                code,
                redirect_uri: REDIRECT_URI,
                client_id: CLIENT_ID,
                code_verifier: codeVerifier,
            });

            const res = await axios.post("https://accounts.spotify.com/api/token", body.toString(), {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });

            const { access_token, refresh_token } = res.data;

            if (!access_token) {
                console.error("No se recibió access_token:", res.data);
                localStorage.removeItem("spotify_code_verifier");
                navigate("/");
                return;
            }

            setTokens(access_token, refresh_token || "");
            localStorage.setItem("spotify_access_token", access_token);
            if (refresh_token) {
                localStorage.setItem("spotify_refresh_token", refresh_token);
            }

            const profileRes = await axios.get("https://api.spotify.com/v1/me", {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });

            localStorage.setItem("spotify_user", JSON.stringify(profileRes.data));
            navigate("/dashboard");
        } catch (error) {
            console.error("Error durante la autenticación con Spotify:", error);
            localStorage.removeItem("spotify_code_verifier");
            navigate("/");
        }
    };

    return <div>Conectando con Spotify...</div>;
};

export default Callback;
