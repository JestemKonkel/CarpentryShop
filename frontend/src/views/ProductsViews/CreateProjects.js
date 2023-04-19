import React, {useEffect, useState} from "react";
import {
  CButton,
  CCol,
  CForm,
  CFormFeedback,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CInputGroup,
  CInputGroupText,
} from '@coreui/react'
import productService from "../../service/ProductService";


const CreateProjects = () => {
  const [loading, setLoading] = useState(true);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [category, setCategory] = useState(null);
  const [err, setError] = useState(false);

  const [newName, setNewName] = useState("");
  const [newCategoryF, setNewCategoryF] = useState("");
  const [newBasePrice, setNewBasePrice] = useState("");
  const [newWeight, setNewWeight] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const [validated, setValidated] = useState(false)
  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    } else {
      const furniture = {
        name: newName,
        furnitureCategory: newCategoryF,
        basePrice: newBasePrice,
        weight: newWeight,
        description: newDescription,
        productStatus: true
      }

      productService.addProject(furniture)


    }
    setValidated(true)
  }


  useEffect(() => {
    productService.fetchProjectCategory().then(
      (response) => {
        setCategory(response.data)
      }
    )
  }, []);


  return (
    <CForm
      className="row g-3 needs-validation"
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
      encType="multipart/form-data"
    >
      <CCol md={12}>
        <CFormLabel htmlFor="validationCustom01">Name</CFormLabel>
        <CFormInput onChange={
          event => setNewName(event.target.value)
        }
                    type="text" id="validationCustom01"
                    style={{textTransform: 'capatalize'}} required/>
        <CFormFeedback invalid>Please enter a name of project</CFormFeedback>
      </CCol>

      <CCol md={4}>
        <CFormLabel htmlFor="validationCustomUsername">Base Price</CFormLabel>
        <CInputGroup className="has-validation">
          <CInputGroupText id="inputGroupPrepend">$</CInputGroupText>
          <CFormInput onChange={
            event => setNewBasePrice(event.target.value)
          }
                      type="number"
                      step="0.01"
                      id="validationCustomUsername"
                      aria-describedby="inputGroupPrepend"
                      required
          />
          <CFormFeedback invalid>Please enter a price of service</CFormFeedback>
        </CInputGroup>
      </CCol>

      <CCol md={4}>
        <CFormLabel htmlFor="validationCustom02">Category</CFormLabel>
        <CFormSelect onChange={
          event => setNewCategoryF(event.target.value)
        }
                     id="validationCustom02" required>
          <option value="Choose...">Wybierz</option>
          {category && category.map((category) => {
            return (
              <option value={category}>{category}</option>
            )
          })}
        </CFormSelect>
        <CFormFeedback invalid>Please choose a category</CFormFeedback>
      </CCol>


      <CCol md={4}>
        <CFormLabel htmlFor="validationCustom03">Weight</CFormLabel>
        <CFormInput onChange={
          event => setNewWeight(event.target.value)
        }
                    type="number" step="0.01" id="validationCustom03"
                    required/>
        <CFormFeedback invalid>Please enter a weight</CFormFeedback>
      </CCol>

      <CCol md={12}>
        <CFormLabel htmlFor="validationCustom05">Description</CFormLabel>
        <CFormTextarea onChange={
          event => setNewDescription(event.target.value)
        }
                       type="text"
                       id="validationCustom05"
                       required/>
        <CFormFeedback invalid>Please enter a description</CFormFeedback>
      </CCol>

      <CCol xs={12}>
        <CButton
          color="primary" type="submit">
          Submit form
        </CButton>
      </CCol>
    </CForm>

  )
}

export default CreateProjects;
