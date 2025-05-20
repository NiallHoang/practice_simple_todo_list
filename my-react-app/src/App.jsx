import { useState } from 'react'
import ToDoList from './todoComponents/TodoLists.jsx'
import Nav from './Nav/Nav.jsx'
import Home from './Nav/HomeFolder/Home.jsx'
import About from './Nav/AboutFolder/About.jsx'

import {BrowserRouter, Routes, Route, NavLink} from 'react-router-dom'

import { SpeedInsights } from "@vercel/speed-insights/next"


function App() {

  return (
    // <BrowserRouter>
    //   <header>
    //     <Nav />
    //   </header>

    //   <Routes>
    //     <Route path='/' element={<Home />} />
    //     <Route path='/todolist' element={<ToDoList />} />
    //     <Route path='/about' element={<About />} />
    //   </Routes>

    //   <SpeedInsights />
    // </BrowserRouter>
    <Home />
  )
}

export default App;
