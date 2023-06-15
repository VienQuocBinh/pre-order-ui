import "./sidebar.scss";
import React from "react";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import PortraitOutlinedIcon from "@mui/icons-material/PortraitOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

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
          <li>
            <DashboardOutlinedIcon className="icon" />
            <span>Dashboard</span>
          </li>
          <p className="title">List</p>

          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Users</span>
          </li>
          <li>
            <StorefrontOutlinedIcon className="icon" />
            <span>Products</span>
          </li>
          <li>
            <CreditCardOutlinedIcon className="icon" />
            <span>Orders</span>
          </li>
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
        <div className="colorOption"></div>
        <div className="colorOption"></div>
      </div>
    </div>
  );
};
