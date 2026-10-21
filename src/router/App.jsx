import { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from '../containers/Login.jsx'
import Dashboard from '../containers/Dashboard.jsx'
import Loading from '../containers/Loading.jsx'
import ViewReports from '../components/ViewReports.jsx'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Loading />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/ViewReport/:name/:idReport' element={<ViewReports />} />
          <Route path='/Dashboard/:name/*' element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
