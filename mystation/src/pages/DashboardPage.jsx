// src/pages/DashboardPage.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Player from "../components/Player";
import ThemeToggle from "../components/ThemeToggle";
import ProfileEditor from "../components/ProfileEditor";
import PlaylistGrid from "../components/PlaylistGrid";
import LoadingSkeleton from "../components/LoadingSkeleton";
import ErrorMessage from "../components/ErrorMessage";

const DashboardPage = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [playlists, setPlaylists] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfileAndPlaylists = async () => {
            try {
                const token = localStorage.getItem("spotify_access_token");
                const [profileRes, playlistsRes] = await Promise.all([
                    fetch("https://api.spotify.com/v1/me", {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                    fetch("https://api.spotify.com/v1/me/playlists", {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                ]);

                if (!profileRes.ok || !playlistsRes.ok)
                    throw new Error("Error al cargar datos de Spotify");

                const profileData = await profileRes.json();
                const playlistsData = await playlistsRes.json();

                setProfile(profileData);
                setPlaylists(playlistsData.items);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchProfileAndPlaylists();
    }, []);

    const handleProfileSave = async (updatedProfile) => {
        console.log("Simulando edición de perfil", updatedProfile);
        setProfile({ ...profile, ...updatedProfile });
    };

    if (error) return <ErrorMessage message={error} />;
    if (!profile) return <LoadingSkeleton />;

    return (
        <div className="dashboard">
            <h1>Bienvenido, {profile.display_name}</h1>
            <ThemeToggle />
            <ProfileEditor profile={profile} onSave={handleProfileSave} />
            <PlaylistGrid playlists={playlists} />
            <Player />
        </div>
    );
};

export default DashboardPage;
