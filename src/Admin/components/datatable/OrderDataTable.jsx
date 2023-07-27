import "./datatable.scss";
import React, { useEffect, useState } from "react";
import { useOrderContext } from "../../context/OrderContext";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { orderColumns } from "../../../orderDataTable";
import { DataGrid } from "@mui/x-data-grid";
import useUserContext from "../../hooks/useUserContext";

export const OrderDataTable = () => {
  const { getAllOrders } = useOrderContext();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const { accessToken } = useUserContext();

  useEffect(() => {
    setLoading(true);
    getAllOrders(accessToken)
      .then((res) => setOrders(res.data))
      .then(() => setLoading(false))
      .catch((err) => console.log(err));
  }, [getAllOrders]);
  
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={`/orders/${params.row.id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">View</div>
            </Link>
          </div>
        );
      },
    },
  ];
  if (loading) {
    return (
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
    );
  }
  return (
    <div className="datatable">
      <div className="datatableTitle">Order Management</div>
      <DataGrid
        className="datagrid"
        rows={orders}
        columns={orderColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
      />
    </div>
  );
};
