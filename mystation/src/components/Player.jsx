// src/components/Player.jsx
import { useEffect, useState } from "react";

const Player = () => {
    const [player, setPlayer] = useState(null);
    const token = localStorage.getItem("spotify_access_token");

    useEffect(() => {
        if (!token) return;

        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;
        document.body.appendChild(script);

        window.onSpotifyWebPlaybackSDKReady = () => {
            const playerInstance = new window.Spotify.Player({
                name: "MyStation Player",
                getOAuthToken: cb => cb(token),
                volume: 0.5
            });

            setPlayer(playerInstance);

            playerInstance.addListener("ready", ({ device_id }) => {
                console.log("Player ready:", device_id);
                localStorage.setItem("spotify_device_id", device_id);
            });

            playerInstance.addListener("not_ready", ({ device_id }) => {
                console.log("Device offline:", device_id);
            });

            playerInstance.connect();
        };

        return () => player?.disconnect();
    }, [token]);

    return (
        <div className="rounded p-4 bg-purple-100 text-purple-900">
            <p>🎵 Reproductor web Spotify activo</p>
        </div>
    );
};

export default Player;
