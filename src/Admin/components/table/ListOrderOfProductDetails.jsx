import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useOrderContext } from "../../context/OrderContext";
import { useEffect, useState } from "react";
import useUserContext from "../../hooks/useUserContext";

export const ListOrderOfProductDetails = ({productCode}) => {

  const { accessToken } = useUserContext();
  const { getAllOrders } = useOrderContext();
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    getAllOrders(accessToken)
      .then((res) => setOrders(res.data))
      .catch((err) => console.log(err));
  }, [getAllOrders]);

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

  // Sort the orders based on checkInDate in descending order
  const sortedOrders = orders.sort(
    (a, b) => new Date(b.checkInDate) - new Date(a.checkInDate)
  );

  // Get the first 5 orders
  const latestOrders = sortedOrders.slice(0, 5);

  const totalOrdersDetailsAmount = (orderId) => {
    const order = orders.find((order) => order.id === orderId);

    // Sum the finalAmount of all orderDetails for the given order
    const sumFinalAmount = order.orderDetails.reduce(
      (total, orderDetail) => total + orderDetail.finalAmount,
      0
    );

    return sumFinalAmount;
  };

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Order ID</TableCell>
            <TableCell className="tableCell">Product</TableCell>
            <TableCell className="tableCell">Customer</TableCell>
            <TableCell className="tableCell">Date</TableCell>
            <TableCell className="tableCell">Amount</TableCell>
            <TableCell className="tableCell">Payment Method</TableCell>
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {latestOrders.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="tableCell">{row.id}</TableCell>
              <TableCell className="tableCell">
                {/* <div className="cellWrapper">
                  <img src={row.img} alt="" className="image" />
                  {row.product}
                </div> */}
                {row.orderDetails[0].productName}
              </TableCell>
              <TableCell className="tableCell">{row.customer.name}</TableCell>
              <TableCell className="tableCell">
                {formatDate(row.checkInDate)}
              </TableCell>
              <TableCell className="tableCell">
                {Number(totalOrdersDetailsAmount(row.id)).toLocaleString()} VND
              </TableCell>
              <TableCell className="tableCell">
                {row.paymentType.paymentMethod}
              </TableCell>
              <TableCell className="tableCell">
                <span className={`status ${row.orderStatus}`}>
                  {row.orderStatus}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
