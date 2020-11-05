import React from "react";
import Select from "react-select";
import * as FaIcons from "react-icons/fa";
import "../../css/RightBar/RightBarSelect.css";

function RightBarColumnas() {
  const colourStyles = {
    control: (styles) => ({ ...styles, backgroundColor: "white" }),

    multiValue: (styles, { data }) => {
      const color = "#2ABAC8";
      return {
        ...styles,
        backgroundColor: color,
      };
    },
    multiValueLabel: (styles, { data }) => ({
      ...styles,
      color: "white",
    }),
    multiValueRemove: (styles, { data }) => ({
      ...styles,
      color: "white",
      ":hover": {
        backgroundColor: "#1795A0",
        color: "white",
      },
    }),
  };

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
