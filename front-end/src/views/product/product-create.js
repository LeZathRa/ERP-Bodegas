import React, { useState } from 'react'
import Select from 'react-select'
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
const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
]
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
        <CFormLabel htmlFor="validationName">Nombre</CFormLabel>
        <CFormInput type="text" id="validationName" required />
        <CFormFeedback invalid>Nombre es requerido</CFormFeedback>
     </CCol>
     <CCol md={6}>
        <CFormLabel htmlFor="validationDescription">Descripcion</CFormLabel>
        <CFormTextarea type="text" id="validationDescription" required />
        <CFormFeedback invalid>Descripcion es requerido</CFormFeedback>
     </CCol>
     <CCol md={6}>
        <CFormLabel htmlFor="validationStock">Stock</CFormLabel>
        <CFormInput type="text" id="validationStock" required />
        <CFormFeedback invalid>Stock es requerido</CFormFeedback>
     </CCol>
     <CCol md={6}>
        <CFormLabel htmlFor="validationPrice">Precio</CFormLabel>
        <CFormInput type="text" id="validationPrice" required />
        <CFormFeedback invalid>Precio es requerido</CFormFeedback>
     </CCol>
     <CCol md={6}>
        <CFormLabel htmlFor="validationProvider">Provedor</CFormLabel>
        <Select options={options} id="validationProvider" isClearable={true}/>
        <CFormFeedback invalid>Elegir un proveedor.</CFormFeedback>
      </CCol>
     
      <CCol md={6}>
        <CFormLabel htmlFor="validationRole">Categoria</CFormLabel>
        <CFormSelect id="validationDocumentType">
          <option>Carnes</option>
          <option>Menestras</option>
        </CFormSelect>
        <CFormFeedback invalid>Elegir una categoria.</CFormFeedback>
      </CCol>
      <CCol xs={12}>
        <CButton color="primary" type="submit">
          Crear Producto
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
