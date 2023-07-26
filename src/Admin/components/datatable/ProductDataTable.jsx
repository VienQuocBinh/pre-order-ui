import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { productColumns } from "../../../productDataTable";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useProductContext } from "../../context/ProductContext";
import { CircularProgress } from "@mui/material";
import useUserContext from "../../hooks/useUserContext";

export const ProductDataTable = () => {
  const { getAllProducts, deleteProduct } = useProductContext();
  const { accessToken } = useUserContext();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getAllProducts(accessToken)
      .then((res) => setProducts(res.data))
      .then(() => setLoading(false))
      .catch((err) => err);
  }, [getAllProducts]);
console.log(products);
  const handleDelete = (id) => {
    console.log(id);
    // setData(data.filter((item) => item.id !== id));
    deleteProduct(id, accessToken)
      .then((res) => console.log())
      .catch((err) => console.log(err));
    navigate("/products");
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={`/products/${params.row.id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">View</div>
            </Link>
            {params.row.isActive ? (
              <div
                className="deleteButton"
                onClick={() => handleDelete(params.row.id)}
              >
                Delete
              </div>
            ) : null}
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
      <div className="datatableTitle">
        Product Management
        <Link to="/products/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={products}
        columns={productColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
      />
    </div>
  );
};
