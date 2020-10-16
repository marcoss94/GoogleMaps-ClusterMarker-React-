import datos from "../datosAnalizar.json";
import { llenarTipos } from "../funtions/Funtions";
import tablaMedidas from "../medidas.json";

// constanstes
const initialState = {
    clientesList: [],
    serviciosList: [],
    sectoresList: [],
    puntosList: [],
    medidasList: [],
    tiposSistemasList: []
}

// types
const GET_LISTADO = 'GET_LISTADO'


// reducer
export default function listadoReducer(state = initialState, action) {
    switch (action.type) {
        case GET_LISTADO:
            return {
                ...state,
                clientesList: action.payload.clientes,
                serviciosList: action.payload.servicios,
                sectoresList: action.payload.sectores,
                puntosList: action.payload.puntos,
                medidasList: action.payload.medidas,
                tiposSistemasList: action.payload.tiposSistemas
            }

        default:
            return state;
    }
}

// actions
export const getListadoAction = () => (dispatch) => {

    try {
        const { medidas } = tablaMedidas;
        const { clientesList, serviciosList, sectoresList, puntosList } = datos;

        let clientes = clientesList;
        let servicios = serviciosList;
        let sectores = sectoresList;
        let puntos = puntosList;
        let tiposSistemas = [];

        // Organizacion de los Datos
        clientes.map(cliente => {
            cliente.servicioID.map(servicioID => {
                servicios = servicios.map(servicio => {
                    if (servicio.id === servicioID) {
                        var array = servicio.cliente;
                        if (array) {
                            array.push(cliente.id)
                            return { ...servicio, "cliente": array }
                        } else return { ...servicio, "cliente": [cliente.id] }
                    } else return { ...servicio }
                })
            })
        })

        servicios.map(servicio => {
            servicio.sectorID.map(sectorID => {
                sectores = sectores.map(sector => {
                    if (sector.id === sectorID) {
                        var array = sector.servicioID;
                        if (array) {
                            array.push(servicio.id)
                            return { ...sector, "servicioID": array }
                        } else
                            return { ...sector, "servicioID": [servicio.id] }
                    } else return { ...sector }
                })
            })
            servicio.puntoID.map(puntoID => {
                puntos = puntos.map(punto => {
                    if (punto.id === puntoID) {
                        var array = punto.servicioID;
                        if (array) {
                            array.push(servicio.id)
                            return { ...punto, "servicioID": array }
                        } else
                            return { ...punto, "servicioID": [servicio.id] }
                    } else return { ...punto }
                })
            })
        })

        sectores.map(sector => {
            sector.puntoID.map(puntoID => {
                puntos = puntos.map(punto => {
                    if (punto.id === puntoID) {

                        var array = punto.sectorID;
                        if (array) {
                            array.push(sector.id)
                            return { ...punto, "sectorID": array }
                        } else
                            return { ...punto, "sectorID": [sector.id] }

                    } else return { ...punto }
                })
            })
        })

        servicios.map(item => {
            item.puntoID.map(element => {
                var punto = puntos.find(aux => aux.id === element)
                sectores.push(punto)
            })
        })

        // Extrayendo las medidas
        puntos.forEach(item => {
            for (const key in item) {
                medidas.forEach(element => {
                    if (element.medidas.includes(key)) {
                        if (item[key] !== -1)
                            element.puntos.push(item.id);
                    }
                })
            }
        })

        tiposSistemas = llenarTipos(servicios)

        // Organizacion de los Datos 
        dispatch({
            type: GET_LISTADO,
            payload: {
                clientes,
                servicios,
                sectores,
                puntos,
                medidas,
                tiposSistemas
            }
        })
    } catch (error) {
        console.log(error)
    }
}