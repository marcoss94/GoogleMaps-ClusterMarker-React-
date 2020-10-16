import React, { useState } from 'react';
import servicioIcon from "../../icons/Servicios.svg";
import sectorIcon from "../../icons/Sector6.svg";
import puntoIcon from "../../icons/Tanque.svg";
import saneamientoIcon from "../../icons/Saneamiento.svg";
import bombaIcon from "../../icons/bomba.svg";
import perforacionAutoIcon from "../../icons/PerforacionAuto.svg";
import puntoMedioIcon from "../../icons/Punto_medio.svg";
import reguladora from "../../icons/Reguladora.svg";

import * as FaIcons from "react-icons/fa";


function AutoCompleteSearch(props) {
    const { listAll } = props;
    const [suggestions, setSuggestions] = useState([]);

    const [text, setText] = useState('');
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState([]);


    const defineIcons = ({ tipo }) => {
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


    const onTextChange = (e) => {
        const value = e.target.value;
        let suggestions = [];
        if (value.length > 0) {
            const regex = new RegExp(`^${value}`, 'i');
            suggestions = listAll.sort().filter(v => regex.test(v.nombre))
        }
        setSuggestions(suggestions);
        setVisible(true)
        setText(value);
    }

    const suggestionSelected = (item) => {
        setText(item.nombre);
        setSelected(item)
        setSuggestions([]);

    }

    const onClose = () => {
        setText('');
        setSelected('')
        setVisible(false)
        setSuggestions([]);

    }

    const visibleSuggestions = () => {
        setVisible(true)

    }

    const setVisibleSuggestions = () => {
        setVisible(false)

    }

    const renderSuggestions = () => {
        if (suggestions.length === 0) {
            return null;
        }

        var htmlRender = [];
        var servicio = suggestions.filter(item => item.tipo === 'servicio')
        var sector = suggestions.filter(item => item.tipo === 'sector')
        var punto = suggestions.filter(item => item.tipo !== 'servicio' && item.tipo !== 'sector')


        if (servicio.length !== 0) {
            htmlRender.push(
                <div className='autoComplete__category'>
                    <p>Servicios</p>
                </div>
            )
            servicio.map(item => {
                htmlRender.push(
                    <li className='autoComplete__items' key={item.id} onClick={() => suggestionSelected(item)}>
                        <div className='autoComplete__element'>
                            <p>{item.nombre}</p>
                            <img id="autoComplete__icono" alt="icono" src={defineIcons(item)} />
                        </div>
                    </li>
                )
            })
        }
        if (sector.length !== 0) {
            htmlRender.push(
                <div className='autoComplete__category'>
                    <p>Sector</p>
                </div>
            )
            sector.map(item => {
                htmlRender.push(
                    <li className='autoComplete__items' key={item.id} onClick={() => suggestionSelected(item)}>
                        <div className='autoComplete__element'>
                            <p>{item.nombre}</p>
                            <img id="autoComplete__icono" alt="icono" src={defineIcons(item)} />
                        </div>
                    </li>
                )
            })
        }
        if (punto.length !== 0) {
            htmlRender.push(
                <div className='autoComplete__category'>
                    <p>Puntos</p>
                </div>
            )
            punto.map(item => {
                htmlRender.push(
                    <li className='autoComplete__items' key={item.id} onClick={() => suggestionSelected(item)}>
                        <div className='autoComplete__element'>
                            <p>{item.nombre}</p>
                            <img id="autoComplete__icono" alt="icono" src={defineIcons(item)} />
                        </div>
                    </li>
                )
            })
        }


        return htmlRender;

    }

    window.addEventListener('click', function (e) {
        if (document.getElementById('autoComplete').contains(e.target)) {
            console.log('asd')
        } else {
            // Clicked outside the box
            setVisibleSuggestions();
        }
    });

    return (
        <React.Fragment>
            <div className="autoComplete" id='autoComplete'>
                <div className="autoComplete__container">
                    <input value={text} onChange={onTextChange} onClick={visibleSuggestions}
                        className='autoComplete__searchInput' type='text'
                    />
                    {text && (
                        <FaIcons.FaTimes className='autoComplete__clearIcon' onClick={onClose} style={{ color: "#f44336" }} />
                    )}
                    <FaIcons.FaSearch className='autoComplete__searchIcon' style={{ color: "#1B77C2" }} />
                </div>

                <div className={`autoComplete__suggestions ${visible ? 'visible' : ''}`}>
                    <ul>
                        {renderSuggestions()}
                    </ul>
                    {suggestions.length > 0 && (
                        <div className='autoComplete__result'>
                            <p>{suggestions.length} resultados</p>
                        </div>

                    )}
                </div>
            </div>
        </React.Fragment>
    )
}

export default AutoCompleteSearch
