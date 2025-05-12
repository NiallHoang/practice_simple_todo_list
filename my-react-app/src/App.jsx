import { useState } from 'react'
import ToDoList from './myComponents/TodoLists.jsx'
import { SpeedInsights } from "@vercel/speed-insights/next"


function App() {

  return (
    <>
      <ToDoList/>
      <SpeedInsights />
    </>
  )
}

export default App;
