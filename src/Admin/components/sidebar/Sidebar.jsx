import "./sidebar.scss";
import React, { useEffect, useState } from "react";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import PortraitOutlinedIcon from "@mui/icons-material/PortraitOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useProductContext } from "../../context/ProductContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useUserContext from "../../hooks/useUserContext";
import useAuthContext from "../../hooks/useAuthContext";
import { useToast, Button } from "@chakra-ui/react";

export const Sidebar = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { SetUser, SetAccessToken, SetRefreshToken, accessToken } =
    useUserContext();
  const { user: FbUser, loading } = useAuthContext();

  const handleLogout = () => {
    SetUser(null);
    navigate("/");
  }

  return (
    <div className="sidebar">
      <div className="top">
        <span className="logo">Admin</span>
      </div>
      <hr></hr>
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/" style={{ textDecoration: "none" }}>
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
            <span>
                  <button
                    onClick={handleLogout} 
                    style={{border: "none"
                            ,color: "purple"
                            ,backgroundColor: "transparent"
                            ,color: "#999"
                            ,fontWeight: "bold"
                            ,fontSize: "14px"}}
                    >
                      Logout
                  </button>
            </span>
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
