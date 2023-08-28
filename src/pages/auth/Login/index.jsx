import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function LoginIndex() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const LoginImage =
    "https://edp.raincode.my.id/static/media/login.cc0578413db10119a7ff.png";
  return (
    <>
      <div className="flex min-h-screen">
        <div className="flex w-full flex-col md:flex-row">
          {/* Image */}
          <div className="md:bg-emerald-500 md:min-h-screen flex flex-wrap md:w-1/2">
            <div className="items-center text-center flex flex-col relative justify-center mx-auto">
              <img
                src={LoginImage}
                alt="Logo Login"
                className="md:w-72 w-36 mx-auto"
              />
              <div className="md:block hidden text-slate-100">
                <h1 className="font-semibold text-2xl pb-2">
                  Xendpal
                </h1>
                <span className="text-sm">File Sharing Platform</span>
              </div>
            </div>
          </div>
          {/* Login Section */}
          <div className="flex flex-col md:flex-1 items-center justify-center">
            <div className="loginWrapper flex flex-col w-full lg:px-36 md:px-8 px-8 md:py-8 ">
              {/* Login Header Text */}
              <div className="relative flex flex-row font-semibold text-3xl md:items-center md:mx-auto text-green-700 mb-1 p-4 justify-center">
                <Link to="/">
                  <FontAwesomeIcon icon={faCloudArrowUp}></FontAwesomeIcon>{" "}
                  Xendpal
                </Link>
              </div>

              <div className="md:hidden block my-4">
                <h1 className="text-2xl font-semibold">Login</h1>
              </div>

              <a href="http://127.0.0.1:8080/user" className="w-full mt-6 flex flex-row justify-center items-center border rounded-lg ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  // xmlns:xlink="http://www.w3.org/1999/xlink"
                  width="40"
                  zoomAndPan="magnify"
                  viewBox="0 0 30 30.000001"
                  height="40"
                  preserveAspectRatio="xMidYMid meet"
                  version="1.0"
                >
                  <defs>
                    <clipPath id="id1">
                      <path
                        d="M 3.386719 10.597656 L 10 10.597656 L 10 17 L 3.386719 17 Z M 3.386719 10.597656 "
                        clip-rule="nonzero"
                      />
                    </clipPath>
                    <clipPath id="id2">
                      <path
                        d="M 18 12 L 22 12 L 22 18.582031 L 18 18.582031 Z M 18 12 "
                        clip-rule="nonzero"
                      />
                    </clipPath>
                    <clipPath id="id3">
                      <path
                        d="M 23 12 L 27.339844 12 L 27.339844 17 L 23 17 Z M 23 12 "
                        clip-rule="nonzero"
                      />
                    </clipPath>
                    <clipPath id="id4">
                      <path
                        d="M 22 10.597656 L 24 10.597656 L 24 17 L 22 17 Z M 22 10.597656 "
                        clip-rule="nonzero"
                      />
                    </clipPath>
                  </defs>
                  <g clip-path="url(#id1)">
                    <path
                      fill="rgb(28.239441%, 52.159119%, 92.939758%)"
                      d="M 9.328125 13.421875 L 6.558594 13.421875 L 6.558594 14.265625 L 8.523438 14.265625 C 8.425781 15.445312 7.46875 15.949219 6.5625 15.949219 C 6.273438 15.953125 5.992188 15.894531 5.726562 15.78125 C 5.457031 15.667969 5.222656 15.507812 5.019531 15.296875 C 4.816406 15.085938 4.660156 14.839844 4.550781 14.566406 C 4.441406 14.289062 4.390625 14.003906 4.394531 13.707031 C 4.394531 12.429688 5.355469 11.449219 6.5625 11.449219 C 7.496094 11.449219 8.046875 12.058594 8.046875 12.058594 L 8.621094 11.449219 C 8.621094 11.449219 7.882812 10.605469 6.535156 10.605469 C 4.820312 10.605469 3.492188 12.089844 3.492188 13.691406 C 3.492188 15.261719 4.738281 16.796875 6.578125 16.796875 C 8.195312 16.796875 9.378906 15.660156 9.378906 13.980469 C 9.378906 13.625 9.328125 13.421875 9.328125 13.421875 Z M 9.328125 13.421875 "
                      fill-opacity="1"
                      fill-rule="nonzero"
                    />
                  </g>
                  <path
                    fill="rgb(85.879517%, 19.60907%, 21.179199%)"
                    d="M 11.597656 12.8125 C 10.460938 12.8125 9.648438 13.722656 9.648438 14.785156 C 9.648438 15.863281 10.4375 16.792969 11.609375 16.792969 C 12.675781 16.792969 13.546875 15.957031 13.546875 14.808594 C 13.546875 13.492188 12.53125 12.8125 11.597656 12.8125 Z M 11.609375 13.59375 C 12.167969 13.59375 12.699219 14.058594 12.699219 14.804688 C 12.699219 15.535156 12.171875 16.011719 11.605469 16.011719 C 10.988281 16.011719 10.5 15.5 10.5 14.796875 C 10.5 14.109375 10.984375 13.59375 11.609375 13.59375 Z M 11.609375 13.59375 "
                    fill-opacity="1"
                    fill-rule="nonzero"
                  />
                  <path
                    fill="rgb(95.689392%, 76.078796%, 5.099487%)"
                    d="M 15.84375 12.8125 C 14.707031 12.8125 13.890625 13.722656 13.890625 14.785156 C 13.890625 15.863281 14.679688 16.792969 15.855469 16.792969 C 16.917969 16.792969 17.789062 15.957031 17.789062 14.808594 C 17.789062 13.492188 16.777344 12.8125 15.84375 12.8125 Z M 15.851562 13.59375 C 16.410156 13.59375 16.941406 14.058594 16.941406 14.804688 C 16.941406 15.535156 16.414062 16.011719 15.851562 16.011719 C 15.230469 16.011719 14.742188 15.5 14.742188 14.796875 C 14.742188 14.109375 15.226562 13.59375 15.855469 13.59375 Z M 15.851562 13.59375 "
                    fill-opacity="1"
                    fill-rule="nonzero"
                  />
                  <g clip-path="url(#id2)">
                    <path
                      fill="rgb(28.239441%, 52.159119%, 92.939758%)"
                      d="M 20.003906 12.8125 C 18.960938 12.8125 18.140625 13.75 18.140625 14.800781 C 18.140625 16 19.089844 16.792969 19.984375 16.792969 C 20.539062 16.792969 20.832031 16.570312 21.046875 16.3125 L 21.046875 16.703125 C 21.046875 17.390625 20.640625 17.800781 20.027344 17.800781 C 19.433594 17.800781 19.136719 17.347656 19.03125 17.09375 L 18.285156 17.410156 C 18.550781 17.984375 19.082031 18.582031 20.035156 18.582031 C 21.074219 18.582031 21.863281 17.914062 21.863281 16.507812 L 21.863281 12.933594 L 21.050781 12.933594 L 21.050781 13.269531 C 20.800781 12.992188 20.457031 12.8125 20.003906 12.8125 Z M 20.078125 13.59375 C 20.589844 13.59375 21.117188 14.042969 21.117188 14.808594 C 21.117188 15.582031 20.59375 16.011719 20.066406 16.011719 C 19.511719 16.011719 18.996094 15.550781 18.996094 14.8125 C 18.996094 14.050781 19.53125 13.59375 20.078125 13.59375 Z M 20.078125 13.59375 "
                      fill-opacity="1"
                      fill-rule="nonzero"
                    />
                  </g>
                  <g clip-path="url(#id3)">
                    <path
                      fill="rgb(85.879517%, 19.60907%, 21.179199%)"
                      d="M 25.484375 12.808594 C 24.5 12.808594 23.675781 13.613281 23.675781 14.796875 C 23.675781 16.050781 24.597656 16.792969 25.578125 16.792969 C 26.398438 16.792969 26.90625 16.332031 27.203125 15.917969 L 26.53125 15.460938 C 26.359375 15.738281 26.066406 16.007812 25.582031 16.007812 C 25.035156 16.007812 24.785156 15.703125 24.628906 15.40625 L 27.230469 14.300781 L 27.101562 13.976562 C 26.847656 13.339844 26.261719 12.808594 25.484375 12.808594 Z M 25.519531 13.574219 C 25.875 13.574219 26.128906 13.769531 26.238281 14 L 24.5 14.746094 C 24.425781 14.167969 24.957031 13.574219 25.515625 13.574219 Z M 25.519531 13.574219 "
                      fill-opacity="1"
                      fill-rule="nonzero"
                    />
                  </g>
                  <g clip-path="url(#id4)">
                    <path
                      fill="rgb(23.529053%, 72.938538%, 32.939148%)"
                      d="M 22.433594 16.675781 L 23.285156 16.675781 L 23.285156 10.808594 L 22.433594 10.808594 Z M 22.433594 16.675781 "
                      fill-opacity="1"
                      fill-rule="nonzero"
                    />
                  </g>
                </svg>
                <strong className="py-1 px-4 text-slate-300">Login with Google</strong>
              </a>

              {/* End Social Button */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginIndex;
