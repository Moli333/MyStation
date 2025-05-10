import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { firebaseAuth } from '../../firebase/config';
import { authTypes } from '../../types/authTypes';

export const useAuthenticate = (dispatch) => {
    const login = async ({ email, password }) => {
        try {
            const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
            const user = userCredential.user;

            const action = {
                type: authTypes.login,
                payload: {
                    email: user.email,
                    uid: user.uid,
                },
            };

            localStorage.setItem('user', JSON.stringify(user));
            dispatch(action);

        } catch (error) {
            console.error('Login error:', error);
            dispatch({ type: authTypes.errors, payload: 'Credenciales inválidas' });
        }
    };

    const logout = async () => {
        await signOut(firebaseAuth);
        localStorage.removeItem('user');
        dispatch({ type: authTypes.logout });
    };

    return { login, logout };
};
