<<<<<<< HEAD
<<<<<<< HEAD
import { AppRouter } from "./router/AppRouter";
import { UserProvider } from './auth/contexts/UserProvider';
=======
import { UserProvider } from "./auth/contexts/UserProvider";
import { AppRouter } from "./router/AppRouter";
>>>>>>> 66cafe3 (Guardar cambios de estructura)
=======
import { AppRouter } from "./router/AppRouter";
import { UserProvider } from './auth/contexts/UserProvider';
>>>>>>> 9933808 (Se guardan cambios y se  confirma que App tiene la estructura  en React y usando correctamente Vite)

export const EventApp = () => {
    console.log('App loaded');
    return (
        <UserProvider>
            <AppRouter />
        </UserProvider>
    );
<<<<<<< HEAD
<<<<<<< HEAD
};
=======
};
>>>>>>> 66cafe3 (Guardar cambios de estructura)
=======
};
>>>>>>> 9933808 (Se guardan cambios y se  confirma que App tiene la estructura  en React y usando correctamente Vite)
