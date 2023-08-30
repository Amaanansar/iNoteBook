import { useState } from "react";
import NoteContext from "./nodeContext";

const NoteState = (props)=>{
  const host = "http://localhost:5000"
    const notesInitial= []
    const [notes, setNotes] = useState(notesInitial)
    // fetch Notes
    const getNotes = async()=>{
      const response = await fetch(`${host}/api/notes/fetchAllNotes`, {
        method:"GET",
        headers:{
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem("token"),
        },
      });
      const json = await response.json();
      setNotes(json)
    }


    //   Add a Note
      const addNote = async(title, description, tags)=>{
        const response = await fetch(`${host}/api/notes/addnotes`, {
          method:"POST",
          headers:{
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem("token"),
          },
          body: JSON.stringify({title,description,tags})
        });
        const json = await response.json();
        setNotes(notes.concat(json))
      }
      
      //   Delete a Note
      const deleteNote = async(id)=>{
        const response = await fetch(`${host}/api/notes/deleteNotes/${id}`, {
          method:"DELETE",
          headers:{
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem("token"),
          },
        });
        const json = await response.json();
        const newNotes =  notes.filter((note)=>{return note._id !== id})
        setNotes(newNotes)
      }

      //   Update a Note 
      const editNote = async (id, title, description, tags)=>{
        // API Call
        const response = await fetch(`${host}/api/notes/updateNotes/${id}`, {
          method:"PUT",
          headers:{
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem("token"),
          },
          body: JSON.stringify({title,description,tags})
        });
        const json = await response.json()

        let newNotes = JSON.parse(JSON.stringify(notes))
        // function tp editNote in client 
        for (let index = 0; index < newNotes.length; index++) {
          const element = newNotes[index];
          if (element._id === id) {
            newNotes[index].title = title;
            newNotes[index].description = description;
            newNotes[index].tags = tags;
            break
          }
        }
        setNotes(newNotes)
      }

    return(
        <NoteContext.Provider value={{notes,getNotes,setNotes,addNote,deleteNote,editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState