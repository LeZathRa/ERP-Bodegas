import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormFeedback,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import { DocsExample } from 'src/components'

const CustomStyles = () => {
  const [validated, setValidated] = useState(false)
  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true)
  }
  return (
    <CForm
      className="row g-3 needs-validation"
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
    >
     <CCol md={6}>
        <CFormLabel htmlFor="validationDocumentType">Tipo de documento</CFormLabel>
        <CFormSelect id="validationDocumentType">
          <option>DNI</option>
          <option>C.E.</option>
          <option>Pasaporte</option>
        </CFormSelect>
        <CFormFeedback invalid>Elegir un tipo de documento.</CFormFeedback>
      </CCol>
      <CCol md={6}>
        <CFormLabel htmlFor="validationDocumentNumber">Numero de documento</CFormLabel>
        <CFormInput type="text" id="validationDocumentNumber" required />
        <CFormFeedback invalid>Numero de documento es requerido</CFormFeedback>
      </CCol>
      <CCol md={6}>
        <CFormLabel htmlFor="validationFirstName">Nombres</CFormLabel>
        <CFormInput type="text" id="validationFirstName" required />
        <CFormFeedback invalid>Nombre es requerido</CFormFeedback>
      </CCol>
      <CCol md={6}>
        <CFormLabel htmlFor="validationLastName">Apellidos</CFormLabel>
        <CFormInput type="text" id="validationLastName" required />
        <CFormFeedback invalid>Appelido es requerido</CFormFeedback>
      </CCol>
      
      <CCol md={6}>
        <CFormLabel htmlFor="validationEmail">Correo electronico</CFormLabel>
        <CInputGroup className="has-validation">
          <CInputGroupText id="inputGroupPrepend">@</CInputGroupText>
          <CFormInput
            type="text"
            id="validationEmail"
            defaultValue=""
            aria-describedby="inputGroupPrepend"
            required
          />
          <CFormFeedback invalid>Email es requerido.</CFormFeedback>
        </CInputGroup>
      </CCol>
      <CCol md={6}>
        <CFormLabel htmlFor="validationCellphone">Celular</CFormLabel>
        <CInputGroup className="has-validation">
          <CInputGroupText id="inputGroupPrepend">+51</CInputGroupText>
          <CFormInput
            type="text"
            id="validationCellphone"
            defaultValue=""
            aria-describedby="inputGroupPrepend"
            required
          />
          <CFormFeedback invalid>Celular es requerido.</CFormFeedback>
        </CInputGroup>
      </CCol>
      <CCol md={6}>
        <CFormLabel htmlFor="validationRole">Rol</CFormLabel>
        <CFormSelect id="validationDocumentType">
          <option>Vendedor</option>
          <option>Administrador</option>
        </CFormSelect>
        <CFormFeedback invalid>Elegir un rol.</CFormFeedback>
      </CCol>
      <CCol md={6}>
        <CFormLabel htmlFor="validationPassword">Contrasena</CFormLabel>
        <CFormInput type="password" id="validationPassword" required />
        <CFormFeedback invalid>Contrasena es requerido.</CFormFeedback>
      </CCol>
      <CCol md={6}>
        <CFormLabel htmlFor="validationImage">Foto</CFormLabel>
        <CFormInput
            type="file"
            id="validationImage"
            feedbackInvalid="Debe elgir un archivo"
            aria-label="file example"
            required
        />
      </CCol>
      <CCol xs={12}>
        <CButton color="primary" type="submit">
          Crear Usuario
        </CButton>
      </CCol>
    </CForm>
  )
}


const Validation = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Validation</strong> <small>Custom styles</small>
          </CCardHeader>
          <CCardBody>
            
            {CustomStyles()}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Validation
