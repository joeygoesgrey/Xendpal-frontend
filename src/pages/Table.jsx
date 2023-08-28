import React, { useState } from "react";
import Navbar from "../components/Navbar/Index";
import { useOutletContext } from "react-router-dom";
import UserTable from "./UserTable";
import SidebarSearch from "../components/Sidebar/SidebarSearch";

function Table() {
  const [sidebarToggle] = useOutletContext();

  const [loading] = useState(false);

  return (
    <>
      <main className="h-full">
        <Navbar toggle={sidebarToggle} />
        {/* Search Menu */}
        <SidebarSearch />
        {/* Main Content */}
        <div className="mainCard">
          <div className="border w-full border-gray-200 bg-white py-2 px-2 rounded-md">
            <UserTable loading={loading} />
          </div>
        </div>
      </main>
    </>
  );
}

export default Table;
