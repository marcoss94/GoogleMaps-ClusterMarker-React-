import React from "react";
import * as BsIcons from "react-icons/bs";
import * as FaIcons from "react-icons/fa";
import { defineIcons } from "../../funtions/Funtions";
import "../../css/Colors.css";

function TarjetaShow(props) {
  const {
    info,
    toggle,
    changeMostrarPerfAuto,
    changeMostrarTanque,
    item,
  } = props;

  let {
    id,
    tipo,
    nombre,
    altura,
    altura_max,
    porcentaje,
    H_TQ,
    H_MAX_TQ,
    // PUMP_PERF_STATE,
    // P_PRESSURE,
    fechadata,
  } = item;

  if (H_TQ && H_MAX_TQ) {
    altura = parseFloat(H_TQ);
    altura_max = parseFloat(H_MAX_TQ);
    porcentaje = (parseFloat(H_TQ) / parseFloat(H_MAX_TQ)) * 100;
  }

  // Datos de prueba para mostrar tarjetas
  // let id = 'PSTPERF04'
  // let nombre = 'Nombre de trajeta'
  // let H_TQ = 2.27
  // let H_MAX_TQ = 10
  let PUMP_PERF_STATE = "ON";
  let P_PRESSURE = 2.3;
  // let fechadata = '05/10/2020 08:08'
  // Datos de prueba para mostrar tarjetas

  // Toda esta parte viene del item
  let listColor = ["azul", "verde", "amarillo", "azulOscuro"];

  return (
    <div className="tarjeta_show_conteiner">
      <div className="tarjeta_show_title">
        <div className="tarjeta_show_titulo">
          <p>{nombre}</p>
          <p>{fechadata}</p>
        </div>

        <div className="tarjeta_show_config">
          <BsIcons.BsFillGearFill />
        </div>
      </div>
      <div className="tarjeta_show_options">
        {altura && (
          <div className={`tarjeta_show_item ${listColor[0]}`}>
            <div className={`tarjeta_show_item_left `}>
              <div className="medtarjeta_show_item_medida">
                <div className="tarjeta_show_item_title">Altura</div>
                <div className="tarjeta_show_item_value">
                  {altura.toFixed(2)} mts
                </div>
              </div>

              {!isNaN(porcentaje) && (
                <React.Fragment>
                  <div className="medtarjeta_show_item_medida">
                    <div className="tarjeta_show_item_title">Porcentaje</div>
                    <div className="tarjeta_show_item_value">
                      {porcentaje.toFixed(2)} %
                    </div>
                  </div>
                </React.Fragment>
              )}
            </div>
            <div className="tarjeta_show_item_right">
              <div className={`tarjeta_show_item_icon icon_${listColor[0]}`}>
                <img
                  id="tarjeta_show_item__icono"
                  alt="icono"
                  src={defineIcons("tanque")}
                />
              </div>
            </div>
          </div>
        )}

        {P_PRESSURE && (
          <div className={`tarjeta_show_item ${listColor[2]}`}>
            <div className="tarjeta_show_item_left">
              <div className="tarjeta_show_item_title">Presión</div>
              <div className="tarjeta_show_item_value">{P_PRESSURE} bar</div>
            </div>
            <div className="tarjeta_show_item_right">
              <div className={`tarjeta_show_item_icon icon_${listColor[2]}`}>
                <FaIcons.FaTachometerAlt />
              </div>
            </div>
          </div>
        )}

        {PUMP_PERF_STATE && (
          <div className={`tarjeta_show_item ${listColor[1]}`}>
            <div className="tarjeta_show_item_left">
              <div className="tarjeta_show_item_title">Bomba</div>
              <div className="tarjeta_show_item_value">
                {PUMP_PERF_STATE === "ON" ? "ENCENDIDA" : "APAGADA"}
              </div>
            </div>
            <div className="tarjeta_show_item_right">
              <div className={`tarjeta_show_item_icon icon_${listColor[1]}`}>
                <FaIcons.FaPowerOff />
              </div>
            </div>
          </div>
        )}

        {/* <div className={`tarjeta_show_item ${listColor[3]}`}>
                    <div className='tarjeta_show_item_left'>
                        <div className={`tarjeta_show_item_title`}>Clave</div>
                        <div className='tarjeta_show_item_value'>85.4 bar</div>
                    </div>
                    <div className='tarjeta_show_item_right'>
                        <div className={`tarjeta_show_item_icon icon_${listColor[3]}`}>
                            <FaIcons.FaExclamationTriangle />
                        </div>

                    </div>
                </div> */}
      </div>
      <div className="tarjeta_show_footer">
        <p>Footer</p>
      </div>
    </div>
  );
}

export default TarjetaShow;
