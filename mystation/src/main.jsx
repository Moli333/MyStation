import React from 'react';
import ReactDOM from 'react-dom/client';
import { SpotifyProvider } from './auth/contexts/SpotifyContext';
import { UserProvider } from './auth/contexts/UserProvider';
import EventApp from './EventApp';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/login.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SpotifyProvider>
      <UserProvider>
        <EventApp />
      </UserProvider>
    </SpotifyProvider>
  </React.StrictMode>
);
