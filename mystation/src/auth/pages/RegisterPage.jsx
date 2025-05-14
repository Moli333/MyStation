// src/auth/pages/RegisterPage.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerWithEmailPassword } from '../../firebase/auth';
import '../../styles/login.css';

export const RegisterPage = () => {
    const [form, setForm] = useState({ email: '', password: '', confirmPassword: '' });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const onChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const onRegister = async () => {
        const { email, password, confirmPassword } = form;

        if (password !== confirmPassword) {
            return setError('Las contraseñas no coinciden');
        }

        try {
            const user = await registerWithEmailPassword(email, password);
            if (user) {
                navigate('/login');
            }
        } catch (err) {
            console.error(err);
            setError('Error al registrar usuario');
        }
    };

    return (
        <div className="login-container">
            <div className="card col-md-4">
                <h4 className="card-title mb-4">Registrarse</h4>

                <input
                    type="email"
                    name="email"
                    placeholder="Correo electrónico"
                    className="form-control mb-3"
                    value={form.email}
                    onChange={onChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    className="form-control mb-3"
                    value={form.password}
                    onChange={onChange}
                />
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirmar contraseña"
                    className="form-control mb-3"
                    value={form.confirmPassword}
                    onChange={onChange}
                />

                {error && <div className="alert alert-danger">{error}</div>}

                <button className="btn btn-primary btn-lg d-block w-100" onClick={onRegister}>
                    Registrarse
                </button>

                <div className="text-center mt-3">
                    <span>¿Ya tienes cuenta? </span>
                    <Link to="/login">Inicia sesión aquí</Link>
                </div>
            </div>
        </div>
    );
};
