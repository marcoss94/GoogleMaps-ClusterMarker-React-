import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import MuiDialogContent from "@material-ui/core/DialogContent";
import * as FiIcons from "react-icons/fi";
import * as MdIcons from "react-icons/md";
import TarjetaModal from "./TarjetaModal";
import "../../css/TarjetaModal.css";

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const ModalList = (props) => {
  // Listado de tarjetas dependiendo del punto seleccionado

  const {
    info,
    changeMostrarPerfAuto,
    changeMostrarTanque,
    sectores,
    puntos,
  } = props;

  const {
    id,
    nombre,
    fechadata,
    altura,
    porcentaje,
    altura_max,
    H_MAX_TQ,
    H_TQ,
    H_TQ_porcentaje,
    PUMP_PERF_STATE,
    P_PRESSURE,
    sectorID,
  } = info;

  var puntosList = [];
  sectorID.map((sec) => {
    var sector = sectores.find((item) => item.id === sec);
    sector.puntoID.forEach((element) => {
      puntosList.push(puntos.find((punt) => punt.id === element));
    });
  });

  return (
    <React.Fragment>
      {/* <DialogTitle onClose={toggle} id="example-custom-modal-styling-title">
                {nombre}
            </DialogTitle> */}

      <DialogContent dividers>
        <div className="modal_container_list">
          {puntosList.map((item, index) => (
            <TarjetaModal
              key={index}
              item={item}
              changeMostrarTanque={changeMostrarTanque}
              changeMostrarPerfAuto={changeMostrarPerfAuto}
            />
          ))}
          {/* <TarjetaModal />
                    <TarjetaModal />
                    <TarjetaModal />
                    <TarjetaModal />
                    <TarjetaModal />
                    <TarjetaModal />
                    <TarjetaModal /> */}
        </div>
      </DialogContent>
    </React.Fragment>
  );
};

export default ModalList;
