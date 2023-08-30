import "./App.css";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoteState from "./context/notes/NoteState";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useState } from "react";

function App() {
  const [alert, setalert] = useState(null)
  const showAlert = (message,type) =>  {
    setalert({
      message: message,
      type: type
    })
    setTimeout(() => {
      setalert(null)
    }, 1500);
  }
  return (
    <>
      <NoteState>
        <BrowserRouter>
        <Routes>
          {/* <Navbar /> */}
          <Route exact path="/" element={<Login />}></Route>
          <Route exact path="/Singup" element={<Signup/>}></Route>
          <Route exact path="/Home" element={<Home alert={alert} showAlert={showAlert} />}></Route>
        </Routes>
          {/* <Alert/>
          <div className="container">
            <Routes>
             </Route>
            </Routes>
          </div> */}
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
