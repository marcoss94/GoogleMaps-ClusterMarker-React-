import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../css/DropDown.css";

function DropDown({
  cNameDropDown,
  iconDropDownUp,
  iconDropDownDown,
  title,
  icon,
  showSidebar,
}) {
  const [drop, setDrop] = useState(false);
  const handleDropDown = () => {
    setDrop(!drop);
    console.log("DropDown");
  };

  return (
    <>
      <div
        className={`${cNameDropDown} ${drop ? "active" : "deactive"}`}
        onClick={handleDropDown}
      >
        <div>
          {icon}
          <span>{title}</span>
        </div>
        <div className="iconDropDown">
          {/* {drop ? iconDropDownUp : iconDropDownDown} */}
          {iconDropDownDown}
        </div>
      </div>

      <div className={`dropDown-items ${drop ? "active" : ""}`}>
        <ul className="ul-items" onClick={showSidebar}>
          <li className="dropDown-item">
            <Link to="/listSistemas" id="dropDown-link">
              <span>Todos</span>
            </Link>
          </li>
          <li className="dropDown-item">
            <span>Tipo1</span>
          </li>
          <li className="dropDown-item">
            <span>Tipo2</span>
          </li>
          <li className="dropDown-item">
            <span>Tipo3</span>
          </li>
        </ul>
      </div>

      {/* <li class="sidebar-dropdown">
        <a href="#">
          <i class="fa fa-tachometer-alt"></i>
          <span>Dashboard</span>
          <span class="badge badge-pill badge-warning">New</span>
        </a>
        <div class="sidebar-submenu">
          <ul>
            <li>
              <a href="#">
                Dashboard 1
                <span class="badge badge-pill badge-success">Pro</span>
              </a>
            </li>
            <li>
              <a href="#">Dashboard 2</a>
            </li>
            <li>
              <a href="#">Dashboard 3</a>
            </li>
          </ul>
        </div>
      </li> */}
    </>
  );
}

export default DropDown;
