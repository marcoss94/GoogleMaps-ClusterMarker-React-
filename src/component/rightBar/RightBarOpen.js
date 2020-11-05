import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import "../../css/RightBar/RightBarOpen.css";
import AutoCompleteSearch from "../searchBox/AutoCompleteSearch";
import { RightBarData } from "./RightBarData";
import RightBarDropdown from "./RightBarDropdown";

function RightBarOpen() {
  const listPuntosM = useSelector((store) => store.listado.puntosList);
  const router = useLocation();
  let active = "";

  return (
    <div className="rightBarOpen-container">
      <div className="rightBarOpen-header">
        <div className="rightBarOpen-title">
          <h3>.</h3>
        </div>
        <div className="rightBarOpen-search">
          <AutoCompleteSearch rightBar={true} listAll={listPuntosM} />
        </div>
      </div>
      <div className="rightBarOpen-body">
        <div className="rightBarOpen-rutas">
          {RightBarData.map((item, i) => {
            if (item.type === "link") {
              if (router.pathname === item.path) active = "active";
              else active = "";
              return (
                <Link key={i} className={`buttonBig ${active}`} to={item.path}>
                  {item.icon}
                  <p>{item.title}</p>
                </Link>
              );
            }
          })}
        </div>
        <div className="rightBarOpen-filtros">
          {RightBarData.map((item, i) => {
            if (item.type === "dropDown") {
              return (
                <div key={i} className={`rightBarOpen-filtro-item`}>
                  <RightBarDropdown {...item} />
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}

export default RightBarOpen;
