import React from "react";

function RowSistemas({ id, nombre }) {
  return (
    <div
      className="fila"
      // onClick={this.handleSelect.bind(this, item.index)}
      // className={classnames({
      //     selected: selection.indexOf(item.index) !== -1
      // })}
    >
      {/* <td>{item["datetime"]}</td> */}
      <div>
        <p>{id}</p>
      </div>
      <div>
        <p>{nombre}</p>
      </div>
      <div>
        <div className={`buttonSmall`}>
          <p>Ubicar</p>
        </div>
      </div>
    </div>
  );
}

export default RowSistemas;
