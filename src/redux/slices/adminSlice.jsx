import { createSlice } from "@reduxjs/toolkit"
import { dbFirestore } from "../../firebase/FirebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";

const initialState = {
    uid: null,
    displayName: null
}

export const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        loginAdmin: (state, action) => {
            state.uid = action.payload.uid;
            state.displayName = action.payload.displayName;
        },
        logoutAdmin: (state) => {
            state.uid = null;
            state.displayName = null;
        }
    }
})

export const {loginAdmin, logoutAdmin} = adminSlice.actions
export default adminSlice.reducer

//actions (funciones)

//read admin

export const obtenerDataAdmin = async (uid) => {
    const adminColetion = collection(dbFirestore, "users")
    const adminQuery = query(adminColetion, where("uid", "==", uid))
    const quieriData = await getDocs(adminQuery)

    let data

    quieriData.forEach((user) =>{
        data = user.data()
    })

    return data
}