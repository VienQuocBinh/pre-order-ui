import "./list.scss";
import { Sidebar } from "../../components/sidebar/Sidebar";
import { Navbar } from "../../components/navbar/Navbar";
import { ProductDataTable } from "../../components/datatable/ProductDataTable";

export const ProductList = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <ProductDataTable />
      </div>
    </div>
  );
};
