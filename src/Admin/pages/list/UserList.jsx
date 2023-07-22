import "./list.scss";
import { Sidebar } from "../../components/sidebar/Sidebar";
import { Navbar } from "../../components/navbar/Navbar";
import { UserDataTable } from "../../components/datatable/UserDataTable";

export const UserList = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <UserDataTable />
      </div>
    </div>
  );
};
