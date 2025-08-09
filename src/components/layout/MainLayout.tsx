import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="min-h-[calc(100vh-100px)]">
      <Outlet />
    </div>
  );
};

export default MainLayout;
