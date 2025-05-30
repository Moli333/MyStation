//src/events/pages/HomePage.jsx
import { useEffect, useState } from "react";


export const HomePage = () => {
    const [userData, setUserData] = useState(null);

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

                const data = await response.json();

                if (response.ok) {
                    setUserData(data);
                    console.log("Spotify user data:", data);
                } else {
                    console.error("Error fetching Spotify data:", data);
                }
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };

        fetchUserData();
    }, []);

    return (
        <div className="container mt-5">
            <h1>🎧 Bienvenido a MyStation</h1>
            <p className="lead">Tu espacio para explorar y disfrutar música desde Spotify.</p>
            {userData && (
                <div className="mt-4">
                    <h4>Hola, {userData.display_name}</h4>
                    <img
                        src={userData.images?.[0]?.url}
                        alt="User avatar"
                        style={{ width: 100, borderRadius: "50%", marginTop: 10 }}
                    />
                    <p className="text-muted">{userData.email}</p>
                </div>
            )}
        </div>
    );
};
