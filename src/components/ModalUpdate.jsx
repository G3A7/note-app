import { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { NoteProvider } from "../Context/ContextNotesProvider";
function ModalUpdate(setShowModal, setNotes, setLoader, loader) {
  const { AddNotes } = useContext(NoteProvider);
  const validationSchema = Yup.object().shape({
    title: Yup.string().required().min(5).max(25),
    content: Yup.string().required().min(5).max(320),
  });

  async function onSubmit(vals) {
    try {
      setLoader(true);
      console.log(vals);
    //   const data = await AddNotes(vals);
    //   // console.log(data);
    //   setNotes(data.notes);
      setShowModal(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  }
  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
    },
    validationSchema,
    onSubmit,
  });
  return (
    <div>
      <div>
        <div className="fixed   top-[55%] md:top-[35%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[90] rounded-lg mx-auto bg-white p-8 shadow-2xl w-[95%] md:max-w-xl ">
          <div>
            <p className="font-bold text-2xl custom-style">Add Note</p>
            <form onSubmit={formik.handleSubmit}>
              <div className="mt-2">
                <input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  onInput={formik.handleBlur}
                  value={formik.values.title}
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Note Name.."
                  className={`w-full rounded-md border-gray-200 shadow-xs sm:text-sm  `}
                />
                {formik.touched.title && formik.errors.title && (
                  <p className="text-red-600 ms-1">{formik.errors.title}</p>
                )}
              </div>
              <div className="mt-2">
                <textarea
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  onInput={formik.handleBlur}
                  value={formik.values.content}
                  name="content"
                  id="content"
                  rows="6"
                  className="w-full rounded-md border-gray-200 shadow-xs sm:text-sm resize-none"
                ></textarea>
                {formik.touched.content && formik.errors.content && (
                  <p className="text-red-600 ms-1 mb-1">{formik.errors.content}</p>
                )}
              </div>
              <div className="flex gap-4 items-center ">
                <button className="relative overflow-hidden bg-sky-500 w-full rounded-lg  text-white px-3 py-2 md:rounded-lg cursor-pointer hover:bg-sky-600 text-lg block after:absolute after:w-[10px] after:h-[100%] after:rotate-[15deg] after:top-[0px] after:left-[-15px] after:bg-slate-200  hover:after:left-[calc(100%_+_5px)] after:transition-all after:duration-300 disabled:cursor-not-allowed  ">
                  {" "}
                  {loader ? <i className="fas fa-spin fa-spinner"></i> : "update Note"}
                </button>
                <button
                  onClick={() => {
                    setShowModal(false);
                  }}
                  className="relative overflow-hidden bg-red-500 w-full rounded-lg  text-white px-3 py-2 md:rounded-lg cursor-pointer hover:bg-red-600 text-lg block after:absolute after:w-[10px] after:h-[100%] after:rotate-[15deg] after:top-[0px] after:left-[-15px] after:bg-slate-200  hover:after:left-[calc(100%_+_5px)] after:transition-all after:duration-300 disabled:cursor-not-allowed  "
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalUpdate;
