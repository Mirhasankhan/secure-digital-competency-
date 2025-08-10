"use client";

import { useState } from "react";
import ForgetPassword from "../../components/layout/reset/ForgetPassword";
import VerifyOtp from "../../components/layout/reset/VerifyOtp";
import NewPass from "../../components/layout/reset/NewPassword";

const ResetPassword = () => {
  const [active, setActive] = useState("forget");

  return (
    <div>
      {active === "forget" && <ForgetPassword setActive={setActive} />}
      {active === "verify" && <VerifyOtp setActive={setActive} />}
      {active === "reset" && <NewPass />} 
    </div>
  );
};

export default ResetPassword;
