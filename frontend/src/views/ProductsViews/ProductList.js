import React, {useEffect, useState} from 'react'
import {CButton, CCard, CCardBody, CCol, CContainer, CFormInput, CInputGroup, CRow} from '@coreui/react'
import {Link} from "react-router-dom";
import swal from "sweetalert";
import CIcon from "@coreui/icons-react";
import {cilSearch} from "@coreui/icons";
import productService from "../../service/ProductService";


const ProductList = () => {
  const [products, setProducts] = useState(null);
  const [err, setError] = useState(false);
  const [search, setSearch] = useState("")


  useEffect(() => {
    productService.getAllProducts().then(
      (response) => {
        setProducts(response.data)
      }
    )
  }, []);


  const statusChange = (id) => {
    return productService.changeStatus(id)
  };

  const filtered = products && products.filter((el) => {

    if (search === "") {
      return el;
    } else {
      return Object.values(el)
        .join(' ')
        .toLowerCase()
        .includes(search.toLowerCase())
    }
  })

  return (
    <CContainer fluid>
      <CRow className="justify-content-center mb-0">

        <CCol md={12}>
          <CInputGroup className="has-validation">
            <CFormInput placeholder="Search"
                        onChange={e => {
                          setSearch(e.target.value)
                        }}></CFormInput>
            <CButton color='primary'>
              <CIcon icon={cilSearch}/>
            </CButton>
          </CInputGroup>
        </CCol>

        <CCol md="12" xl="10">
          {filtered && [...filtered]
            .sort((a, b) => a.type > b.type ? 1 : -1)
            .map(products => {
              return (
                <CCard className="shadow-lg border rounded-3 mt-5 mb-3">
                  <CCardBody>
                    <CRow>
                      <CCol md="8">
                        <h5>{products.name}</h5>
                        <div className="d-flex flex-row">
                          <div className="text-danger mb-1 me-2">
                            {products.type}
                          </div>
                        </div>
                        <div className="border-sm-start-none border-bottom mt-1 mb-0 text-muted small">
                          {products && products.type === "FURNITURE" &&
                            <span>Weight: {products.weight}</span>
                          }
                          {products && products.type === "CONSTANT" &&
                            <span>
                                                    <span>Lenght: {products.lengthInCm} CM &nbsp;</span>
                                                    <span className="text-primary"> • </span>
                                                    <span>&nbsp; Width: {products.widthInCm} CM</span>
                                                    <span className="text-primary"> • </span>
                                                    <span>&nbsp; Quantity: {products.quantity} pcs</span>
                                                </span>
                          }
                          {products && products.type === "LIQUID" &&
                            <span>
                                                    <span>Capacity: {products.capacity}L &nbsp;</span>
                                                    <span className="text-primary"> • </span>
                                                    <span>&nbsp; Quantity: {products.quantity} pcs</span>
                                                </span>
                          }


                        </div>

                        <p className="text-truncate mb-4 mb-md-0">
                          {products.description}
                        </p>
                      </CCol>
                      <CCol
                        md="6"
                        lg="3"
                        className="border-sm-start-none border-start"
                      >
                        <div className="d-flex flex-row align-items-center mb-1">
                          {products && products.type === "FURNITURE" &&
                            <h4>{products.basePrice} zł</h4>
                          }
                          {products && products.type === "CONSTANT" &&
                            <h4>{products.pricePerPiece} zł</h4>
                          }
                          {products && products.type === "LIQUID" &&
                            <h4>{products.pricePerLiter} zł </h4>
                          }


                        </div>
                        <div>
                          <p></p>

                        </div>
                        <h6 className="text-success text-center">Dodatkowe opcje</h6>
                        <div className="d-flex flex-column mt-4">
                          {products && products.type === "FURNITURE" &&
                            <CButton color="outline-primary"><Link style={{color: "primary", textDecoration: "none"}}
                                                                   to={`/ProjectDetail?id=${products.id}`}>
                              Details
                            </Link></CButton>}
                          {products && products.type === "CONSTANT" &&
                            <CButton color="outline-primary"><Link style={{color: "primary", textDecoration: "none"}}
                                                                   to={`/ConstantDetail?id=${products.id}`}>
                              Details
                            </Link></CButton>}
                          {products && products.type === "LIQUID" &&
                            <CButton color="outline-primary"><Link style={{color: "primary", textDecoration: "none"}}
                                                                   to={`/LiquidDetail?id=${products.id}`}>
                              Details
                            </Link></CButton>}
                        </div>
                        <div className="d-flex flex-column mt-2">
                          {products && products.productStatus === true &&

                            <CButton value={products.id} color="outline-danger"
                                     onClick={e => {
                                       console.log(e.target.value);
                                       swal({
                                         title: "Are you sure?",
                                         text: "Confirmation means disabled item",
                                         icon: "warning",
                                         buttons: true,
                                         dangerMode: true,
                                       })
                                         .then((willDelete) => {
                                           if (willDelete) {
                                             statusChange(e.target.value)
                                             swal("Item has been disabled", {
                                               icon: "success",
                                             }).then(function () {
                                               window.location.reload();
                                             });


                                           }
                                         });
                                     }}
                            >
                              Disabled
                            </CButton>
                          }

                          {products && products.productStatus === false &&

                            <CButton value={products.id} color="outline-success"
                                     onClick={e => {
                                       console.log(e.target.value);
                                       swal({
                                         title: "Are you sure?",
                                         text: "Confirmation means Enabled item",
                                         icon: "warning",
                                         buttons: true,
                                         dangerMode: true,
                                       })
                                         .then((willDelete) => {
                                           if (willDelete) {
                                             statusChange(e.target.value)
                                             swal("Item has been enabled", {
                                               icon: "success",
                                             }).then(function () {
                                               window.location.reload();
                                             });


                                           }
                                         });
                                     }}
                            >
                              Enabled
                            </CButton>
                          }
                        </div>
                      </CCol>
                    </CRow>
                  </CCardBody>
                </CCard>
              )
            })}
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default ProductList
