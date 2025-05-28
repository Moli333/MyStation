import { useEffect, useState } from "react";
import { useUser } from "../../auth/contexts/UserProvider";
import { useNavigate } from "react-router-dom";
import "../../styles/Dashboardpage.css";


const DashboardPage = () => {
    const { userState, logout } = useUser();
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!userState.logged && !userState.checking) {
            console.log("No hay usuario autenticado, redirigiendo a /login");
            navigate("/login");
        }
    }, [userState.logged, userState.checking, navigate]);

    const [spotifyProfile, setSpotifyProfile] = useState(null);
    const [recentTracks, setRecentTracks] = useState([]);
    const [topArtists, setTopArtists] = useState([]);
    const [topTracks, setTopTracks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [spotifyError, setSpotifyError] = useState(null);

    const accessToken = localStorage.getItem("spotify_access_token");    useEffect(() => {
        if (!accessToken) return;

        const fetchSpotifyData = async () => {
            setIsLoading(true);
            setSpotifyError(null);
            
            try {
                const headers = {
                    Authorization: `Bearer ${accessToken}`,
                };

                // Perfil
                const profileRes = await fetch("https://api.spotify.com/v1/me", { headers });
                if (!profileRes.ok) {
                    throw new Error(`Error al obtener perfil: ${profileRes.status} ${profileRes.statusText}`);
                }
                const profileData = await profileRes.json();
                setSpotifyProfile(profileData);

                // Reproducidas recientemente
                const recentRes = await fetch("https://api.spotify.com/v1/me/player/recently-played?limit=5", { headers });
                if (!recentRes.ok) {
                    throw new Error(`Error al obtener canciones recientes: ${recentRes.status} ${recentRes.statusText}`);
                }
                const recentData = await recentRes.json();
                setRecentTracks(recentData.items || []);

                // Top artistas (añadir parámetro time_range)
                const artistsRes = await fetch("https://api.spotify.com/v1/me/top/artists?limit=5&time_range=medium_term", { headers });
                if (!artistsRes.ok) {
                    throw new Error(`Error al obtener artistas favoritos: ${artistsRes.status} ${artistsRes.statusText}`);
                }
                const artistsData = await artistsRes.json();
                setTopArtists(artistsData.items || []);

                // Top canciones (añadir parámetro time_range)
                const tracksRes = await fetch("https://api.spotify.com/v1/me/top/tracks?limit=5&time_range=medium_term", { headers });
                if (!tracksRes.ok) {
                    throw new Error(`Error al obtener canciones favoritas: ${tracksRes.status} ${tracksRes.statusText}`);
                }
                const tracksData = await tracksRes.json();
                setTopTracks(tracksData.items || []);
            } catch (error) {
                console.error("Error al obtener datos de Spotify:", error);
                setSpotifyError(error.message);
                
                // Si es un error de autorización (401), probablemente el token ha expirado
                if (error.message.includes("401")) {
                    console.log("Token expirado o inválido. Redirigiendo a login...");
                    localStorage.removeItem("spotify_access_token");
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchSpotifyData();
    }, [accessToken]);const handleLogout = () => {
        console.log("Iniciando proceso de logout");
        try {
            logout();
            localStorage.clear();
            console.log("Logout exitoso, redirigiendo a /login");
            navigate("/login");
        } catch (error) {
            console.error("Error durante logout:", error);
            // Forzar redirección incluso si hay error
            navigate("/login");
        }
    };    return (
        <div className="dashboard-container">
            <div className="dashboard-card">
                <h1 className="dashboard-title">¡Bienvenido a tu Dashboard!</h1>

                {userState.user ? (
                    <div className="user-info">
                        <img
                            src={
                                spotifyProfile?.images?.[0]?.url ||
                                userState.user.photoURL ||
                                "https://via.placeholder.com/150"
                            }
                            alt="User avatar"
                            className="user-avatar"
                        />
                        <div className="user-details">
                            <p><strong>Nombre:</strong> {spotifyProfile?.display_name || userState.user.displayName || "Usuario"}</p>
                            <p><strong>Email:</strong> {spotifyProfile?.email || userState.user.email}</p>
                            <p><strong>UID:</strong> {userState.user.uid}</p>
                        </div>

                        <button className="logout-btn" onClick={handleLogout}>
                            Cerrar sesión
                        </button>                        {accessToken && (
                            <div className="spotify-section">
                                <h2>🎧 Tu música en Spotify</h2>
                                
                                {isLoading ? (
                                    <div className="loading-spinner">
                                        <p>Cargando datos de Spotify...</p>
                                    </div>
                                ) : spotifyError ? (
                                    <div className="error-message">
                                        <p>Error: {spotifyError}</p>
                                        <button 
                                            className="reconnect-btn" 
                                            onClick={() => {
                                                localStorage.removeItem("spotify_access_token");
                                                window.location.href = "/login";
                                            }}
                                        >
                                            Reconectar con Spotify
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <h3>🎵 Canciones reproducidas recientemente</h3>
                                        <ul className="music-list">
                                            {recentTracks.length > 0 ? recentTracks.map((item, index) => (
                                                <li key={index} className="music-item">
                                                    {item.track.name} – {item.track.artists.map(artist => artist.name).join(", ")}
                                                </li>
                                            )) : (
                                                <p className="no-data">No hay canciones recientes</p>
                                            )}
                                        </ul>

                                        <h3>🌟 Artistas favoritos</h3>
                                        <ul className="music-list">
                                            {topArtists.length > 0 ? topArtists.map((artist, index) => (
                                                <li key={index} className="music-item artist-item">
                                                    {artist.name}
                                                </li>
                                            )) : (
                                                <p className="no-data">No hay artistas favoritos</p>
                                            )}
                                        </ul>

                                        <h3>🎶 Canciones favoritas</h3>
                                        <ul className="music-list">
                                            {topTracks.length > 0 ? topTracks.map((track, index) => (
                                                <li key={index} className="music-item">
                                                    {track.name} – {track.artists.map(artist => artist.name).join(", ")}
                                                </li>
                                            )) : (
                                                <p className="no-data">No hay canciones favoritas</p>
                                            )}
                                        </ul>
                                    </>
                                )}
                            </div>
                        )}</div>
                ) : (
                    <div className="no-data">
                        <p>No hay información de usuario disponible.</p>
                        <button className="logout-btn" onClick={handleLogout}>
                            Volver al login
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DashboardPage;