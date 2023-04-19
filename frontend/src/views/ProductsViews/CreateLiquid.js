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


const CreateLiquid = () => {
  const [loading, setLoading] = useState(true);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [category, setCategory] = useState(null);
  const [err, setError] = useState(false);

  const [newName, setNewName] = useState("");
  const [newCategoryL, setNewCategoryL] = useState("");
  const [newCapacity, setNewCapacity] = useState("");
  const [newPricePerLiter, setNewPricePerLiter] = useState("");
  const [newQuantity, setNewQuantity] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const [validated, setValidated] = useState(false)
  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    } else {


      const liquid = {
        name: newName,
        liquidCategory: newCategoryL,
        capacity: newCapacity,
        quantity: newQuantity,
        pricePerLiter: newPricePerLiter,
        description: newDescription,
        productStatus: true
      }

      productService.addLiquid(liquid)
    }
    setValidated(true)
  }


  useEffect(() => {
    productService.fetchLiquidCategory().then(
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
    >
      <CCol md={12}>
        <CFormLabel htmlFor="validationCustom01">Name</CFormLabel>
        <CFormInput onChange={
          event => setNewName(event.target.value)
        }
                    type="text" id="validationCustom01"
                    style={{textTransform: 'capatalize'}} required/>
        <CFormFeedback invalid>Please enter a name of product</CFormFeedback>
      </CCol>

      <CCol md={6}>
        <CFormLabel htmlFor="validationCustomUsername">Price per liter</CFormLabel>
        <CInputGroup className="has-validation">
          <CInputGroupText id="inputGroupPrepend">$</CInputGroupText>
          <CFormInput onChange={
            event => setNewPricePerLiter(event.target.value)
          }
                      type="number"
                      step="0.01"
                      id="validationCustomUsername"
                      aria-describedby="inputGroupPrepend"
                      required
          />
          <CFormFeedback invalid>Please enter a price of product</CFormFeedback>
        </CInputGroup>
      </CCol>

      <CCol md={6}>
        <CFormLabel htmlFor="validationCustom02">Category</CFormLabel>
        <CFormSelect onChange={
          event => setNewCategoryL(event.target.value)
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


      <CCol md={6}>
        <CFormLabel htmlFor="validationCustom03">Quantity</CFormLabel>
        <CFormInput onChange={
          event => setNewQuantity(event.target.value)
        }
                    type="number" step="1" id="validationCustom03"
                    required/>
        <CFormFeedback invalid>Please enter a quantity</CFormFeedback>
      </CCol>

      <CCol md={6}>
        <CFormLabel htmlFor="validationCustom03">Capacity</CFormLabel>
        <CFormInput onChange={
          event => setNewCapacity(event.target.value)
        }
                    type="number" step="1" id="validationCustom03"
                    required/>
        <CFormFeedback invalid>Please enter a capacity</CFormFeedback>
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

export default CreateLiquid
