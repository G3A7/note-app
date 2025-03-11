import axios from "axios";
import img from "../assets/undraw_access-account_aydp.svg";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { TokenProvider } from "../Context/ContextTokenProvider";
function Login() {
  const { setToken } = useContext(TokenProvider);
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };
  async function onSubmit(vals, help) {
    console.log(help);
    const dataPromise = axios.post(`https://note-sigma-black.vercel.app/api/v1/users/signIn`, vals);
    toast.promise(dataPromise, {
      loading: "loading",

      success: "success",
    });
    try {
      const { data } = await dataPromise;
      console.log(data);
      if (data.msg == "done") {
        setToken(data.token);
        help.setSubmitting(false);
        localStorage.setItem("token", JSON.stringify(data.token));
        setTimeout(() => {
          navigate("/notes");
        }, 1000);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.msg);
    }
  }
  const validationSchema = Yup.object().shape({
    email: Yup.string().required().email(),
    password: Yup.string()
      .required()
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/),
  });
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  return (
    <div>
      <h1 className="text-center  font-bold text-xl custom-style ">Login To Note App </h1>
      <div className="p-5  relative flex flex-col md:flex-row  items-center justify-center">
        <div className="hidden md:block md:h-auto md:w-auto md:max-w-sm mb-5 md:mb-0">
          <img src={img} alt="" />
        </div>
        <form onSubmit={formik.handleSubmit} className=" md:ps-5 w-full md:max-w-md  ">
          <div className="mb-5">
            <input
              onInput={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
              onBlur={formik.handleBlur}
              type="email"
              id="email"
              name="email"
              placeholder="Example@gmail.com"
              className={`mt-1 w-full rounded-md border-gray-200 shadow-xs sm:text-sm ${
                formik.errors.email && formik.touched.email
                  ? "border border-red-500"
                  : "border-transparent"
              } `}
            />
            {formik.errors.email && formik.touched.email && (
              <p className="text-red-700 ms-2">*{formik.errors.email}</p>
            )}
          </div>
          <div className="mb-5">
            <input
              onInput={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
              onBlur={formik.handleBlur}
              type="password"
              id="password"
              name="password"
              placeholder="*********"
              className={`mt-1 w-full rounded-md border-gray-200 shadow-xs sm:text-sm ${
                formik.errors.password && formik.touched.password
                  ? "border border-red-500"
                  : "border-transparent"
              } `}
            />
            {formik.errors.password && formik.touched.password && (
              <p className="text-red-700 ms-2">*{formik.errors.password}</p>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={!formik.dirty || !formik.isValid || formik.isSubmitting}
              className="relative overflow-hidden bg-sky-500 w-full rounded-lg md:w-auto text-white px-3 py-2 md:rounded-lg cursor-pointer hover:bg-sky-600 text-lg block after:absolute after:w-[10px] after:h-[100%] after:rotate-[15deg] after:top-[0px] after:left-[-15px] after:bg-slate-200  hover:after:left-[calc(100%_+_5px)] after:transition-all after:duration-300 disabled:cursor-not-allowed  "
            >
              {formik.isSubmitting ? <i className="fas fa-spin fa-spinner"></i> : "Register Now"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
