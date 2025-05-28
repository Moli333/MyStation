// src/events/pages/DashboardPage.jsx
import { useEffect, useState } from "react";
import { useUser } from "../../auth/contexts/UserProvider";
import { useNavigate } from "react-router-dom";
import "../../styles/Dashboardpage.css";
import Player from "../../spotify/Player"; // ✅ Import única y correcta

const DashboardPage = () => {
    const { userState, logout } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (!userState.logged && !userState.checking) {
            navigate("/login");
        }
    }, [userState.logged, userState.checking, navigate]);

    const [spotifyProfile, setSpotifyProfile] = useState(null);
    const [recentTracks, setRecentTracks] = useState([]);
    const [topArtists, setTopArtists] = useState([]);
    const [topTracks, setTopTracks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [spotifyError, setSpotifyError] = useState(null);

    const accessToken = localStorage.getItem("spotify_access_token");

    useEffect(() => {
        if (!accessToken) return;

        const fetchSpotifyData = async () => {
            setIsLoading(true);
            setSpotifyError(null);

            try {
                const headers = { Authorization: `Bearer ${accessToken}` };

                const profileRes = await fetch("https://api.spotify.com/v1/me", { headers });
                if (!profileRes.ok) throw new Error(`Error perfil: ${profileRes.status}`);
                const profileData = await profileRes.json();
                setSpotifyProfile(profileData);

                const recentRes = await fetch("https://api.spotify.com/v1/me/player/recently-played?limit=5", { headers });
                if (!recentRes.ok) throw new Error(`Error recientes: ${recentRes.status}`);
                const recentData = await recentRes.json();
                setRecentTracks(recentData.items || []);

                const artistsRes = await fetch("https://api.spotify.com/v1/me/top/artists?limit=5", { headers });
                if (!artistsRes.ok) throw new Error(`Error artistas: ${artistsRes.status}`);
                const artistsData = await artistsRes.json();
                setTopArtists(artistsData.items || []);

                const tracksRes = await fetch("https://api.spotify.com/v1/me/top/tracks?limit=5", { headers });
                if (!tracksRes.ok) throw new Error(`Error canciones: ${tracksRes.status}`);
                const tracksData = await tracksRes.json();
                setTopTracks(tracksData.items || []);
            } catch (error) {
                setSpotifyError(error.message);
                if (error.message.includes("401")) {
                    localStorage.removeItem("spotify_access_token");
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchSpotifyData();
    }, [accessToken]);

    const handleLogout = () => {
        logout();
        localStorage.clear();
        navigate("/login");
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-card">
                <h1 className="dashboard-title">¡Bienvenido a tu Dashboard!</h1>

                {userState.user ? (
                    <div className="user-info">
                        <img
                            src={spotifyProfile?.images?.[0]?.url || userState.user.photoURL || "https://via.placeholder.com/150"}
                            alt="User avatar"
                            className="user-avatar"
                        />
                        <div className="user-details">
                            <p><strong>Nombre:</strong> {spotifyProfile?.display_name || userState.user.displayName || "Usuario"}</p>
                            <p><strong>Correo electrónico:</strong> {spotifyProfile?.email || userState.user.email}</p>
                            <p><strong>UID:</strong> {userState.user.uid}</p>
                        </div>

                        <button className="experiencias-btn" onClick={() => {
                        console.log("Navegando a /experiencias");
                        navigate("/experiencias");
                        }}
                        >
                            Ir a Experiencias de Usuario</button>

                        <button className="logout-btn" onClick={handleLogout}>Cerrar sesión</button>

                        {accessToken && (
                            <div className="spotify-section">
                                <h2>🎧 Tu música en Spotify</h2>

                                {isLoading ? (
                                    <p>Cargando datos de Spotify...</p>
                                ) : spotifyError ? (
                                    <p>Error: {spotifyError}</p>
                                ) : (
                                    <>
                                        <h3>🎵 Canciones reproducidas recientemente</h3>
                                        <ul className="music-list">
                                            {recentTracks.map((item, index) => (
                                                <li key={index}>{item.track.name} – {item.track.artists.map(artist => artist.name).join(", ")}</li>
                                            ))}
                                        </ul>

                                        <h3>🌟 Artistas favoritos</h3>
                                        <ul className="music-list">
                                            {topArtists.map((artist, index) => (
                                                <li key={index}>{artist.name}</li>
                                            ))}
                                        </ul>

                                        <h3>🎶 Canciones favoritas</h3>
                                        <ul className="music-list">
                                            {topTracks.map((track, index) => (
                                                <li key={index}>{track.name} – {track.artists.map(artist => artist.name).join(", ")}</li>
                                            ))}
                                        </ul>
                                    </>
                                )}
                            </div>
                        )}

                        <Player />
                    </div>
                ) : (
                    <p>No hay información de usuario disponible.</p>
                )}
            </div>
        </div>
    );
};

export default DashboardPage;
