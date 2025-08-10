import { Link } from "react-router-dom";
import { useProfileQuery } from "../../redux/features/auth/authApi";

const Overview = () => {
  const { data: profile, isLoading } = useProfileQuery("");
  if (isLoading) {
    return "Loading...........";
  }
  return (
    <div className="bg-blue-400 bg-opacity-25 flex flex-col items-center justify-center p-16">
      <h1 className="text-2xl font-semibold md:text-5xl pb-6 text-primary">
        Welcome,{profile?.data?.sanitizedUser?.fullName}
      </h1>
      <h1 className="text-2xl font-semibold md:text-5xl ">
        Master Your Digital Skills
      </h1>
      <h1 className="text-2xl font-semibold md:text-5xl text-primary mt-6">
        A1 to C2 Certification
      </h1>
      <p className="text-center pt-4">
        Take our comprehensive 3-step assessment to evaluate and certify your
        digital <br /> competency level. From beginner (A1) to expert (C2), get
        recognized for your skills <br /> with official certification.
      </p>
      <Link to="/assesment">
        <button className="text-white bg-primary px-8 py-3 rounded-xl font-medium mt-6">
          Start Assesment
        </button>
      </Link>
      <div className="md:flex justify-between mt-8 gap-24">
        <div className="text-center">
          <h1 className="font-medium pb-2">Total Questions</h1>
          <h1>144</h1>
        </div>
        <div className="text-center">
          <h1 className="font-medium pb-2">Total Assesment</h1>
          <h1>3</h1>
        </div>
        <div className="text-center">
          <h1 className="font-medium pb-2">Your Current level</h1>
          <h1>{profile?.data?.sanitizedUser?.currentLevel}</h1>
        </div>
      </div>
    </div>
  );
};

export default Overview;
