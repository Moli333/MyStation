import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { EventApp } from './EventApp';
<<<<<<< HEAD
<<<<<<< HEAD
import { UserProvider } from './auth/contexts/UserProvider'; // ✅ Importa el provider
=======
>>>>>>> 66cafe3 (Guardar cambios de estructura)
=======
import { UserProvider } from './auth/contexts/UserProvider'; // ✅ Importa el provider
>>>>>>> 9933808 (Se guardan cambios y se  confirma que App tiene la estructura  en React y usando correctamente Vite)
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/login.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
<<<<<<< HEAD
<<<<<<< HEAD
      <UserProvider> 
        <EventApp />
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
=======
      <EventApp />
    </BrowserRouter>
  </React.StrictMode>
);

console.log("📦 main.jsx cargado");
>>>>>>> 66cafe3 (Guardar cambios de estructura)
=======
      <UserProvider> 
        <EventApp />
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
>>>>>>> 9933808 (Se guardan cambios y se  confirma que App tiene la estructura  en React y usando correctamente Vite)
