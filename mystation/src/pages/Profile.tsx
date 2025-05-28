import { useSpotify } from "../auth/contexts/SpotifyContext"
import { useSpotifyProfile } from "../hooks/useSpotifyProfile"
import { useState, useEffect } from "react"
import { db } from "../firebase/firestore"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { useUser } from "../auth/contexts/UserProvider"

export const Profile = () => {
    const { accessToken } = useSpotify()
    const { user } = useUser()
    const { genres, recentTracks } = useSpotifyProfile(accessToken)
    const [displayName, setDisplayName] = useState("")
    const [bio, setBio] = useState("")

    useEffect(() => {
        if (!user) return
        const fetchData = async () => {
            const ref = doc(db, "profiles", user.uid)
            const docSnap = await getDoc(ref)
            if (docSnap.exists()) {
                const data = docSnap.data()
                setDisplayName(data.displayName || "")
                setBio(data.bio || "")
            }
        }
        fetchData()
    }, [user])

    const handleSave = async () => {
        if (!user) return
        const ref = doc(db, "profiles", user.uid)
        await setDoc(ref, {
            displayName,
            bio,
        })
        alert("Perfil actualizado con éxito")
    }

    return (
        <div className="container mt-4">
            <h2 className="mb-3">Perfil de Usuario</h2>

            <div className="mb-3">
                <label className="form-label">Nombre a mostrar</label>
                <input className="form-control" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
            </div>

            <div className="mb-3">
                <label className="form-label">Biografía</label>
                <textarea className="form-control" value={bio} onChange={(e) => setBio(e.target.value)} />
            </div>

            <button className="btn btn-primary mb-4" onClick={handleSave}>
                Guardar Cambios
            </button>

            <h4>🎧 Géneros Favoritos</h4>
            <ul className="list-group mb-4">
                {genres.map((g, i) => (
                    <li className="list-group-item" key={i}>{g}</li>
                ))}
            </ul>

            <h4>📜 Reproducción Reciente</h4>
            <ul className="list-group">
                {recentTracks.map((track, i) => (
                    <li className="list-group-item" key={i}>
                        {track.track.name} - {track.track.artists[0].name}
                    </li>
                ))}
            </ul>
        </div>
    )
}
