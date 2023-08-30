import React, {useContext, useState} from "react";
import noteContext from "../context/notes/nodeContext"

const AddNote = (props) => {
    const context = useContext(noteContext)
    const {addNote} = context;
    const {showAlert} = props
    const [note, setNote] = useState({title:"",description:"",tags:""})

    const handleAdd = (e)=>{
      e.preventDefault()
        addNote(note.title,note.description,note.tags)
        setNote({title:"",description:"",tags:""})
        showAlert("Note Added Successfully" , "primary")
        }
    
    const change = (e)=>{
        setNote({...note, [e.target.name]:e.target.value})
    }
  return (
    <div>
      <div className="container my-5">
        <h1> Add a Note </h1>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input type="text" className="form-control" id="title" aria-describedby="emailHelp" name="title"  value={note.title}  onChange={change} minLength={5} required />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
                Description
            </label>
            <input type="text" className="form-control" name="description" id="description" value={note.description}  onChange={change} minLength={5} required />
          </div>
          <div className="mb-3">
            <label htmlFor="tags" className="form-label">
                Tags
            </label>
            <input type="text" className="form-control" name="tags" id="tags" value={note.tags}  onChange={change} />
          </div>
          <button type="submit"disabled={note.title.length<5||note.description.length<5} onClick={handleAdd}  className="btn btn-primary">
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
