import { Outlet } from "react-router-dom";

function Home() {
  return (
    <div className="mx-auto container min-h-[80vh]  ">
      <Outlet />
    </div>
  );
}

export default Home;
