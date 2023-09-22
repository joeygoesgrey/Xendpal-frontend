import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { NavLink } from "react-router-dom";
import SubMenu from "./SubMenu";
import { ApplicationContext } from "../../context/ApplicationContext";
function MenuList({ menus, ...props }) {
  const { websocketmessage } = React.useContext(ApplicationContext);
  return (
    <div className="navWrapper p-4">
      <ul id="menu" className="">
        {menus?.map((menu) => {
          if (menu.submenu) {
            // Handle submenu case here
            return <SubMenu key={menu.label} menu={menu} {...props} />;
          } else if (menu.path) {
            // Handle menu item with path
            return (
              <li key={menu.label} className={``} onClick={props.toggle}>
                <NavLink
                  to={`${menu.path}`}
                  className="link no-underline relative"
                >
                  {menu.icon && <FontAwesomeIcon icon={menu.icon} />}
                  {menu.label}{" "}
                  {menu.label === "History" && websocketmessage?.length > 0 && (
                    <div class="badge badge-success badge-xs  "></div>
                  )}
                </NavLink>
              </li>
            );
          } else {
            // Handle any other case here (optional)
            return null;
          }
        })}
      </ul>
    </div>
  );
}

export default MenuList;
