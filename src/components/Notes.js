import React,{useContext, useEffect, useRef, useState} from 'react'
import noteContext from "../context/notes/nodeContext"
import NoteItem from './NoteItem'
import AddNote from './AddNote'
import { useNavigate } from 'react-router-dom'

const Notes = (props) => {
  const {showAlert} = props
  let history = useNavigate()
    const context = useContext(noteContext)
    const {notes,getNotes,editNote} = context
    useEffect(() => {
      getNotes()
      // eslint-disable-next-line
    }, [])
    const ref = useRef(null)
    const refClose = useRef(null)
    
    const updateNote = (note) => {
      ref.current.click();
      if(document.getElementById('exampleModal').style.display !== "block"){document.getElementById('exampleModal').style.display = "block"}
      setNote({id:note._id, utitle :note.title, udescription :note.description, utags :note.tags})
    }
    const hideModal = () => {
        document.getElementById('exampleModal').style.display = "none"
    }

    const [note, setNote] = useState({id:"", utitle:"",udescription:"",utags:""})


    const handleAdd = (e)=>{
      editNote(note.id, note.utitle, note.udescription, note.utags)
      refClose.current.click();
      props.showAlert("Note updated Successfully", "success")
      }
    
    const change = (e)=>{
        setNote({...note, [e.target.name]:e.target.value})
    }
  return (
    <>
        <AddNote showAlert={showAlert}/>
        <button ref={ref} type="button" className="btn btn-primary d-none" >
          Launch demo modal
        </button>
        <div className="modal" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                <button ref={refClose} type="button" className="btn-close" onClick={hideModal}></button>
              </div>
              <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="utitle" className="form-label">
                    Title
                  </label>
                  <input type="text" className="form-control" id="utitle" aria-describedby="emailHelp" value={note.utitle} name="utitle"  onChange={change} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="udescription" className="form-label">
                      Description
                  </label>
                  <input type="text" className="form-control" value={note.udescription} name="udescription" id="udescription" onChange={change} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="utags" className="form-label">
                      Tags
                  </label>
                  <input type="text" className="form-control" value={note.utags} name="utags" id="utags" onChange={change} />
                </div>
              </form>
              </div>
              <div className="modal-footer">
                <button ref={refClose} type="button" className="btn btn-secondary" onClick={hideModal}>Close</button>
                <button type="button" disabled={note.utitle.length<5||note.udescription.length<5} className="btn btn-primary" onClick={handleAdd}>Update Note</button>
              </div>
            </div>
          </div>
        </div>
      <div className="container">
      <div className="row my-3">
            <h1> Your Notes </h1>
            <div className="container mx-2">
            {notes.length===0 &&  "No Notes to Display"}
            </div>
            {notes.map((note)=>{
            return <NoteItem showAlert={showAlert} key={note._id} updateNote={updateNote} note={note}/>
            })}
        </div>
      </div>
    </>
  )
}

export default Notes
