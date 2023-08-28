import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { ApplicationContext } from "../../context/ApplicationContext";

function SidebarSearch() {
  const { dispatch } = React.useContext(ApplicationContext);
  return (
    <div className="px-4">
      <div className="w-full py-4 px-2 items-center flex relative">
        <input
          type="text"
          onChange={(e) =>
            dispatch({ type: "SET_SEARCHTERM", payload: e.target.value })
          }
          placeholder="Search files"
          id=""
          className="border rounded-full text-sm w-full px-5 py-2 focus:outline-none focus:border-green-300 bg-slate-50"
        />

        <FontAwesomeIcon
          className="absolute right-6 text-slate-500"
          icon={faMagnifyingGlass}
        ></FontAwesomeIcon>
      </div>
    </div>
  );
}

export default SidebarSearch;
