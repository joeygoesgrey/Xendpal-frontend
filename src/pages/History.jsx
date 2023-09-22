import React from "react";
import Navbar from "../components/Navbar/Index";
import { useOutletContext } from "react-router-dom";
import { ApplicationContext } from "../context/ApplicationContext";
import { fetchUserHistory } from "../utils/utils";
import moment from "moment";
function History() {
  const [sidebarToggle] = useOutletContext();
  const { websocketmessage, dispatch } = React.useContext(ApplicationContext);
  React.useEffect(() => {
    fetchUserHistory()
      .then((data) => {
        // Update the historyData state with the fetched data
        dispatch({ type: "SET_WEBSOCKETMESSAGE", payload: data });
      })
      .catch((error) => {
        console.error("Error fetching user history:", error.message);
      });
  }, []);

  return (
    <>
      <main className="h-full">
        <Navbar toggle={sidebarToggle} />

        {/* Main Content */}
        {websocketmessage?.length === 0 ? (
          <div className="flex justify-center   p-24">No Notifications Yet</div>
        ) : (
          <div className="mainCard">
            <ol class="relative border-l border-gray-200 dark:border-gray-700">
              {websocketmessage?.map((item, index) => (
                <li class="mb-10 ml-6" key={index}>
                  <span class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                          d="M10.0247 4.75C9.61049 4.75 9.2747 5.08579 9.2747 5.5C9.2747 5.91421 9.61049 6.25 10.0247 6.25V4.75ZM13.3397 6.25C13.7539 6.25 14.0897 5.91421 14.0897 5.5C14.0897 5.08579 13.7539 4.75 13.3397 4.75V6.25ZM10.4822 17.5C10.4822 17.0858 10.1464 16.75 9.7322 16.75C9.31799 16.75 8.9822 17.0858 8.9822 17.5H10.4822ZM14.3822 17.5C14.3822 17.0858 14.0464 16.75 13.6322 16.75C13.218 16.75 12.8822 17.0858 12.8822 17.5H14.3822ZM11.6822 7.326L11.7043 6.57633C11.6898 6.5759 11.6754 6.57589 11.6609 6.5763L11.6822 7.326ZM16.5514 11.758L17.2986 11.6935C17.2973 11.679 17.2957 11.6646 17.2936 11.6502L16.5514 11.758ZM17.1364 14.758L16.4197 14.9791C16.4441 15.0581 16.4813 15.1326 16.53 15.1994L17.1364 14.758ZM17.3635 16.67L18.0154 17.041C18.0311 17.0132 18.0451 16.9845 18.0573 16.955L17.3635 16.67ZM15.979 17.497L15.979 18.2471L15.9885 18.2469L15.979 17.497ZM7.38343 17.497L7.37395 18.247H7.38343V17.497ZM5.99893 16.67L5.30543 16.9556C5.3175 16.9849 5.33142 17.0134 5.3471 17.041L5.99893 16.67ZM6.2222 14.761L6.82983 15.2006C6.87787 15.1343 6.9147 15.0604 6.93886 14.9821L6.2222 14.761ZM6.8072 11.761L6.06492 11.6536C6.06287 11.6679 6.06122 11.6822 6.05998 11.6965L6.8072 11.761ZM10.0247 6.25H13.3397V4.75H10.0247V6.25ZM8.9822 17.5C8.9822 19.0008 10.1732 20.25 11.6822 20.25V18.75C11.0372 18.75 10.4822 18.2084 10.4822 17.5H8.9822ZM11.6822 20.25C13.1912 20.25 14.3822 19.0008 14.3822 17.5H12.8822C12.8822 18.2084 12.3272 18.75 11.6822 18.75V20.25ZM11.6601 8.07567C13.7382 8.13689 15.4977 9.72056 15.8091 11.8658L17.2936 11.6502C16.8814 8.81119 14.5374 6.65979 11.7043 6.57633L11.6601 8.07567ZM15.8041 11.8225C15.8967 12.8944 16.103 13.9529 16.4197 14.9791L17.853 14.5369C17.5679 13.6128 17.3819 12.6593 17.2986 11.6935L15.8041 11.8225ZM16.53 15.1994C16.7768 15.5384 16.8317 15.9908 16.6698 16.385L18.0573 16.955C18.4159 16.0821 18.298 15.0794 17.7427 14.3166L16.53 15.1994ZM16.7117 16.299C16.5524 16.579 16.2682 16.7433 15.9696 16.7471L15.9885 18.2469C16.832 18.2363 17.5989 17.7727 18.0154 17.041L16.7117 16.299ZM15.979 16.747H7.38343V18.247H15.979V16.747ZM7.3929 16.7471C7.09428 16.7433 6.8101 16.579 6.65075 16.299L5.3471 17.041C5.76357 17.7727 6.53044 18.2363 7.37395 18.2469L7.3929 16.7471ZM6.69242 16.3844C6.53048 15.9912 6.58448 15.5397 6.82983 15.2006L5.61458 14.3214C5.06265 15.0842 4.94681 16.0848 5.30543 16.9556L6.69242 16.3844ZM6.93886 14.9821C7.25551 13.9559 7.4619 12.8974 7.55442 11.8255L6.05998 11.6965C5.97661 12.6623 5.79067 13.6158 5.50554 14.5399L6.93886 14.9821ZM7.54948 11.8684C7.86016 9.72025 9.62274 8.1347 11.7035 8.0757L11.6609 6.5763C8.82409 6.65675 6.47609 8.81078 6.06492 11.6536L7.54948 11.8684Z"
                          fill="#000000"
                        ></path>{" "}
                      </g>
                    </svg>
                  </span>
                  <h3 class="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                    {item.message}{" "}
                    <span class="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 ml-3">
                      Latest
                    </span>
                  </h3>
                  <time class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                    {" "}
                    {moment(item.created_at).format("MMMM Do, YYYY")};
                  </time>
                </li>
              ))}
            </ol>
          </div>
        )}
      </main>
    </>
  );
}

export default History;
