import servicioIcon from "../icons/Servicios.svg";
import sectorIcon from "../icons/Sector6.svg";
import puntoIcon from "../icons/Tanque.svg";
import caudalimetroIcon from "../icons/Caudalimetro.svg";
import saneamientoIcon from "../icons/Saneamiento.svg";
import bombaIcon from "../icons/bomba.svg";
import perforacionAutoIcon from "../icons/PerforacionAuto.svg";
import puntoMedioIcon from "../icons/Punto_medio.svg";
import reguladora from "../icons/Reguladora.svg";
import perforacionSinAutoIcon from "../icons/PerforacionesSinAuto.svg";

export default function DefineIcon(props) {
  // Se definen los conos del mapa y las fallas y alertas

  const { tipo, error, falla } = props;
  var icon = null;
  var errorHTML = "";
  var fallaHTML = "";

  if (tipo === "servicio") {
    icon = servicioIcon;
  } else if (tipo === "sector") {
    icon = sectorIcon;
  } else if (tipo === "tanque") {
    icon = puntoIcon;
  } else if (tipo === "tanque_auto") {
    icon = puntoIcon;
  } else if (tipo === "caudalimetro") {
    icon = caudalimetroIcon;
  } else if (tipo === "bomba") {
    icon = perforacionSinAutoIcon;
  } else if (tipo === "bomba_auto") {
    icon = bombaIcon;
  } else if (tipo === "perforacionAuto") {
    icon = perforacionAutoIcon;
  } else if (tipo === "puntoMedio") {
    icon = puntoMedioIcon;
  } else if (tipo === "reguladora") {
    icon = reguladora;
  } else if (tipo === "otro") {
    icon = puntoMedioIcon;
  } else if (tipo === "saneamiento") {
    icon = saneamientoIcon;
  }

  if (error !== "0" && error !== undefined) {
    errorHTML = `
        <span id="MuiBadge-badge-danger">

            <div >
            <span title="Cantidad de errores">${error}</span>
            </div>
        </span>
        `;
  }
  if (falla !== "0" && falla !== undefined) {
    fallaHTML = `
        <span id="MuiBadge-badge-warning">
            <div >
            <span title="Cantidad de fallas">${falla}</span>
            </div>
        </span>
        `;
  }

  return `<span id="MuiBadge-root">
            <div>
                <img id="icono" src=${icon} />

            </div>
            <div id="iconBadge" >
                ${errorHTML}
                ${fallaHTML}
            </div>

        </span>`;
}
