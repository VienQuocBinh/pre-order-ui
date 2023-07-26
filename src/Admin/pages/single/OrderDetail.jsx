import "./orderSingle.scss";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Order } from "../../model/Order";
import { useOrderContext } from "../../context/OrderContext";
import { CircularProgress } from "@mui/material";
import { Sidebar } from "../../components/sidebar/Sidebar";
import { Navbar } from "../../components/navbar/Navbar";
import { List } from "../../components/table/Table";
import { OrderProductTable } from "../../components/table/OrderProductTable";

export const OrderDetail = () => {
  const param = useParams();
  const [order, setOrder] = useState(Order);
  const { getById } = useOrderContext();
  const [imgUrl, setImgUrl] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getById(param.orderId, "accessToken")
      .then((res) => {
        setOrder(res.data);
        //   setImgUrl(res.data.orderDetails[0].imgUrl);
      })
      .then(() => setLoading(false))
      .catch((err) => console.log(err));
  }, [param.orderId, getById]);

  console.log(order);

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />

        {loading ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
            }}
          >
            <CircularProgress color="secondary" />
          </div>
        ) : (
          <>
            <div className="top">
              <div className="left">
                <h1 className="title">Customer Information</h1>
                <div className="item">
                  {order.customer.imgUrl ? (
                    <img
                      src="https://w7.pngwing.com/pngs/981/645/png-transparent-default-profile-united-states-computer-icons-desktop-free-high-quality-person-icon-miscellaneous-silhouette-symbol-thumbnail.png"
                      alt=""
                      className="itemImg"
                    />
                  ) : (
                    <img
                      src={order.customer.imgUrl}
                      alt=""
                      className="itemImg"
                    />
                  )}

                  <div className="details">
                    <div className="detailItem">
                      <span className="itemKey">Name:</span>
                      <span className="itemValue">{order.customer.name}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Email:</span>
                      <span className="itemValue">{order.customer.email}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Phone:</span>
                      <span className="itemValue">{order.customer.phone}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Status:</span>
                      <span className="itemValue">
                        {order.customer.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="right">
                <h1 className="title">Order Information</h1>
                <div className="item">
                  <div className="details">
                    <div className="detailItem">
                      <span className="itemKey">Order Code:</span>
                      <span className="itemValue">{order.orderCode}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Payment Type:</span>
                      <span className="itemValue">
                        {order.paymentType.paymentMethod}
                      </span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Check In Date:</span>
                      <span className="itemValue">
                        {formatDate(order.checkInDate.toString())}
                      </span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Order Status:</span>
                      <span className="itemValue">{order.orderStatus}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Note:</span>
                      <span className="itemValue">{order.note}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Amount:</span>
                      <span className="itemValue">
                        {Number(order.totalAmount).toLocaleString() + " VND"}
                      </span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Shipping Fee:</span>
                      <span className="itemValue">
                        {Number(order.shippingFee).toLocaleString() + " VND"}
                      </span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Discount rate:</span>
                      <span className="itemValue">{order.discountRate} %</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Total Amount:</span>
                      <span className="itemValue">
                        {Number(order.finalAmount).toLocaleString() + " VND"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bottom">
              <h1 className="title">Order Details</h1>
              <OrderProductTable orderProducts={order.orderDetails} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
