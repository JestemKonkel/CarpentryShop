import {CButton, CCardBody, CCol, CContainer, CFormInput, CRow} from '@coreui/react'
import swal from "sweetalert";
import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import CIcon from '@coreui/icons-react'
import {cilMinus, cilPlus, cilTrash} from '@coreui/icons'
import orderService from "../../service/OrderService";


function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Assignment() {
  const [loading, setLoading] = useState(true);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [assigment, setAssigment] = useState(null);
  const [err, setError] = useState(false);

  useEffect(() => {
    orderService.getAssignments().then(
      (response) => {
        setAssigment(response.data)
      }
    )
  }, []);

  const deleteProduct = (id) => {
    orderService.deleteAssigment(id).then(
      () => {
        window.location.reload()
      })
  };


  const doChangeAssigment = (id, operation, quan) => {
    orderService.changeQuantityAssigment(id, operation, quan).then(
      () => {
        window.location.reload()
      })
  }

  const doChangePrice = (operation, price) => {
    orderService.changePriceAssigment(operation, price).then(
      () => {
        window.location.reload()
      })
  }

  return (

    <section>
      <CContainer>
        {assigment && assigment
          .sort((a, b) => a.project.name > b.project.name ? 1 : -1)
          .map((order) => {
            return (
              <CCardBody>
                <CRow>
                  <CCol md="8">

                    <p className="lead fw-normal mb-2">
                      <strong>{order.project.name}</strong>
                    </p>

                    <p className="text-muted">Quantity: {order.quantityItemAssigment}</p>

                    <CButton value={order.id} color="danger"
                             onClick={e => {
                               swal({
                                 title: "Are your sure?",
                                 text: "Confirmation means delete from order",
                                 icon: "warning",
                                 buttons: true,
                                 dangerMode: true,
                               })
                                 .then((willDelete) => {
                                   if (willDelete) {
                                     console.log(e.target.value)
                                     deleteProduct(order.id)
                                     doChangePrice("minus", (order.project.basePrice * order.quantityItemAssigment))
                                     swal("Project has been deleted", {
                                       icon: "success",
                                     }).then(function () {
                                       window.location.reload()
                                     });


                                   }
                                 });
                             }}
                    >
                      <CIcon icon={cilTrash}/>
                    </CButton>


                  </CCol>
                  <CCol lg="4" md="6" className="mb-4 mb-lg-0">
                    <div className="d-flex mb-4">


                      <CButton variant="success" size="sm"
                               onClick={() => {

                                 if (order.quantityItemAssigment == 1) {
                                   swal({
                                     title: "Quantity of project in order can't be less than 1",
                                     icon: "warning",
                                     buttons: true,
                                     dangerMode: true,
                                   })
                                 } else {
                                   doChangeAssigment(order.id, "minus", 1)
                                   doChangePrice("minus", order.project.basePrice)
                                 }

                               }}>
                        <CIcon icon={cilMinus}/>
                      </CButton>


                      <CFormInput defaultValue={order.quantityItemAssigment} type="number" readOnly/>


                      <CButton variant="success" size="sm" className="px-3 me-2"
                               onClick={() => {
                                 doChangeAssigment(order.id, "plus", 1)
                                 doChangePrice("plus", order.project.basePrice)
                               }}>
                        <CIcon icon={cilPlus}/>
                      </CButton>


                    </div>

                    <p className="text-start text-md-center">

                      <strong>{order.project.basePrice * order.quantityItemAssigment}zł</strong>


                    </p>
                  </CCol>
                </CRow>

                <hr/>


              </CCardBody>)


          })}


      </CContainer>
    </section>
  )
}
