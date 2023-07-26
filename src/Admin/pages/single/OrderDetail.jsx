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

  // let order = {
  //   id: 7,
  //   orderCode: "ET1EHZ7F",
  //   customer: {
  //     id: 4,
  //     roleId: 1,
  //     name: "string",
  //     email: "string@gmail.com",
  //     phone: "090980782",
  //     imgUrl: "string",
  //     isActive: true,
  //   },
  //   paymentType: {
  //     paymentMethod: "Momo",
  //   },
  //   deliveryPhone: "0908940273",
  //   checkInDate: "2023-07-05T14:14:38.923",
  //   totalAmount: 2400000,
  //   discountRate: 0,
  //   finalAmount: 2402000,
  //   shippingFee: 2000,
  //   orderStatus: "Pending",
  //   isConfirm: false,
  //   quantity: 3,
  //   note: "nothing",
  //   orderDetails: [
  //     {
  //       id: 5,
  //       orderId: 7,
  //       productCode: "LOA1121   ",
  //       productName: "Loa di động LG XBOOM Go PN7",
  //       unitPrice: 1,
  //       quantity: 3,
  //       totalAmount: 2400000,
  //       discountRate: 2402000,
  //       finalAmount: 3,
  //       note: "nothing",
  //     },
  //   ],
  // };

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
                <h1 className="title">Order Information</h1>
                <div className="item">
                  <div className="details">
                    {/* <h1 className="itemTitle">{order.orderCode}</h1> */}
                    <div className="detailItem">
                      <span className="itemKey">Order Code:</span>
                      <span className="itemValue">{order.orderCode}</span>
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
                  </div>
                </div>
              </div>
              <div className="right">
                <h1 className="title">Customer Information</h1>
                <div className="item">
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
                  </div>
                </div>
              </div>
            </div>
            <div className="bottom">
              <h1 className="title">Products</h1>
              <OrderProductTable  orderProducts={order.orderDetails}/>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
