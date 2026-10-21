import React from 'react'
import { ContainerLoading, ImgLoading } from '../styles/loadingStyled'
import { CircularProgress } from '@mui/material'
import logo from '../assets/logo.png'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase/FirebaseConfig'
import { loginAdmin, obtenerDataAdmin } from '../redux/slices/adminSlice'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useState } from 'react'

const Loading = () => {

    const timeOut = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        timeOut.current = setTimeout(() => {
            navigate("/Login")
        }, 2000);

        return () => {
            clearTimeout(timeOut.current);
        };
    }, []);

    return (
        <>
            <ContainerLoading>
                <ImgLoading src={logo} />
                <CircularProgress enableTrackSlot aria-label="Loading…" />
            </ContainerLoading>
        </>
    )
}

export default Loading