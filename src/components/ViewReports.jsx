import React from 'react'
import { readClientsAsync, setClients, updateClientsAsync } from '../redux/slices/clientsSlice'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { readServicesAsync, setServices } from '../redux/slices/servicesSlice'
import { deleteReportsAsync, readReportsAsync, setReports } from '../redux/slices/reportsSlice'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { ContainerBodyViewReports, ContainerDateCreation, ContainerHeaderViewReports, ContainerJobs, ContainerOptionsViewReports, ContainerTextData, ContainerViewReports, FieldsetBodyViewReports, LegendBodyViewReports, ListLiContainerJobs, ListUlContainerJobs, OptionViewReports, TextContent, TextDateCreation, TextTitle, TitleContainerViewReports, TitleDateCreation, TitleOptionViewReports } from '../styles/viewRoportsStyled'
import { LuPencil } from 'react-icons/lu'
import { FiTrash } from 'react-icons/fi'
import { RiFilePaperLine } from 'react-icons/ri'
import { IoIosArrowBack } from 'react-icons/io'
import { useState } from 'react'
import Swal from 'sweetalert2'
import { PDFDownloadLink } from '@react-pdf/renderer'
import CreateBillPdf from './CreateBillPdf'
import { NumLett } from '../helpers/numberToLetter'

