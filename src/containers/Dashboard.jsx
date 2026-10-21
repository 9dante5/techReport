import React from 'react'
import { Route, Routes, useNavigate, useParams } from 'react-router-dom'
import { ContainerDashboard, NavbartDashboard, NombreSesiones, SaludoNavbart, SesionesNavbart, TextSaludo } from '../styles/dashboardStyled'
import { FaRegHandPeace } from 'react-icons/fa'
import Reports from '../components/Reports.jsx'
import Users from '../components/Users.jsx'
import MyServices from '../components/MyServices.jsx'
import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { loginAdmin, obtenerDataAdmin } from '../redux/slices/adminSlice.jsx'
import { useDispatch } from 'react-redux'
import { auth } from '../firebase/FirebaseConfig.jsx'

const Dashboard = () => {

  const { name } = useParams()
  const navigate = useNavigate()

  const dispatch = useDispatch()

  // --- cargar informacion del usuario al redux ---
  useEffect(() => {
    const validateUserState = onAuthStateChanged(auth, user => {

      if (user) {
        obtenerDataAdmin(user.uid).then((userSelect) => userSelect == undefined ? <></> :
          dispatch(loginAdmin({
            uid: userSelect.uid,
            displayName: userSelect.displayName
          }))
        )
      }
    })

    return () => validateUserState();
  }, [dispatch])


  return (
    <>
      <ContainerDashboard>
        <NavbartDashboard>
          <SaludoNavbart>
            <TextSaludo>Hola {name} <FaRegHandPeace /></TextSaludo>
          </SaludoNavbart>
          <SesionesNavbart>
            <NombreSesiones onClick={() => { navigate('/Dashboard/' + name + '/*') }}>Reportes</NombreSesiones>
            <NombreSesiones onClick={() => { navigate('/Dashboard/' + name + '/Users') }}>Usuarios</NombreSesiones>
            <NombreSesiones onClick={() => { navigate('/Dashboard/' + name + '/MyServices') }}>Mis servicios</NombreSesiones>
          </SesionesNavbart>
        </NavbartDashboard>

        <Routes>
          <Route path='/*' element={<Reports />} />
          <Route path='/Users' element={<Users />} />
          <Route path='/MyServices' element={<MyServices />} />
        </Routes>
      </ContainerDashboard>
    </>
  )
}

export default Dashboard