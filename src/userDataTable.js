export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "imgUrl",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          {params.row.imgUrl ? (
            <img className="cellImg" src={params.row.imgUrl} alt="avatar" />
          ) : (
            <img
              className="cellImg"
              src="https://w7.pngwing.com/pngs/981/645/png-transparent-default-profile-united-states-computer-icons-desktop-free-high-quality-person-icon-miscellaneous-silhouette-symbol-thumbnail.png"
              alt="default avatar"
            />
          )}
          {params.row.name}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },

  {
    field: "phone",
    headerName: "Phone",
    width: 120,
  },
  {
    field: "cash",
    headerName: "Cash",
    width: 150,
    valueFormatter: (params) => {
      // Format the number with commas
      return Number(params.value).toLocaleString() + " VND";
    },
  },
  {
    field: "isActive",
    headerName: "Status",
    width: 100,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.isActive}`}>
          {params.row.isActive ? "Active" : "Deleted"}
        </div>
      );
    },
  },
];
