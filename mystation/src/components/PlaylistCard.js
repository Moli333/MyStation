import { Link } from "react-router-dom";

const PlaylistCard = ({ playlist }) => {
    return (
        <div className="playlist-card">
            <Link to={`/playlist/${playlist.id}`}>
                <img src={playlist.images[0]?.url} alt={playlist.name} />
                <h3>{playlist.name}</h3>
                <p>{playlist.description}</p>
                <p>{playlist.public ? "Pública" : "Privada"}</p>
            </Link>
        </div>
    );
};

export default PlaylistCard;
