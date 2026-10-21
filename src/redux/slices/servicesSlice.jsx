import { createSlice } from "@reduxjs/toolkit"
import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { dbFirestore } from "../../firebase/FirebaseConfig";

const initialState = {
    services: [],
}

export const servicesSlice = createSlice({
    name: 'services',
    initialState,
    reducers: {
        setServices: (state, action) => {
            state.services = action.payload;
        },
    }
})

export const { setServices } = servicesSlice.actions;
export default servicesSlice.reducer

//actions (funciones)

// Create
export const createServicesAsync = async (data) => {
    try {
        const response = await addDoc(collection(dbFirestore, "services"), data);

        if (response.id) {
            console.log('se creo correctamente')
        }
    } catch (error) {
        console.error(error)
    }
}

// Read
export const readServicesAsync = async () => {
    const datos = []

    try {
        const servicesColetion = collection(dbFirestore, "services")
        const quieriData = await getDocs(servicesColetion)

        quieriData.forEach((servicio) => {
            datos.push({ ...servicio.data() })
        })

        return datos
    } catch (error) {
        console.log(error)
    }
}

// Update
export const updateServicesAsync = async (id, data) => {

    try {

        const servicesColection = collection(dbFirestore, 'services')

        const servicesQuery = query(servicesColection, where('id', '==', id))

        const queryData = await getDocs(servicesQuery)

        queryData.forEach((docu) => {
            const docRef = doc(dbFirestore, 'services', docu.id)
            updateDoc(docRef, data)
        })

    } catch (error) {
        console.log(error)
    }
}

// Delete
export const deleteServicessAsync = async (id) => {

    try {

        const servicesColection = collection(dbFirestore, 'services')

        const servicesQuery = query(servicesColection, where('id', '==', id))

        const queryData = await getDocs(servicesQuery)

        queryData.forEach((docu) => {
            const docRef = doc(dbFirestore, 'services', docu.id)
            deleteDoc(docRef)
        })

    } catch (error) {
        console.log(error)
    }
}