// src/spotify/Player.js
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
                getOAuthToken: cb => { cb(token); },
                volume: 0.5
            });

            setPlayer(playerInstance);

            playerInstance.addListener("ready", ({ device_id }) => {
                console.log("Player is ready with Device ID", device_id);
                localStorage.setItem("spotify_device_id", device_id);
            });

            playerInstance.addListener("not_ready", ({ device_id }) => {
                console.log("Device ID has gone offline", device_id);
            });

            playerInstance.connect();
        };

        return () => {
            if (player) {
                player.disconnect();
            }
        };
    }, [token]);

    return (
        <div className="spotify-player">
            <p>🎵 Spotify Web Player activo</p>
        </div>
    );
};

export default Player;
