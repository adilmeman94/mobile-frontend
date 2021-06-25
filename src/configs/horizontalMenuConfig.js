import React from "react";
import * as Icon from "react-feather";

const horizontalMenuConfig = [
  {
    id: "home",
    title: "Home",
    type: "item",
    icon: <Icon.Home size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/",
  },
  {
    id: "CategoryList",
    title: "CategoryList",
    type: "item",
    icon: <Icon.Menu size={20} />,
    navLink: "/CategoryList",
  },
  {
    id: "complaints",
    title: "complaints",
    type: "item",
    icon: <Icon.Trello size={20} />,
    navLink: "/Complaints",
  },
  {
    id: "reports",
    title: "reports",
    type: "item",
    icon: <Icon.PieChart size={20} />,
    navLink: "/reports",
  },
  {
    id: "sales",
    title: "sales",
    type: "item",
    icon: <Icon.TrendingUp size={20} />,
    navLink: "/sales",
  },
  {
    id: "purchases",
    title: "purchases",
    type: "item",
    icon: <Icon.ShoppingBag size={20} />,
    navLink: "/Purchases",
  },
  {
    id: "Store",
    title: "Store",
    type: "item",
    icon: <Icon.Home size={20} />,
    navLink: "/Store",
  },
  {
    id: "Products",
    title: "Products",
    type: "item",
    icon: <Icon.Box size={20} />,
    navLink: "/Products",
  },
];

export default horizontalMenuConfig;
