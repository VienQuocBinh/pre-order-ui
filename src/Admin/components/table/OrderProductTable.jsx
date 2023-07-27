import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export const OrderProductTable = ({ orderProducts }) => {
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Product Code</TableCell>
            <TableCell className="tableCell">Product Name</TableCell>
            <TableCell className="tableCell">Unit Price</TableCell>
            <TableCell className="tableCell">Quantity</TableCell>
            <TableCell className="tableCell">Amount</TableCell>
            <TableCell className="tableCell">Discount Rate</TableCell>
            <TableCell className="tableCell">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orderProducts.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="tableCell">{row.productCode}</TableCell>
              {/* <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img src={row.img} alt="" className="image" />
                  {row.product}
                </div>
              </TableCell> */}
              <TableCell className="tableCell">{row.productName}</TableCell>
              <TableCell className="tableCell">
                {Number(row.unitPrice).toLocaleString()} VND
              </TableCell>
              <TableCell className="tableCell">{row.quantity}</TableCell>
              <TableCell className="tableCell">
                {Number(row.totalAmount).toLocaleString()} VND
              </TableCell>
              <TableCell className="tableCell">{row.discountRate} %</TableCell>
              <TableCell className="tableCell">
                {Number(row.finalAmount).toLocaleString()} VND
              </TableCell>
              {/* <TableCell className="tableCell">
                <span className={`status ${row.status}`}>{row.status}</span>
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
