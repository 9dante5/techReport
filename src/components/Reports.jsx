import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import React from 'react'
import { useState } from 'react';
import { ButtonFormReports, CardReports, ContainerCardsReports, ContainerFormReports, ContainerInfoCardResports, ContainerInputsFormReports, ContainerReports, ContainerTitleCardReports, FieldsetFormReports, FormReports, InfoCardReports, InputFormReports, LabelFormReports, LegendFormReports, OptionSelectFormReports, SelectFormReports, SubtitleCardReports, TextareaFormReports, TitleAccordion, TitleCardReports, TitleContainerFormReports } from '../styles/dashboardReportsStyled';
import { useSelector } from 'react-redux';
import { readClientsAsync, setClients, updateClientsAsync } from '../redux/slices/clientsSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { readServicesAsync, setServices } from '../redux/slices/servicesSlice';
import { createReportsAsync, readReportsAsync, setReports } from '../redux/slices/reportsSlice';
import { useNavigate, useParams } from 'react-router-dom';

const reports = () => {

  const [expanded, setExpanded] = useState(false);
  const [status, setStatus] = useState(0)

  const tecnico = useSelector((store) => store.admin)
  const clientes = useSelector((store) => store.clients)
  const servicios = useSelector((store) => store.services)
  const reportes = useSelector((store) => store.reports)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { name } = useParams()


  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

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

  useEffect(() => {
    handleDataServices()
    handleDataClients()
    handleDataReports()
  }, [status])

  // --- formik para crear servicios ---
  const formik = useFormik({
    initialValues: {
      id: '',
      creationDate: {},
      creationTime: {},
      client: '',
      uidTechnical: '',
      typeEquip: '',
      otherEquip: '',
      brand: '',
      model: '',
      numSerie: '',
      stateEquip: '',
      principalProblem: '',
      diagnosis: '',
      job1: '',
      job2: '',
      job3: '',
      job4: '',
      job5: '',
      job6: '',
      myReport: '',
      funtional: '',
      homeDelivery: '',
      urgent: '',
      noteFuntion: '',
    },
    onSubmit: async (values) => {
      let fechayhora = new Date()
      let año = fechayhora.getFullYear()
      let mes = fechayhora.getMonth()
      let dia = fechayhora.getDate()
      let hora = fechayhora.getHours()
      let minutos = fechayhora.getMinutes()

      const obtenerJob = (id) => {
        let data

        if (id == '') {
          return ''
        } else {
          data = servicios.services.find(u => u.id == id)
          return data
        }
      }

      let job1 = obtenerJob(values.job1)
      let job2 = obtenerJob(values.job2)
      let job3 = obtenerJob(values.job3)
      let job4 = obtenerJob(values.job4)
      let job5 = obtenerJob(values.job5)
      let job6 = obtenerJob(values.job6)

      let idService = crypto.randomUUID()

      let datosReporte = {
        id: idService,
        creationDate: { day: dia, month: mes, year: año },
        creationTime: { hours: hora, minutes: minutos },
        client: values.client,
        uidTechnical: tecnico.uid,
        typeEquip: values.typeEquip,
        otherEquip: values.otherEquip,
        brand: values.brand,
        model: values.model,
        numSerie: values.numSerie,
        stateEquip: values.stateEquip,
        principalProblem: values.principalProblem,
        diagnosis: values.diagnosis,
        job1: job1,
        job2: job2,
        job3: job3,
        job4: job4, 
        job5: job5,
        job6: job6,
        myReport: values.myReport,
        homeDelivery: values.homeDelivery,
        funtional: values.funtional,
        urgent: values.urgent,
        noteFuntion: values.noteFuntion,
      }

      const createNewListService = () => {
        let findClient = clientes.clients.find(u => u.id == values.client)

        let newListService = []

        findClient.services.forEach(element => {
          newListService.push(element)
        });

        newListService.push(idService)

        return newListService
      }

      let addServiceClient = {
        id: values.client,
        services: createNewListService()
      }


      formik.resetForm()
      setStatus(status + 1)
      updateClientsAsync(values.client, addServiceClient)
      createReportsAsync(datosReporte)

    },
    validationSchema: Yup.object({

    })
  })

  // -- abrir el reporte --
  const openReport = (id) => {
    navigate('/ViewReport/' + name + '/' + id)
  }

  return (
    <>
      <ContainerReports>
        <ContainerFormReports>

          <TitleContainerFormReports>Nuevo reporte</TitleContainerFormReports>

          <FormReports onSubmit={formik.handleSubmit}>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
              <AccordionSummary
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <TitleAccordion>Informacion del equipo</TitleAccordion>
              </AccordionSummary>
              <AccordionDetails>
                <ContainerInputsFormReports>
                  <FieldsetFormReports>
                    <LegendFormReports>Informacion del cliente</LegendFormReports>

                    <LabelFormReports> Cliente
                      <SelectFormReports
                        name='client'
                        onChange={formik.handleChange}
                        value={formik.values.client}
                        onBlur={formik.handleBlur}
                      >
                        <OptionSelectFormReports value="">Seleccionar cliente...</OptionSelectFormReports>
                        {
                          clientes.clients?.map((cliente) => (
                            <OptionSelectFormReports key={cliente.id} value={cliente.id}>
                              {cliente.nameClient}
                            </OptionSelectFormReports>
                          ))
                        }
                      </SelectFormReports>
                    </LabelFormReports>
                  </FieldsetFormReports>

                  <FieldsetFormReports>
                    <LegendFormReports>Datos del equipo</LegendFormReports>
                    <LabelFormReports> Tipo de equipo
                      <SelectFormReports
                        name='typeEquip'
                        onChange={formik.handleChange}
                        value={formik.values.typeEquip}
                        onBlur={formik.handleBlur}
                      >
                        <OptionSelectFormReports value=''>Tipo de equipo...</OptionSelectFormReports>
                        <OptionSelectFormReports value='pricePc'>PC escritorio</OptionSelectFormReports>
                        <OptionSelectFormReports value='priceLaptop'>Portatil - todo en uno</OptionSelectFormReports>
                        <OptionSelectFormReports value='priceMac'>MAC</OptionSelectFormReports>
                        <OptionSelectFormReports value='otro'>Otro tipo de equipo</OptionSelectFormReports>
                      </SelectFormReports>
                    </LabelFormReports>

                    <LabelFormReports> Otro tipo de equipo?
                      <InputFormReports
                        name='otherEquip'
                        onChange={formik.handleChange}
                        value={formik.values.otherEquip}
                        onBlur={formik.handleBlur}
                      />
                    </LabelFormReports>

                    <LabelFormReports> Marca del equipo
                      <InputFormReports
                        name='brand'
                        onChange={formik.handleChange}
                        value={formik.values.brand}
                        onBlur={formik.handleBlur}
                      />
                    </LabelFormReports>

                    <LabelFormReports> Modelo del equipo
                      <InputFormReports
                        name='model'
                        onChange={formik.handleChange}
                        value={formik.values.model}
                        onBlur={formik.handleBlur}
                      />
                    </LabelFormReports>

                    <LabelFormReports> Numero de serie
                      <InputFormReports
                        name='numSerie'
                        onChange={formik.handleChange}
                        value={formik.values.numSerie}
                        onBlur={formik.handleBlur}
                      />
                    </LabelFormReports>

                    <LabelFormReports> Estado del equipo
                      <TextareaFormReports
                        name='stateEquip'
                        onChange={formik.handleChange}
                        value={formik.values.stateEquip}
                        onBlur={formik.handleBlur}
                      >
                      </TextareaFormReports>
                    </LabelFormReports>
                  </FieldsetFormReports>
                </ContainerInputsFormReports>
              </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
              <AccordionSummary
                aria-controls="panel2bh-content"
                id="panel2bh-header"
              >
                <TitleAccordion>Informacion del diagnostico</TitleAccordion>
              </AccordionSummary>
              <AccordionDetails>
                <ContainerInputsFormReports>
                  <FieldsetFormReports>
                    <LegendFormReports>Diagnostico</LegendFormReports>
                    <LabelFormReports> Problema principal
                      <TextareaFormReports
                        name='principalProblem'
                        onChange={formik.handleChange}
                        value={formik.values.principalProblem}
                        onBlur={formik.handleBlur}
                      ></TextareaFormReports>
                    </LabelFormReports>
                    <LabelFormReports> Diagnostico realizado
                      <TextareaFormReports
                        name='diagnosis'
                        onChange={formik.handleChange}
                        value={formik.values.diagnosis}
                        onBlur={formik.handleBlur}
                      ></TextareaFormReports>
                    </LabelFormReports>
                  </FieldsetFormReports>

                  <FieldsetFormReports>
                    <LegendFormReports>Trabajo realizado</LegendFormReports>
                    <SelectFormReports
                      name='job1'
                      onChange={formik.handleChange}
                      value={formik.values.job1}
                      onBlur={formik.handleBlur}
                    >
                      <OptionSelectFormReports value=''>Servicio...</OptionSelectFormReports>
                      {
                        servicios.services?.map((servicio) => (
                          <OptionSelectFormReports key={servicio.id} value={servicio.id}>{servicio.nameService}</OptionSelectFormReports>
                        ))
                      }
                    </SelectFormReports>
                    <SelectFormReports
                      name='job2'
                      onChange={formik.handleChange}
                      value={formik.values.job2}
                      onBlur={formik.handleBlur}
                    >
                      <OptionSelectFormReports value=''>Servicio...</OptionSelectFormReports>
                      {
                        servicios.services?.map((servicio) => (
                          <OptionSelectFormReports key={servicio.id} value={servicio.id}>{servicio.nameService}</OptionSelectFormReports>
                        ))
                      }
                    </SelectFormReports>
                    <SelectFormReports
                      name='job3'
                      onChange={formik.handleChange}
                      value={formik.values.job3}
                      onBlur={formik.handleBlur}
                    >
                      <OptionSelectFormReports value=''>Servicio...</OptionSelectFormReports>
                      {
                        servicios.services?.map((servicio) => (
                          <OptionSelectFormReports key={servicio.id} value={servicio.id}>{servicio.nameService}</OptionSelectFormReports>
                        ))
                      }
                    </SelectFormReports>
                    <SelectFormReports
                      name='job4'
                      onChange={formik.handleChange}
                      value={formik.values.job4}
                      onBlur={formik.handleBlur}
                    >
                      <OptionSelectFormReports value=''>Servicio...</OptionSelectFormReports>
                      {
                        servicios.services?.map((servicio) => (
                          <OptionSelectFormReports key={servicio.id} value={servicio.id}>{servicio.nameService}</OptionSelectFormReports>
                        ))
                      }
                    </SelectFormReports>
                    <SelectFormReports
                      name='job5'
                      onChange={formik.handleChange}
                      value={formik.values.job5}
                      onBlur={formik.handleBlur}
                    >
                      <OptionSelectFormReports value=''>Servicio...</OptionSelectFormReports>
                      {
                        servicios.services?.map((servicio) => (
                          <OptionSelectFormReports key={servicio.id} value={servicio.id}>{servicio.nameService}</OptionSelectFormReports>
                        ))
                      }
                    </SelectFormReports>
                    <SelectFormReports
                      name='job6'
                      onChange={formik.handleChange}
                      value={formik.values.job6}
                      onBlur={formik.handleBlur}
                    >
                      <OptionSelectFormReports value=''>Servicio...</OptionSelectFormReports>
                      {
                        servicios.services?.map((servicio) => (
                          <OptionSelectFormReports key={servicio.id} value={servicio.id}>{servicio.nameService}</OptionSelectFormReports>
                        ))
                      }
                    </SelectFormReports>
                    <LabelFormReports> Reporte del trabajo realizado
                      <TextareaFormReports
                        name='myReport'
                        onChange={formik.handleChange}
                        value={formik.values.myReport}
                        onBlur={formik.handleBlur}
                      ></TextareaFormReports>
                    </LabelFormReports>
                  </FieldsetFormReports>
                </ContainerInputsFormReports>
              </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
              <AccordionSummary
                aria-controls="panel3bh-content"
                id="panel3bh-header"
              >
                <TitleAccordion>Informacion del servicio</TitleAccordion>
              </AccordionSummary>
              <AccordionDetails>
                <ContainerInputsFormReports>
                  <FieldsetFormReports>
                    <LegendFormReports>Informacion adicional</LegendFormReports>

                    <LabelFormReports> ¿Trabajo a domicilio?
                      <SelectFormReports
                        name='homeDelivery'
                        onChange={formik.handleChange}
                        value={formik.values.homeDelivery}
                        onBlur={formik.handleBlur}
                      >
                        <OptionSelectFormReports value=''>¿A domicilio?</OptionSelectFormReports>
                        <OptionSelectFormReports value={true}>Si</OptionSelectFormReports>
                        <OptionSelectFormReports value={false}>No</OptionSelectFormReports>
                      </SelectFormReports>
                    </LabelFormReports>

                    <LabelFormReports> ¿Fue urgente?
                      <SelectFormReports
                        name='urgent'
                        onChange={formik.handleChange}
                        value={formik.values.urgent}
                        onBlur={formik.handleBlur}
                      >
                        <OptionSelectFormReports value=''>¿Urgente?</OptionSelectFormReports>
                        <OptionSelectFormReports value={true}>Si</OptionSelectFormReports>
                        <OptionSelectFormReports value={false}>No</OptionSelectFormReports>
                      </SelectFormReports>
                    </LabelFormReports>

                    <LabelFormReports> ¿Equipo 100% funcional?
                      <SelectFormReports
                        name='funtional'
                        onChange={formik.handleChange}
                        value={formik.values.funtional}
                        onBlur={formik.handleBlur}
                      >
                        <OptionSelectFormReports value=''>¿Funciona?</OptionSelectFormReports>
                        <OptionSelectFormReports value={true}>Si</OptionSelectFormReports>
                        <OptionSelectFormReports value={false}>No</OptionSelectFormReports>
                      </SelectFormReports>
                    </LabelFormReports>

                    <LabelFormReports> Nota
                      <TextareaFormReports
                        name='noteFuntion'
                        onChange={formik.handleChange}
                        value={formik.values.noteFuntion}
                        onBlur={formik.handleBlur}
                      ></TextareaFormReports>
                    </LabelFormReports>
                  </FieldsetFormReports>
                </ContainerInputsFormReports>
              </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
              <AccordionSummary
                aria-controls="panel4bh-content"
                id="panel4bh-header"
              >
                <TitleAccordion>Guardar reporte</TitleAccordion>
              </AccordionSummary>
              <AccordionDetails>
                <ContainerInputsFormReports>
                  <ButtonFormReports type='submit'>Crear reporte</ButtonFormReports>
                </ContainerInputsFormReports>
              </AccordionDetails>
            </Accordion>
          </FormReports>
        </ContainerFormReports>

        <ContainerCardsReports>
          {
            reportes.reports?.map((reporte) => (
              <CardReports key={reporte.id}>
                <ContainerTitleCardReports>
                  <TitleCardReports>Identificador del reporte</TitleCardReports>
                  <SubtitleCardReports onClick={() => openReport(reporte.id)}>{reporte.id}</SubtitleCardReports>
                </ContainerTitleCardReports>
                <ContainerInfoCardResports>
                  <InfoCardReports>Tipo de equipo: {reporte.typeEquip == "pricePc" ? "Pc escritorio" : reporte.typeEquip == "priceLaptop" ? "Portatil - todo en uno" : reporte.typeEquip == "priceMac" ? "MAC" : "Otro"}</InfoCardReports>
                  <InfoCardReports>Marca: {reporte.brand}</InfoCardReports>
                  <InfoCardReports>Modelo: {reporte.model}</InfoCardReports>
                  <InfoCardReports>Numero de serie: {reporte.numSerie}</InfoCardReports>
                </ContainerInfoCardResports>
              </CardReports>
            ))
          }
        </ContainerCardsReports>

      </ContainerReports>
    </>
  )
}

export default reports