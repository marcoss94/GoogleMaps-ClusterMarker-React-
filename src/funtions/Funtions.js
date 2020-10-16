import { useSelector } from "react-redux";

import servicioIcon from "../icons/Servicios.svg";
import sectorIcon from "../icons/Sector6.svg";
import puntoIcon from "../icons/tarjetas/tarjetaTanqueIcon.svg";
import saneamientoIcon from "../icons/Saneamiento.svg";
import bombaIcon from "../icons/bomba.svg";
import perforacionAutoIcon from "../icons/PerforacionAuto.svg";
import puntoMedioIcon from "../icons/Punto_medio.svg";
import reguladora from "../icons/Reguladora.svg";

export const llenarTipos = (data) => {
    let listTiposSistemas = [];
    data.map(element => {
        element.sectorID.forEach(item => {
            if (item.startsWith('PR_')) {
                if (!listTiposSistemas.some(item => item.value === 'PR'))
                    listTiposSistemas.push({ value: 'PR', label: 'Perforaciones' });

            } else if (item.startsWith('PRA_')) {
                if (!listTiposSistemas.some(item => item.value === 'PRA'))
                    listTiposSistemas.push({ value: 'PRA', label: 'Automatismo' });

            } else if (!isNaN(parseInt(item))) {
                if (!listTiposSistemas.some(item => item.value === '#'))
                    listTiposSistemas.push({ value: '#', label: 'Tanque' });
            } else if (item.startsWith('PQ_')) {
                if (!listTiposSistemas.some(item => item.value === 'PQ'))
                    listTiposSistemas.push({ value: 'PQ', label: 'Sector Ranc' });

            } else if (item.startsWith('TQ_')) {
                if (!listTiposSistemas.some(item => item.value === 'TQ'))
                    listTiposSistemas.push({ value: 'TQ', label: 'Sistema de agua elevada' });

            }

        })
    })

    return listTiposSistemas;
}

export const llenarMedidas = (data, puntos) => {
    let medidas_to_show = [];

    data.forEach(element => {
        element.puntos = []
    })

    puntos.forEach(item => {
        for (const key in item) {
            data.forEach(element => {
                if (element.medidas.includes(key)) {
                    if (item[key] !== -1) {
                        element.puntos.push(item.id);
                        if (!medidas_to_show.some(aux => aux.id === element.id)) {
                            medidas_to_show.push(element);
                        }
                    }
                }
            })
        }
    })

    return medidas_to_show;
}


export const defineIcons = (tipo) => {
    var icon;
    if (tipo === "servicio") {
        icon = servicioIcon;
    } else if (tipo === "sector") {
        icon = sectorIcon;
    } else if (tipo === "tanque") {
        icon = puntoIcon;
    } else if (tipo === "tanque_auto") {
        icon = puntoIcon;
    } else if (tipo === "caudalimetro") {
        icon = saneamientoIcon;
    } else if (tipo === "bomba") {
        icon = bombaIcon;
    } else if (tipo === "bomba_auto") {
        icon = bombaIcon;
    } else if (tipo === "perforacionAuto") {
        icon = perforacionAutoIcon;
    } else if (tipo === "puntoMedio") {
        icon = puntoMedioIcon;
    } else if (tipo === "reguladora") {
        icon = reguladora;
    }
    return icon;

}