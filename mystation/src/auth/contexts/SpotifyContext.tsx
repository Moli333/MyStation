import { useEffect, useState, createContext, useContext, ReactNode } from "react";
import { refreshSpotifyToken } from "../../utils/refreshToken";

interface SpotifyContextType {
    token: string | null;
    setToken: (token: string | null) => void;
    setTokens: (access: string, refresh: string) => void;
    accessToken: string | null;
    refreshToken: string | null;
}

const SpotifyContext = createContext<SpotifyContextType | undefined>(undefined);

export const SpotifyProvider = ({ children }: { children: ReactNode }) => {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [refreshToken, setRefreshToken] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);

    const renovarToken = async () => {
        if (refreshToken) {
            const nuevoToken = await refreshSpotifyToken(refreshToken);
            if (nuevoToken) {
                setAccessToken(nuevoToken);
                localStorage.setItem("spotify_access_token", nuevoToken);
            }
        }
    };

    useEffect(() => {
        const storedAccessToken = localStorage.getItem("spotify_access_token");
        const storedRefreshToken = localStorage.getItem("spotify_refresh_token");

        if (storedRefreshToken) {
            setRefreshToken(storedRefreshToken);
            renovarToken();
        } else if (storedAccessToken) {
            setAccessToken(storedAccessToken);
        }
    }, []);

    const setTokens = (access: string, refresh: string) => {
        setAccessToken(access);
        setRefreshToken(refresh);
        localStorage.setItem("spotify_access_token", access);
        localStorage.setItem("spotify_refresh_token", refresh);
    };

    return (
        <SpotifyContext.Provider value={{ token, setToken, setTokens, accessToken, refreshToken }}>
            {children}
        </SpotifyContext.Provider>
    );
};

export const useSpotify = () => {
    const context = useContext(SpotifyContext);
    if (!context) {
        throw new Error("useSpotify debe usarse dentro de un SpotifyProvider");
    }
    return context;
};
