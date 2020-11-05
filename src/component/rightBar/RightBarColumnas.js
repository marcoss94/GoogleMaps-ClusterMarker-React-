import React from "react";
import Select from "react-select";
import * as FaIcons from "react-icons/fa";
import "../../css/RightBar/RightBarSelect.css";

function RightBarColumnas() {
  // Cambiar estos elementos por cada columna de la tabla listado
  const options = [
    { value: "Fecha", label: "Fecha" },
    { value: "Nombre", label: "Nombre" },
    { value: "Ubicacion", label: "Ubicacion" },
    { value: "Red", label: "Red" },
    { value: "Servicio", label: "Servicio" },
    { value: "Tipos", label: "Tipos" },
    { value: "Medida1", label: "Medida1" },
  ];

  return (
    <div className="rightBarSelect-container">
      {options.map((item) => {
        return (
          <div className="filtro-item">
            <div className="columnas-container">
              <div className="columnas-titulos">
                <FaIcons.FaEye />
                {/* <FaIcons.FaEyeSlash /> */}
                <p>{item.label}</p>
              </div>
              <div className="columnas-check">
                <FaIcons.FaCheckSquare />
                {/* <FaIcons.FaSquare /> */}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default RightBarColumnas;
