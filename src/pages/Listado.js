import React, { useState } from 'react'
import { useSelector } from "react-redux";
import classnames from "classnames";
import { listColumnas } from "../columnas"
import ListTabla from '../component/ListTabla';
import '../css/Listado.css'
import '../css/Paginacion.css'

function Listado() {

    const puntosList = useSelector(store => store.listado.puntosList)
    const [columnas, setColumnas] = useState(listColumnas)
    const [max_x_page, setMax_x_page] = useState(10)
    const [current_page, setCurrent_page] = useState(1)

    function handleSelect(index) {
        let newCol = columnas
        newCol[index].ver = !newCol[index].ver
        setColumnas(newCol)
    }

    // paginado
    function next() {
        const total_pages = Math.ceil(puntosList.length / max_x_page);

        if (current_page >= total_pages) {
            return null;
        }
        setCurrent_page(current_page + 1)
    }

    function back() {
        if (current_page <= 1) {
            return null;
        }
        setCurrent_page(current_page - 1)
    }

    const handlePageChange = e => {
        var valor = parseInt(e.target.value);

        const total_pages = Math.ceil(puntosList.length / max_x_page);
        if (valor < 1) {
            valor = 1;
        }
        if (valor > total_pages) {
            valor = total_pages;
        }

        if (!valor) {
            valor = 1;
        }
        setCurrent_page(valor)
    };

    function selectAll(bool) {
        let newCol = columnas
        newCol = newCol.map(col => {
            let column = col
            if (bool) {
                column.ver = false
            }
            else column.ver = true

            return column
        })
        setColumnas(newCol)
    }

    const total_pages = Math.ceil(puntosList.length / max_x_page);
    const data_to_show = puntosList.slice(
        max_x_page * (current_page - 1),
        max_x_page * current_page
    );

    return (



            <div className="container_ListadoList">
                <div className="table_list">
                    <table>
                        <thead>
                            <tr>
                                {
                                    columnas.map(col => {
                                        if (col.ver) {
                                            return (
                                                <th
                                                    className={col.className}
                                                    onClick={() => {
                                                        // this.tableChangeOrder(col.orden);
                                                    }}
                                                >
                                                    {col.title}{' '}
                                                    <i
                                                    // className={classnames("fas", {
                                                    //     "fa-sort-up":
                                                    //         sort.col == col.orden && sort.type == "ASC",
                                                    //     "fa-sort-down":
                                                    //         sort.col == col.orden && sort.type == "DESC"
                                                    // })}
                                                    ></i>
                                                </th>
                                            )
                                        }
                                    })
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {data_to_show.map((item, i) => {
                                return (
                                    <tr
                                        key={i}
                                    // onClick={this.handleSelect.bind(this, item.index)}
                                    // className={classnames({
                                    //     selected: selection.indexOf(item.index) !== -1
                                    // })}
                                    >
                                        {/* <td>{item["datetime"]}</td> */}
                                        <ListTabla
                                            // key={i}
                                            columnas={columnas}
                                            item={item}

                                        ></ListTabla>
                                    </tr>
                                );
                            })}
                            {data_to_show.length === 0 && (
                                <tr>
                                    <td colSpan={11}>
                                        {/* Cuando esta en listado la tabla no tienen las columnas de fecha y persona que lo elimino. */}
                        No se encontraron datos
                      </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>


                {total_pages > 1 && (
                    <div className="pag">
                        <button
                            onClick={back}
                            className={classnames("btn-main small", {
                                disabled: current_page <= 1,
                                grey: current_page <= 1
                            })}
                        >
                            {" "}
                            <i className="fas fa-angle-double-left"></i> Atrás
                </button>

                        <div className="page_number">
                            Pág.{" "}
                            <input
                                type="number"
                                value={current_page}
                                onChange={handlePageChange}
                            />{" "}
                  de {total_pages}
                        </div>
                        <button
                            onClick={next}
                            className={classnames("btn-main small", {
                                disabled: current_page >= total_pages,
                                grey: current_page >= total_pages
                            })}
                        >
                            {" "}
                            <i className="fas fa-angle-double-right"></i> Adelante
                </button>
                    </div>
                )}
            </div>
    )
}

export default Listado
