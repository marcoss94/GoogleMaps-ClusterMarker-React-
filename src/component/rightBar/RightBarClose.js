import React from "react";
import { RightBarData } from "./RightBarData";
import { Link, useLocation } from "react-router-dom";
import ButtonSmall from "./ButtonSmall";
import "../../css/RightBar/RightBarClose.css";

function RightBarClose({ handleToggle }) {
  const router = useLocation();
  let active = "";

  return (
    <>
      <div className="rightBarClose-container">
        {RightBarData.map((item, i) => {
          if (item.type === "link") {
            if (router.pathname === item.path) active = "active";
            else active = "";
            return (
              <Link className={`buttonSmall ${active}`} to={item.path}>
                {item.icon}
              </Link>
            );
          } else
            return (
              <ButtonSmall key={i} {...item} handleToggle={handleToggle} />
            );
        })}
      </div>
    </>
  );
}

export default RightBarClose;
