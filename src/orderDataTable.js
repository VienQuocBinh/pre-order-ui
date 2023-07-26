import { useEffect } from "react";
import { useOrderContext } from "./Admin/context/OrderContext";

// const { getById } = useOrderContext();

export const orderColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "orderCode",
    headerName: "Code",
    width: 100,
  },
  // {
  //   field: "paymentType.paymentMethod",
  //   headerName: "Payment Type",
  //   width: 150,
  // },
  {
    field: "deliveryPhone",
    headerName: "Delivery Phone",
    width: 150,
  },
  // {
  //   field: "customerName",
  //   headerName: "Customer",
  //   width: 200,
  //   valueGetter: (params) => params.row.customer.name
  // },
  {
    field: "checkInDate",
    headerName: "Check In Date",
    width: 150,
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
    field: "finalAmount",
    headerName: "Amount",
    width: 180,
    type: "number",
    valueFormatter: (params) => {
      // Format the number with commas
      return Number(params.value).toLocaleString() + " VND";
    },
  },
  {
    field: "isConfirm",
    headerName: "Status",
    width: 150,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.isConfirm}`}>
          {params.row.isConfirm ? "Confirmed" : "Not Confirmed"}
        </div>
      );
    },
  },
];
