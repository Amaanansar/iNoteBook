import React from 'react'
import Notes from './Notes'
import Navebar from './Navbar'
import Alert from './Alert'

const Home = (props) => {
  const {alert , showAlert} = props
  return (
    <div>
      <Navebar />
      <Alert alert={alert}/>
      <Notes showAlert={showAlert}/>
    </div>
  )
}

export default Home 
