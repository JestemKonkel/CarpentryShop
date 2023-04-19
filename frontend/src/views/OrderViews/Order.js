import React, {useEffect, useState} from "react";

import {CButton, CCard, CCardBody, CCardHeader, CCol, CContainer, CFormInput, CRow} from '@coreui/react'

import {MDBTypography,} from "mdb-react-ui-kit";

import Items from "./Items"
import Assignment from "./Assignment";
import swal from "sweetalert";
import orderService from "../../service/OrderService";


const Order = () => {
  const [loading, setLoading] = useState(true);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [err, setError] = useState(false);

  const [assigment, setAssigment] = useState(null);
  const [totalAssigment, setTotalAssigment] = useState(0);

  const [totalItems, setTotalItems] = useState(0);
  const [items, setItems] = useState(null);

  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [phonenumber, setPhonenumber] = useState("");

  const total = totalItems + totalAssigment;

  const sumCart = items && Array.isArray(items) ? items.reduce((sum, order) => {
    sum += order.quantityItems;
    return sum;
  }, 0) : 0

  const sumAssigment = assigment && Array.isArray(assigment) ? assigment.reduce((sum, assigment) => {
    sum += assigment.quantityItemAssigment;
    return sum;
  }, 0) : 0

  let sum = sumCart + sumAssigment;

  useEffect(() => {
    orderService.getAssignments().then(
      (response) => {
        setAssigment(response.data)
      }
    )
  }, []);


  useEffect(() => {
    orderService.getItems().then(
      (response) => {
        setItems(response.data)
      }
    )
  }, []);


  useEffect(() => {
    orderService.getTotalPrizeCart().then(
      (response) => {
        setTotalItems(response.data)
      }
    )
  }, []);


  useEffect(() => {
    orderService.getTotalPrizeAssignment().then(
      (response) => {
        setTotalAssigment(response.data)
      }
    );
  }, []);

  const onSubmit = (Name, LastName, PhoneNumber) => {

    orderService.endItems()
    orderService.endAssignments()
    if (totalAssigment > 0) {
      console.log(Name, LastName, PhoneNumber)
      orderService.updateInfo(Name, LastName, PhoneNumber)
    }
    swal({
      text: "Order has been closed",
      icon: "success",
    })
  };


  return (
    <CContainer className="py-5 h-100">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css"
            integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
            crossOrigin="anonymous"/>
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css"
            integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr"
            crossOrigin="anonymous"/>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.0.0/animate.compat.css"
      />
      <CRow className="justify-content-center my-4">
        <CCol md="8">
          <CCard className="mb-4">
            <CCardHeader className="py-3">
              <MDBTypography tag="h5" className="mb-0">
                Cart - {sum} items
              </MDBTypography>
            </CCardHeader>
            {totalItems == 0 && totalAssigment == 0 &&
              <div>
                <div className="d-flex align-items-center justify-content-center" style={{margin: 10}}>
                  <i className="fas fa-cart-arrow-down fa-10x"></i>
                </div>

                <div className="d-flex align-items-center justify-content-center">
                  <h3><strong>Your order is empty :(</strong></h3>
                </div>
                <div className="d-flex align-items-center justify-content-center">

                  <h5>Please, add something</h5>

                </div>
              </div>
            }
            {totalItems > 0 &&
              <Items/>
            }

            {totalAssigment > 0 &&
              <Assignment/>
            }
          </CCard>

        </CCol>

        <CCol md="4">
          <CCard className=" rounded-3">
            <CCardBody>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <MDBTypography tag="h5" className="mb-0">
                  Summary
                </MDBTypography>
              </div>


              <form action="/create-checkout-session" className="mt-4">
                <CFormInput disabled={sumAssigment <= 0 ? true : false} onChange={
                  e => setName(e.target.value)
                }
                            className="mb-4" label="Customer Name" type="text"/>
                <CFormInput disabled={sumAssigment <= 0 ? true : false} onChange={
                  e => setLastname(e.target.value)
                }
                            className="mb-4" label="Customer Lastname" type="text"/>
                <CFormInput disabled={sumAssigment <= 0 ? true : false} type="tel" onChange={
                  e => setPhonenumber(e.target.value)
                }
                            label="Customer phone number"
                />

              </form>


              <hr/>

              <div className="d-flex justify-content-between">
                <p className="mb-2">Products</p>
                <p className="mb-2">{Math.round(totalItems * 100) / 100} zł</p>
              </div>

              <div className="d-flex justify-content-between">
                <p className="mb-2">Projects</p>
                <p className="mb-2">{Math.round(totalAssigment * 100) / 100} zł</p>
              </div>

              <hr/>

              <div className="d-flex justify-content-between">
                <p className="mb-2"><strong>Total</strong></p>
                <p className="mb-2">{Math.round(total * 100) / 100} zł</p>
              </div>

              <CButton color="info" block size="lg" disabled={total === 0 ? true : false}
                       onClick={() => {
                         swal({
                           title: "Are you sure?",
                           text: "Confirmation means accept whole order",
                           icon: "warning",
                           buttons: true,
                           dangerMode: true,
                         }).then((willPost) => {
                           if (willPost) {
                             if (totalAssigment > 0) {
                               if (name === "" || lastname === "" || phonenumber === "") {
                                 swal({text: "Please enter all information about customer", icon: "warning"})
                               } else {
                                 onSubmit(name, lastname, phonenumber)
                               }

                             } else {
                               onSubmit(name, lastname, phonenumber)
                             }
                           }
                         });

                       }
                       }>
                <div className="d-flex justify-content-between">
                  <span>
                          Checkout{" "}
                    <i className="fas fa-long-arrow-alt-right ms-2"></i>
                        </span>
                </div>
              </CButton>
            </CCardBody>
          </CCard>
        </CCol>


      </CRow>
    </CContainer>
  )
}

export default Order
