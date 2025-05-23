// src/components/SpotifyDashboard.jsx
import { useEffect, useState } from 'react';
import { useSpotify } from '../auth/contexts/SpotifyContext';
import axios from 'axios';

const SpotifyDashboard = () => {
    const { accessToken } = useSpotify();
    const [userProfile, setUserProfile] = useState(null);
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        if (!accessToken) return;

        const fetchSpotifyData = async () => {
            try {
                const profileRes = await axios.get('https://api.spotify.com/v1/me', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                setUserProfile(profileRes.data);

                const playlistsRes = await axios.get('https://api.spotify.com/v1/me/playlists', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                setPlaylists(playlistsRes.data.items);
            } catch (error) {
                console.error("Error al obtener datos de Spotify:", error);
            }
        };

        fetchSpotifyData();
    }, [accessToken]);

    if (!accessToken) return <p>No se encontró el token de Spotify.</p>;

    return (
        <div className="container mt-4">
            <h2>🎧 Bienvenido, {userProfile?.display_name || 'usuario de Spotify'}!</h2>

            <h4 className="mt-4">Tus playlists:</h4>
            <ul className="list-group">
                {playlists.map(playlist => (
                    <li key={playlist.id} className="list-group-item">
                        {playlist.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SpotifyDashboard;
