import React from 'react'
import { Button } from 'react-bootstrap';
import * as BiIcons from "react-icons/bi";
import * as AiIcons from "react-icons/ai";
import * as FaIcons from "react-icons/fa";
import { Badge } from 'react-bootstrap';
import "../css/Flotante.css"

export default function Flotante(props) {

    var { posicion, filtro_visible, flotanteAlarm, color, changeFiltro_visible } = props;

    if (color === undefined) {
        color = "primary";
    }

    return (
        <div className={`flotante ${posicion}`}>
            <Button className="botonF" variant={`${color}`} onClick={changeFiltro_visible}>

                {filtro_visible ? (
                    <span><AiIcons.AiOutlineClose /></span>
                ) : (
                        <span><BiIcons.BiSliderAlt /></span>
                    )}

            </Button>{' '}
            {flotanteAlarm ? (
                <Badge className="badgeFiltro" variant="warning" pill title="Filtros seleccionados"><FaIcons.FaFilter /></Badge>
            ) : ""}
        </div>
    )
}
