import { useContext, useRef, useState } from "react";
import img from "../assets/ninja_2.jpg";
import { NavLink } from "react-router-dom";
import { TokenProvider } from "../Context/ContextTokenProvider";

function Navbar() {
  const refUL = useRef();
  const [open, setOpen] = useState(false);
  const [openUl, setOpenUl] = useState(true);
  const [h, seth] = useState(70);
  const { token } = useContext(TokenProvider);
  function expand() {
    if (openUl) {
      const hh = refUL.current.scrollHeight + 90;
      seth(hh);
    } else {
      seth(70);
    }
    setOpenUl(!openUl);
  }
  return (
    <div
      className={` fixed top-0 left-0 right-0 z-50 shadow bg-white overflow-hidden transition-all duration-200 `}
      style={{ maxHeight: `${h}px` }}
    >
      <div className="container mx-auto ">
        <nav className="flex justify-between flex-wrap items-center p-5  ">
          <div>
            <h1 className=" custom-style text-xl font-bold cursor-pointer">My Note</h1>
          </div>
          {token && (
            <>
              <ul
                ref={refUL}
                className="mt-[15px] md:mt-0 flex-col items-center flex md:flex-row w-full order-4 md:order-0  md:w-sm justify-center gap-4  "
              >
                <li className=" w-full   text-center">
                  <NavLink
                    className="  shadow md:shadow-none  relative overflow-hidden block cursor-pointer py-1 px-1 md:px-3 mb-2 md:mb-0  text-black md:text-black  text-lg font-medium rounded-lg    after:absolute after:w-[10px] after:h-[100%] after:rotate-[15deg] after:top-[0px] after:left-[-15px] after:bg-slate-200  hover:after:left-[calc(100%_+_5px)] after:transition-all after:duration-500   md:bg-white hover:bg-sky-500
            hover:text-white transition-all duration-300"
                    // والله مش عارف هو شغال ازاي بس طوول ماهو بيادي الغرض فا انا سيبه 😂
                    to={`${location.pathname == "/" ? "/" : "/notes"}`}
                  >
                    My Notes
                  </NavLink>
                </li>
                {/* <li className=" w-full   text-center">
                  <NavLink
                    className=" shadow md:shadow-none relative overflow-hidden block cursor-pointer py-1 px-1 md:px-3 mb-2 md:mb-0  text-black  md:text-black  text-lg font-medium rounded-lg    after:absolute after:w-[10px] after:h-[100%] after:rotate-[15deg] after:top-[0px] after:left-[-15px] after:bg-slate-200  hover:after:left-[calc(100%_+_5px)] after:transition-all after:duration-500  md:bg-white hover:bg-sky-500
            hover:text-white transition-all duration-300"
                    to={"/completed"}
                  >
                    Completd
                  </NavLink>
                </li> */}
              </ul>
              <ul className="flex items-center gap-4 md:gap-0">
                <li
                  onClick={() => {
                    expand();
                    // setOpenUl(!openUl);
                  }}
                  className="block md:hidden cursor-pointer"
                >
                  <i className="fa-solid text-xl fa-bars"></i>
                </li>
                <li className="">
                  <div className="relative">
                    <div className="inline-flex items-center overflow-hidden rounded-full  bg-white ">
                      <button
                        onClick={() => {
                          setOpen(!open);
                        }}
                        className=" w-[35px] h-[35px] rounded-full  cursor-pointer text-gray-600 hover:bg-gray-50 hover:text-gray-700  "
                      >
                        <img src={img} className="rounded-full" alt="" />
                      </button>
                    </div>

                    {open && (
                      <div
                        className="fixed end-[10px] z-10 mt-2 w-56 rounded-md border border-gray-100 bg-white shadow-lg "
                        role="menu"
                      >
                        <div className="p-2">
                          <a
                            href="#"
                            className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 "
                            role="menuitem"
                          >
                            Log Out
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </li>
              </ul>
            </>
          )}
          {!token && (
            <ul className="flex gap-4 ">
              <li className=" w-full text-center">
                <NavLink
                  className="  relative overflow-hidden block cursor-pointer py-1 px-1 md:px-3 mb-2 md:mb-0  text-black  md:text-black  text-lg font-medium rounded-lg    after:absolute after:w-[10px] after:h-[100%] after:rotate-[15deg] after:top-[0px] after:left-[-15px] after:bg-slate-200  hover:after:left-[calc(100%_+_5px)] after:transition-all after:duration-500   md:bg-white hover:bg-sky-500
            hover:text-white transition-all duration-300"
                  to={"/register"}
                >
                  Register
                </NavLink>
              </li>

              <li className=" w-full text-center">
                <NavLink
                  className="  relative overflow-hidden block cursor-pointer py-1 px-1 md:px-3 mb-2 md:mb-0  text-black  md:text-black  text-lg font-medium rounded-lg    after:absolute after:w-[10px] after:h-[100%] after:rotate-[15deg] after:top-[0px] after:left-[-15px] after:bg-slate-200  hover:after:left-[calc(100%_+_5px)] after:transition-all after:duration-500   md:bg-white hover:bg-sky-500
            hover:text-white transition-all duration-300"
                  to={"/login"}
                >
                  Login
                </NavLink>
              </li>
            </ul>
          )}
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
