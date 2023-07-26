export const productColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "productCode",
    headerName: "Code",
    width: 100,
  },
  {
    field: "name",
    headerName: "Name",
    width: 250,
  },
  // {
  //   field: "category.id",
  //   headerName: "Category",
  //   width: 200,
  // },
  {
    field: "execptedReleaseDate",
    headerName: "Expected Release Date",
    width: 200,
    type: "Date",
    valueFormatter: (params) => {
      // Format the date to "dd/MM/yyyy" format
      const date = new Date(params.value);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      // Add leading zero for day and month if necessary
      const formattedDay = day < 10 ? `0${day}` : day;
      const formattedMonth = month < 10 ? `0${month}` : month;

      return `${formattedDay}/${formattedMonth}/${year}`;
    },
  },
  {
    field: "price",
    headerName: "Price",
    width: 150,
    type: "number",
    valueFormatter: (params) => {
      // Format the number with commas
      return Number(params.value).toLocaleString() + " VND";
    },
  },
  {
    field: "isActive",
    headerName: "Status",
    width: 120,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.isActive}`}>
          {params.row.isActive ? "Active" : "Deleted"}
        </div>
      );
    },
  },
];
