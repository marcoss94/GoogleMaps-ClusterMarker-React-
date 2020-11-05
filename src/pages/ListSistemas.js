import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import RowSistemas from "../component/listSistemas/RowSistemas";
import TarjetaShow from "../component/tarjeta/TarjetaShow";
import classnames from "classnames";
import "../css/ListSistemas/ListSistemas.css";
import * as FaIcons from "react-icons/fa";

function ListSistemas() {
  const sectoresList = useSelector((store) => store.listado.sectoresList);

  const [max_x_page, setMax_x_page] = useState(10);
  const [current_page, setCurrent_page] = useState(1);

  // paginado
  function next() {
    const total_pages = Math.ceil(sectoresList.length / max_x_page);

    if (current_page >= total_pages) {
      return null;
    }
    setCurrent_page(current_page + 1);
  }

  function back() {
    if (current_page <= 1) {
      return null;
    }
    setCurrent_page(current_page - 1);
  }

  const handlePageChange = (e) => {
    var valor = parseInt(e.target.value);

    const total_pages = Math.ceil(sectoresList.length / max_x_page);
    if (valor < 1) {
      valor = 1;
    }
    if (valor > total_pages) {
      valor = total_pages;
    }

    if (!valor) {
      valor = 1;
    }
    setCurrent_page(valor);
  };

  const total_pages = Math.ceil(sectoresList.length / max_x_page);
  const data_to_show = sectoresList.slice(
    max_x_page * (current_page - 1),
    max_x_page * current_page
  );

  return (
    <div className=" container_listSistemas">
      <div className="container_list">
        <div className="container_fondo">
          <div className="tableSistemas">
            <div className="head">
              <div className="head_tittle">
                <p>Sistema</p>
              </div>
              <div className="head_tittle">
                <p>Ubicación</p>
              </div>
              <div className="head_tittle">
                <p>Mapa</p>
              </div>
            </div>
            <div className="body">
              {data_to_show.map((item, index) => {
                return <RowSistemas key={index} {...item} />;
              })}
            </div>
          </div>

          {total_pages > 1 && (
            <div className="pag">
              <button
                onClick={back}
                className={classnames("buttonSmall", {
                  disabled: current_page <= 1,
                  grey: current_page <= 1,
                })}
              >
                {" "}
                <FaIcons.FaArrowLeft />
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
                className={classnames("buttonSmall", {
                  disabled: current_page >= total_pages,
                  grey: current_page >= total_pages,
                })}
              >
                {" "}
                <FaIcons.FaArrowRight />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ListSistemas;
