import {CButton, CCardBody, CCol, CContainer, CFormInput, CRow} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import swal from "sweetalert";
import React, {useEffect, useState} from "react";
import {cilMinus, cilPlus, cilTrash} from '@coreui/icons'
import orderService from "../../service/OrderService";


export default function Items() {
  const [loading, setLoading] = useState(true);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [order, setOrder] = useState(null);
  const [err, setError] = useState(false);


  useEffect(() => {
    orderService.getItems().then(
      (response) => {
        setOrder(response.data)
      }
    )
  }, []);


  const deleteProduct = (id) => {
    orderService.deleteItem(id).then(
      () => {
        window.location.reload()
      })
  };

  const doChange = (id, type, operation, quan) => {
    orderService.changeQuantityProduct(id, type, operation, quan).then(
      () => {
        window.location.reload()
      })
  }

  const doChangeItem = (id, operation, quan) => {
    orderService.changeQuantityItems(id, operation, quan).then(
      () => {
        window.location.reload()
      })
  }

  const doChangePrice = (operation, price) => {
    orderService.changePriceItems(operation, price).then(
      () => {
        window.location.reload()
      })
  }


  return (

    <section>
      <CContainer className="py-2">
        {order && order
          .sort((a, b) => a.id > b.id ? 1 : -1)
          .map((order) => {

            return (
              <CCardBody>
                <CRow>

                  <CCol md="8">
                    {order.elementConstant != null &&
                      <p className="lead fw-normal mb-2">
                        <strong>{order.elementConstant.name}</strong>
                      </p>
                    }
                    {order.elementLiquid != null &&
                      <p className="lead fw-normal mb-2">
                        <strong>{order.elementLiquid.name}</strong>
                      </p>
                    }

                    <p className="text-muted">Quantity: {order.quantityItems}</p>


                    {order.elementConstant != null &&
                      <CButton value={order.id} color="danger"
                               onClick={e => {
                                 swal({
                                   title: "Are you sure?",
                                   text: "Confirmation means delete from order",
                                   icon: "warning",
                                   buttons: true,
                                   dangerMode: true,
                                 })
                                   .then((willDelete) => {
                                     if (willDelete) {
                                       deleteProduct(order.id)
                                       doChange(order.elementConstant.id, "CONSTANT", "plus", order.quantityItems)
                                       doChangePrice("minus", (order.elementConstant.pricePerPiece * order.quantityItems))
                                       swal("Constant has been deleted", {
                                         icon: "success",
                                       })

                                     }
                                   });
                               }}
                      >
                        <CIcon icon={cilTrash}/>
                      </CButton>
                    }
                    {order.elementLiquid != null &&
                      <CButton value={order.id} color="danger"
                               onClick={e => {
                                 swal({
                                   title: "Are you sure?",
                                   text: "Confirmation means delete from order",
                                   icon: "warning",
                                   buttons: true,
                                   dangerMode: true,
                                 })
                                   .then((willDelete) => {
                                     if (willDelete) {
                                       deleteProduct(order.id)
                                       doChange(order.elementLiquid.id, "LIQUID", "plus", order.quantityItems)
                                       doChangePrice("minus", (order.elementLiquid.pricePerLiter * order.quantityItems))
                                       swal("Liquid has been deleted", {
                                         icon: "success",
                                       })
                                     }
                                   });
                               }}
                      >
                        <CIcon icon={cilTrash}/>
                      </CButton>
                    }


                  </CCol>
                  <CCol lg="4" md="6" className="mb-4 mb-lg-0">
                    <div className="d-flex mb-4">

                      {order.elementConstant != null &&
                        <CButton variant="success" size="sm"
                                 onClick={() => {

                                   if (order.quantityItems == 1) {
                                     swal({
                                       title: "Quantity of project in order can't be less than 1",
                                       icon: "warning",
                                       buttons: true,
                                       dangerMode: true,
                                     })
                                   } else {

                                     doChange(order.elementConstant.id, "CONSTANT", "plus", 1)
                                     doChangeItem(order.id, "minus", 1)
                                     doChangePrice("minus", order.elementConstant.pricePerPiece)
                                   }

                                 }}>
                          <CIcon icon={cilMinus}/>
                        </CButton>
                      }

                      {order.elementLiquid != null &&
                        <CButton variant="success" size="sm" className="px-3 me-2"
                                 onClick={() => {

                                   if (order.quantityItems == 1) {
                                     swal({
                                       title: "Quantity of project in order can't be less than 1",
                                       icon: "warning",
                                       buttons: true,
                                       dangerMode: true,
                                     })
                                   } else {
                                     doChange(order.elementLiquid.id, "LIQUID", "plus", 1)
                                     doChangeItem(order.id, "minus", 1)
                                     doChangePrice("minus", order.elementLiquid.pricePerLiter)
                                   }

                                 }}>
                          <CIcon icon={cilMinus}/>
                        </CButton>
                      }


                      <CFormInput defaultValue={order.quantityItems} type="number" readOnly/>

                      {order.elementConstant != null &&
                        <CButton variant="success" size="sm" className="px-3 me-2"
                                 onClick={() => {

                                   if (order.elementConstant.quantity == 0) {
                                     swal({
                                       title: "There is no more products",
                                       icon: "warning",
                                       buttons: true,
                                       dangerMode: true,
                                     })
                                   } else {
                                     doChange(order.elementConstant.id, "CONSTANT", "minus", 1)
                                     doChangeItem(order.id, "plus", 1)
                                     doChangePrice("plus", order.elementConstant.pricePerPiece)
                                   }
                                 }}>
                          <CIcon icon={cilPlus}/>
                        </CButton>
                      }
                      {order.elementLiquid != null &&
                        <CButton variant="success" size="sm" className="px-3 me-2"
                                 onClick={() => {

                                   if (order.elementLiquid.quantity == 0) {
                                     swal({
                                       title: "There is no more products",
                                       icon: "warning",
                                       buttons: true,
                                       dangerMode: true,
                                     })
                                   } else {
                                     doChange(order.elementLiquid.id, "LIQUID", "minus", 1)
                                     doChangeItem(order.id, "plus", 1)
                                     doChangePrice("plus", order.elementLiquid.pricePerLiter)
                                   }
                                 }}>
                          <CIcon icon={cilPlus}/>
                        </CButton>
                      }
                    </div>

                    <p className="text-start text-md-center">
                      {order.elementConstant != null &&
                        <strong>{order.elementConstant.pricePerPiece * order.quantityItems}zł</strong>
                      }
                      {order.elementLiquid != null &&
                        <strong>{order.elementLiquid.pricePerLiter * order.quantityItems}zł</strong>
                      }

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
