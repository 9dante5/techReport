import { Document, Text, Page, StyleSheet, View, Image, Font } from "@react-pdf/renderer";
import { NumLett } from "../helpers/numberToLetter";
import firma from '../assets/firma.png'
import myFontBold from '../fonts/OpenSans-Bold.ttf'
import myFontRegular from '../fonts/OpenSans-Medium.ttf'


Font.register({
    family: 'miFuenteBold',
    src: myFontBold
})

Font.register({
    family: 'miFuenteMedium',
    src: myFontRegular
})

const styles = StyleSheet.create({
    page: {
        backgroundColor: "transparent",
        display: "flex",
        flexDirection: "column",
        fontSize: "13px",
        padding: "50px 30px",
        gap: "40px",
    },

    containerEncabezado: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "60px",
    },

    containerInfoEncabezado: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },

    textEncabezado: {
        fontFamily: 'miFuenteBold',
    },

    containerConcepto: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "5px",
    },

    containerServ: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "1"
    },

    textMedium: {
        fontFamily: 'miFuenteMedium',
    },

    containerFooter: {
        width: "100%",
        display: "flex",
        position: "absolute",
        bottom: "0",
        left: "0",
        padding: "50px 30px",
        gap: "50px",
    },

    containerFirma: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
    },

    imgFirma: {
        width: "150px",
        height: "auto"
    }
})

const CreateBillPdf = ({ DataReport, Dataclient }) => {

    // -- calcular el precio total
    const CalculatePrice = (job1, job2, job3, job4, job5, job6, type, delivery, urgent) => {

        let dataJob1 = job1 == undefined ? 0 : job1 == "" ? 0 : parseInt(job1[type])
        let dataJob2 = job2 == undefined ? 0 : job2 == "" ? 0 : parseInt(job2[type])
        let dataJob3 = job3 == undefined ? 0 : job3 == "" ? 0 : parseInt(job3[type])
        let dataJob4 = job4 == undefined ? 0 : job4 == "" ? 0 : parseInt(job4[type])
        let dataJob5 = job5 == undefined ? 0 : job5 == "" ? 0 : parseInt(job5[type])
        let dataJob6 = job6 == undefined ? 0 : job6 == "" ? 0 : parseInt(job6[type])


        let price = dataJob1 + dataJob2 + dataJob3 + dataJob4 + dataJob5 + dataJob6

        if (delivery == "true") {
            price += 15000
        }

        if (urgent == "true") {
            price += 15000
        }

        return price
    }

    // -- aisgnar fecha
    const DateBuill = () => {
        let fechayhora = new Date()
        let año = fechayhora.getFullYear()
        let mes = fechayhora.getMonth()
        let dia = fechayhora.getDate()

        switch (mes) {
            case 0:
                return {
                    "year": año,
                    "month": 'enero',
                    "day": dia
                };
            case 1:
                return {
                    "year": año,
                    "month": 'febrero',
                    "day": dia
                };
            case 2:
                return {
                    "year": año,
                    "month": 'marzo',
                    "day": dia
                };
            case 3:
                return {
                    "year": año,
                    "month": 'abril',
                    "day": dia
                };
            case 4:
                return {
                    "year": año,
                    "month": 'mayo',
                    "day": dia
                };
            case 5:
                return {
                    "year": año,
                    "month": 'junio',
                    "day": dia
                };
            case 6:
                return {
                    "year": año,
                    "month": 'julio',
                    "day": dia
                };
            case 7:
                return {
                    "year": año,
                    "month": 'agosto',
                    "day": dia
                };
            case 8:
                return {
                    "year": año,
                    "month": 'septiembre',
                    "day": dia
                };
            case 9:
                return {
                    "year": año,
                    "month": 'octubre',
                    "day": dia
                };
            case 10:
                return {
                    "year": año,
                    "month": 'noviembre',
                    "day": dia
                };
            case 11:
                return {
                    "year": año,
                    "month": 'diciembre',
                    "day": dia
                };
            default:
                break;
        }
    }

    return (
        <Document>
            <Page size="LETTER" style={styles.page}>
                <View style={styles.containerEncabezado}>
                    <View style={styles.containerInfoEncabezado}>
                        <Text style={styles.textEncabezado}>{Dataclient?.nameClient}</Text>
                        <Text style={styles.textEncabezado}>{Dataclient?.typeDocument}: {Dataclient?.numDocument}</Text>
                    </View>
                    <Text style={styles.textEncabezado}>DEBE A:</Text>
                    <View style={styles.containerInfoEncabezado}>
                        <Text style={styles.textEncabezado}>Andrés Elías Polo Bermúdez</Text>
                        <Text style={styles.textEncabezado}>C.c. 1151958879</Text>
                    </View>
                </View>

                <View style={styles.containerConcepto}>
                    <Text style={styles.textMedium}>La suma de {CalculatePrice(DataReport?.job1, DataReport?.job2, DataReport?.job3, DataReport?.job4, DataReport?.job5, DataReport?.job6, DataReport?.typeEquip, DataReport?.homeDelivery, DataReport?.urgent).toLocaleString('es-CO')} ({NumLett(CalculatePrice(DataReport?.job1, DataReport?.job2, DataReport?.job3, DataReport?.job4, DataReport?.job5, DataReport?.job6, DataReport?.typeEquip, DataReport?.homeDelivery, DataReport?.urgent))} m/l) por concepto de: </Text>
                    <View style={styles.containerServ}>
                        {
                            DataReport?.job1 == "" ? <></> :
                                <Text style={styles.textMedium}>• {DataReport?.job1.nameService}</Text>}
                        {
                            DataReport?.job2 == "" ? <></> :
                                <Text style={styles.textMedium}>• {DataReport?.job2.nameService}</Text>}
                        {
                            DataReport?.job3 == "" ? <></> :
                                <Text style={styles.textMedium}>• {DataReport?.job3.nameService}</Text>}
                        {
                            DataReport?.job4 == "" ? <></> :
                                <Text style={styles.textMedium}>• {DataReport?.job4.nameService}</Text>}
                        {
                            DataReport?.job5 == "" ? <></> :
                                <Text style={styles.textMedium}>• {DataReport?.job5.nameService}</Text>}
                        {
                            DataReport?.job6 == "" ? <></> :
                                <Text style={styles.textMedium}>• {DataReport?.job6.nameService}</Text>}
                    </View>
                </View>
                <View style={styles.containerFooter}>
                    <Text style={styles.textMedium}>Cali, {DateBuill().month} {DateBuill().day} {DateBuill().year}</Text>
                    <Text style={styles.textMedium}>Atentamente,</Text>
                    <View>
                        <Image style={styles.imgFirma} src={firma} />
                        <Text style={styles.textMedium}>Andrés Elías Polo Bermúdez</Text>
                        <Text style={styles.textMedium}>C.c. 1.151.958.879</Text>
                    </View>
                </View>
            </Page>
        </Document>
    )
}

export default CreateBillPdf