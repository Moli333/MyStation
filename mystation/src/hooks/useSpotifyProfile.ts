import { useEffect, useState } from "react"
import axios from "axios"

interface Artist {
    genres: string[]
}

interface TrackItem {
    track: {
        name: string
        artists: { name: string }[]
        album: { name: string; images: { url: string }[] }
        duration_ms: number
        preview_url: string | null
    }
    played_at: string
}

export const useSpotifyProfile = (accessToken: string | null) => {
    const [genres, setGenres] = useState<string[]>([])
    const [recentTracks, setRecentTracks] = useState<TrackItem[]>([])

    useEffect(() => {
        if (!accessToken) return

        const fetchTopGenres = async () => {
            try {
                const res = await axios.get("https://api.spotify.com/v1/me/top/artists", {
                    headers: { Authorization: `Bearer ${accessToken}` },
                })

                const allGenres = res.data.items.flatMap((artist: Artist) => artist.genres)
                const topGenres = [...new Set(allGenres)].slice(0, 5)

                if (Array.isArray(topGenres) && topGenres.every(g => typeof g === "string")) {
                    setGenres(topGenres)
                }
            } catch (error) {
                console.error("Error fetching top genres:", error)
            }
        }

        const fetchRecentTracks = async () => {
            try {
                const res = await axios.get("https://api.spotify.com/v1/me/player/recently-played?limit=5", {
                    headers: { Authorization: `Bearer ${accessToken}` },
                })

                const items: TrackItem[] = res.data.items
                setRecentTracks(items)
            } catch (error) {
                console.error("Error fetching recent tracks:", error)
            }
        }

        fetchTopGenres()
        fetchRecentTracks()
    }, [accessToken])

    return { genres, recentTracks }
}
