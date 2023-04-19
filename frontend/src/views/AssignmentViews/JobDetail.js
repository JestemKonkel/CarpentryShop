import React, {useEffect, useState} from "react";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import swal from "sweetalert";
import {useLocation} from "react-router-dom";
import CIcon from "@coreui/icons-react";
import {cilX} from "@coreui/icons";
import {CButton} from "@coreui/react";
import jobService from "../../service/JobService";
import productService from "../../service/ProductService";
import orderService from "../../service/OrderService";


function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const JobDetail = () => {
  let query = useQuery();


  const [todo, setTodo] = useState(null);
  const [err, setError] = useState(false);
  const [products, setProducts] = useState(null);
  const [resources, setResources] = useState(null);
  const [ajdi, setAjdi] = useState(0);

  const [which, setWhich] = useState(0);


  useEffect(() => {
    jobService.getJobById(query.get("id")).then(
      (response) => {
        setTodo(response.data)
        setWhich(response.data.id)
      }
    )
  }, []);


  useEffect(() => {
    productService.getAllProducts().then(
      (response) => {
        setProducts(response.data)

      }
    )
  }, []);


  useEffect(() => {
    jobService.getResources().then(
      (response) => {
        setResources(response.data)

      }
    )
  }, []);


  ////////////////////

  const service = todo && todo.itemAssigment.reduce((sum, material) => {

    sum += material.project.basePrice * material.quantityItemAssigment;

    return sum;
  }, 0)


  const onSubmit = (ajdi, item, assigment, operation, quan) => {

    const found = products.find(obj => {
      return obj.id == ajdi;
    });

    const kind = found.type;
    let kindPrice = 0;
    if (found.type === ("CONSTANT")) {
      kindPrice = found.pricePerPiece;
    }
    if (found.type === ("LIQUID")) {
      kindPrice = found.pricePerLiter;
    }
    orderService.changeQuantityProduct(ajdi, kind, operation, quan)
    jobService.changeJobPrice(assigment, kindPrice, "plus", quan)
    jobService.addResource(ajdi, assigment, item)


  };

  const onDelete = (assigment, resource, ajdi, operation, quan) => {

    const found = products.find(obj => {
      return obj.id == ajdi;
    });

    const kind = found.type;
    let kindPrice = 0;
    if (found.type === ("CONSTANT")) {
      kindPrice = found.pricePerPiece;
    }
    if (found.type === ("LIQUID")) {
      kindPrice = found.pricePerLiter;
    }

    jobService.changeJobPrice(assigment, kindPrice, "minus", quan)
    orderService.changeQuantityProduct(ajdi, kind, operation, quan)
    jobService.deleteResource(resource)


  };

  const endAssigment = (assigment) => {
    jobService.endTask(assigment)

  };


  return (
    <Container className="d-flex justify-content-center align-items-center">

      <Col>
        <div style={{display: "flex"}}>
          <h1>Assignment {todo && todo.id}</h1>

        </div>
        {todo && todo.itemAssigment.map((as) => {
          return (
            <Container>
              <Card className="shadow-lg border rounded-3 mt-5 mb-3">
                <Card.Body>
                  <Row>
                    <Col md="12" lg="3" className="mb-4 mb-lg-0">
                      <p>{as.project.name}</p>
                      <div className="mb-2 text-muted small">
                        <span>Ilość: {as.quantityItemAssigment}</span>
                        <span className="text-primary"> • </span>
                        <span>Rodzaj: {as.project.furnitureCategory}</span>

                      </div>
                      <div className="mb-2 text-muted small">
                        <span>Data dodania: {as.data}<br/></span>
                      </div>
                      <div className="mb-2 text-muted small">
                        <span>Service prize: {as.project.basePrice * as.quantityItemAssigment}<br/></span>
                      </div>
                    </Col>
                    <Col md="6">
                      <h5></h5>
                      <div className="d-flex flex-row">
                        <div className="text-danger mb-1 me-2">

                        </div>
                      </div>
                      <div className="mt-1 mb-0 text-muted small">
                        <Form.Control as="select" size="sm" disabled={todo && todo.approved == true ? true : false}
                                      onChange={
                                        event => setAjdi(event.target.value)
                                      }>
                          <option value="0">Choose resource...</option>
                          {products && products.map((products) => {
                            if ((products.type == "CONSTANT" || products.type == "LIQUID") && (products.quantity > 0 && products.productStatus == true)) {

                              return (
                                <option value={products.id}>{products.id}|{products.name}</option>
                              )
                            }
                          })}

                        </Form.Control>
                      </div>
                      <div className="mb-2 text-muted small">
                        {resources && resources.filter(re => {
                          return re.itemAssigment.id === as.id;
                        }).map((re) => {
                          return (
                            <p style={{textAlign: "right"}}>
                              <span>{re.quantityResources}x</span>{" "}
                              <span>{re.product.name}</span> = {" "}
                              {re.product.type == "LIQUID" &&
                                <span>{re.product.pricePerLiter * re.quantityResources} zł</span>
                              }
                              {re.product.type == "CONSTANT" &&
                                <span>{re.product.pricePerPiece * re.quantityResources} zł</span>
                              }
                              <CButton variant="none" i
                                       onClick={e => {
                                         console.log(e.target.value);
                                         swal({
                                           title: "Jesteś pewien?",
                                           text: "Confirmation means delete resource",
                                           icon: "warning",
                                           buttons: true,
                                           dangerMode: true,
                                         })
                                           .then((willDelete) => {
                                             if (willDelete) {
                                               onDelete(todo.id, re.id, re.product.id, "plus", re.quantityResources)
                                               swal("resource has been deleted", {
                                                 icon: "success",
                                               })
                                             }
                                           });
                                       }}
                              >
                                {todo && todo.approved == false &&
                                  <CIcon icon={cilX}/>
                                }

                              </CButton>
                            </p>

                          )

                        })}

                      </div>


                    </Col>
                    <Col
                      md="6"
                      lg="3"
                      className="border-sm-start-none border-start"
                    >
                      <div className="d-flex flex-row align-items-center mb-1">
                        <Button variant="success" disabled={todo && todo.approved == true ? true : false}
                                onClick={e => {
                                  if (ajdi == 0) {
                                    swal({
                                      title: "Choose resource",
                                      icon: "warning",
                                      buttons: true,
                                      dangerMode: true,
                                    })
                                  } else {
                                    swal({
                                      title: "Jesteś pewien?",
                                      text: "Confirmation means add resource to Job",
                                      icon: "warning",
                                      buttons: true,
                                      dangerMode: true,
                                    })
                                      .then((willPost) => {
                                        if (willPost) {
                                          onSubmit(ajdi, as, todo.id, "minus", 1)

                                          swal("Resource has been added", {
                                            icon: "success",
                                          });


                                        }
                                      });
                                  }
                                }}
                        >
                          Add Resource
                        </Button>
                      </div>


                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Container>

          )
        })}


        <Card className="shadow-lg border rounded-3 mt-5 mb-3">
          <Card.Body className="p-4">
            <div className="float-end">
              <p className="mb-0 me-5 d-flex align-items-center">
                <span className="small text-muted me-2">Price for services:</span>
                <span className="lead fw-normal">{service} zł</span>
              </p>
            </div>

            <div className="float-end">
              <p className="mb-0 me-5 d-flex align-items-center">
                <span className="small text-muted me-2">Price for materials:</span>
                <span className="lead fw-normal">{Math.round((todo && todo.totalPrice - service) * 100) / 100} zł</span>
              </p>
            </div>

            <div className="float-end">
              <p className="mb-0 me-5 d-flex align-items-center">
                <span className="small text-muted me-2">Order total:</span>
                <span className="lead fw-normal">{Math.round(todo && todo.totalPrice * 100) / 100} zł</span>
              </p>
            </div>
          </Card.Body>
        </Card>


        <div style={{display: "flex"}}>
          <Button style={{marginLeft: "auto"}} disabled={todo && todo.approved == true ? true : false} onClick={() => {
            if (todo && Object.keys(todo.resources).length == 0) {
              swal("At least one resource need to be added", {
                icon: "warning",
              });
            } else {
              swal({
                title: "Are you sure?",
                text: "Confirmation means end a Job",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              })
                .then((willPost) => {
                  if (willPost) {
                    endAssigment(which)
                    swal("Job has been ended", {
                      icon: "success",
                    });


                  }
                });

            }
          }}>End Job</Button>
        </div>

      </Col>

    </Container>

  )
}

export default JobDetail
