import { useEffect, useState } from "react";

export const useSpotify = () => {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const accessToken = localStorage.getItem("spotify_access_token");
            if (!accessToken) return;

            try {
                const response = await fetch("https://api.spotify.com/v1/me", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                if (!response.ok) throw new Error("Error en la petición a Spotify");

                const data = await response.json();
                setUserData(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchUserData();
    }, []);

    return { userData, error };
};
