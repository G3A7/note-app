import axios from "axios";
import img from "../assets/undraw_access-account_aydp.svg";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
function Register() {
  const navigate = useNavigate();
  const initialValues = {
    name: "",
    email: "",
    password: "",
    age: "",
    phone: "",
  };
  async function onSubmit(vals, help) {
    console.log(help);
    const dataPromise = axios.post(`https://note-sigma-black.vercel.app/api/v1/users/signUp`, vals);
    toast.promise(dataPromise, {
      loading: "loading",

      success: "success",
    });
    try {
      const { data } = await dataPromise;
      console.log(data);
      if (data.msg == "done") {
        console.log("Ahmed");
        help.setSubmitting(false);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.msg);
    }
  }
  const validationSchema = Yup.object().shape({
    name: Yup.string().required().min(3).max(15),
    email: Yup.string().required().email(),
    password: Yup.string()
      .required()
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/),
    age: Yup.number().min(12).max(35).required(),
    phone: Yup.string()
      .required()
      .matches(/^01[1025][0-9]{8}$/),
  });
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <div>
      <h1 className="text-center  font-bold text-xl custom-style ">Register To Note App </h1>
      <div className="p-5  relative flex flex-col md:flex-row  items-center justify-center">
        <div className="hidden md:block md:h-auto md:w-auto md:max-w-sm mb-5 md:mb-0">
          <img src={img} alt="" />
        </div>
        <form onSubmit={formik.handleSubmit} className=" md:ps-5 w-full md:max-w-md  ">
          <div className="mb-5">
            <input
              onInput={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.name}
              onBlur={formik.handleBlur}
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              className={`mt-1 w-full rounded-md border-gray-200 shadow-xs sm:text-sm ${
                formik.errors.name && formik.touched.name
                  ? "border border-red-500"
                  : "border-transparent"
              } `}
            />
            {formik.errors.name && formik.touched.name && (
              <p className="text-red-700 ms-2">*{formik.errors.name}</p>
            )}
          </div>
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
          <div className="mb-5">
            <input
              onInput={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.age}
              onBlur={formik.handleBlur}
              type="number"
              id="age"
              name="age"
              placeholder="age..20"
              min={0}
              className={`mt-1 w-full rounded-md border-gray-200 shadow-xs sm:text-sm ${
                formik.errors.age && formik.touched.age
                  ? "border border-red-500"
                  : "border-transparent"
              } `}
            />
            {formik.errors.age && formik.touched.age && (
              <p className="text-red-700 ms-2">*{formik.errors.age}</p>
            )}
          </div>
          <div className="mb-5">
            <input
              onInput={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.phone}
              onBlur={formik.handleBlur}
              type="text"
              id="phone"
              name="phone"
              placeholder="+201279281753"
              min={0}
              className={`mt-1 w-full rounded-md border-gray-200 shadow-xs sm:text-sm ${
                formik.errors.phone && formik.touched.phone
                  ? "border border-red-500"
                  : "border-transparent"
              }  `}
            />
            {formik.errors.phone && formik.touched.phone && (
              <p className="text-red-700 ms-2">*{formik.errors.phone}</p>
            )}
          </div>
          <div className="">
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

export default Register;
