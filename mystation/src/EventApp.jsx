import { AppRouter } from "./router/AppRouter";
import { UserProvider } from './auth/contexts/UserProvider';

export const EventApp = () => {
    console.log('App loaded');
    return (
        <UserProvider>
            <AppRouter />
        </UserProvider>
    );
};