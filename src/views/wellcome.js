import React, { useState } from "react";
import { useSelector } from "react-redux";

const Wellcome = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  console.log("cu",currentUser)
  const [showLoader, setShowLoader] = useState(false);
  return (
    <>
      <div className="container">
        <h2>
          Wellcome <b> {currentUser?.firstName} {currentUser?.lastName}</b>!
        </h2>
      </div>
    </>
  );
};

export default Wellcome;
