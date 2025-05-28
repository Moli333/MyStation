// src/utils/refreshToken.ts
import axios from "axios"


export const refreshSpotifyToken = async (refreshToken: string): Promise<string | null> => {
    try {
        const res = await axios.post(
            "https://accounts.spotify.com/api/token",
            new URLSearchParams({
                grant_type: "refresh_token",
                refresh_token: refreshToken,
                client_id: "a1b518cc50e64d8e93a1e73f40afba98",
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