const ViewReports = () => {

    const { name, idReport } = useParams()

    const tecnico = useSelector((store) => store.admin)
    const clientes = useSelector((store) => store.clients)
    const servicios = useSelector((store) => store.services)
    const reportes = useSelector((store) => store.reports)

    let dispatch = useDispatch()
    let navigate = useNavigate()

    //-- cargar clientes en el redux --
    async function handleDataClients() {
        await readClientsAsync().then((resp) => {
            dispatch(setClients(resp))
        })
    }

    //-- cargar servicios en el redux --
    async function handleDataServices() {
        await readServicesAsync().then((resp) => {
            dispatch(setServices(resp))
        })
    }

    //-- cargar reportes en el redux --
    async function handleDataReports() {
        await readReportsAsync().then((resp) => {
            dispatch(setReports(resp))
        })
    }

    // -- datos del reporte --
    const DataReport = () => {
        let dataReport = reportes.reports?.find(u => u.id == idReport)

        return dataReport
    }

    // -- datos del cliente --
    const Dataclient = (id) => {
        let dataClient = clientes.clients?.find(u => u.id == id)

        return dataClient
    }

    // -- calcular precio --
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

        return price.toLocaleString('es-CO')
    }

    // -- calcular mes --
    const AsignarMes = (numMes) => {
        switch (numMes) {
            case 0:
                return 'enero'
            case 1:
                return 'febrero';
            case 2:
                return 'marzo';
            case 3:
                return 'abril';
            case 4:
                return 'mayo';
            case 5:
                return 'junio';
            case 6:
                return 'julio';
            case 7:
                return 'agosto';
            case 8:
                return 'septiembre';
            case 9:
                return 'octubre';
            case 10:
                return 'noviembre';
            case 11:
                return 'diciembre';
            default:
                break;
        }
    }

    useEffect(() => {
        handleDataServices()
        handleDataClients()
        handleDataReports()
    }, [])

    // -- regresar a la pagina de reportes --
    const BackReports = () => {
        navigate('/Dashboard/' + name + '/*')
    }

    // -- editar lista de servicios --
    const NewListServices = (list, idServ, idClient) => {
        let newList = list.filter(serv => serv != idServ)

        let updateServices = {
            id: idClient,
            services: newList
        }
        updateClientsAsync(idClient, updateServices)
    }

    // -- eliminar reporte --
    const deleteReport = (list, idServ, idClient) => {
        Swal.fire({
            title: "¿Quiers eliminar este reporte?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Eliminar",
            denyButtonText: `No eliminar`
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed)
                deleteReportsAsync(idServ),
                    NewListServices(list, idServ, idClient),
                    Swal.fire("Reporte eliminado", "", "success"),
                    navigate('/Dashboard/' + name + '/*');
            else if (result.isDenied)
                Swal.fire("El reporte no fue eliminado", "", "error");
        });
    }

    return (
        <ContainerViewReports>
            <ContainerHeaderViewReports>
                <TitleContainerViewReports>Visor de reportes</TitleContainerViewReports>
                <ContainerOptionsViewReports>
                    <OptionViewReports onClick={() => BackReports()}>
                        <IoIosArrowBack />
                        <TitleOptionViewReports>Regresar</TitleOptionViewReports>
                    </OptionViewReports>

                    <OptionViewReports onClick={() => {NumLett(105020)}}>
                        <LuPencil />
                        <TitleOptionViewReports>Editar</TitleOptionViewReports>
                    </OptionViewReports>

                    <OptionViewReports onClick={() => deleteReport(Dataclient(DataReport()?.client)?.services, DataReport()?.id, DataReport()?.client)}>
                        <FiTrash />
                        <TitleOptionViewReports>Eliminar</TitleOptionViewReports>
                    </OptionViewReports>

                    <PDFDownloadLink document={<CreateBillPdf DataReport={DataReport()} Dataclient={Dataclient(DataReport()?.client)} />} fileName={'Cuenta de cobro - ' + idReport + '.pdf'}>
                        {
                            ({ loading, url, error, blob }) => loading ?
                                (<></>)
                                :
                                (
                                    <OptionViewReports>
                                        <RiFilePaperLine />
                                        <TitleOptionViewReports>Crear cuenta de cobro</TitleOptionViewReports>
                                    </OptionViewReports>
                                )
                        }
                    </PDFDownloadLink>
                </ContainerOptionsViewReports>
            </ContainerHeaderViewReports>

            <ContainerBodyViewReports>

                <ContainerDateCreation>
                    <TitleDateCreation>
                        Fecha y hora de creacion:
                    </TitleDateCreation>
                    <TextDateCreation>
                        {DataReport()?.creationDate.day}/{AsignarMes(DataReport()?.creationDate.month)}/{DataReport()?.creationDate.year} - {DataReport()?.creationTime.hours}:{DataReport()?.creationTime.minutes}
                    </TextDateCreation>
                </ContainerDateCreation>

                <FieldsetBodyViewReports>
                    <LegendBodyViewReports>Datos del cliente</LegendBodyViewReports>

                    <ContainerTextData>
                        <TextTitle>Nombre del cliente:</TextTitle>
                        <TextContent>
                            {Dataclient(DataReport()?.client)?.nameClient}
                        </TextContent>
                    </ContainerTextData>

                    <ContainerTextData>
                        {
                            Dataclient(DataReport()?.client)?.typeDocument == "Cedula" ? <TextTitle>Cedula:</TextTitle> : <TextTitle>NIT:</TextTitle>

                        }
                        <TextContent>
                            {Dataclient(DataReport()?.client)?.numDocument}
                        </TextContent>
                    </ContainerTextData>

                    <ContainerTextData>
                        <TextTitle>Direccion:</TextTitle>
                        <TextContent>
                            {Dataclient(DataReport()?.client)?.address} ({Dataclient(DataReport()?.client)?.neighborhood})
                        </TextContent>
                    </ContainerTextData>

                    <ContainerTextData>
                        <TextTitle>Informacion adicional:</TextTitle>
                        <TextContent>
                            {Dataclient(DataReport()?.client)?.aditionalInfo}
                        </TextContent>
                    </ContainerTextData>

                    <ContainerTextData>
                        <TextTitle>Numero de contacto:</TextTitle>
                        <TextContent>
                            {Dataclient(DataReport()?.client)?.phone}
                        </TextContent>
                    </ContainerTextData>

                    <ContainerTextData>
                        <TextTitle>Correo electronico:</TextTitle>
                        <TextContent>
                            {Dataclient(DataReport()?.client)?.email}
                        </TextContent>
                    </ContainerTextData>
                </FieldsetBodyViewReports>

                <FieldsetBodyViewReports>
                    <LegendBodyViewReports>Datos del equipo</LegendBodyViewReports>

                    <ContainerTextData>
                        <TextTitle>Tipo de equipo:</TextTitle>
                        <TextContent>
                            {DataReport()?.typeEquip == "pricePc" ? "Pc escritorio" : DataReport()?.typeEquip == "priceLaptop" ? "Portatil - todo en uno" : DataReport()?.typeEquip == "priceMac" ? "MAC" : "Otro"}
                        </TextContent>
                    </ContainerTextData>

                    {
                        DataReport()?.typeEquip == 'otro' ? <ContainerTextData>
                            <TextTitle>Otro:</TextTitle>
                            <TextContent>
                                {DataReport()?.otherEquip}
                            </TextContent>
                        </ContainerTextData> : <></>
                    }

                    <ContainerTextData>
                        <TextTitle>Marca:</TextTitle>
                        <TextContent>
                            {DataReport()?.brand}
                        </TextContent>
                    </ContainerTextData>

                    <ContainerTextData>
                        <TextTitle>Modelo:</TextTitle>
                        <TextContent>
                            {DataReport()?.model}
                        </TextContent>
                    </ContainerTextData>

                    <ContainerTextData>
                        <TextTitle>Numero de serie:</TextTitle>
                        <TextContent>
                            {DataReport()?.numSerie}
                        </TextContent>
                    </ContainerTextData>

                    <ContainerTextData>
                        <TextTitle>Estado del equipo:</TextTitle>
                        <TextContent>
                            {DataReport()?.stateEquip}
                        </TextContent>
                    </ContainerTextData>
                </FieldsetBodyViewReports>

                <FieldsetBodyViewReports>
                    <LegendBodyViewReports>Diagostico</LegendBodyViewReports>

                    <ContainerTextData>
                        <TextTitle>Problema principal:</TextTitle>
                        <TextContent>
                            {DataReport()?.principalProblem}
                        </TextContent>
                    </ContainerTextData>

                    <ContainerTextData>
                        <TextTitle>Diagnostico:</TextTitle>
                        <TextContent>
                            {DataReport()?.diagnosis}
                        </TextContent>
                    </ContainerTextData>

                    <ContainerJobs>
                        <TextTitle>Trabajo(s) realizado(s):</TextTitle>
                        <ContainerJobs>
                            <ListUlContainerJobs>
                                {
                                    DataReport()?.job1 == "" ? <></> :
                                        <ListLiContainerJobs key={DataReport()?.job1.id}>{DataReport()?.job1.nameService} (${parseInt(DataReport()?.job1[DataReport()?.typeEquip]).toLocaleString('es-CO')})</ListLiContainerJobs>
                                }
                                {
                                    DataReport()?.job2 == "" ? <></> :
                                        <ListLiContainerJobs key={DataReport()?.job2.id}>{DataReport()?.job2.nameService} (${parseInt(DataReport()?.job2[DataReport()?.typeEquip]).toLocaleString('es-CO')})</ListLiContainerJobs>
                                }
                                {
                                    DataReport()?.job3 == "" ? <></> :
                                        <ListLiContainerJobs key={DataReport()?.job3.id}>{DataReport()?.job3.nameService} (${parseInt(DataReport()?.job3[DataReport()?.typeEquip]).toLocaleString('es-CO')})</ListLiContainerJobs>
                                }
                                {
                                    DataReport()?.job4 == "" ? <></> :
                                        <ListLiContainerJobs key={DataReport()?.job4.id}>{DataReport()?.job4.nameService} (${parseInt(DataReport()?.job4[DataReport()?.typeEquip]).toLocaleString('es-CO')})</ListLiContainerJobs>
                                }
                                {
                                    DataReport()?.job5 == "" ? <></> :
                                        <ListLiContainerJobs key={DataReport()?.job5.id}>{DataReport()?.job5.nameService} (${parseInt(DataReport()?.job5[DataReport()?.typeEquip]).toLocaleString('es-CO')})</ListLiContainerJobs>
                                }
                                {
                                    DataReport()?.job6 == "" ? <></> :
                                        <ListLiContainerJobs key={DataReport()?.job6.id}>{DataReport()?.job6.nameService} (${parseInt(DataReport()?.job6[DataReport()?.typeEquip]).toLocaleString('es-CO')})</ListLiContainerJobs>
                                }
                            </ListUlContainerJobs>
                        </ContainerJobs>
                    </ContainerJobs>

                    <ContainerTextData>
                        <TextTitle>Reporte del trabajo realizado:</TextTitle>
                        <TextContent>
                            {DataReport()?.myReport}
                        </TextContent>
                    </ContainerTextData>
                </FieldsetBodyViewReports>

                <FieldsetBodyViewReports>
                    <LegendBodyViewReports>Datos extras</LegendBodyViewReports>

                    <ContainerTextData>
                        <TextTitle>¿Equipo funcional?:</TextTitle>
                        <TextContent>
                            {DataReport()?.funtional == 'true' ? 'Si' : 'No'}
                        </TextContent>
                    </ContainerTextData>

                    <ContainerTextData>
                        <TextTitle>Nota funcionamiento:</TextTitle>
                        <TextContent>
                            {DataReport()?.noteFuntion}
                        </TextContent>
                    </ContainerTextData>

                    <ContainerTextData>
                        <TextTitle>¿Fue a domicilio?:</TextTitle>
                        <TextContent>
                            {DataReport()?.homeDelivery == 'true' ? 'Si' : 'No'}
                        </TextContent>
                    </ContainerTextData>

                    <ContainerTextData>
                        <TextTitle>¿Fue urgente?:</TextTitle>
                        <TextContent>
                            {DataReport()?.urgent == 'true' ? 'Si' : 'No'}
                        </TextContent>
                    </ContainerTextData>
                </FieldsetBodyViewReports>

                <FieldsetBodyViewReports>
                    <LegendBodyViewReports>Valor del servicio</LegendBodyViewReports>


                    <ContainerTextData>
                        <TextTitle>Precio:</TextTitle>
                        <TextContent>$
                            {CalculatePrice(DataReport()?.job1, DataReport()?.job2, DataReport()?.job3, DataReport()?.job4, DataReport()?.job5, DataReport()?.job6, DataReport()?.typeEquip, DataReport()?.homeDelivery, DataReport()?.urgent)}
                        </TextContent>
                    </ContainerTextData>

                    {
                        DataReport()?.homeDelivery == "true" ?
                            <ContainerTextData>
                                <TextTitle>Precio del domicilio:</TextTitle>
                                <TextContent>$15.000</TextContent>
                            </ContainerTextData> : <></>
                    }

                    {
                        DataReport()?.urgent == "true" ?
                            <ContainerTextData>
                                <TextTitle>Precio por urgente:</TextTitle>
                                <TextContent>$15.000</TextContent>
                            </ContainerTextData> : <></>
                    }
                </FieldsetBodyViewReports>
            </ContainerBodyViewReports>
        </ContainerViewReports>
    )
}

export default ViewReports