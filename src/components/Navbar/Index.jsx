import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function Index({ toggle, props }) {
  const avatar = sessionStorage.getItem("picture");

  return (
    <>
      <header className="">
        <div className="shadow-sm">
          <div className="relative bg-white flex w-full items-center px-5 py-2.5">
            <div className="flex-1">
              <p className="block md:hidden cursor-pointer">
                <FontAwesomeIcon icon={faBars} onClick={toggle} />
              </p>
            </div>
            <div className="">
              <ul className="flex flex-row gap-4 items-center">
                <li>
                  <span>
                    <img
                      className="rounded-full h-9 w-9 border cursor-pointer"
                      src={avatar}
                      alt="Avatar"
                    />
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Index;
