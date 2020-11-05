import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as BsIcons from "react-icons/bs";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "../../css/NavBar.css";
import { IconContext } from "react-icons";
import AutoCompleteSearch from "../searchBox/AutoCompleteSearch";
import DropDown from "./DropDown";

export default function NavBar(props) {
  const { listAll } = props;

  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navBar">
          <div className="menu-left">
            <div className="icon-animation">
              <input type="checkbox" id="check-menu" checked={sidebar} />
              <label htmlFor="check-menu" onClick={showSidebar}>
                <div className="icono-menu">
                  <div className="barra-menu"></div>
                  <div className="barra-menu"></div>
                  <div className="barra-menu"></div>
                </div>
              </label>
            </div>

            <div id="autoNavbar">
              <AutoCompleteSearch listAll={listAll} />
            </div>
          </div>

          <div className="navBar-modos">
            <div className="modos-item">
              <AiIcons.AiOutlineUser />
            </div>
          </div>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items">
            <li className="navBar-toggle" onClick={showSidebar}>
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>

            <li className="nav-item" id="autoSidebar">
              <AutoCompleteSearch listAll={listAll} />
            </li>

            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  {item.type === "dropDown" ? (
                    <DropDown {...item} showSidebar={showSidebar} />
                  ) : (
                    <Link to={item.path} onClick={showSidebar}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}
