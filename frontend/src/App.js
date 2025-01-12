import React from 'react'
import { Route , Routes } from 'react-router-dom'
import {Toaster } from 'react-hot-toast'
import MainApp from './MainApp.js'
import Test from './Test.js'

const App = () => {

  

  return (
    
    <div>
      <Routes>
       
        <Route path = '/:evid/*' element = {<MainApp/>} />
        <Route path = '/test' element = {<Test/>} />
      </Routes>
        
      <Toaster/>

      
      
      
    </div>
  )
}

export default App