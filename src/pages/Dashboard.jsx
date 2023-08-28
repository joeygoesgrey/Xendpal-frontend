import React from "react";
import StatisticWidget from "../components/Widget/Statistic.jsx";
import DashboardHeader from "../components/Other/DashboardHeader.jsx";
import { useOutletContext } from "react-router-dom";
import { getuserinfo } from "../utils/utils.js";
import { ApplicationContext } from "../context/ApplicationContext.js";
import { bytesToGB, bytesToMBorGB } from "../utils/utils.js";

function Dashboard() {
  const { userinfo, dispatch } = React.useContext(ApplicationContext);

  React.useEffect(() => {
    getuserinfo().then((userInfoFromServer) => {
      dispatch({ type: "SET_USERINFO", payload: userInfoFromServer });
      sessionStorage.setItem("picture", userInfoFromServer?.picture);
    });
  }, []);

  const avatar = userinfo?.picture;

  const [sidebarToggle] = useOutletContext();

  return (
    <>
      <main className="h-full">
        {/* Welcome Header */}
        <DashboardHeader
          toggle={sidebarToggle}
          avatar={avatar}
          user={{ name: userinfo?.name }}
        />

        {/* Credit */}
        <div className="px-2 mx-auto mainCard mt-10">
          <h1 className="text-slate-500 pb-3 text-base md:text-lg text-center flex-col flex items-center gap-2 justify-center">
            <span>
              {bytesToMBorGB(userinfo?.space)} |{" "}
              {bytesToGB(userinfo?.max_space || 2147483648)} used
            </span>

            <progress
              className="progress progress-accent w-56 mx-3"
              value={Number(userinfo?.space)}
              max="2147483648"
            />
          </h1>
        </div>

        {/* Stats */}
        <div className="px-2 mx-auto mainCard">
          <div className="w-full overflow-hidden text-slate-700 md:grid gap-4  ">
            <StatisticWidget className="col-span-4 col-start-1 bg-white" />
          </div>
        </div>
      </main>
    </>
  );
}

export default Dashboard;
