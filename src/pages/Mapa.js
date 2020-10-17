import React, { useEffect, useState } from 'react';

import Loader from "../component/Loader";
import { llenarMedidas, llenarTipos } from '../funtions/Funtions';
import FormatMarkers from '../funtions/FormatMarkers';
import Map from '../component/Map';
import Flotante from '../component/Flotante';
import FiltroFlotante from '../component/FiltroFlotante';
import ShowModal from '../component/modals/ShowModal';

import { useSelector } from 'react-redux';


function Mapa() {

    const listClientes = useSelector(store => store.listado.clientesList)
    const listServicios = useSelector(store => store.listado.serviciosList)
    const listSectores = useSelector(store => store.listado.sectoresList)
    const listPuntosM = useSelector(store => store.listado.puntosList)
    const listMedidas = useSelector(store => store.listado.medidasList)
    const tiposSistemas = useSelector(store => store.listado.tiposSistemasList)

    const [current_point, setCurrent_point] = useState(null);

    const [listTiposSistemas, setListTiposSistemas] = useState(tiposSistemas);

    const [boolModal, setBoolModal] = useState(false);
    const [filtroBool, setFiltroBooll] = useState(false);

    const [filtro_visible, setFiltro_visible] = useState(false);

    const [arrayMedidas, setArrayMedidas] = useState([]);
    const [arrayClientes, setArrayClientes] = useState([]);
    const [arrayServicios, setArrayServicios] = useState([]);
    const [arrayTiposSistemas, setArrayTiposSistemas] = useState([]);
    const [arraySistemas, setArraySistemas] = useState([]);


    // Prueba de Zoom
    const [zoom, setZoom] = useState(7);
    const [zoomServicio, setZoomServicio] = useState(9);
    const [zoomPunto, setZoomPunt] = useState(11);
    // Prueba de Zoom


    // useEffect(() => {
    //     setListTiposSistemas(llenarTipos(listServicios));

    // }, [])

    const handleArray = (value, arrayType) => {
        if (arrayType === "servicio") {
            if (value !== null && value?.length !== 0) {
                if (value.length > 1) {
                    setZoom(zoomServicio - 1)
                } else setZoom(zoomServicio + 2)
                setArraySistemas([])
                setArrayMedidas([]);
                setArrayTiposSistemas([])
                setFiltroBooll(true);
                setArrayServicios(value);
            } else {
                setZoom(7)
                setArrayServicios([])
            };

        } else if (arrayType === "cliente") {
            if (value !== null && value?.length !== 0) {
                setArraySistemas([])
                setArrayTiposSistemas([])
                setArrayMedidas([]);
                setArrayServicios([]);
                setArrayClientes(value);
                setFiltroBooll(true);
            } else setArrayClientes([]);

        } else if (arrayType === "tiposSistema") {
            if (value !== null && value?.length !== 0) {
                setArraySistemas([])
                setArrayMedidas([]);
                setArrayTiposSistemas(value);
                setFiltroBooll(true);
            } else {
                setZoom(7)
                setArrayTiposSistemas([])
            };

        } else if (arrayType === "medidas") {
            if (value !== null && value?.length !== 0) {
                // setArraySistemas([])
                setArrayMedidas(value);
                setFiltroBooll(true);
            } else {
                setZoom(7)
                setArrayMedidas([]);
            };

        } else if (arrayType === "sistema") {
            if (value !== null && value?.length !== 0) {
                if (value.length > 1) {
                    setZoom(zoomServicio)
                } else setZoom(12)
                setArraySistemas(value);
                setArrayMedidas([]);
                setFiltroBooll(true);
            } else {
                setZoom(7)
                setArraySistemas([])
            };

        }
    }

    const changeCurrentPoint = (current_point) => {
        setCurrent_point(current_point);
        setBoolModal(true);
    }

    const changeZoom = (current_point) => {
        if (zoom !== current_point) {
            setZoom(current_point);

        }
    }

    const changeFiltro_visible = () => {
        setFiltro_visible(!filtro_visible);
    }

    // Filtro
    const filtrar = () => {
        let data_filter_Clientes = listClientes;
        let data_filter_Servicios = listServicios;
        let data_filter_Sectores = listSectores;
        let data_filter_PuntosM = listPuntosM;

        let data_to_show_Clientes = listClientes;
        let data_to_show_Servicios = listServicios;
        let data_to_show_Sectores = listSectores;
        let data_to_show_PuntosM = listPuntosM;

        if (arrayClientes.length !== 0) {
            // filtrado por clientes
            data_filter_Servicios = data_filter_Servicios.filter(item => {
                let bool = false;
                arrayClientes.forEach(element => {
                    let cliente = listClientes.find(aux => aux.id === element.value)
                    cliente.servicioID.forEach(index => {
                        if (item.id === index) {
                            bool = true;
                        }
                    })
                });
                return bool;
            })
            data_to_show_Servicios = data_filter_Servicios;
        }
        if (arrayServicios.length !== 0) {
            // filtrado por servicio si se selecciono un filtro de servicio
            data_filter_Servicios = data_filter_Servicios.filter(item => {
                let bool = false;
                arrayServicios.forEach(element => {
                    if (item.id === element.value) {
                        bool = true;
                    }
                });
                return bool;
            })
        }

        // si se filtran los servicios tambien se filtran los sectores que esten en esos servicios.
        let array = [];
        let arrayP = [];
        data_filter_Servicios.map(item => {
            item.sectorID.forEach(element => {
                let aux = data_filter_Sectores.find(index => index.id === element)
                if (!array.some(item => item.id === (aux).id))
                    array.push(aux);
            })
            item.puntoID.forEach(element => {
                let aux = data_filter_PuntosM.find(index => index.id === element)
                if (!arrayP.some(item => item.id === (aux).id)) {
                    arrayP.push(aux);

                }
            })
        })
        data_filter_Sectores = array.concat(arrayP);
        data_to_show_Sectores = array;

        if (arraySistemas.length !== 0) {
            // filtrado por sectores si se selecciono un filtro de sector
            data_filter_Sectores = data_filter_Sectores.filter(item => {
                let bool = false;
                arraySistemas.forEach(element => {
                    if (item.id === element.value) {
                        bool = true;
                    }
                });
                return bool;
            })
        }

        if (arrayTiposSistemas.length !== 0) {

            // filtrado por tipos si se selecciono un filtro de tipo
            data_filter_Sectores = data_filter_Sectores.filter(item => {
                let bool = false;
                arrayTiposSistemas.forEach(element => {
                    if (String(item.id).startsWith(element.value) || (!isNaN(parseInt(item.id)) && element.value === '#')) {
                        bool = true;
                    }
                });
                return bool;
            })
            data_to_show_Sectores = data_filter_Sectores;
        }

        // filtro de puntos en dependencia de los sectores que queden si no hay filtro por medida
        let arrayPuntos = [];
        data_filter_Sectores.map(item => {
            if (item.tipo === 'sector') {
                item.puntoID.forEach(element => {
                    let aux = data_filter_PuntosM.find(index => index.id === element);
                    // console.log(aux.id);
                    if (!arrayPuntos.some(item => item.id === (aux).id))
                        arrayPuntos.push(aux);
                })
            }
            else {
                arrayPuntos.push(item);
            }
        })

        data_filter_PuntosM = arrayPuntos;

        if (arrayMedidas.length !== 0) {
            let arraySector = [];
            let arrayServicio = [];
            let arrayP = [];
            arrayMedidas.forEach(medidaSelected => {
                listMedidas.forEach(medidas => {
                    if (medidas.id === medidaSelected.value) {
                        medidas.puntos.forEach(punto => {
                            let p = data_filter_PuntosM.find(p => p.id === punto)
                            if (p) {
                                arrayP.push(p);
                                if (p.sectorID) {
                                    p.sectorID.forEach(item => {
                                        let s = data_filter_Sectores.find(element => element.id === item)
                                        if (!arraySector.some(aux => aux.id === s.id))
                                            arraySector.push(s)
                                        s.servicioID.forEach(aux => {
                                            let s = data_filter_Servicios.find(element => element.id === aux)
                                            if (!arrayServicio.some(aux => aux.id === s.id))
                                                arrayServicio.push(s)
                                        })
                                    })
                                }
                                if (p.servicioID) {
                                    p.servicioID.forEach(item => {
                                        let s = data_filter_Servicios.find(element => element.id === item)
                                        if (!arrayServicio.some(aux => aux.id === s.id))
                                            arrayServicio.push(s)
                                        if (!arraySector.some(aux => aux.id === p.id))
                                            arraySector.push(p)
                                    })
                                }
                            }
                        });
                    }
                })
            })
            data_filter_PuntosM = arrayP;
            data_filter_Sectores = arraySector;
            data_filter_Servicios = arrayServicio;
            data_to_show_Sectores = data_filter_Sectores;
        }



        if ((arrayServicios.length === 0 && arraySistemas.length !== 0 && arrayMedidas.length === 0) || (arrayServicios.length === 0 && arrayTiposSistemas.length !== 0 && arrayMedidas.length === 0)) {
            // filtrado por servicio si se selecciono un filtro de servicio
            data_filter_Servicios = data_filter_Servicios.filter(item => {
                let bool = false;
                item.sectorID.forEach(element => {
                    if (data_filter_Sectores.find(index => index.id === element)) {
                        bool = true;
                    }
                });
                return bool;
            })
        }


        return {
            data_to_show_Clientes,
            data_to_show_Servicios,
            data_to_show_Sectores,
            data_to_show_PuntosM,
            data_filter_Clientes,
            data_filter_Servicios,
            data_filter_Sectores,
            data_filter_PuntosM
        };
    }
    // Filtro

    // Muestra alarma en el boton flotante si hay filtros puestos
    let flotanteAlarm = false;
    if (arrayServicios.length !== 0 || arrayClientes.length !== 0 || arrayTiposSistemas.length !== 0 || arraySistemas.length !== 0) {
        flotanteAlarm = true;
    }
    // Muestra alarma en el boton flotante si hay filtros puestos

    const {
        data_to_show_Clientes,
        data_to_show_Servicios,
        data_to_show_Sectores,
        data_to_show_PuntosM,
        data_filter_Clientes,
        data_filter_Servicios,
        data_filter_Sectores,
        data_filter_PuntosM
    } = filtrar();

    let medidas_to_show = listMedidas;
    if (arrayMedidas.length === 0) {
        medidas_to_show = llenarMedidas(listMedidas, data_filter_PuntosM);

    }
    let data_to_show_tiposSistemas = listTiposSistemas;
    if (arrayTiposSistemas.length === 0) {
        data_to_show_tiposSistemas = llenarTipos(data_filter_Servicios);
    }

    let markers = '';
    let listAll = data_filter_PuntosM;
    markers = FormatMarkers(listAll);

    return (
        <>
            <Flotante
                posicion="rightTop"
                flotanteAlarm={flotanteAlarm}
                color="primary"
                filtro_visible={filtro_visible}
                changeFiltro_visible={changeFiltro_visible}

            />

            <FiltroFlotante
                setArrayClientes={handleArray}
                setArrayServicios={handleArray}
                setArrayTiposSistemas={handleArray}
                setArraySistemas={handleArray}
                setArrayMedidas={handleArray}
                // setArraySectores={handleArray}
                arrayServicios={arrayServicios}
                arraySistemas={arraySistemas}
                arrayTiposSistemas={arrayTiposSistemas}
                arrayMedidas={arrayMedidas}
                arrayClientes={arrayClientes}
                filtro_visible={filtro_visible}
                listServicios={data_to_show_Servicios}
                listSectores={data_to_show_Sectores}
                listPuntosM={data_to_show_PuntosM}
                listTiposSistemas={data_to_show_tiposSistemas}
                listClientes={data_to_show_Clientes}
                listMedidas={medidas_to_show}
            />

            {
                markers.length !== 0 && current_point && (
                    <ShowModal boolModal={boolModal} setBoolModal={setBoolModal} current_point={current_point} markers={markers} changeCurrentPoint={changeCurrentPoint} sectores={data_filter_Sectores} puntos={data_filter_PuntosM} />
                )
            }



            {
                markers.length !== 0 ? (
                    <Map
                        changeCurrentPoint={changeCurrentPoint}
                        filtroBool={filtroBool}
                        current_point={current_point}
                        markers={markers}
                        setZoom={changeZoom}
                        zoom={zoom}
                    />
                )
                    : <Loader />
            }
        </>
    )
}

export default Mapa
