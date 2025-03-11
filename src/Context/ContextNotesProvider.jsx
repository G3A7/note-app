import axios from "axios";
import { createContext, useContext } from "react";
import { TokenProvider } from "./ContextTokenProvider";

export const NoteProvider = createContext();

// eslint-disable-next-line react/prop-types
function ContextNotesProvider({ children }) {
  const { token } = useContext(TokenProvider);

  async function AddNote(vals) {
    try {
      const { data } = await axios.post(`https://note-sigma-black.vercel.app/api/v1/notes`, vals, {
        headers: {
          token: "3b8ny__" + token,
        },
      });
      if (data.msg == "done") {
        const notes = await getNotes();
        return notes;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async function getNotes() {
    try {
      const { data } = await axios.get(`https://note-sigma-black.vercel.app/api/v1/notes`, {
        headers: {
          token: "3b8ny__" + token,
        },
      });
      return data;
    } catch (error) {
      console.log("");
      throw error;
    }
  }

  async function deleteNote(id) {
    try {
      const { data } = await axios.delete(
        `https://note-sigma-black.vercel.app/api/v1/notes/${id}`,
        {
          headers: {
            token: "3b8ny__" + token,
          },
        }
      );
      // if (data.msg == "done") {
      //   const notes = await getNotes();
      //   return notes;
      // }
      // console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  return (
    <NoteProvider.Provider value={{ AddNote, getNotes, deleteNote }}>
      {children}
    </NoteProvider.Provider>
  );
}

export default ContextNotesProvider;
