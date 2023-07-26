import "./list.scss";
import { Sidebar } from "../../components/sidebar/Sidebar";
import { Navbar } from "../../components/navbar/Navbar";
import { OrderDataTable } from "../../components/datatable/OrderDataTable";

export const OrderList = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <OrderDataTable />
      </div>
    </div>
  );
};
