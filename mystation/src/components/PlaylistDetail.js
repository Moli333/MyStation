import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingSkeleton from "./LoadingSkeleton";
import ErrorMessage from "./ErrorMessage";

const PlaylistDetail = () => {
    const { id } = useParams();
    const [playlist, setPlaylist] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPlaylist = async () => {
            try {
                const token = localStorage.getItem("spotify_access_token");
                const response = await fetch(`https://api.spotify.com/v1/playlists/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!response.ok) throw new Error("Error al obtener la playlist.");
                const data = await response.json();
                setPlaylist(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchPlaylist();
    }, [id]);

    if (error) return <ErrorMessage message={error} />;
    if (!playlist) return <LoadingSkeleton />;

    return (
        <div className="playlist-detail">
            <img src={playlist.images[0]?.url} alt={playlist.name} />
            <h2>{playlist.name}</h2>
            <p>{playlist.description}</p>
            <p>Seguidores: {playlist.followers.total}</p>
            <p>Fecha de creación: {new Date(playlist.tracks.items[0]?.added_at).toLocaleDateString()}</p>
            <h3>Canciones:</h3>
            <ul>
                {playlist.tracks.items.map((item, index) => (
                    <li key={index}>
                        {item.track.name} - {item.track.artists.map((artist) => artist.name).join(", ")} (
                        {Math.floor(item.track.duration_ms / 60000)}:
                        {((item.track.duration_ms % 60000) / 1000).toFixed(0).padStart(2, "0")})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PlaylistDetail;
