import React, { useEffect, useState } from "react";
import "./widget.scss";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import { Link } from "react-router-dom";
import { useOrderContext } from "../../context/OrderContext";
import { useAccountContext } from "../../context/AccountContext";

export const Widget = ({ type }) => {
  const { getAllOrders } = useOrderContext();
  const { getAllAccounts } = useAccountContext();
  const [orders, setOrders] = useState([]);
  const [accounts, setAccounts] = useState([]);
  let data;
  //temporary
  const diff = 20;

  useEffect(() => {
    getAllOrders("accessToken")
      .then((res) => setOrders(res.data))
      .catch((err) => console.log(err));
  }, [getAllOrders]);

  useEffect(() => {
    getAllAccounts("accessToken")
      .then((res) => setAccounts(res.data))
      .catch((err) => console.log(err));
  }, []);

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        link: "View all users",
        to: "/users",
        value: accounts.length,
        icon: (
          <AccountCircleOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(200,200,200,0.4)",
            }}
          />
        ),
      };
      break;
    case "order":
      data = {
        title: "ORDERS",
        isMoney: false,
        link: "View all orders",
        to: "/orders",
        value: orders.length,
        icon: (
          <StorefrontOutlinedIcon
            className="icon"
            style={{
              color: "goldenrod",
              backgroundColor: "rgba(241, 250, 110,0.4)",
            }}
          />
        ),
      };
      break;
    case "earning":
      data = {
        title: "EARNING",
        isMoney: true,
        link: "View net earning",
        to: "/home",
        value: "val",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{
              color: "green",
              backgroundColor: "rgba(110, 250, 175,0.4)",
            }}
          />
        ),
      };
      break;
    case "balance":
      data = {
        title: "BALANCE",
        isMoney: true,
        link: "See details",
        to: "/home",
        value: "val",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              color: "purple",
              backgroundColor: "rgba(126, 110, 250,0.4)",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "$"} {data.value}
        </span>
        <Link to={data.to}>
          <span className="link">{data.link}</span>
        </Link>
      </div>
      <div className="right">
        <div className="percentage positive">
          <ArrowUpwardOutlinedIcon className="percentage-icon" />
          {diff} %
        </div>
        {data.icon}
      </div>
    </div>
  );
};
