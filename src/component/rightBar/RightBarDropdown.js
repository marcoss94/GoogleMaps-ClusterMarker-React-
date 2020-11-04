import React, { useState } from "react";
import "../../css/RightBar/RightBarDropdown.css";

function RightBarDropdown({ icon, title, iconDropDownDown }) {
  const [drop, setDrop] = useState(false);
  const handleDropDown = () => {
    setDrop(!drop);
    console.log("DropDown");
  };

  return (
    <>
      <div
        className={`rightBarDropdown ${drop ? "active" : "deactive"}`}
        onClick={handleDropDown}
      >
        <div className="titleDropDown">
          <div className="buttonSmall">{icon}</div>
          <p>{title}</p>
        </div>
        <div className="iconDropDown">
          {/* {drop ? iconDropDownUp : iconDropDownDown} */}
          {iconDropDownDown}
        </div>
      </div>

      <div>
        <div className={`dropDown-items ${drop ? "active" : ""}`}>
          <ul className="ul-items">
            <li className="dropDown-item">
              <span>asd</span>
            </li>
            <li className="dropDown-item">
              <span>asd</span>
            </li>
            <li className="dropDown-item">
              <span>asd</span>
            </li>
            <li className="dropDown-item">
              <span>asd</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default RightBarDropdown;
