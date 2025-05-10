import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { EventApp } from './EventApp';
<<<<<<< HEAD
import { UserProvider } from './auth/contexts/UserProvider'; // ✅ Importa el provider
=======
>>>>>>> 66cafe3 (Guardar cambios de estructura)
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
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
