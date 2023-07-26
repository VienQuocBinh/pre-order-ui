import "./productSingle.scss";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProductContext } from "../../context/ProductContext";
import { Product } from "../../model/Product";
import { Sidebar } from "../../components/sidebar/Sidebar";
import { Navbar } from "../../components/navbar/Navbar";
import { Chart } from "../../components/chart/Chart";
import { List } from "../../components/table/Table";
import { CircularProgress } from "@mui/material";
import useUserContext from "../../hooks/useUserContext";

export const ProductDetail = () => {
  const param = useParams();
  const [product, setProduct] = useState(Product);
  const { getById } = useProductContext();
  const [imgUrl, setImgUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const { accessToken } = useUserContext();

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();

    return `${day}/${month}/${year}`;
  };
  useEffect(() => {
    setLoading(true);

    getById(param.productId, accessToken)
      .then((res) => {
        setProduct(res.data);
        setImgUrl(res.data.productDetails[0].imgUrl);
      })
      .then(() => setLoading(false))
      .catch((err) => console.log(err));
  }, [param.productId, getById]);

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
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
                <div className="editButton">Edit</div>
                <h1 className="title">Information</h1>
                <div className="item">
                  <img src={imgUrl} alt="" className="itemImg" />

                  <div className="details">
                    <h1 className="itemTitle">{product.name}</h1>
                    <div className="detailItem">
                      <span className="itemKey">Code:</span>
                      <span className="itemValue">{product.productCode}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Price:</span>
                      <span className="itemValue">{product.price}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Expect Release date:</span>
                      <span className="itemValue">
                        {formatDate(product.execptedReleaseDate)}
                      </span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Category:</span>
                      <span className="itemValue">{product.category.name}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Description:</span>
                      <span className="itemValue">{product.description}</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Last Transactions</h1>
          <List />
        </div>
      </div>
    </div>
  );
};
