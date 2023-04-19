import React, {useEffect, useState} from "react";
import {CButton, CCard, CCardBody, CCol, CContainer, CFormInput, CInputGroup, CRow,} from '@coreui/react'
import {useLocation} from "react-router-dom";
import swal from "sweetalert";
import {cilSearch} from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import productService from "../../service/ProductService";
import orderService from "../../service/OrderService";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const NewOrder = () => {

  const [loading, setLoading] = useState(true);
  const [fetchLoading, setFetchLoading] = useState(false);
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

  // Initializing function which call posting function with parameters od products
  const onSubmitConstant = (ElementConst) => {
    const {
      id = products.id,
      description = products.description,
      name = products.name,
      constantCategory = products.constantCategory,
      pricePerPiece = products.pricePerPiece,
      quantity = products.quantity,
      lengthInCm = products.lengthInCm,
      widthInCm = products.widthInCm
    } = ElementConst;


    return orderService.addConstant(ElementConst)

  };

  const onSubmitLiquid = (ElementLiquid) => {
    const {
      id = products.id,
      description = products.description,
      name = products.name,
      liquidCategory = products.liquidCategory,
      capacity = products.capacity,
      quantity = products.quantity,
      pricePerLiter = products.pricePerLiter

    } = ElementLiquid;

    return orderService.addLiquid(ElementLiquid)

  };

  const onSubmitFurniture = (Project) => {
    const {
      id = products.id,
      description = products.description,
      name = products.name,
      furnitureCategory = products.furnitureCategory,
      basePrice = products.basePrice,
      weight = products.weight,
    } = Project;

    return orderService.addProject(Project)

  };

  const doChange = (id, type, operation, quan) => {
    return orderService.changeQuantityProduct(id, type, operation, quan)
  }


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
              if (products.productStatus == true) {

                return (
                  <CCard className="shadow-lg border rounded-3 mt-5 mb-3">
                    <CCardBody>
                      <CRow>

                        <CCol md="9">
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
                              <h4>{products.pricePerLiter} zł</h4>
                            }


                          </div>

                          <div className="d-flex flex-column">

                            {products && products.type === "CONSTANT" &&
                              <CButton value={products.id} color="success"
                                       disabled={products.quantity <= 0 ? true : false}
                                       onClick={e => {
                                         swal({
                                           title: "Are you sure?",
                                           text: "Confirmation means add to order",
                                           icon: "warning",
                                           buttons: true,
                                           dangerMode: true,
                                         })
                                           .then((willPost) => {
                                             if (willPost) {
                                               onSubmitConstant(products)
                                               doChange(e.target.value, "CONSTANT", "minus", 1)
                                               swal("Constant has been added", {
                                                 icon: "success",
                                               });


                                             }
                                           });
                                       }}
                              >
                                Add to Order
                              </CButton>
                            }
                            {products && products.type === "LIQUID" &&
                              <CButton value={products.id} color="success"
                                       disabled={products.quantity <= 0 ? true : false}
                                       onClick={e => {
                                         swal({
                                           title: "Are you sure?",
                                           text: "Confirmation means add to order",
                                           icon: "warning",
                                           buttons: true,
                                           dangerMode: true,
                                         })
                                           .then((willPost) => {
                                             if (willPost) {
                                               onSubmitLiquid(products)
                                               doChange(e.target.value, "LIQUID", "minus", 1)
                                               swal("Liquid has been added", {
                                                 icon: "success",
                                               });


                                             }
                                           });
                                       }}
                              >
                                Add to Cart
                              </CButton>
                            }
                            {products && products.type === "FURNITURE" &&
                              <CButton value={products.id} color="success"
                                       onClick={e => {
                                         swal({
                                           title: "Are you sure?",
                                           text: "Confirmation means add to order",
                                           icon: "warning",
                                           buttons: true,
                                           dangerMode: true,
                                         })
                                           .then((willPost) => {
                                             if (willPost) {
                                               onSubmitFurniture(products)
                                               swal("Project has been added", {
                                                 icon: "success",
                                               });
                                             }
                                           });
                                       }}
                              >
                                Add to Assignment
                              </CButton>
                            }
                          </div>
                        </CCol>
                      </CRow>
                    </CCardBody>
                  </CCard>

                )
              }
            })}
        </CCol>
      </CRow>
    </CContainer>
  );
}

export default NewOrder
