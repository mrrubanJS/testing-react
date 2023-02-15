import React from "react"

import "./styles/App.css"

import {BrowserRouter, Route, Routes} from "react-router-dom"
import About from "./pages/About"
import Posts from "./pages/Posts"


function App() {
  return(
    <BrowserRouter>
      <Routes>  
          <Route path="/posts" element={<Posts/>}/>

         <Route path="/about" element={<About/>}/>


      </Routes>
      
    </BrowserRouter>

  )
  
}

export default App
