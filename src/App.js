import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Tarjeta from "./pages/Tarjeta";
import Listado from "./pages/Listado";
import Main from "./pages/Main";
import Mapa from "./pages/Mapa";
import NavBar from "./component/navbar/NavBar";

import { useDispatch, useSelector } from "react-redux";
import { getListadoAction } from "./redux/listadoDucks";

import "./App.css";
import "./css/marker.css";
import "./css/Scroll.css";
import Loader from "./component/Loader";
import RightBar from "./component/rightBar/RightBar";
import ListSistemas from "./pages/ListSistemas";

function App() {
  const dispatch = useDispatch();
  const listPuntosM = useSelector((store) => store.listado.puntosList);

  const [toggle, setToggle] = useState(false);
  const handleToggle = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    // setTimeout(function () { dispatch(getListadoAction()) }, 3000);
    dispatch(getListadoAction());
  }, []);

  return (
    <div className="app">
      <Router>
        <NavBar listAll={listPuntosM} />

        <div className={`app_container ${toggle ? "toggle" : ""}`}>
          <RightBar handleToggle={handleToggle} toggle={toggle} />
          <Switch>
            <Route path="/mapa" component={Mapa} />
            <Route path="/listado" component={Listado} />
            <Route path="/tarjeta" component={Tarjeta} />
            <Route path="/listSistemas" component={ListSistemas} />
            <Route path="/" exact component={Main} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
