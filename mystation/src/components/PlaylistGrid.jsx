"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function PlaylistGrid() {
    const [playlists, setPlaylists] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("spotify_access_token");

    useEffect(() => {
        if (!token) return;
        axios.get("https://api.spotify.com/v1/me/playlists", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(res => {
            setPlaylists(res.data.items || []);
            setLoading(false);
        })
        .catch(err => {
            console.error("Error al cargar playlists:", err);
            setLoading(false);
        });
    }, [token]);

    if (loading) return <p>Cargando tus playlists...</p>;
    if (!playlists.length) return <p className="text-gray-500">No tienes playlists disponibles.</p>;

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-4">
            {playlists.map((playlist) => (
                <div
                    key={playlist.id}
                    className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow hover:shadow-lg transition"
                >
                    <img
                        src={playlist.images?.[0]?.url}
                        alt={playlist.name}
                        className="w-full h-40 object-cover rounded"
                    />
                    <h3 className="mt-2 font-semibold text-lg">{playlist.name}</h3>
                    <p className="text-sm text-gray-500">{playlist.description || "Sin descripción"}</p>
                    <p className="text-xs mt-1 text-gray-400">
                        {playlist.public ? "Pública" : "Privada"}
                    </p>
                </div>
            ))}
        </div>
    );
}
