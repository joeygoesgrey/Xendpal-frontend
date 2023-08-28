import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL, encrypt, storeDataInSession } from "./utils/utils";
import { ApplicationContext } from "./context/ApplicationContext";

const GoogleCallback = () => {
  const { dispatch } = React.useContext(ApplicationContext);
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");

      const response = await fetch(`${API_BASE_URL}/user/login/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();
      const encryptedAccessToken = encrypt(data.access_token);
      const encryptedRefreshToken = encrypt(data.refresh_token);

      storeDataInSession("access_token", encryptedAccessToken);
      storeDataInSession("refresh_token", encryptedRefreshToken);

      const someFunction = async () => {
        if (data.access_token) {
          dispatch({ type: "SET_ISUSERLOGGEDIN", payload: true });

          await new Promise((resolve) => setTimeout(resolve, 3000));

          window.location.href = "/home"; // This will cause a full page reload
        } else {
          navigate("/auth/login");
        }
      };
      await someFunction();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleLogin();
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <span className="loading loading-ring loading-lg"></span>
    </div>
  );
};

export default GoogleCallback;
