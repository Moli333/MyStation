import { UserProvider } from "./auth/contexts/UserProvider";
import { AppRouter } from "./router/AppRouter";

export const EventApp = () => {
    console.log('App loaded');
    return (
        <UserProvider>
            <AppRouter />
        </UserProvider>
    );
};
