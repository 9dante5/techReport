import React from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { ButtonCreateClients, ButtonFormModalClients, CardClients, ContainerCardClients, ContainerInfoCardClients, ContainerListCardClients, ContainerModalClients, ContainerNameDocumentCardClients, ContainerOptionsCardClients, ContainerUsers, DocumentCardClients, FormModalClients, InfoCardClients, InputFormModalClients, LabelFormModalCliets, ListaLiCardClients, ListaUlCardClients, MensajeErrorRegister, NameCardClients, OptionCardClients, OptionSelectFormModalClients, SelectFormModalClients, TextareaFormModalClients, TitleInfoCardClients, TitleServicesCardClients, TituloContainerModalClients } from '../styles/dashboardUsersStyled';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/FirebaseConfig';
import { loginAdmin, obtenerDataAdmin } from '../redux/slices/adminSlice';
import { useDispatch } from 'react-redux';
import { createClientsAsync, deleteClientsAsync, readClientsAsync, setClients, updateClientsAsync } from '../redux/slices/clientsSlice';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import { FaRegTrashCan } from 'react-icons/fa6';
import { TiPencil } from 'react-icons/ti';
import Swal from 'sweetalert2';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 340,
  bgcolor: 'background.paper',
}

const users = () => {

  const [status, setStatus] = useState(0)

  let dataInitial = JSON.parse(localStorage.getItem("clientEdit")) || {
    id: '',
    nameClient: '',
    typeDocument: '',
    numDocument: '',
    address: '',
    neighborhood: '',
    aditionalInfo: '',
    email: '',
    phone: '',
    uidTechnical: '',
    services: '',
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const id = React.useId();

  const tecnico = useSelector((store) => store.admin)
  const clientes = useSelector((store) => store.clients)

  const dispatch = useDispatch()

  // // --- cargar informacion del usuario al redux ---
  // useEffect(() => {
  //   const validateUserState = onAuthStateChanged(auth, user => {

  //     if (user) {
  //       obtenerDataAdmin(user.uid).then((userSelect) => userSelect == undefined ? <></> :
  //         dispatch(loginAdmin({
  //           uid: userSelect.uid,
  //           displayName: userSelect.displayName
  //         }))
  //       )
  //     }
  //   })

  //   return () => validateUserState();
  // }, [dispatch])

  //-- cargar clientes en el redux --
  async function handleDataClients() {
    await readClientsAsync().then((resp) => {
      dispatch(setClients(resp))
    })
  }

  useEffect(() => {
    handleDataClients()
  }, [status])

  //-- editar informacion de usuario --
  const editUser = (data) => {
    localStorage.setItem('clientEdit', JSON.stringify(data))
    location.reload();
  }

  //-- eliminar usuario
  const deleteUser = (id) => {
    Swal.fire({
      title: "¿Quiers eliminar este cliente?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      denyButtonText: `No eliminar`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed)
        deleteClientsAsync(id),
          Swal.fire("Cliente eliminado", "", "success"),
          setStatus(status + 1);
      else if (result.isDenied)
        Swal.fire("El Cliente no fue eliminado", "", "error");
    });
  }

  // -- copiar id del reporte --
  const copyIdReport = (idRoport) => {
    navigator.clipboard.writeText(idRoport)

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Reporte copiado",
      showConfirmButton: false,
      timer: 1500
    });
  }

  // --- formik para crear clientes ---
  const formik = useFormik({
    initialValues: {
      id: dataInitial.id,
      nameClient: dataInitial.nameClient,
      typeDocument: dataInitial.typeDocument,
      numDocument: dataInitial.numDocument,
      address: dataInitial.address,
      neighborhood: dataInitial.neighborhood,
      aditionalInfo: dataInitial.aditionalInfo,
      email: dataInitial.email,
      phone: dataInitial.phone,
      uidTechnical: dataInitial.uidTechnical,
      services: dataInitial.services,
    },
    onSubmit: async (values) => {

      if (dataInitial.id != '') {
        let datosClienteEdit = {
          id: dataInitial.id,
          nameClient: values.nameClient,
          typeDocument: values.typeDocument,
          numDocument: values.numDocument,
          address: values.address,
          neighborhood: values.neighborhood,
          aditionalInfo: values.aditionalInfo,
          email: values.email,
          phone: values.phone,
          uidTechnical: dataInitial.uidTechnical,
          services: dataInitial.services
        }

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "El usuario se edito correctamente",
          showConfirmButton: false,
          timer: 1500
        });

        updateClientsAsync(dataInitial.id, datosClienteEdit)
        localStorage.clear()

      } else {

        let datosCliente = {
          id: crypto.randomUUID(),
          nameClient: values.nameClient,
          typeDocument: values.typeDocument,
          numDocument: values.numDocument,
          address: values.address,
          neighborhood: values.neighborhood,
          aditionalInfo: values.aditionalInfo,
          email: values.email,
          phone: values.phone,
          uidTechnical: tecnico.uid,
          services: []
        }

        createClientsAsync(datosCliente)
      }


      formik.resetForm()
      handleClose()
      setStatus(status + 1)
    },
    validationSchema: Yup.object({
      nameClient: Yup.string()
        .required("El nombre es obligatorio"),
      typeDocument: Yup.string()
        .required("El tipo de documento es obligatorio"),
      numDocument: Yup.string()
        .required("El numero de documento es obligatorio"),
      address: Yup.string()
        .required("La direccion es obligatoria"),
      neighborhood: Yup.string()
        .required("El barrio es obligatorio"),
      aditionalInfo: Yup.string(),
      email: Yup.string()
        .email("Ingrese un correo valido")
        .required("El barrio es obligatorio"),
      phone: Yup.string()
        .required("El numero de celular es obligatorio")
        .min(10, "El numero de celular no debe tener menos de 10 digitos")
        .max(10, "El numero de celular no debe tener mas de 10 digitos")
    })
  })

  return (
    <>
      <ContainerUsers>
        <ButtonCreateClients onClick={handleOpen}>Nuevo cliente</ButtonCreateClients>

        <ContainerCardClients>
          {
            clientes.clients?.map((cliente) => (
              <CardClients key={cliente.id}>

                <ContainerNameDocumentCardClients>
                  <NameCardClients>{cliente.nameClient}</NameCardClients>
                  <DocumentCardClients>{cliente.typeDocument}: {cliente.numDocument} </DocumentCardClients>
                </ContainerNameDocumentCardClients>

                <ContainerInfoCardClients>
                  <TitleInfoCardClients> Direccion </TitleInfoCardClients>
                  <InfoCardClients> {cliente.address} ({cliente.neighborhood}) </InfoCardClients>
                </ContainerInfoCardClients>

                <ContainerInfoCardClients>
                  <TitleInfoCardClients> Informacion adicional </TitleInfoCardClients>
                  <InfoCardClients> {cliente.aditionalInfo}</InfoCardClients>
                </ContainerInfoCardClients>

                <ContainerInfoCardClients>
                  <TitleInfoCardClients> Numero de contacto </TitleInfoCardClients>
                  <InfoCardClients> {cliente.phone}</InfoCardClients>
                </ContainerInfoCardClients>

                <ContainerInfoCardClients>
                  <TitleInfoCardClients> Correo electronico </TitleInfoCardClients>
                  <InfoCardClients> {cliente.email}</InfoCardClients>
                </ContainerInfoCardClients>


                <Accordion>
                  <AccordionSummary
                    aria-controls={`${id}-panel1-content`}
                    id={`${id}-panel1-header`}
                  >
                    <TitleServicesCardClients>Servicios ({cliente.services.length})</TitleServicesCardClients>
                  </AccordionSummary>
                  <AccordionDetails>
                    <ContainerListCardClients>
                      <ListaUlCardClients>
                        {
                          cliente.services.map((service) => (
                            <ListaLiCardClients key={service} onClick={() => copyIdReport(service)}>{service}</ListaLiCardClients>
                          ))
                        }
                      </ListaUlCardClients>
                    </ContainerListCardClients>

                  </AccordionDetails>
                </Accordion>

                <ContainerOptionsCardClients>
                  <OptionCardClients><TiPencil onClick={() => editUser(cliente)} /></OptionCardClients>
                  <OptionCardClients><FaRegTrashCan onClick={() => deleteUser(cliente.id)} /></OptionCardClients>
                </ContainerOptionsCardClients>
              </CardClients>
            ))
          }
        </ContainerCardClients>


      </ContainerUsers>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ContainerModalClients>
            <TituloContainerModalClients>Nuevo cliente</TituloContainerModalClients>
            <FormModalClients onSubmit={formik.handleSubmit}>
              <LabelFormModalCliets> Nombre del cliente
                <InputFormModalClients
                  name='nameClient'
                  type='text'
                  placeholder='Nombre cliente'
                  onChange={formik.handleChange}
                  value={formik.values.nameClient}
                  onBlur={formik.handleBlur}
                />
                {formik.touched && formik.touched.nameClient ? (
                  <MensajeErrorRegister>{formik.errors.nameClient}</MensajeErrorRegister>
                ) : null}
              </LabelFormModalCliets>

              <LabelFormModalCliets> Tipo de documento
                <SelectFormModalClients
                  name='typeDocument'
                  onChange={formik.handleChange}
                  value={formik.values.typeDocument}
                  onBlur={formik.handleBlur}
                >
                  <OptionSelectFormModalClients value="">Tipo de documento...</OptionSelectFormModalClients>
                  <OptionSelectFormModalClients value="Cedula">Cedula</OptionSelectFormModalClients>
                  <OptionSelectFormModalClients value="NIT">Nit</OptionSelectFormModalClients>

                </SelectFormModalClients>
                {formik.touched && formik.touched.typeDocument ? (
                  <MensajeErrorRegister>{formik.errors.typeDocument}</MensajeErrorRegister>
                ) : null}
              </LabelFormModalCliets>

              <LabelFormModalCliets> Numero de cedula o NIT
                <InputFormModalClients
                  name='numDocument'
                  type='text'
                  placeholder='Cedula o NIT'
                  onChange={formik.handleChange}
                  value={formik.values.numDocument}
                  onBlur={formik.handleBlur}
                />
                {formik.touched && formik.touched.numDocument ? (
                  <MensajeErrorRegister>{formik.errors.numDocument}</MensajeErrorRegister>
                ) : null}
              </LabelFormModalCliets>

              <LabelFormModalCliets> Direccion
                <InputFormModalClients
                  name='address'
                  type='text'
                  placeholder='Direccion'
                  onChange={formik.handleChange}
                  value={formik.values.address}
                  onBlur={formik.handleBlur}
                />
                {formik.touched && formik.touched.address ? (
                  <MensajeErrorRegister>{formik.errors.address}</MensajeErrorRegister>
                ) : null}
              </LabelFormModalCliets>

              <LabelFormModalCliets> Barrio
                <InputFormModalClients
                  name='neighborhood'
                  type='text'
                  placeholder='Barrio'
                  onChange={formik.handleChange}
                  value={formik.values.neighborhood}
                  onBlur={formik.handleBlur}
                />
                {formik.touched && formik.touched.neighborhood ? (
                  <MensajeErrorRegister>{formik.errors.neighborhood}</MensajeErrorRegister>
                ) : null}
              </LabelFormModalCliets>

              <LabelFormModalCliets> Informacion adicional
                <TextareaFormModalClients
                  name='aditionalInfo'
                  placeholder='Informacion adicional'
                  onChange={formik.handleChange}
                  value={formik.values.aditionalInfo}
                  onBlur={formik.handleBlur}
                >
                </TextareaFormModalClients>
                {formik.touched && formik.touched.aditionalInfo ? (
                  <MensajeErrorRegister>{formik.errors.aditionalInfo}</MensajeErrorRegister>
                ) : null}
              </LabelFormModalCliets>

              <LabelFormModalCliets> Correo electronico
                <InputFormModalClients
                  name='email'
                  type='email'
                  placeholder='Correo electronico'
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                />
                {formik.touched && formik.touched.email ? (
                  <MensajeErrorRegister>{formik.errors.email}</MensajeErrorRegister>
                ) : null}
              </LabelFormModalCliets>

              <LabelFormModalCliets> Numero de contacto
                <InputFormModalClients
                  name='phone'
                  type='number'
                  placeholder='Numero de contacto'
                  onChange={formik.handleChange}
                  value={formik.values.phone}
                  onBlur={formik.handleBlur}
                />
                {formik.touched && formik.touched.phone ? (
                  <MensajeErrorRegister>{formik.errors.phone}</MensajeErrorRegister>
                ) : null}
              </LabelFormModalCliets>

              <ButtonFormModalClients type='submit'>Crear cliente</ButtonFormModalClients>

            </FormModalClients>
          </ContainerModalClients>
        </Box>
      </Modal>
    </>
  )
}

export default users