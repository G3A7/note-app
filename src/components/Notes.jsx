import { useContext, useEffect, useState } from "react";
import Modal from "./Modal";
import { NoteProvider } from "../Context/ContextNotesProvider";
import { TokenProvider } from "../Context/ContextTokenProvider";
import ModalUpdate from "./ModalUpdate";
import toast from "react-hot-toast";

function Notes() {
  const [showModal, setShowModal] = useState(false);
  const { getNotes, deleteNote } = useContext(NoteProvider);
  const { token } = useContext(TokenProvider);
  const [loader, setLoader] = useState(false);
  const [loaderIcone, setLoaderIcon] = useState(false);
  const [notes, setNotes] = useState(null);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [id, setID] = useState(null);
  // const [completed, setCompleted] = useState([]);
  // "dd".toUpperCase
  async function getNotesToPage() {
    try {
      const data = await getNotes();
      if (data.msg == "not notes found") {
        setNotes([]);
      } else {
        setNotes(data.notes);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteFromPage(id) {
    setLoaderIcon((prev) => ({ ...prev, [id]: true }));
    const promiseDElete = deleteNote(id);
    toast.promise(promiseDElete, {
      success: "sucess",
      loading: "loading",
    });
    try {
      const data = await promiseDElete;
      setNotes(data?.notes);
    } catch (error) {
      console.log(error);
    } finally {
      setLoaderIcon((prev) => ({ ...prev, [id]: false }));
    }
  }

  useEffect(() => {
    token && getNotesToPage();
  }, [token]);

  return (
    <div>
      <div className="flex flex-wrap">
        {notes?.map((item) => (
          <div key={item._id} className="p-3 w-full  md:w-1/2">
            <div className="bg-white border-b-1 sm:border-b-0 p-2 rounded-md transition-all duration-300 cursor-pointer hover:translate-y-[3px] ">
              <h2 className="font-bold text-xl custom-style">{item.title.toUpperCase()}</h2>
              <p className="font-medium mt-1 max-h-[250px]  bg-slate-100 rounded-sm p-1 overflow-y-auto  break-words">
                {item.content}
              </p>
              <div className="flex justify-center items-center gap-2 mt-3">
                <button
                  onClick={() => {
                    setModalUpdate(true);
                    setID(item._id);
                    // setShowModal(true);
                  }}
                  className=" relative overflow-hidden bg-sky-600 rounded-lg  text-white px-3 py-2 md:rounded-lg cursor-pointer hover:bg-sky-700 text-lg block after:absolute after:w-[10px] after:h-[100%] after:rotate-[15deg] after:top-[0px] after:left-[-15px] after:bg-slate-200  hover:after:left-[calc(100%_+_5px)] after:transition-all after:duration-300"
                >
                  <i className="fa-solid fa-pen-to-square"></i>
                </button>
                <button
                  onClick={() => {
                    deleteFromPage(item._id);
                  }}
                  className="relative overflow-hidden bg-red-500  rounded-lg  text-white px-3 py-2 md:rounded-lg cursor-pointer hover:bg-red-600  text-lg block after:absolute after:w-[10px] after:h-[100%] after:rotate-[15deg] after:top-[0px] after:left-[-15px] after:bg-slate-200  hover:after:left-[calc(100%_+_5px)] after:transition-all after:duration-300"
                >
                  {loaderIcone[item._id] ? (
                    <i className="fas fa-spin fa-spinner"></i>
                  ) : (
                    <i className="fa-solid fa-trash-can"></i>
                  )}
                </button>
                {/* <button
                  onClick={() => {
                    console.log("dsdas");
                  }}
                  className="relative overflow-hidden bg-amber-500 rounded-lg  text-white px-3 py-2 md:rounded-lg cursor-pointer hover:bg-amber-500 text-lg block after:absolute after:w-[10px] after:h-[100%] after:rotate-[15deg] after:top-[0px] after:left-[-15px] after:bg-slate-200  hover:after:left-[calc(100%_+_5px)] after:transition-all after:duration-300"
                >
                  <i className="fa-solid fa-square-check"></i>
                </button> */}
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          setShowModal(true);
        }}
        className=" btn fixed bottom-[10px] right-[15px]   sm:bottom-[50px] sm:right-[30px] overflow-hidden bg-sky-500 rounded-lg  text-white px-3 py-2 md:rounded-lg cursor-pointer hover:bg-sky-600 text-lg block after:absolute after:w-[10px] after:h-[100%] after:rotate-[15deg] after:top-[0px] after:left-[-15px] after:bg-slate-200  hover:after:left-[calc(100%_+_5px)] after:transition-all after:duration-300 disabled:cursor-not-allowed z-[60]   "
      >
        <span className=" text-sm fixed bottom-[70px] right-[0px]   sm:bottom-[110px] sm:right-[10px]  rounded-md  invisible  bg-slate-700 p-2 text-white ">
          Add Note
        </span>
        <i className="fa-solid fa-plus"></i>
      </button>
      {showModal && (
        <>
          <Modal
            setLoader={setLoader}
            loader={loader}
            setNotes={setNotes}
            setShowModal={setShowModal}
          />
        </>
      )}

      {modalUpdate && (
        <ModalUpdate
          setModalUpdate={setModalUpdate}
          loader={loader}
          setLoader={setLoader}
          id={id}
          notes={notes}
          setNotes={setNotes}
        />
      )}
    </div>
  );
}

export default Notes;
