import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiDialogContent from '@material-ui/core/DialogContent';
import cargarTanque from '../../funtions/CargarTanqueChart'
import imgBombaA from "../../images/bombaA.jpg";

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const ModalPerforacionAuto = (props) => {
    var {
        info,
    } = props;

    var {
        id,
        nombre,
        fechadata,
        H_TQ,
        porcentaje,
        H_MAX_TQ
    } = info;
    var existeTanque = false;
    porcentaje = (H_TQ / H_MAX_TQ) * 100
    var div = document.getElementById(info.id)

    useEffect(() => {
        if (info) {
            if (H_TQ && H_MAX_TQ) {
                info.altura = H_TQ;
                info.altura_max = H_MAX_TQ;

                cargarTanque(info);
            } else existeTanque = true;
        }
    }, [div])


    return (
        <React.Fragment>
            <DialogContent dividers>
                <div className="modal_container">
                    <div className="modal_tanque_left">
                        <div className="modal_tanque_grafico">
                            <span className="fecha_graph">{fechadata}</span>
                            <img className="imgPruebaGrafico" alt="grafico" src={imgBombaA} />
                        </div>

                    </div>
                    <div className="modal_tanque_right">
                        <div className="tanque-chart">
                            <div className="title">{id}</div>
                            <div className="tanque-chart-data full OK">
                                <div className="data-section tanque">
                                    <div className="tanqueContainer">
                                        <div id={id}>
                                            {existeTanque ? '' : "No hay informacion de tanque"}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {H_TQ && porcentaje ? (

                            <div className="info-tanque">
                                <div className="data-item">
                                    <div className="title">Altura</div>
                                    <div className="value">
                                        {H_TQ?.toFixed(2)}
                                        <small className="unit"> Mts</small>
                                    </div>
                                </div>

                                <div className="data-item">
                                    <div className="title">Porcentaje</div>
                                    <div className="value">
                                        {porcentaje?.toFixed(2)}
                                        <small className="unit"> %</small>
                                    </div>
                                </div>
                            </div>

                        ) : (
                                ''
                            )}
                    </div>
                </div>
            </DialogContent>
        </React.Fragment>
    );
}

export default ModalPerforacionAuto;