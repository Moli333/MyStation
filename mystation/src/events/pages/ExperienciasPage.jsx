// src/events/pages/ExperienciasPage.jsx
import React from "react";
import Player from "../../spotify/Player";

const ExperienciasPage = () => {
    return (
        <div className="experiencias-container">
            <h2>Explora tus experiencias de usuario</h2>
            <p>Aquí puedes reproducir música mientras exploras esta sección.</p>
            <Player />
        </div>
    );
};

export default ExperienciasPage;