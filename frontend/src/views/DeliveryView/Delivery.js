import React, {useEffect, useState} from "react";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import swal from "sweetalert";
import {useLocation} from "react-router-dom";
import CIcon from "@coreui/icons-react";
import {cilMinus, cilPlus} from "@coreui/icons";
import {
  CButton,
  CFormInput,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow
} from "@coreui/react";
import productService from "../../service/ProductService";


function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Popovers = () => {

  const [err, setError] = useState(false);
  const [products, setProducts] = useState(null);
  const [ajdi, setAjdi] = useState(4);
  const [delivery, setDelivery] = useState([]);
  const [quan, setQuan] = useState(1);

  useEffect(() => {
    const delivery = JSON.parse(localStorage.getItem('delivery'));
    if (delivery) {
      setDelivery(delivery);
    }
  }, []);


  useEffect(() => {
    productService.getAllProducts().then(
      (response) => {
        setProducts(response.data)
      }
    )
  }, []);

  const completeDelivery = () => {

    var keys = [];
    var values = [];
    var types = [];
    delivery && delivery.forEach(x => {
      keys.push(x.id)
      values.push(x.quantity)
      types.push(x.types)
    })


    productService.delivery(keys, values, types)
  }


  return (
    <Container className="d-flex justify-content-center align-items-center">

      <Col>
        <div>
          <h1 style={{textAlign: "center"}}>Choose products from delivery</h1>
        </div>

        <Container>
          <Card className="shadow-lg border rounded-3 mt-5 mb-3">
            <Card.Body>
              <Row>

                <Col md="10">
                  <h6>Pick product one by one from select input</h6>
                  <div className="mt-1 mb-0 text-muted small">
                    <Form.Control as="select" id="select" size="sm">
                      <option value="0">Choose resource...</option>
                      {products && products.map((products) => {
                        if ((products.type == "CONSTANT" || products.type == "LIQUID") && products.quantity > 0) {

                          return (
                            <option value={products.id}>{products.id}|{products.name}</option>
                          )
                        }
                      })}

                    </Form.Control>
                  </div>
                </Col>
                <Col className="d-flex flex-column mt-4">
                  <Button onClick={
                    () => {
                      setQuan(quan)

                      let e = document.getElementById("select");
                      let value = e.value;
                      setAjdi(value)
                      const found = products && products.find(x => {
                        return x.id == value
                      })
                      const names = found.name;
                      const types = found.type;

                      if (delivery.find(x => x.id == value) != undefined) {
                        delivery.find(x => {
                          if (x.id === value) {
                            x.quantity = x.quantity + quan
                          }
                        })
                      } else {
                        delivery.push({
                          id: value,
                          name: names,
                          quantity: quan,
                          types: types
                        });

                      }
                      localStorage.setItem("delivery", JSON.stringify(delivery));
                      setQuan(1)
                    }
                  }>Add</Button>
                </Col>
                <Row md="4" style={{display: "flex"}}>
                  <div style={{margin: "auto"}} className="d-flex mb-4" md="4">
                    <CButton variant="success" size="sm"
                             onClick={() => {
                               if (quan == 1) {
                                 swal({
                                   title: "Product can't be added with quantity less than 1",
                                   icon: "warning",
                                   buttons: true,
                                   dangerMode: true,
                                 })
                               } else {
                                 setQuan(quan - 1)
                               }

                             }}
                    >
                      <CIcon icon={cilMinus}/>
                    </CButton>

                    <CFormInput style={{textAlign: "center"}} value={quan} type="number" readOnly/>

                    <CButton variant="success" size="sm" className="px-3 me-2"
                             onClick={() => {
                               setQuan(quan + 1)
                             }}
                    >
                      <CIcon icon={cilPlus}/>
                    </CButton>
                  </div>
                </Row>


                <div>
                  <CTable>
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell scope="col">Id Number</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Quantity</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Types</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {delivery && delivery.map(delivery => {
                        return (
                          <CTableRow>

                            <CTableDataCell>{delivery.id}</CTableDataCell>
                            <CTableDataCell>{delivery.name}</CTableDataCell>
                            <CTableDataCell>{delivery.quantity}</CTableDataCell>
                            <CTableDataCell>{delivery.types}</CTableDataCell>

                          </CTableRow>
                        )
                      })}
                    </CTableBody>
                  </CTable>

                </div>


              </Row>
            </Card.Body>
          </Card>
        </Container>


        <Button onClick={() => {

          swal({
            title: "Are you sure, you wanna add this products?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          }).then((willPost) => {
            if (willPost) {
              completeDelivery()
              delivery = []
              localStorage.setItem("delivery", JSON.stringify(delivery));
            }
          });
        }}>Zmień</Button>

      </Col>


    </Container>

  )
}

export default React.memo(Popovers)
