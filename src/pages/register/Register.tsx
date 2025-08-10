"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { TLoginValues } from "../../types/cart.type";
import { useCreatePendingUserMutation } from "../../redux/features/auth/authApi";
import { toast } from "react-toastify";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState("User");
  const [createPendingUser, { isLoading }] = useCreatePendingUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginValues>();

  const onSubmit: SubmitHandler<TLoginValues> = async (data) => {
    try {
      const userData = {
        ...data,
        role: active,
      };
      console.log(userData);
      const response = await createPendingUser(userData);
      console.log(response);
      if (response.data?.success) {
        toast.success("User Created Successfully");
        navigate("/verify-email");
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
    <div className="bg-gradient-to-br from-purple-50 p-2 via-blue-50 to-indigo-100 py-12 min-h-screen">
      <div className="w-full mb-4 flex justify-between font-medium cursor-pointer items-center bg-gray-100 p-1 md:w-2/5 xl:w-1/3 2xl:w-1/4 shadow-md mx-auto">
        <h1
          onClick={() => setActive("User")}
          className={`w-full rounded-[4px] ${
            active == "User" ? "bg-white" : "bg-transparent"
          } py-1 text-center`}
        >
          Student
        </h1>
        <h1
          onClick={() => setActive("Admin")}
          className={`w-full rounded-[4px]  ${
            active == "Admin" ? "bg-white" : "bg-transparent"
          } py-1 text-center`}
        >
          Admin
        </h1>
      </div>
      <div className="w-full md:w-2/5 xl:w-1/3 2xl:w-1/4 shadow-md mx-auto p-6 dark:text-white bg-white rounded-[4px]">
        {/* <Image src={logo} alt="" height={60} width={60}></Image> */}
        <h1 className="text-xl font-medium ppy-2 ">Create Account</h1>
        <p className="text-sm">
          Enter to get unlimited access to data & information
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-lg pt-6 bg-white"
        >
          <div className="mb-4">
            <label className="block pb-1 font-medium">Full Name</label>
            <input
              {...register("fullName", {
                required: "Full name is required",
              })}
              className="w-full p-2 border rounded-[4px]"
              placeholder="Enter your fullname"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm">{errors.fullName.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block pb-1 font-medium">Email</label>
            <input
              {...register("email", {
                required: "Email is required",
              })}
              className="w-full p-2 border rounded-[4px]"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block pb-1 font-medium">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
              className="w-full p-2 border rounded-[4px]"
              placeholder="Enter password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block pb-1 font-medium">Phone Number</label>
            <input
              type="number"
              {...register("phoneNumber", {
                required: "phone number is required",
                minLength: {
                  value: 8,
                  message: "Number must be at least 8 characters long",
                },
              })}
              className="w-full p-2 border rounded-[4px]"
              placeholder="Enter phone number"
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>
          <button
            disabled={isLoading}
            type="submit"
            className="bg-primary text-white py-3 w-full font-medium rounded-[4px]"
          >
            {isLoading ? "Signing Up.." : "Create Account"}
          </button>
        </form>

        <div className="flex pt-2 justify-center">
          <h1>Already have an account?</h1>
          <Link to="/" className="text-primary hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
