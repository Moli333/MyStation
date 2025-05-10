<<<<<<< HEAD
import { AppRouter } from "./router/AppRouter";
import { UserProvider } from './auth/contexts/UserProvider';
=======
import { UserProvider } from "./auth/contexts/UserProvider";
import { AppRouter } from "./router/AppRouter";
>>>>>>> 66cafe3 (Guardar cambios de estructura)

export const EventApp = () => {
    console.log('App loaded');
    return (
        <UserProvider>
            <AppRouter />
        </UserProvider>
    );
<<<<<<< HEAD
};
=======
};
>>>>>>> 66cafe3 (Guardar cambios de estructura)
