/** @format */
import React, { Component } from "react";
import classnames from "classnames";

export class ListTabla extends Component {
    listar(item, columnas) {
        let table = [];

        columnas.map(col => {
            let existe = false
            col.variable.forEach(variable => {
                let element = item[variable];
                if (!existe && element) {
                    existe = true
                    if (element !== -1) {
                        if (typeof element === 'number') element = element.toFixed(2)
                        table.push(<td className={col.className}>{element}{" "}{col.unidades}</td>);
                    }
                    else table.push(<td>{" "}</td>);
                }
            });
            if (!existe) table.push(<td>{" "}</td>);
        })

        return table;
    }

    render() {
        const { item, columnas } = this.props;
        return this.listar(item, columnas);
    }
}

export default ListTabla;
