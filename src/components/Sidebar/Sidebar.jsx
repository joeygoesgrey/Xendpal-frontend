import { faSignOut, faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import initMenus from "../../data/menus.js";
import "./sidebar.css";
import SidebarLogo from "./SidebarLogo.jsx";
import MenuList from "./MenuList.jsx";
import { clearAllStorages } from "../../utils/utils.js";
function Sidebar({ ...props }) {
  const [menus, setMenus] = useState(initMenus);
  const logout = async () => {
    try {
      await clearAllStorages(); // Wait for storage to be cleared
      window.location.href = "/auth/login"; // This will cause a full page reload
    } catch (error) {
      console.error("Failed to clear storages: ", error);
    }
  };

  return (
    <>
      <aside
        id="sidebar"
        className={`sidebarWrapper md:translate-x-0 -translate-x-full md:z-0 z-50 no-scrollbar ${props.className}`}
      >
        {/* Sidebar wrapper */}
        <div className="md:w-64 border-r-2 border-gray-100 h-full flex-col flex flex-shrink-0">
          {/* Logo */}
          <SidebarLogo
            toggle={props.toggle}
            icon={faCloudArrowUp}
            text="Xendpal"
          />
          <span className="text-center text-gray-400">
            &bull; File Sharing Platform &bull;
          </span>
          {/* Menu */}
          <MenuList menus={menus} toggle={props.toggle} />

          {/* Profile */}
          <div className="pt-2 border-t border-gray-300">
            <div className="py-2 px-4">
              {/* Logout Button */}
              <button
                className="py-2 px-4 border border-emerald-200 bg-emerald-400 w-full rounded-full text-gray-100 hover:bg-emerald-600 hover:border-emerald-600 justify-end text-sm"
                onClick={() => logout()}
              >
                <FontAwesomeIcon icon={faSignOut}></FontAwesomeIcon> Logout
              </button>
            </div>
          </div>
        </div>
      </aside>

      {props.className === "mobile" && (
        <div
          id="overlaySidebar"
          onClick={props.toggle}
          className="hidden absolute w-full h-screen bg-black z-10 inset-0 opacity-60"
        >
          <div></div>
        </div>
      )}
    </>
  );
}

export default Sidebar;
