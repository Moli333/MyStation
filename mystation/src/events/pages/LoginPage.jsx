import { useContext } from 'react';
import { useForm } from '../../hooks/useForm';
import { UserContext } from '../../auth/contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import '../../styles/login.css';

const initialForm = {
    email: '',
    password: ''
};

export const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useContext(UserContext);
    const { email, password, onInputChange } = useForm(initialForm);

    const onLoginUser = () => {
        login({ email, password });
        navigate('/', { replace: true });
    };

    return (
        <div className="login-container">
            <div className="card col-md-4">
                <h4 className="card-title mb-4">Login</h4>

                <div className="form-group mb-3">
                    <label>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={email}
                        onChange={onInputChange}
                        placeholder="Escribe tu correo electrónico"
                    />
                </div>

                <div className="form-group mb-4">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={password}
                        onChange={onInputChange}
                        placeholder="Escribe tu contraseña"
                    />
                </div>

                <div className="d-grid">
                    <button
                        className="btn btn-primary btn-lg"
                        onClick={onLoginUser}
                    >
                        LOGIN
                    </button>
                </div>
            </div>
        </div>
    );
};
