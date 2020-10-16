import React, { useState } from 'react'
import Select from 'react-select'

export default function FiltroFlotante(props) {
    var {
        filtro_visible,
        setArrayClientes,
        setArrayServicios,
        setArrayTiposSistemas,
        setArraySistemas,
        setArrayMedidas,
        listServicios,
        listSectores,
        listTiposSistemas,
        listClientes,
        listMedidas,
        arrayServicios,
        arraySistemas,
        arrayTiposSistemas,
        arrayMedidas,
        arrayClientes

    } = props;

    const listadoClientes = [];
    if (listClientes !== undefined) {
        listClientes.map(item => {
            listadoClientes.push({ value: item.id, label: item.nombre })
        })
    }
    const listadoServicios = [];
    if (listServicios !== undefined) {
        listServicios.map(item => {
            listadoServicios.push({ value: item.id, label: item.nombre })
        })
    }
    const listadoSectores = [];
    if (listSectores !== undefined) {
        listSectores.map(item => {
            listadoSectores.push({ value: item.id, label: item.nombre })
        })
    }
    const listadoMedidas = [];
    if (listMedidas !== undefined) {
        listMedidas.map(item => {
            listadoMedidas.push({ value: item.id, label: item.nombre })
        })
    }

    return (
        <div>
            <div className={`filtro-map ${filtro_visible ? 'active' : ''}`}>

                <label>Red</label>
                <Select
                    options={listadoClientes}
                    isMulti={true}
                    value={arrayClientes}

                    onChange={option => setArrayClientes(option, "cliente")}
                    width='10px'
                    placeholder="Seleccione..."
                />

                <label>Servicios</label>
                <Select
                    options={listadoServicios}
                    isMulti
                    value={arrayServicios}
                    onChange={option => setArrayServicios(option, 'servicio')}
                    width='10px'
                    placeholder="Seleccione..."
                />

                <label>Tipos de Sistemas</label>
                <Select
                    options={listTiposSistemas}
                    isMulti={true}
                    value={arrayTiposSistemas}

                    onChange={option => setArrayTiposSistemas(option, "tiposSistema")}
                    width='10px'
                    placeholder="Seleccione..."
                />

                <label>Nombre de Sistemas</label>
                <Select
                    options={listadoSectores}
                    isMulti={true}
                    value={arraySistemas}

                    onChange={option => setArraySistemas(option, "sistema")}
                    width='10px'
                    placeholder="Seleccione..."
                />

                <label>Medidas</label>
                <Select
                    options={listadoMedidas}
                    isMulti={true}
                    value={arrayMedidas}

                    onChange={option => setArrayMedidas(option, "medidas")}
                    width='10px'
                    placeholder="Seleccione..."
                />

            </div>
        </div>
    )
}
