import React, { Component } from "react";
import "../css/map.css";
import MarkerClusterer from "@google/markerclustererplus";
import createHTMLMapMarker from "../funtions/HTMLMapMaker";
import clusterRojo from "../images/clusterRojo.png";
import clusterAzul from "../images/clusterAzul.png";
import clusterAmarillo from "../images/clusterAmarillo.png";

import _ from "lodash";
import DefineIcon from "./DefineIcon";

export class Map extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selecting: false,
            filtro_map: false
        };

        this.map = null;
        this.bounds = null;
        this.showPoint = this.showPoint.bind(this);
        this.toggle = this.toggle.bind(this);
        this.restablecer = this.restablecer.bind(this);
        this.marcadores = null;
        this.idMarcadores = null;
        this.markerCluster = null;
        this.clusterStyles = null;
        this.oms = null;


    }

    // cuando inicia el componente agrego los puntos al mapa
    componentDidMount() {
        if (this.props.markers) {
            this.showMap();
        }

        if (this.props.current_point != null) {
            this.showPoint();
        }

    }

    // cuando el componente se actualiza, dependiendo de si cambia el
    // sector o el punto actual que se esta viendo
    // inicio una funcion u otra

    sort_markers(a, b) {
        if (a.id > b.id) {
            return 1;
        }
        if (a.id < b.id) {
            return -1;
        }
        return 0;
    }

    getPoint(event) {
        if (this.state.selecting && this.props.getPosition) {
            this.props.getPosition({
                lat: event.latLng.lat(),
                lng: event.latLng.lng()
            });
        }
    }

    componentDidUpdate(prevProps) {
        var prevSort = prevProps.markers.sort(this.sort_markers);
        var actualSort = this.props.markers.sort(this.sort_markers);

        // this.map.setZoom(this.props.zoom)

        // si los puntos cambiaron recargo los puntos
        if (!_.isEqual(actualSort, prevSort) && this.props.markers) {
            this.updateMarkers();
        }

        // si cambia el punto, centro el mapa en el mismo
        if (
            this.props.current_point != null &&
            this.props.current_point !== prevProps.current_point
        ) {
            this.showPoint();
        }
    }

    showPoint() {
        // detengo la reproduccion si esta activa
        // tomo los datos de los equipos y del punto que quiero centrar
        const { markers, current_point } = this.props;

        var marker_data = markers.find(item => item.id === current_point);

        if (!marker_data) {
            this.props.changeCurrentPoint(null);
            return null;
        }

        const { lat, lng, info_text } = marker_data;

        if (this.infowindow) {
            this.infowindow.close();
        }

        this.map.panTo({ lat, lng });
        //vuelvo a dejar nulo el punto actual cuando cierro el cuadro para
        // poder volver a seleccionar el mismo 2 veces seguidas
    }

    showPointHover(id) {
        // detengo la reproduccion si esta activa
        // tomo los datos de los equipos y del punto que quiero centrar
        const { markers, current_point } = this.props;

        var marker_data = markers.find(item => item.id === id);

        if (!marker_data) {
            return null;
        }

        const { lat, lng, info_text } = marker_data;

        // creo el cuadro con los datos del punto (InfoWindows)
        var contentString = `<div class='google_cuadro'>
            ${info_text}
            <a target="_blank" href="https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}">Ver ruta<a/>
        </div>`;

        if (this.infowindow) {
            this.infowindow.close();
        }

        this.infowindow = new window.google.maps.InfoWindow({
            content: contentString
        });
        // inicio el cuadro, centrando en el marcador correspondiente
        // al id del punto en el que clickee
        this.infowindow.open(
            this.map,
            this.marcadores[this.idMarcadores.indexOf(id)]
        );
        this.props.changeCurrentPoint(null);
        //vuelvo a dejar nulo el punto actual cuando cierro el cuadro para
        // poder volver a seleccionar el mismo 2 veces seguidas
    }

    componentWillUnmount() {
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
    }

    // se crea la instancia del mapa los estilos y el markerCluster
    createMapInstance() {
        this.map = new window.google.maps.Map(
            document.getElementById("map-container"),
            {
                center: { lat: -32.522779, lng: -55.765835 },
                zoom: 7,
                maxZoom: 18,
                disableDefaultUI: true,
                zoomControl: true,
                mapTypeControl: false,
                streetViewControl: true,
            }
        );

        // listado de estilos para los clusters
        this.clusterStyles = [
            {
                textColor: 'white',
                url: clusterAzul,
                height: 50,
                width: 50,
                textSize: 15,
                fontFamily: 'Source Sans Pro, Arial, sans-serif',
                anchorText: [15]
            },
            {
                textColor: 'white',
                url: clusterAmarillo,
                height: 50,
                width: 50,
                textSize: 15,
                fontFamily: 'Source Sans Pro, Arial, sans-serif',
                anchorText: [15]
            },
            {
                textColor: 'white',
                url: clusterRojo,
                height: 50,
                width: 50,
                textSize: 15,
                fontFamily: 'Source Sans Pro, Arial, sans-serif',
                anchorText: [15]
            }

        ];

        // Opciones del MarkerCluster
        var mcOptions = {
            gridSize: 40,
            minimumClusterSize: 2,
            styles: this.clusterStyles,
            maxZoom: 12,
            imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
        };

        this.markerCluster = new MarkerClusterer(
            this.map,
            [],
            mcOptions
        );

        // listener para poner punto en el mapa
        window.google.maps.event.addListener(
            this.map,
            "click",
            this.getPoint.bind(this)
        );


        // evento que captura el zoom y lo manda al app

        this.map.addListener("zoom_changed", () => {
            this.props.setZoom(this.map.zoom);
        });

    }

    showMap() {
        if (!window.google) {
            this.timeout = setTimeout(() => {
                this.showMap();
            }, 100);
            return null;
        }

        // inicializo el mapa en el div de render()
        if (!this.map) {
            this.createMapInstance();
        }

        // marcadores
        if (!this.marcadores) {
            this.addMarkers();
        } else {
            this.updateMarkers();
        }
    }

    addMarkers() {
        this.marcadores = [];
        this.idMarcadores = [];
        // this.markerCluster.onRemove();
        const { markers } = this.props;

        // inicio el centrado para agregarle los puntos del sector
        this.bounds = new window.google.maps.LatLngBounds();

        if (markers.length > 0) {
            markers.forEach((marker, index) => {
                const { lat, id, lng, error, falla, nombre } = marker;


                // DefineIcon devuelve en un HTML el codigo para cambiar el icono de cada punto con clases

                var puntoHtml = DefineIcon(marker);


                var loc = new window.google.maps.LatLng({
                    lat,
                    lng
                });

                // createHTMLMapMarker es la funcion que crea cada punto con su codigo HTML.
                let markerDiv = createHTMLMapMarker({
                    error,
                    falla,
                    nombre,
                    position: loc,
                    map: this.map,
                    html: puntoHtml,
                });

                this.marcadores.push(
                    markerDiv
                );

                this.idMarcadores.push(id);

                // centro el mapa de acuerdo a los puntos

                this.bounds.extend(loc);

                // agrego el listenerCount, al clickear activo la function
                //centrando el mapa en el punto en el que clickeo
                this.marcadores[index].addListener("mouseover", () => {
                    // this.props.changeCurrentPoint(id);
                    this.showPointHover(id);
                    console.log(id);

                });

                this.marcadores[index].addListener("mouseout", () => {
                    if (this.infowindow) {
                        this.infowindow.close();
                    }
                });

                this.marcadores[index].addListener("click", () => {
                    this.props.changeCurrentPoint(id);

                });

            });

            // cambio el zoom y el punto central del mapa
            this.map.panToBounds(this.bounds);

            if (this.marcadores.length === 1) {
                this.map.setCenter(this.bounds.getCenter());
                // this.map.setZoom(this.props.zoom)
                // this.map.fitBounds(this.bounds);

                if (!this.state.selecting) {
                    // this.map.setZoom(13);
                }
            } else {
                if (this.props.filtroBool) {
                    this.map.setCenter(this.bounds.getCenter());
                    // this.map.panToBounds(this.bounds);
                    this.map.fitBounds(this.bounds);
                }
                // this.map.setZoom(8)
                // this.map.setZoom(this.props.zoom)
                // this.props.setZoom(this.map.zoom);
            }
        }

        // Se actualiza el cluster y se agregan los marker

        this.markerCluster.clearMarkers();
        this.markerCluster.addMarkers(this.marcadores);

        // Se actualiza los estilos de cada cluster segun las fallas y los errores
        this.markerCluster.setCalculator(this.calculator);

        this.markerCluster.repaint()
    }

    // Redefinicion del metodo calculator. 
    // El metodo calculator de la api calcula segun la cantidad de marker en cada 
    // cluster y devuelve en index (+ 1) la posicion del arreglo de estilos que le toca.
    // En la redifinicion se buscan los marker que tengan errores p fallas y devuelve en index el estilo.

    calculator = (markers) => {

        var itemStyle = 1;
        for (let index = 0; index < markers.length - 1; index++) {
            const { error, falla } = markers[index];
            if (error !== "0") {
                itemStyle = 3;
                break;
            } else if (falla !== "0") {
                itemStyle = 2;
            }

        }

        return {
            text: markers.length.toString(),
            index: itemStyle,
            title: ""
        };

    }

    updateMarkers() {
        // elimino los marcadores
        // inicio el centrado para agregarle los puntos del sector
        console.log("update")
        if (this.marcadores) {
            for (var indice = 0; indice < this.marcadores.length; indice++) {
                this.marcadores[indice].setMap(null);
            }
        }
        this.addMarkers();
    }

    restablecer() {
        // this.map.fitBounds(this.bounds);
        // this.map.panToBounds(this.bounds);

        this.map.setZoom(7)
        this.props.setZoom(this.map.zoom);
        this.map.setCenter({ lat: -32.522779, lng: -55.765835 })


        if (this.infowindow) {
            this.infowindow.close();
            this.infowindow = null;
        }

        if (this.props.current_point !== null) {
            this.props.changeCurrentPoint(null);
        }
    }

    toggle(variable) {
        this.setState({ [variable]: !this.state[variable] });
    }
    filtroChange() {
        this.setState({ filtro_map: !this.state.filtro_map });
    }

    render() {
        const { selecting, filtro_map } = this.state;

        return (
            <React.Fragment>
                <div className="map-wrapper">
                    <div id="map-container" />
                    <div className="button-container">
                        <div className="btn-main " onClick={this.restablecer}>
                            <i className="fas fa-map-marker-alt pre_icon"></i> Centrar
                        </div>

                        {this.props.getPosition && (
                            <div
                                className={`btn-main ${selecting ? "" : ""}`}
                                onClick={() => {
                                    this.toggle("selecting");
                                }}
                            >
                                <i
                                    className={`fas ${selecting ? "fa-times" : "fa-hand-pointer"
                                        } pre_icon`}
                                ></i>{" "}
                                {selecting ? "Dejar de seleccionar" : "Seleccionar punto"}
                            </div>
                        )}

                    </div>




                </div>
            </React.Fragment>
        );
    }
}

export default Map;
