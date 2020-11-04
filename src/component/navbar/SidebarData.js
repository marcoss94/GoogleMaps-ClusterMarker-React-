import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as RiIcons from "react-icons/ri";
import * as FiIcons from "react-icons/fi";

export const SidebarData = [
  {
    title: "Histórico",
    path: "/",
    icon: <FaIcons.FaTable />,
    cName: "nav-text",
  },
  {
    title: "Informe",
    path: "/",
    icon: <FaIcons.FaFileInvoice />,
    cName: "nav-text",
  },
  {
    title: "Sistemas",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
    cNameDropDown: "nav-dropDown",
    type: "dropDown",
    iconDropDownDown: <RiIcons.RiArrowDownSLine />,
    iconDropDownUp: <RiIcons.RiArrowUpSLine />,
  },
  {
    title: "Configuración",
    path: "/",
    icon: <FaIcons.FaTools />,
    cName: "nav-text",
  },
  {
    title: "Ayuda",
    path: "/",
    icon: <FiIcons.FiHelpCircle />,
    cName: "nav-text",
  },
];
