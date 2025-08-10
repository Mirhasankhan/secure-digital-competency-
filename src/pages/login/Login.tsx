"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { TLoginValues } from "../../types/cart.type";
import { useAppDispatch } from "../../redux/hooks";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { setUser } from "../../redux/features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [loginUser, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginValues>();

  const onSubmit: SubmitHandler<TLoginValues> = async (data) => {
    console.log(data);
    try {
      const response: any = await loginUser(data);
      console.log(response);

      if (response.data?.success) {
        toast.success("Login Successful");

        navigate("/overview");
        dispatch(
          setUser({
            name: response.data.userInfo.username,
            email: response.data.userInfo.email,
            role: response.data.userInfo.role,
            token: response.data.accessToken,
          })
        );
        localStorage.setItem("token", response.data?.accessToken);
      } else if (response.error) {
        toast.error(response.error.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("An unexpected error occurred.");
    }
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 p-2 via-blue-50 to-indigo-100 py-12 min-h-screen">
      <div className="w-full md:w-2/5 xl:w-1/3 2xl:w-1/4 shadow-md mx-auto p-6 dark:text-white bg-white rounded-[4px]">
        {/* <img src={logo}></img> */}
        <h1 className="text-xl font-medium ppy-2 ">Welcome Back!</h1>
        <p className="text-sm">
          Enter to get unlimited access to data & information
        </p>
        <h1 className="pt-3">Admin Email: mirhasan000034@gmail.com</h1>
        <p>Password: 123456</p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-lg pt-6 bg-white"
        >
          <div className="mb-4">
            <label className="block pb-1 font-medium">Email Address</label>
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
              {...register("password", { required: "Password is required" })}
              className="w-full p-2 border rounded-[4px]"
              placeholder="Enter password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          <div className="flex justify-between items-center py-3">
            <Link to="/reset-password" className="text-primary hover:underline">
              Forgot Password?
            </Link>
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className="text-[#FFF] py-2 font-semibold rounded-[4px] w-full bg-primary"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-4 w-4 inline mr-2"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
                Authenticating...
              </>
            ) : (
              <>Login</>
            )}
          </button>
        </form>

        <div className="text-center pt-2">
          Dont have an account?
          <Link to="/register" className="text-primary hover:underline">
            Register Here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
