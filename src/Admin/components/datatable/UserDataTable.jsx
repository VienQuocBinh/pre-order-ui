import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../../userDataTable";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAccountContext } from "../../context/AccountContext";
import { CircularProgress } from "@mui/material";

export const UserDataTable = () => {
  const [accounts, setAccounts] = useState([]);
  const { getAllAccounts } = useAccountContext();
  const [loading, setLoading] = useState(false);
  
  
  const handleDelete = (id) => {
    setAccounts(accounts.filter((item) => item.id !== id));
  };

  useEffect(() => {
    setLoading(true);

    getAllAccounts("accessToken")
      .then((res) => setAccounts(res.data))
      .then(() => setLoading(false))
      .catch((err) => console.log(err));
  }, []);

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={`/users/${params.row.id}`}
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
        User Management
        {/* <Link to="/users/new" className="link">
          Add New
        </Link> */}
      </div>
      <DataGrid
        className="datagrid"
        rows={accounts}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
      />
    </div>
  );
};
