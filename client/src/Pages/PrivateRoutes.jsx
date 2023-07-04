import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PrivateRoutes = ({ Component }) => {
  let session;
  const navigate = useNavigate();
  useEffect(() => {
    let auth = sessionStorage.getItem("auth");
    session = auth;
    if (!auth) {
      //   console.log(!auth);
      navigate("/login");
    }
  }, [session]);

  return (
    <>
      <Component />
    </>
  );
};

export default PrivateRoutes;
