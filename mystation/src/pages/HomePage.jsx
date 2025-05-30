// src/pages/HomePage.jsx
import { redirectToSpotifyLogin } from "../lib/auth";

const HomePage = () => {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-2">Bienvenido</h1>
            <button
                onClick={redirectToSpotifyLogin}
                className="px-4 py-2 bg-green-600 text-white rounded"
            >
                Iniciar sesión con Spotify
            </button>
        </div>
    );
};

export default HomePage;
