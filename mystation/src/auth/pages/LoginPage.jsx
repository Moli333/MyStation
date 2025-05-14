import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from "../contexts/UserProvider";
import { redirectToSpotifyLogin } from "../spotifyAuth";
import {
    signInWithGoogle,
    signInWithFacebook,
    signInWithEmailPassword,
} from "../../firebase/auth";

export const LoginPage = () => {
    const { login } = useUser();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showProviders, setShowProviders] = useState(false);
    const [knownAccounts, setKnownAccounts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('knownAccounts')) || [];
        setKnownAccounts(stored);
    }, []);

    useEffect(() => {
        const handleMessage = (event) => {
            if (event.origin !== "http://127.0.0.1:3000") return;
            const user = event.data;
            if (user?.email) {
                saveKnownAccount(user.email, 'spotify');
                login(user);
                navigate('/');
            }
        };
        window.addEventListener("message", handleMessage);
        return () => window.removeEventListener("message", handleMessage);
    }, [login, navigate]);

    const saveKnownAccount = (email, provider) => {
        const stored = JSON.parse(localStorage.getItem('knownAccounts')) || [];
        const exists = stored.find(acc => acc.email === email);
        if (!exists) {
            const updated = [...stored, { email, provider }];
            localStorage.setItem('knownAccounts', JSON.stringify(updated));
        }
    };

    const handleProviderSelect = async (provider) => {
        let user = null;

        if (provider === 'google') {
            user = await signInWithGoogle();
        } else if (provider === 'facebook') {
            user = await signInWithFacebook();
        } else if (provider === 'spotify') {
            redirectToSpotifyLogin();
            return;
        }

        if (user?.email) {
            saveKnownAccount(user.email, provider);
            login(user);
            navigate('/');
        }
    };

    const handleAccountClick = async (account) => {
        setEmail(account.email);
        await handleProviderSelect(account.provider);
    };

    const handleEmailLogin = async () => {
        const user = await signInWithEmailPassword(email, password);
        if (user) {
            saveKnownAccount(email, 'email');
            login(user);
            navigate('/');
        }
    };

    return (
        <div className="login-container">
            <div className="card col-md-4 position-relative">
                <h4 className="card-title mb-4">Login</h4>

                <label>Email</label>
                <input
                    type="email"
                    className="form-control mb-2"
                    value={email}
                    placeholder="Escribe tu correo electrónico"
                    onFocus={() => setShowProviders(true)}
                    onBlur={() => setTimeout(() => setShowProviders(false), 200)}
                    onChange={(e) => setEmail(e.target.value)}
                />

                {showProviders && (
                    <div className="provider-suggestions">
                        {knownAccounts.map((acc, index) => (
                            <div
                                key={index}
                                onClick={() => handleAccountClick(acc)}
                                className="suggestion-item"
                            >
                                {acc.email} ({acc.provider})
                            </div>
                        ))}
                        <div onClick={() => handleProviderSelect('google')} className="suggestion-item">Continuar con Google</div>
                        <div onClick={() => handleProviderSelect('facebook')} className="suggestion-item">Continuar con Facebook</div>
                        <div onClick={() => handleProviderSelect('spotify')} className="suggestion-item">Continuar con Spotify</div>
                    </div>
                )}

                <label>Password</label>
                <input
                    type="password"
                    className="form-control mb-3"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Escribe tu contraseña"
                />

                <button className="btn btn-primary btn-lg d-block w-100 mb-3" onClick={handleEmailLogin}>
                    Login
                </button>

                <div className="text-center mt-3">
                    <span>¿No tienes cuenta?</span>
                    <Link to="/register"> Regístrate aquí</Link>
                </div>
            </div>

            <style>{`
                body {
                    margin: 0;
                    padding: 0;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                }
                .login-container {
                    min-height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-image: 
                        linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9)),
                        url('https://maldita.es/uploads/images/2024/06/665efad1a992dspotify-algoritmo-2-png.png');
                    background-size: cover;
                    background-position: center;
                    background-repeat: no-repeat;
                }
                .card {
                    background: white;
                    padding: 2rem;
                    border-radius: 12px;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
                    z-index: 1;
                }
                .card-title {
                    color: rgb(7, 87, 31);
                    font-weight: bold;
                    text-align: center;
                }
                .btn-primary {
                    background-color: rgb(10, 48, 15);
                    border: none;
                }
                .btn-primary:hover {
                    background-color: rgb(8, 36, 19);
                }
                .provider-suggestions {
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    margin-top: -10px;
                    margin-bottom: 1rem;
                    box-shadow: 0 2px 6px rgba(0,0,0,0.1);
                    background: white;
                    z-index: 1000;
                    position: absolute;
                    width: 100%;
                }
                .suggestion-item {
                    padding: 10px;
                    cursor: pointer;
                }
                .suggestion-item:hover {
                    background-color: rgb(103, 199, 236);
                }
            `}</style>
        </div>
    );
};
