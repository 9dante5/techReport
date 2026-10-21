import React from 'react'
import { ButtonFormServices, CardServices, ContainerCardsServices, ContainerDashboardServices, ContainerFormServices, ContainerInputFormServices, ContainerOptionsCardServices, FormServices, InputFormServices, LabelFormServices, ListLiCardServices, ListUlCardServices, OptionCardServices, TitleCardServices, TitleFormServices, TitleServices } from '../styles/dashboardServicesStyled'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { createServicesAsync, deleteServicessAsync, readServicesAsync, setServices, updateServicesAsync } from '../redux/slices/servicesSlice'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { TiPencil } from 'react-icons/ti'
import { FaRegTrashCan } from 'react-icons/fa6'
import Swal from 'sweetalert2'
import { MensajeErrorRegister } from '../styles/dashboardUsersStyled'

const MyServices = () => {

  const [status, setStatus] = useState(0)

  let dataInitial = JSON.parse(localStorage.getItem("serviceEdit")) || {
    id: '',
    nameService: '',
    priceLaptop: '',
    priceMac: '',
    pricePc: '',
  };

  const servicios = useSelector((store) => store.services)

  const dispatch = useDispatch()

  //-- cargar servicios en el redux --
  async function handleDataServices() {
    await readServicesAsync().then((resp) => {
      dispatch(setServices(resp))
    })
  }

  useEffect(() => {
    handleDataServices()
  }, [status])

  // -- Eliminar servicio
  const DeleteService = (id) => {
    Swal.fire({
      title: "¿Quiers eliminar este servicio?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Eliminar",
      denyButtonText: `No eliminar`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed)
        deleteServicessAsync(id),
          Swal.fire("Servicio eliminado", "", "success"),
          setStatus(status + 1);
      else if (result.isDenied)
        Swal.fire("El Servicio no fue eliminado", "", "error");
    });
  }

  // -- Actualizar servicio
  const UpdateService = (data) => {
    localStorage.setItem('serviceEdit', JSON.stringify(data))
    location.reload();
  }


  // --- formik para crear servicios ---
  const formik = useFormik({
    initialValues: {
      id: dataInitial.id,
      nameService: dataInitial.nameService,
      pricePc: dataInitial.pricePc,
      priceLaptop: dataInitial.priceLaptop,
      priceMac: dataInitial.priceMac,
    },
    onSubmit: async (values) => {
      if (dataInitial.id != '') {
        let datosServicioEdit = {
          id: dataInitial.id,
          nameService: values.nameService,
          pricePc: values.pricePc,
          priceLaptop: values.priceLaptop,
          priceMac: values.priceMac,
        }

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "El servicio se edito correctamente",
          showConfirmButton: false,
          timer: 1500
        });

        updateServicesAsync(dataInitial.id, datosServicioEdit)
        localStorage.clear()

      } else {
        let datosServicio = {
          id: crypto.randomUUID(),
          nameService: values.nameService,
          pricePc: values.pricePc,
          priceLaptop: values.priceLaptop,
          priceMac: values.priceMac,
        }

        createServicesAsync(datosServicio)
      }

      formik.resetForm()
      setStatus(status + 1)

    },
    validationSchema: Yup.object({
      nameService: Yup.string()
        .required("Agrega el nombre del servicio"),
      pricePc: Yup.number()
        .required("Agrega el precio para PC"),
      priceLaptop: Yup.number()
        .required("Agrega el precio para portatil y todo en uno"),
      priceMac: Yup.number()
        .required("Agrega el precia para MAC"),
    })
  })

  return (
    <>
      <ContainerDashboardServices>
        <ContainerFormServices>
          <TitleFormServices>Agregar servicios</TitleFormServices>
          <FormServices onSubmit={formik.handleSubmit}>
            <ContainerInputFormServices>
              <LabelFormServices> Nuevo servicio
                <InputFormServices
                  name='nameService'
                  type='text'
                  placeholder='Nuevo servicio'
                  onChange={formik.handleChange}
                  value={formik.values.nameService}
                  onBlur={formik.handleBlur}
                />
                {formik.touched && formik.touched.nameService ? (
                  <MensajeErrorRegister>{formik.errors.nameService}</MensajeErrorRegister>
                ) : null}
              </LabelFormServices>
              <LabelFormServices> PC escritorio
                <InputFormServices
                  name='pricePc'
                  type='number'
                  placeholder='Pc escritorio'
                  onChange={formik.handleChange}
                  value={formik.values.pricePc}
                  onBlur={formik.handleBlur}
                />
                {formik.touched && formik.touched.pricePc ? (
                  <MensajeErrorRegister>{formik.errors.pricePc}</MensajeErrorRegister>
                ) : null}
              </LabelFormServices>
              <LabelFormServices> Portatil y todo en uno
                <InputFormServices
                  name='priceLaptop'
                  type='number'
                  placeholder='Portatil y todo en uno'
                  onChange={formik.handleChange}
                  value={formik.values.priceLaptop}
                  onBlur={formik.handleBlur}
                />
                {formik.touched && formik.touched.priceLaptop ? (
                  <MensajeErrorRegister>{formik.errors.priceLaptop}</MensajeErrorRegister>
                ) : null}
              </LabelFormServices>
              <LabelFormServices> MAC
                <InputFormServices
                  name='priceMac'
                  type='number'
                  placeholder='MAC'
                  onChange={formik.handleChange}
                  value={formik.values.priceMac}
                  onBlur={formik.handleBlur}
                />
                {formik.touched && formik.touched.priceMac ? (
                  <MensajeErrorRegister>{formik.errors.priceMac}</MensajeErrorRegister>
                ) : null}
              </LabelFormServices>
            </ContainerInputFormServices>
            <ButtonFormServices type='submit'>Agregar servicio</ButtonFormServices>
          </FormServices>
        </ContainerFormServices>
        <TitleServices>Mis servicios</TitleServices>
        <ContainerCardsServices>
          {
            servicios.services?.map((servicio) => (
              <CardServices key={servicio.id}>
                <TitleCardServices>{servicio.nameService}</TitleCardServices>
                <ListUlCardServices>
                  <ListLiCardServices>Prec. PC: ${parseInt(servicio.pricePc).toLocaleString('es-CO')}</ListLiCardServices>
                  <ListLiCardServices>Prec. laptop y A-in-1: ${parseInt(servicio.priceLaptop).toLocaleString('es-CO')}</ListLiCardServices>
                  <ListLiCardServices>Prec. MAC: ${parseInt(servicio.priceMac).toLocaleString('es-CO')}</ListLiCardServices>
                </ListUlCardServices>
                <ContainerOptionsCardServices>
                  <OptionCardServices>
                    <TiPencil onClick={() => UpdateService(servicio)}></TiPencil>
                  </OptionCardServices>
                  <OptionCardServices>
                    <FaRegTrashCan onClick={() => DeleteService(servicio.id)}></FaRegTrashCan>
                  </OptionCardServices>
                </ContainerOptionsCardServices>
              </CardServices>
            ))
          }
        </ContainerCardsServices>
      </ContainerDashboardServices>
    </>
  )
}

export default MyServices