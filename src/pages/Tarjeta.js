import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import "../css/Tarjeta.css";

function Tarjeta() {

    return (
        <div className="contenedor">
            <div className="container_opciones">
                Componente Opciones
            </div>

            <div className="container_tarjeta">
                {Array(20).fill().map((_, i) => (
                    <div key={i} className="tarjeta">
                        Tarjeta
                    </div>
                ))}
            </div>

        </div>
    );
}

export default Tarjeta;
