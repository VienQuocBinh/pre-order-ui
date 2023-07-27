import React, { useEffect, useState } from "react";
import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";
import useUserContext from "../../hooks/useUserContext";
import { useOrderContext } from "../../context/OrderContext";

export const Featured = () => {
  const { accessToken } = useUserContext();
  const { getAllOrders } = useOrderContext();
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    getAllOrders(accessToken)
      .then((res) => setOrders(res.data))
      .catch((err) => console.log(err));
  }, [getAllOrders]);

  // Get the current date
  const currentDate = new Date();

  // Filter orders for today's orders
  const todayOrders = orders.filter((order) => {
    const orderDate = new Date(order.checkInDate);
    return (
      orderDate.getDate() === currentDate.getDate() &&
      orderDate.getMonth() === currentDate.getMonth() &&
      orderDate.getFullYear() === currentDate.getFullYear()
    );
  });

  // Calculate the sum of the finalAmount for today's orders
  const sumFinalAmount = todayOrders.reduce(
    (total, order) =>
      total +
      order.orderDetails.reduce(
        (subtotal, detail) => subtotal + detail.finalAmount,
        0
      ),
    0
  );


  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Total Revenue</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        {/* <div className="featuredChart">
          <CircularProgressbar value={70} text={"70%"} strokeWidth={5} />
        </div> */}
        <p className="title">Total sales made today</p>
        <p className="amount">{Number(sumFinalAmount).toLocaleString()} VND</p>
        {/* <p className="desc">Description</p> */}
        {/* <div className="summary">
          <div className="item">
            <div className="itemTitle">Target</div>
            <div className="itemResult negative">
              <ArrowDownwardOutlinedIcon fontSize="small" />
              <div className="resultAmount">$12.4k</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Week</div>
            <div className="itemResult positive">
              <ArrowUpwardOutlinedIcon fontSize="small" />
              <div className="resultAmount">$12.4k</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Month</div>
            <div className="itemResult negative">
              <ArrowDownwardOutlinedIcon fontSize="small" />
              <div className="resultAmount">$12.4k</div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};
