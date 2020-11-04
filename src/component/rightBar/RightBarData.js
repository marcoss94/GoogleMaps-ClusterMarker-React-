import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as RiIcons from "react-icons/ri";
import * as FiIcons from "react-icons/fi";
import * as BsIcons from "react-icons/bs";

export const RightBarData = [
  {
    title: "Search",
    type: "button",
    path: "/",
    icon: <FaIcons.FaSearch />,
    cName: "nav-text",
  },
  {
    title: "Mapa",
    type: "link",
    path: "/mapa",
    icon: <FaIcons.FaMapMarkedAlt />,
    cName: "nav-text",
  },
  {
    title: "Tajetas",
    type: "link",
    path: "/tarjeta",
    icon: <BsIcons.BsGridFill />,
    cName: "nav-text",
  },
  {
    title: "Listado",
    type: "link",
    path: "/listado",
    icon: <FaIcons.FaRegListAlt />,
    cName: "nav-text",
  },
  {
    title: "Filtros",
    path: "/",
    icon: <FaIcons.FaFilter />,
    cName: "nav-text",
    cNameDropDown: "nav-dropDown",
    type: "dropDown",
    iconDropDownDown: <RiIcons.RiArrowDownSLine />,
    iconDropDownUp: <RiIcons.RiArrowUpSLine />,
  },
  {
    title: "Ordenamiento",
    path: "/",
    icon: <FaIcons.FaSortAmountUp />,
    cName: "nav-text",
    cNameDropDown: "nav-dropDown",
    type: "dropDown",
    iconDropDownDown: <RiIcons.RiArrowDownSLine />,
    iconDropDownUp: <RiIcons.RiArrowUpSLine />,
  },
  {
    title: "Columnas",
    path: "/",
    icon: <FaIcons.FaEye />,
    cName: "nav-text",
    cNameDropDown: "nav-dropDown",
    type: "dropDown",
    iconDropDownDown: <RiIcons.RiArrowDownSLine />,
    iconDropDownUp: <RiIcons.RiArrowUpSLine />,
  },
];
