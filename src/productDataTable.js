export const productColumns = [
  { field: "id", headerName: "ID", width: 50 },
  {
    field: "productCode",
    headerName: "Code",
    width: 100,
  },
  {
    field: "name",
    headerName: "Name",
    width: 230,
  },
  {
    field: "description",
    headerName: "Description",
    width: 400,
  },
  {
    field: "price",
    headerName: "Price",
    width: 100,
  },
  // {
  //   field: "isActive",
  //   headerName: "Status",
  //   width: 100,
  // },
  {
    field: "isActive",
    headerName: "Status",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.isActive}`}>
          {params.row.isActive ? "Active" : "Deleted"}
        </div>
      );
    },
  },
];
