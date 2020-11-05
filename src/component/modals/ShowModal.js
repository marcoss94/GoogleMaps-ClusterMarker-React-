import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ModalPerforacionAuto from "./ModalPerforacionAuto";
import ModalTanque from "./ModalTanque";
import * as MdIcons from "react-icons/md";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";

import "../../css/Modal.css";
import "../../css/NavBarModal.css";

import ModalList from "./ModalList";

const styles = (theme) => ({
  root: {
    display: "flex",
    "flex-direction": "row",
    "align-items": "center",
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, showSidebar, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <IconButton aria-label="nav" className="navButton" onClick={showSidebar}>
        <FaIcons.FaBars />
      </IconButton>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={`${classes.closeButton} navButton`}
          onClick={onClose}
        >
          <MdIcons.MdClose />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
    display: "flex",
    justifyContent: "center",
  },
}))(MuiDialogActions);

export default function ShowModal(props) {
  // Modal general que gestiona la informacion que se muestra dependiendo del punto seleccionado
  const {
    markers,
    current_point,
    boolModal,
    setBoolModal,
    changeCurrentPoint,
    sectores,
    puntos,
  } = props;

  const [sidebar, setSidebar] = useState(false);
  const [mostrarPerfAuto, setMostrarPerfAuto] = useState(false);
  const [mostrarTanque, setMostrarTanque] = useState(false);

  const changeMostrarPerfAuto = () => {
    setMostrarPerfAuto(!mostrarPerfAuto);
  };

  const changeMostrarTanque = () => {
    setMostrarTanque(!mostrarTanque);
  };

  const changeMostrar = () => {
    setMostrarTanque(false);
    setMostrarPerfAuto(false);
  };

  const showSidebar = () => setSidebar(!sidebar);

  const toggle = () => {
    setBoolModal(!boolModal);
    changeCurrentPoint(null);
  };

  let info = markers.find((item) => item.id === current_point);

  const { tipo, nombre } = info;
  let className = "";
  if (tipo === "tanque") {
    className = "modal_tanque";
  }

  return (
    <React.Fragment>
      <Dialog
        fullWidth={true}
        maxWidth={"xl"}
        open={boolModal}
        onClose={toggle}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle
          onClose={toggle}
          showSidebar={showSidebar}
          id="max-width-dialog-title"
        >
          {info.nombre}
        </DialogTitle>

        <nav className={sidebar ? "nav-menu-modal active" : "nav-menu-modal"}>
          <ul className="nav-menu-modal-items" onClick={showSidebar}>
            <li className="navBar-modal-toggle">
              <a href="#" className="menu-modal-bars">
                <AiIcons.AiOutlineClose />
              </a>
            </li>

            <li className="nav-modal-text">
              <a href={"#"}>
                <FaIcons.FaTable />
                <span>{"Histórico"}</span>
              </a>
            </li>
            <li className="nav-modal-text">
              <a href={"#"}>
                <FaIcons.FaFileInvoice />
                <span>{"Informe"}</span>
              </a>
            </li>
          </ul>
        </nav>

        {info.tipo === "perforacionAuto" &&
          !mostrarPerfAuto &&
          !mostrarTanque && (
            <ModalList
              toggle={toggle}
              changeMostrarPerfAuto={changeMostrarPerfAuto}
              changeMostrarTanque={changeMostrarTanque}
              info={info}
              sectores={sectores}
              puntos={puntos}
            />
          )}

        {(info.tipo === "tanque" || mostrarTanque) && (
          <ModalTanque toggle={toggle} info={info} />
        )}

        {(info.tipo === "bomba" || mostrarPerfAuto) && (
          <ModalPerforacionAuto toggle={toggle} info={info} />
        )}

        {tipo !== "tanque" &&
          info.tipo !== "perforacionAuto" &&
          info.tipo !== "bomba" && (
            <React.Fragment>
              <DialogContent dividers>
                <div className="modal_container">
                  <div id="asd">{tipo}</div>
                </div>
              </DialogContent>
            </React.Fragment>
          )}

        <DialogActions>
          <div className="buttons-actions">
            <Button variant="outlined">
              <FaIcons.FaAngleLeft />
            </Button>
            <Button variant="outlined" onClick={changeMostrar}>
              <FaIcons.FaHome />
            </Button>
            <Button variant="outlined">
              <FaIcons.FaAngleRight />
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
