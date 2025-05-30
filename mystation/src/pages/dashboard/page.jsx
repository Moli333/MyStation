// src/pages/dashboard/page.jsx
"use client";

import Player from "@/components/Player";
import ProfileEditor from "@/components/ProfileEditor";
import PlaylistGrid from "@/components/PlaylistGrid";
import { useEffect, useState } from "react";
import { fetchUserData } from "@/lib/spotify";

export default function DashboardPage() {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getData() {
            try {
                const data = await fetchUserData();
                setUserData(data);
            } catch (e) {
                setError("Error al cargar los datos. Intenta nuevamente.");
            } finally {
                setLoading(false);
            }
        }

        getData();
    }, []);

    if (loading) return <p className="p-4">Cargando datos...</p>;
    if (error) return <p className="p-4 text-red-500">{error}</p>;

    return (
        <div className="p-4 space-y-6">
            <h1 className="text-2xl font-bold">Explora tus experiencias de usuario</h1>
            <p className="text-sm text-gray-600">Aquí puedes reproducir música mientras exploras esta sección.</p>

            <Player />
            <ProfileEditor user={userData.user} />
            <PlaylistGrid playlists={userData.playlists} />
        </div>
    );
}
