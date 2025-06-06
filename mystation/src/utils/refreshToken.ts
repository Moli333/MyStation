// src/utils/refreshToken.ts
import axios from "axios"


export const refreshSpotifyToken = async (refreshToken: string): Promise<string | null> => {
    try {
        const res = await axios.post(
            "https://accounts.spotify.com/api/token",
            new URLSearchParams({
                grant_type: "refresh_token",
                refresh_token: refreshToken,
                client_id: "d0d04f92a7d7456393e677a9ccf4341c",
                client_secret: "TU_CLIENT_SECRET_REAL",
            }),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        )

        const { access_token } = res.data
        return access_token
    } catch (error) {
        console.error("Error refreshing Spotify token:", error)
        return null
    }
}
