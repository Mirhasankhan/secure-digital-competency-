"use client";
import { Mail } from "lucide-react";
import { useRef, useState } from "react";
import {
  useResendOtpMutation,
  useVerifyUserMutation,
} from "../../redux/features/auth/authApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const VerifyEmail = () => {
  const [verifyUserEmail, { isLoading }] = useVerifyUserMutation();
  const [resendOtp] = useResendOtpMutation();
  const email = localStorage.getItem("email");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [otp, setOtp] = useState({
    d1: "",
    d2: "",
    d3: "",
    d4: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const rawValue = e.target.value;
    const value = rawValue.slice(0, 1);
    if (!/^\d?$/.test(value)) return;
    const field = `d${index + 1}` as keyof typeof otp;
    const newOtp = { ...otp, [field]: value };
    setOtp(newOtp);

    if (value && index < 5) {
      setTimeout(() => {
        inputRefs.current[index + 1]?.focus();
      }, 10);
    }
  };
  const navigate = useNavigate();

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !e.currentTarget.value && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const otpString = Object.values(otp).join("");
  const isComplete = otpString.length === 4;

  const handleVerify = async () => {
    const verifyData = {
      email,
      otp: otpString,
    };
    const response = await verifyUserEmail(verifyData);
    if (response.data) {
      navigate("/");
      localStorage.removeItem("email");
      toast.success("Email verified successfully");
    }
  };
  const handleResendOtp = async () => {
    const response = await resendOtp({ email });
    console.log(response);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 p-2 via-blue-50 to-indigo-100">
      <div className="mt-12 flex flex-col items-center w-full bg-white md:w-2/5 xl:w-1/3 2xl:w-1/4 shadow-md mx-auto p-3  rounded-[4px]">
        <div className="p-3 bg-blue-100 rounded-full">
          <Mail className="text-blue-800"></Mail>
        </div>
        <h1 className="text-xl font-medium py-2">Verify Your Email</h1>
        <p className="text-gray-600">
          We&apos;ve sent a 4-digit verification code to
        </p>
        <p className="text-primary">{email}</p>
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-2 mt-2">
            {[0, 1, 2, 3].map((i) => (
              <input
                key={i}
                ref={(el) => {
                  inputRefs.current[i] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                className="w-12 h-12 text-center text-xl border rounded-md focus:outline-none"
                value={otp[`d${i + 1}` as keyof typeof otp]}
                onChange={(e) => handleChange(e, i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                disabled={i !== 0 && !otp[`d${i}` as keyof typeof otp]} // Disable if previous is empty
              />
            ))}
          </div>

          <button
            onClick={handleVerify}
            disabled={!isComplete || isLoading}
            className={`mt-2 w-full py-2 rounded-[4px] text-white font-semibold transition 
          ${isComplete ? "bg-primary " : "bg-gray-400 cursor-not-allowed"}`}
          >
            {isLoading ? "Verifying..." : "Verify"}
          </button>
          <p className="text-gray-600">Didn&apos;t receive the code?</p>
          <p
            onClick={() => handleResendOtp()}
            className="text-primary hover:underline cursor-pointer"
          >
            Resend verification code
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
