const API_URL = "https://api.spotify.com/v1";

function getHeaders(token) {
    return {
        Authorization: `Bearer ${token}`,
    };
}

export async function fetchUserData() {
    const token = localStorage.getItem("spotify_access_token");
    if (!token) throw new Error("Token no encontrado");

    const headers = getHeaders(token);

    try {
        const [userRes, playlistsRes] = await Promise.all([
            fetch(`${API_URL}/me`, { headers }),
            fetch(`${API_URL}/me/playlists?limit=50`, { headers }),
        ]);

        if (!userRes.ok || !playlistsRes.ok)
            throw new Error("Fallo al obtener datos de usuario o playlists");

        const user = await userRes.json();
        const playlists = await playlistsRes.json();

        return {
            user,
            playlists: playlists.items,
        };
    } catch (error) {
        console.error("❌ Error en fetchUserData:", error);
        throw error;
    }
}

export async function fetchTopArtists() {
    const token = localStorage.getItem("spotify_access_token");
    if (!token) throw new Error("Token no encontrado");

    const res = await fetch(`${API_URL}/me/top/artists?limit=10`, {
        headers: getHeaders(token),
    });

    if (!res.ok) throw new Error("Fallo al obtener artistas top");
    const data = await res.json();
    return data.items;
}

export async function fetchTopGenres() {
    const artists = await fetchTopArtists();
    const genres = {};

    artists.forEach((artist) => {
        artist.genres.forEach((genre) => {
            genres[genre] = (genres[genre] || 0) + 1;
        });
    });

    // Ordenar por cantidad de apariciones
    return Object.entries(genres)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([genre]) => genre);
}

export async function fetchRecentlyPlayed() {
    const token = localStorage.getItem("spotify_access_token");
    if (!token) throw new Error("Token no encontrado");

    const res = await fetch(`${API_URL}/me/player/recently-played?limit=10`, {
        headers: getHeaders(token),
    });

    if (!res.ok) throw new Error("Fallo al obtener historial de reproducción");
    const data = await res.json();
    return data.items;
}
export async function fetchCurrentPlayback() {
    const token = localStorage.getItem("spotify_access_token");
    if (!token) throw new Error("Token no encontrado");

    const res = await fetch(`${API_URL}/me/player/currently-playing`, {
        headers: getHeaders(token),
    });

    if (!res.ok) throw new Error("Fallo al obtener reproducción actual");
    const data = await res.json();
    return data;
}