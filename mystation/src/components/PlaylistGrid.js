// src/components/PlaylistGrid.jsx
"use client";

export default function PlaylistGrid({ playlists }) {
    if (!playlists) return <p>📭 No hay playlists para mostrar.</p>;
    if (playlists.length === 0) return <p>📭 No tienes playlists aún.</p>;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
            {playlists.map((playlist) => (
                <div
                    key={playlist.id}
                    className="p-4 rounded-xl shadow-md bg-white dark:bg-gray-800 hover:shadow-lg transition-all"
                >
                    <img
                        src={playlist.images[0]?.url || "/placeholder.png"}
                        alt={playlist.name}
                        className="w-full h-48 object-cover rounded-md mb-2"
                    />
                    <h3 className="font-semibold text-lg">{playlist.name}</h3>
                    <p className="text-sm text-gray-500">{playlist.description || "Sin descripción"}</p>
                    <p className="text-xs mt-1">
                        {playlist.public ? "🔓 Pública" : "🔒 Privada"} — {playlist.tracks.total} canciones
                    </p>
                </div>
            ))}
        </div>
    );
}
