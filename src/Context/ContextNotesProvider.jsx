import axios from "axios";
import { createContext, useContext } from "react";
import { TokenProvider } from "./ContextTokenProvider";
import { data } from "react-router-dom";

export const NoteProvider = createContext();
// const myAxios = axios.create();

// eslint-disable-next-line react/prop-types
function ContextNotesProvider({ children }) {
  const { token } = useContext(TokenProvider);

  async function AddNotes(vals) {
    try {
      const { data } = await axios.post(`https://note-sigma-black.vercel.app/api/v1/notes`, vals, {
        headers: {
          token: `3b8ny__${token}`,
        },
      });
      return await getNotes();
    } catch (error) {
      console.log(error);
    }
  }

  async function getNotes() {
    try {
      const { data } = await axios.get(`https://note-sigma-black.vercel.app/api/v1/notes`, {
        headers: {
          token: `3b8ny__${token}`,
        },
      });
      return data;
    } catch (error) {
      if (error.response.data.statusCode == 404) {
        return error.response.data;
      } else {
        console.log(error);
      }
    }
  }

  async function deleteNote(id) {
    try {
      const { data } = await axios.delete(
        `https://note-sigma-black.vercel.app/api/v1/notes/${id}`,
        {
          headers: {
            token: `3b8ny__${token}`,
          },
        }
      );
      return await getNotes();
    } catch (error) {
      console.log(error);
    }
  }

  async function updateNote(id, val) {
    try {
      const { data } = await axios.put(
        `https://note-sigma-black.vercel.app/api/v1/notes/${id}`,
        val,
        {
          headers: {
            token: `3b8ny__${token}`,
          },
        }
      );
      return await getNotes();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <NoteProvider.Provider value={{ AddNotes, getNotes, deleteNote, updateNote }}>
      {children}
    </NoteProvider.Provider>
  );
}

export default ContextNotesProvider;
