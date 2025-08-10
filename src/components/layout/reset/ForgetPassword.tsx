"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { ArrowLeft, LoaderCircle, Mail } from "lucide-react";
import { toast } from "react-toastify";
import { TLoginValues } from "../../../types/cart.type";
import { useSendOtpMutation } from "../../../redux/features/auth/authApi";
import { Link } from "react-router-dom";

const ForgetPassword = ({
  setActive 
}: {
  setActive: (value: string) => void;
 
}) => {
  const [sendOpt, { isLoading }] = useSendOtpMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginValues>();

  const onSubmit: SubmitHandler<TLoginValues> = async (data) => {
  
    try {
      const response = await sendOpt({ email: data.email });
      if (response.data) {
        toast.success(response.data.message);
        setActive("verify");
        localStorage.setItem("email", data.email);       
      } else if (response.error) {
        if ("data" in response.error) {
          const errorData = response.error.data as { message?: string };
          toast.error(errorData.message || "Something went wrong.");
        } else {
          toast.error("Unexpected error structure.");
        }
      }
    } catch (error) {
      console.log(error);

      toast.error("An unexpected error occurred.");
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 p-2 via-blue-50 to-indigo-100">
      <div className="mt-12 flex flex-col items-center w-full bg-white md:w-2/5 xl:w-1/3 2xl:w-1/4 shadow-md mx-auto p-5  rounded-[4px]">
        <div className="p-3 bg-blue-100 rounded-full">
          <Mail size={30} className="text-blue-800"></Mail>
        </div>
        <h1 className="text-xl font-medium py-2">Reset Password</h1>
        <p className="text-gray-600 text-center">
          Enter your email address and we&apos;ll send you a verification code
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-lg pt-6  bg-white"
        >
          <div className="mb-4">
            <label className="block pb-2 font-medium">Email</label>
            <input
              {...register("email", {
                required: "Email is required",
              })}
              className="w-[430px] p-2 border rounded-[4px]"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className="bg-primary text-white py-3 w-full font-medium rounded-[4px]"
          >
            {isLoading ? (
              <LoaderCircle className="animate-spin mx-auto"></LoaderCircle>
            ) : (
              "Send OTP"
            )}
          </button>
        </form>
        <Link to="/" className="flex items-center gap-1 pt-6">
          <ArrowLeft size={15} /> Back to login
        </Link>
      </div>
    </div>
  );
};

export default ForgetPassword;
