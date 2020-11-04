import React from "react";

function ButtonSmall({ icon, handleToggle }) {
  return (
    <div onClick={handleToggle} className="buttonSmall">
      {icon}
    </div>
  );
}

export default ButtonSmall;
