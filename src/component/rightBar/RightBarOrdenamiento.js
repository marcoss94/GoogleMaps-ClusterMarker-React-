import React from "react";
import Select from "react-select";
import * as FaIcons from "react-icons/fa";
import "../../css/RightBar/RightBarSelect.css";

function RightBarOrdenamiento() {
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
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  return (
    <div className="rightBarSelect-container">
      <div className="filtro-item">
        <label>Ordenar por:</label>
        <Select
          options={options}
          styles={colourStyles}
          isMulti={true}
          //   value={arrayClientes}
          //   onChange={(option) => setArrayClientes(option, "cliente")}
          width="10px"
          placeholder="Seleccione..."
        />
      </div>
      <div className="filtro-item">
        <label>Tipo:</label>
        <div className="buttons-ordenamiento">
          <div className={`buttonBig `}>
            <FaIcons.FaSortAmountUp />
            <p>Acs.</p>
          </div>
          <div className={`buttonBig `}>
            <FaIcons.FaSortAmountDown />
            <p>Desc.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RightBarOrdenamiento;
