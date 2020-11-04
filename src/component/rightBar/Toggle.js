import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as BsIcons from "react-icons/bs";
import React, { useState } from "react";
import * as RiIcons from "react-icons/ri";

export const ToggleButton = ({ handleToggle, toggle }) => {
  return (
    <>
      <div
        className={`toggle-button ${toggle ? "active" : ""}`}
        onClick={handleToggle}
      >
        <div className="toggle-icon">
          {/* {drop ? iconDropDownUp : iconDropDownDown} */}
          <RiIcons.RiArrowLeftSLine />
        </div>
      </div>
    </>
  );
};
