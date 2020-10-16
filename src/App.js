import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Tarjeta from './pages/Tarjeta';
import Listado from './pages/Listado';
import Main from './pages/Main';
import Mapa from './pages/Mapa';
import NavBar from './component/navbar/NavBar';

import { useDispatch, useSelector } from 'react-redux'
import { getListadoAction } from "./redux/listadoDucks";



import './App.css';
import './css/marker.css';
import Loader from './component/Loader';


function App() {

  const dispatch = useDispatch()
  const listPuntosM = useSelector(store => store.listado.puntosList)

  useEffect(() => {
    setTimeout(function () { dispatch(getListadoAction()) }, 3000);

  }, [])

  return (
    <div className="app">
      <Router>

        <NavBar listAll={listPuntosM} />


        {/* <Link to="/">Main</Link>
        <Link to="/listado">Listado</Link>
        <Link to="/mapa">Mapa</Link>
        <Link to={{ pathname: "/tarjeta", state: { from: "root" } }}>Tarjeta</Link> */}

        <Switch>
          <Route path="/listado" component={Listado} />
          <Route path="/tarjeta" component={Tarjeta} />
          <Route path="/mapa" component={Mapa} />
          <Route path="/" exact component={Main} />
        </Switch>

      </Router>
    </div>
  );
}

export default App;
