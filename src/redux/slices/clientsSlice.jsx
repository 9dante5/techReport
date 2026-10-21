import { createSlice } from "@reduxjs/toolkit"
import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { dbFirestore } from "../../firebase/FirebaseConfig";
import Swal from "sweetalert2";

const initialState = {
    clients: [],
}

export const clientsSlice = createSlice({
    name: 'clients',
    initialState,
    reducers: {
        setClients: (state, action) => {
            state.clients = action.payload;
        },
    }
})

export const { setClients } = clientsSlice.actions;
export default clientsSlice.reducer

//actions (funciones)

// Create
export const createClientsAsync = async (data) => {
    try {
        const response = await addDoc(collection(dbFirestore, "clients"), data);

        if (response.id) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "El usuario se creo correctamente",
                showConfirmButton: false,
                timer: 1500
            });
        }
    } catch (error) {
        console.error(error)
    }
}

// Read
export const readClientsAsync = async () => {
    const datos = []

    try {
        const clientsColetion = collection(dbFirestore, "clients")
        const quieriData = await getDocs(clientsColetion)

        quieriData.forEach((cliente) => {
            datos.push({ ...cliente.data() })
        })

        return datos
    } catch (error) {
        console.log(error)
    }
}

// Update
export const updateClientsAsync = async (id, data) => {

    try {

        const clientsColection = collection(dbFirestore, 'clients')

        const clientsQuery = query(clientsColection, where('id', '==', id))

        const queryData = await getDocs(clientsQuery)

        queryData.forEach((docu) => {
            const docRef = doc(dbFirestore, 'clients', docu.id)
            updateDoc(docRef, data)
        })

    } catch (error) {
        console.log(error)
    }
}

// Delete
export const deleteClientsAsync = async (id) => {

    try {

        const clientsColection = collection(dbFirestore, 'clients')

        const clientsQuery = query(clientsColection, where('id', '==', id))

        const queryData = await getDocs(clientsQuery)

        queryData.forEach((docu) => {
            const docRef = doc(dbFirestore, 'clients', docu.id)
            deleteDoc(docRef)
        })

    } catch (error) {
        console.log(error)
    }
}