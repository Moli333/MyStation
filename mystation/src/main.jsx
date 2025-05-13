import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { EventApp } from './EventApp';
import { UserProvider } from './auth/contexts/UserProvider'; // ✅ Importa el provider
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider> 
        <EventApp />
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
