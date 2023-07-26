import "./sidebar.scss";
import React from "react";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import PortraitOutlinedIcon from "@mui/icons-material/PortraitOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Link } from "react-router-dom";

export const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="top">
        <span className="logo">Admin</span>
      </div>
      <hr></hr>
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/home" style={{ textDecoration: "none" }}>
            <li>
              <DashboardOutlinedIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <p className="title">List</p>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <AccountCircleOutlinedIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <Link to="/products" style={{ textDecoration: "none" }}>
            <li>
              <StorefrontOutlinedIcon className="icon" />
              <span>Products</span>
            </li>
          </Link>
          <Link to="/orders" style={{ textDecoration: "none" }}>
            <li>
              <CreditCardOutlinedIcon className="icon" />
              <span>Orders</span>
            </li>
          </Link>
          <p className="title">USER</p>
          <li>
            <PortraitOutlinedIcon className="icon" />
            <span>Profile</span>
          </li>
          <p className="title">SERVICE</p>
          <li>
            <LogoutOutlinedIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>

      <div className="bottom">
        <p className="title">Theme: </p>
        <div className="colorOption"></div>
        <div className="colorOption"></div>
      </div>
    </div>
  );
};
