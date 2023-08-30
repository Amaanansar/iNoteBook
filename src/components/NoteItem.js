import React, {useContext} from "react";
import noteContext from "../context/notes/nodeContext"

const NoteItem = (props) => {
  const context = useContext(noteContext)
  const {deleteNote} = context;
  const deletetheNotes = (note_id) => {
    deleteNote(note_id)
    showAlert("Note Deleted Successfully", "danger")
  }
   const  {note, updateNote, showAlert} = props
  return (
    <div className='col-md-3 '>
      <div className="card my-3" >
        <div className="card-body">
            <div className="d-flex">
            <h5 className="card-title">{note.title}</h5>
                <div className="d-flex">
                    <i className="fa-regular fa-trash-can mx-2" onClick={()=>{deletetheNotes(note._id)}}></i>
                    <i className="fa-regular fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
                </div>
            </div>
            <p className="card-text">{note.description}</p>
            <p className="card-text">{note.tags}</p>

        </div>
    </div>
    </div>
  )
}

export default NoteItem
