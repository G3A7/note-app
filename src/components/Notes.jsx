import { useContext, useEffect, useState } from "react";
import Modal from "./Modal";
import { NoteProvider } from "../Context/ContextNotesProvider";
import { TokenProvider } from "../Context/ContextTokenProvider";
import toast from "react-hot-toast";
import { data } from "react-router-dom";

function Notes() {
  const [showModal, setShowModal] = useState(false);
  const { getNotes, deleteNote } = useContext(NoteProvider);
  const { token } = useContext(TokenProvider);
  const [loader, setLoader] = useState(false);
  const [loaderIcone, setLoaderIcon] = useState(false);
  const [notes, setNotes] = useState(null);
  // "dd".toUpperCase
  async function getNotesToPage() {
    try {
      const { notes } = await getNotes();
      console.log(notes);
      setNotes(notes);
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteNoteFromPage(id) {
    const deletePromise = deleteNote(id);
    toast.promise(deletePromise, {
      loading: "loading",
      success: "success",
    });
    try {
      setLoaderIcon((prev) => ({ ...prev, [id]: true }));
      const data = await deletePromise;
      // console.log(data);
      if (data.msg == "done") {
        console.log("sssss");
        getNotesToPage();
      }
      // setNotes(notes);
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
            <div className="bg-white p-2 rounded-md transition-all duration-300 cursor-pointer hover:translate-y-[3px] ">
              <h2 className="font-bold text-xl custom-style">{item.title.toUpperCase()}</h2>
              <p className="font-medium mt-1 max-h-[350px]  overflow-y-auto">{item.content}</p>
              <div className="flex justify-center items-center gap-2 mt-3">
                <button className=" relative overflow-hidden bg-sky-600 rounded-lg  text-white px-3 py-2 md:rounded-lg cursor-pointer hover:bg-sky-700 text-lg block after:absolute after:w-[10px] after:h-[100%] after:rotate-[15deg] after:top-[0px] after:left-[-15px] after:bg-slate-200  hover:after:left-[calc(100%_+_5px)] after:transition-all after:duration-300">
                  <i className="fa-solid fa-pen-to-square"></i>
                </button>
                <button
                  onClick={() => {
                    deleteNoteFromPage(item._id);
                  }}
                  className="relative overflow-hidden bg-red-500  rounded-lg  text-white px-3 py-2 md:rounded-lg cursor-pointer hover:bg-red-600  text-lg block after:absolute after:w-[10px] after:h-[100%] after:rotate-[15deg] after:top-[0px] after:left-[-15px] after:bg-slate-200  hover:after:left-[calc(100%_+_5px)] after:transition-all after:duration-300"
                >
                  {loaderIcone[item._id] ? (
                    <i className="fas fa-spin fa-spinner"></i>
                  ) : (
                    <i className="fa-solid fa-trash-can"></i>
                  )}
                </button>
                <button className="relative overflow-hidden bg-amber-500 rounded-lg  text-white px-3 py-2 md:rounded-lg cursor-pointer hover:bg-amber-500 text-lg block after:absolute after:w-[10px] after:h-[100%] after:rotate-[15deg] after:top-[0px] after:left-[-15px] after:bg-slate-200  hover:after:left-[calc(100%_+_5px)] after:transition-all after:duration-300">
                  <i className="fa-solid fa-square-check"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          setShowModal(true);
        }}
        className="fixed bottom-[10px] right-[15px]   sm:bottom-[50px] sm:right-[30px] overflow-hidden bg-sky-500 rounded-lg  text-white px-3 py-2 md:rounded-lg cursor-pointer hover:bg-sky-600 text-lg block after:absolute after:w-[10px] after:h-[100%] after:rotate-[15deg] after:top-[0px] after:left-[-15px] after:bg-slate-200  hover:after:left-[calc(100%_+_5px)] after:transition-all after:duration-300 disabled:cursor-not-allowed z-[60] "
      >
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
    </div>
  );
}

export default Notes;
