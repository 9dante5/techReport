import { createSlice } from "@reduxjs/toolkit"
import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { dbFirestore } from "../../firebase/FirebaseConfig";

const initialState = {
    reports: [],
}

export const reportsSlice = createSlice({
    name: 'reports',
    initialState,
    reducers: {
        setReports: (state, action) => {
            state.reports = action.payload;
        },
    }
})

export const { setReports } = reportsSlice.actions;
export default reportsSlice.reducer

//actions (funciones)

// Create
export const createReportsAsync = async (data) => {
    try {
        const response = await addDoc(collection(dbFirestore, "reports"), data);

        if (response.id) {
            console.log('se creo correctamente')
        }
    } catch (error) {
        console.error(error)
    }
}

// Read
export const readReportsAsync = async () => {
    const datos = []
    
    try {
        const reportsColetion = collection(dbFirestore, "reports")
        const quieriData = await getDocs(reportsColetion)

        quieriData.forEach((reporte) => {
            datos.push({...reporte.data()})
        })

        return datos
    } catch (error) {
        console.log(error)
    }
}

// Update


// Dalete
export const deleteReportsAsync = async (id) => {

    try {

        const reportsColection = collection(dbFirestore, 'reports')

        const reportsQuery = query(reportsColection, where('id', '==', id))

        const queryData = await getDocs(reportsQuery)

        queryData.forEach((docu) => {
            const docRef = doc(dbFirestore, 'reports', docu.id)
            deleteDoc(docRef)
        })

    } catch (error) {
        console.log(error)
    }
}