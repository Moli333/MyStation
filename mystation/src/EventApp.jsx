import { AppRouter } from "./router/AppRouter";
import { UserProvider } from './auth/contexts/UserProvider';
import { SpotifyProvider } from "./auth/contexts/SpotifyContext";

function EventApp() {
    return (
        <SpotifyProvider>
            <UserProvider>
                <AppRouter />
            </UserProvider>
        </SpotifyProvider>
    );
}

export default EventApp;