import React from 'react'
import * as BsIcons from "react-icons/bs";
import * as FaIcons from "react-icons/fa";
import { defineIcons } from "../../funtions/Funtions"
import '../../css/Colors.css'


function TarjetaModal(props) {

    const {
        info,
        toggle,
        changeMostrarPerfAuto,
        changeMostrarTanque,
        item
    } = props;

    const {
        id,
        tipo,
        nombre,
        H_TQ,
        H_MAX_TQ,
        PUMP_PERF_STATE,
        P_PRESSURE,
        fechadata,

    } = item;

    // Toda esta parte viene del item
    let listColor = ['azul', 'verde', 'amarillo', 'azulOscuro'];

    let H_TQ_porcentaje = (parseFloat(H_TQ) / parseFloat(H_MAX_TQ)) * 100


    return (
        <div className='tarjeta_modal_conteiner'>
            <div className='tarjeta_modal_title'>
                <div className='tarjeta_modal_titulo'>
                    <p>{nombre}</p>
                    <p>{fechadata}</p>
                </div>

                <div className='tarjeta_modal_config' onClick={tipo === "tanque" ? changeMostrarTanque : changeMostrarPerfAuto}>
                    <BsIcons.BsFillGearFill />
                </div>

            </div>
            <div className='tarjeta_modal_options'>
                {H_TQ && (
                    <div className={`tarjeta_modal_item ${listColor[0]}`}>
                        <div className={`tarjeta_modal_item_left `}>
                            <div className="medtarjeta_modal_item_medida">
                                <div className='tarjeta_modal_item_title'>Altura</div>
                                <div className='tarjeta_modal_item_value'>{H_TQ} mts</div>

                            </div>


                            {!isNaN(H_TQ_porcentaje) && (
                                <React.Fragment>
                                    <div className="medtarjeta_modal_item_medida">
                                        <div className='tarjeta_modal_item_title'>Porcentaje</div>
                                        <div className='tarjeta_modal_item_value'>{H_TQ_porcentaje.toFixed(2)} %</div>
                                    </div>
                                </React.Fragment>
                            )}

                        </div>
                        <div className='tarjeta_modal_item_right'>

                            <div className={`tarjeta_modal_item_icon icon_${listColor[0]}`}>
                                <img id="tarjeta_modal_item__icono" alt="icono" src={defineIcons('tanque')} />
                            </div>
                        </div>

                    </div>
                )}

                {P_PRESSURE && (
                    <div className={`tarjeta_modal_item ${listColor[2]}`} >
                        <div className='tarjeta_modal_item_left'>
                            <div className='tarjeta_modal_item_title'>Presión</div>
                            <div className='tarjeta_modal_item_value'>{P_PRESSURE} bar</div>
                        </div>
                        <div className='tarjeta_modal_item_right'>
                            <div className={`tarjeta_modal_item_icon icon_${listColor[2]}`}>
                                <FaIcons.FaTachometerAlt />
                            </div>

                        </div>
                    </div>
                )}

                {PUMP_PERF_STATE && (
                    <div className={`tarjeta_modal_item ${listColor[1]}`} >
                        <div className='tarjeta_modal_item_left'>
                            <div className='tarjeta_modal_item_title'>Bomba</div>
                            <div className='tarjeta_modal_item_value'>{PUMP_PERF_STATE === "ON" ? "ENCENDIDA" : "APAGADA"}</div>
                        </div>
                        <div className='tarjeta_modal_item_right'>
                            <div className={`tarjeta_modal_item_icon icon_${listColor[1]}`}>
                                <FaIcons.FaPowerOff />
                            </div>

                        </div>
                    </div>
                )}

                {/* <div className={`tarjeta_modal_item ${listColor[3]}`}>
                    <div className='tarjeta_modal_item_left'>
                        <div className={`tarjeta_modal_item_title`}>Clave</div>
                        <div className='tarjeta_modal_item_value'>85.4 bar</div>
                    </div>
                    <div className='tarjeta_modal_item_right'>
                        <div className={`tarjeta_modal_item_icon icon_${listColor[3]}`}>
                            <FaIcons.FaExclamationTriangle />
                        </div>

                    </div>
                </div> */}


            </div>
            <div className='tarjeta_modal_footer'>
                <p>Footer</p>
            </div>

        </div>
    )
}

export default TarjetaModal
