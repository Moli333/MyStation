import { useEffect, useState } from "react";

export const HomePage = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const accessToken = localStorage.getItem("spotify_access_token");
            if (!accessToken) return;

            const response = await fetch("https://api.spotify.com/v1/me", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            const data = await response.json();
            console.log(data);
            setUserData(data);
        };

        fetchUserData();
    }, []);

    return (
<<<<<<< HEAD
        <div className="container mt-5">
<<<<<<< HEAD
<<<<<<< HEAD
            <h1>🎧 welcome to MyStation</h1>
            <p className="lead">Your space to enjoy music from Spotify.</p>
        </div>
    );
};

=======
            <h1>🎧 Bienvenido a MyStation</h1>
            <p className="lead">Tu espacio para explorar, gestionar y disfrutar música desde Spotify.</p>
        </div>
    );
};
>>>>>>> 66cafe3 (Guardar cambios de estructura)
=======
            <h1>🎧 welcome to MyStation</h1>
            <p className="lead">Your space to enjoy music from Spotify.</p>
        </div>
    );
};

>>>>>>> 9933808 (Se guardan cambios y se  confirma que App tiene la estructura  en React y usando correctamente Vite)
=======
        <div>
            <h1>Home</h1>
            {userData && <p>Hola, {userData.display_name}</p>}
        </div>
    );
};
>>>>>>> 8fc3168 (Se guardan cambios generados en pro de mejorar el acople de Spotify y Firebase en la APP)
