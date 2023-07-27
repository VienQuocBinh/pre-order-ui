import React, { useEffect } from "react";
import "./home.scss";
import { Sidebar } from "../../components/sidebar/Sidebar";
import { Navbar } from "../../components/navbar/Navbar";
import { Widget } from "../../components/widgets/Widget";
import { Featured } from "../../components/featured/Featured";
import { ChartHome } from "../../components/chart/Chart";
import { List } from "../../components/table/Table";
import useUserContext from "../../hooks/useUserContext";

export const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>
        <div className="charts">
          <Featured />
          <ChartHome />
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transaction</div>
          <List />
        </div>
      </div>
    </div>
  );
};
