import { useEffect, useState, createContext, useContext } from "react"
import { refreshSpotifyToken } from "../../utils/refreshToken"
import { useNavigate } from "react-router-dom"

const SpotifyContext = createContext<any>(null)

export const SpotifyProvider = ({ children }: any) => {
    const [accessToken, setAccessToken] = useState<string | null>(null)
    const [refreshToken, setRefreshToken] = useState<string | null>(null)

    //actualizar tokens
    const renovarToken = async () => {
        if (refreshToken) {
            const nuevoToken = await refreshSpotifyToken(refreshToken)
            if (nuevoToken) {
                setAccessToken(nuevoToken)
                localStorage.setItem("spotify_access_token", nuevoToken)
            }
        }
    }

    // Renovar token al iniciar si hay refreshToken
    useEffect(() => {
        const storedAccessToken = localStorage.getItem("spotify_access_token")
        const storedRefreshToken = localStorage.getItem("spotify_refresh_token")

        if (storedRefreshToken) {
            setRefreshToken(storedRefreshToken)
            renovarToken()
        } else if (storedAccessToken) {
            setAccessToken(storedAccessToken)
        }
    }, [])

    const setTokens = (access: string, refresh: string) => {
        setAccessToken(access)
        setRefreshToken(refresh)
        localStorage.setItem("spotify_access_token", access)
        localStorage.setItem("spotify_refresh_token", refresh)
    }

    return (
        <SpotifyContext.Provider value={{ accessToken, refreshToken, setTokens }}>
            {children}
        </SpotifyContext.Provider>
    )
}

export const useSpotify = () => {
    const context = useContext(SpotifyContext);
    if (!context)
        throw new Error("useSpotify must be used within SpotifyProvider");
    return context;
};
