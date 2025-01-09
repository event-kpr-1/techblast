import React from 'react'
import { Route , Routes } from 'react-router-dom'
import {Toaster } from 'react-hot-toast'
import MainApp from './MainApp.js'

const App = () => {

  

  return (
    
    <div>
      <Routes>
       
        <Route path = '/:evid/*' element = {<MainApp/>} />
      </Routes>
        
      <Toaster/>

      
      
      
    </div>
  )
}

export default App