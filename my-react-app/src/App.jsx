import { useState } from 'react'
import Nav from './Nav/Nav.jsx'
import Home from './Nav/HomeFolder/Home.jsx'
import About from './Nav/AboutFolder/About.jsx'
import ToDoListPage from './ToDoListPage/todolistfpage.jsx'
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import { SpeedInsights } from "@vercel/speed-insights/next"


function App() {

  return (
    <>
      <Home />
      <SpeedInsights />
    </>
  )
}

export default App;
