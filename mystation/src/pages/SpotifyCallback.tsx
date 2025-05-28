// src/pages/Callback.jsx
import { useEffect } from "react";
import axios from "axios";
import { useSpotify } from "../auth/contexts/SpotifyContext";
import { useNavigate } from "react-router-dom";
import { useUser } from "../auth/contexts/UserProvider";


const CLIENT_ID = "a1b518cc50e64d8e93a1e73f40afba98";
const REDIRECT_URI = "http://127.0.0.1:3000/callback";

const Callback = () => {
    const { setTokens } = useSpotify();
    const { login } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");
        const codeVerifier = localStorage.getItem("spotify_code_verifier");

        if (!code || !codeVerifier) {
            console.error("❌ Falta 'code' o 'code_verifier' para autenticación con Spotify.");
            localStorage.removeItem("spotify_code_verifier");
            navigate("/");
            return;
        }

        exchangeCodeForToken(code, codeVerifier);
    }, [navigate]);

    const exchangeCodeForToken = async (code, codeVerifier) => {
        try {
            const body = new URLSearchParams({
                grant_type: "authorization_code",
                code,
                redirect_uri: REDIRECT_URI,
                client_id: CLIENT_ID,
                code_verifier: codeVerifier,
            });

            const tokenResponse = await axios.post(
                "https://accounts.spotify.com/api/token",
                body.toString(),
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                }
            );

            const { access_token, refresh_token } = tokenResponse.data;

            if (!access_token) {
                console.error("No se recibió un access_token:", tokenResponse.data);
                throw new Error("No access token received.");
            }

            const profileResponse = await axios.get("https://api.spotify.com/v1/me", {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });

            const profile = profileResponse.data;

            const spotifyUser = {
                email: profile.email,
                uid: profile.id,
                displayName: profile.display_name,
                photoURL: profile.images?.[0]?.url || "",
                provider: "spotify",
            };

            localStorage.setItem("user", JSON.stringify(spotifyUser));
            login(spotifyUser);
            setTokens(access_token, refresh_token || "");

            navigate("/dashboard");
        } catch (error) {
            console.error("❌ Error durante la autenticación con Spotify:", error);
            localStorage.removeItem("spotify_code_verifier");
            navigate("/");
        }
    };

    return <div>🔄 Conectando con Spotify...</div>;
};

export default Callback;

