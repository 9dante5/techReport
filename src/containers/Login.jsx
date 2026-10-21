import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ButtonFormLogin, ContainerFormLogin, ContainerLogin, FormLogin, ImgLogin, InputFormLogin } from '../styles/loginStyled'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { auth } from '../firebase/FirebaseConfig'
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import logo from '../assets/logo2.png'
import { obtenerDataAdmin, loginAdmin } from '../redux/slices/adminSlice'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

const login = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: async (values) => {
            try {
                const response = await signInWithEmailAndPassword(auth, values.email, values.password)

                const dataAdmin = await obtenerDataAdmin(response.user.uid)

                if (response) {
                    dispatch(loginAdmin({
                        uid: dataAdmin.uid,
                        displayName: dataAdmin.displayName
                    }))

                    navigate('/Dashboard/' + dataAdmin.displayName + '/*')
                }

                formik.resetForm()
            } catch (error) {
                console.error(error)
                alert("datos incorrectos")
            }
        },
        validationSchema: Yup.object({

        })
    })


    return (
        <>
            <ContainerLogin>
                <ContainerFormLogin>
                    <ImgLogin src={logo} />
                    <FormLogin onSubmit={formik.handleSubmit}>
                        <InputFormLogin
                            name='email'
                            type='text'
                            placeholder='Correo electronico'
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            onBlur={formik.handleBur}
                        />
                        <InputFormLogin
                            name='password'
                            type='password'
                            placeholder='Contraseña'
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            onBlur={formik.handleBur}
                        />

                        <ButtonFormLogin type='
                         submit'>Iniciar sesion</ButtonFormLogin>
                    </FormLogin>
                </ContainerFormLogin>
            </ContainerLogin>
        </>


    )
}

export default login