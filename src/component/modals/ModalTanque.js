import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MuiDialogContent from '@material-ui/core/DialogContent';

import cargarTanque from '../../funtions/CargarTanqueChart'
import imgGrafico from "../../images/grafico.jpg"
import * as FiIcons from "react-icons/fi";

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

const ModalTanque = (props) => {
    const {
        info,
        toggle,
    } = props;

    var {
        id,
        nombre,
        fechadata,
        altura,
        porcentaje,
        altura_max,
        H_TQ,
        H_MAX_TQ
    } = info;
    var existeTanque = true;
    if (H_TQ && H_MAX_TQ) {
        altura = parseFloat(H_TQ);
        altura_max = parseFloat(H_MAX_TQ)
        porcentaje = (parseFloat(H_TQ) / parseFloat(H_MAX_TQ)) * 100;
    }
    var div = document.getElementById(info.id)



    useEffect(() => {
        if (info) {
            if (altura && altura_max)
                cargarTanque({ id, altura, altura_max });
            else existeTanque = false;
        }
    }, [div])


    return (
        <React.Fragment>
            <DialogContent dividers>
                <div className="modal_container">
                    <div className="modal_tanque_left">
                        <div className="modal_tanque_grafico">
                            <span className="fecha_graph">{fechadata}</span>
                            <img className="imgPruebaGrafico" alt="grafico" src={imgGrafico} />
                        </div>
                        <div className="buttons">
                            <Button variant="outline-dark">
                                <FiIcons.FiChevronLeft />
                                <div className="fecha">07/09/2020</div>
                            </Button>
                            <Button variant="outline-dark">
                                <FiIcons.FiCalendar />
                                <div className="fecha">Hoy</div>
                            </Button>
                            <Button variant="outline-dark">
                                <FiIcons.FiChevronRight />
                                <div className="fecha">09/09/2020</div>
                            </Button>
                        </div>

                    </div>
                    <div className="modal_tanque_right">
                        <div className="tanque-chart">
                            <div className="title">{id}</div>
                            <div className="tanque-chart-data full OK">
                                <div className="data-section tanque">
                                    <div className="tanqueContainer">
                                        <div id={id} >
                                            {existeTanque ? "No hay informacion de tanque" : ''}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {altura && porcentaje ? (
                            <div className="info-tanque">
                                <div className="data-item">
                                    <div className="title">Altura</div>
                                    <div className="value">
                                        {altura?.toFixed(2)}
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

export default ModalTanque;