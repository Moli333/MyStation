import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { EventApp } from './EventApp';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <EventApp />
    </BrowserRouter>
  </React.StrictMode>
);

console.log("📦 main.jsx cargado");
