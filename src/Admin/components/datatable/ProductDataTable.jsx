import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { productColumns } from "../../../productDataTable";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useProductContext } from "../../context/ProductContext";
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import useUserContext from "../../hooks/useUserContext";

export const ProductDataTable = () => {
  const { getAllProducts, deleteProduct } = useProductContext();
  const { accessToken } = useUserContext();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [deletingItemId, setDeletingItemId] = useState(null);

  useEffect(() => {
    setLoading(true);

    getAllProducts(accessToken)
      .then((res) => setProducts(res.data))
      .then(() => setLoading(false))
      .catch((err) => err);
  }, [getAllProducts]);

  const handleDelete = (id) => {
    setOpenDialog(true);
    setDeletingItemId(id);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleConfirmDelete = async () => {
    try {
      deleteProduct(deletingItemId, accessToken)
        .then((res) => console.log())
        .catch((err) => console.log(err));
      window.location.reload();
    } catch (error) {
      // Handle error if necessary
      console.error("Error deleting item:", error);
    } finally {
      // Close the confirmation dialog regardless of the result
      setOpenDialog(false);
      setDeletingItemId(null);
    }
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
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
