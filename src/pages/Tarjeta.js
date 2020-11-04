import React from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import TarjetaShow from "../component/tarjeta/TarjetaShow";
import "../css/Tarjeta.css";
import "../css/TarjetaShow.css";

function Tarjeta() {
  const puntosList = useSelector((store) => store.listado.puntosList);

  return (
    <div className="container_tarjetaList">
      <div className="container_tarjeta">
        {/* {Array(21).fill().map((_, i) => (
                        <div key={i} className="tarjeta">
                        </div>
                    ))} */}

        {puntosList.map((item, index) => (
          <TarjetaShow key={index} item={item} />
        ))}
      </div>
    </div>
  );
}

export default Tarjeta;
