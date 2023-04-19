import React, {useEffect, useState} from "react";
import {CAccordion, CAccordionBody, CAccordionHeader, CAccordionItem, CContainer} from "@coreui/react";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import jobService from "../../service/JobService";


const JobList = () => {
  const [loading, setLoading] = useState(true);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [toDo, setToDo] = useState(null);
  const [resources, setResources] = useState(null);

  const [err, setError] = useState(false);


  useEffect(() => {
    jobService.getJobs().then(
      (response) => {
        setToDo(response.data)
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


  return (
    <CContainer>
      {toDo && toDo
        .sort((a, b) => a.name > b.name ? 1 : -1)
        .map((todo) => {
          return (
            <CContainer>
              {Object.keys(toDo).length == 0 &&
                <p>Brak zleceń</p>
              }
              {todo.inCart == false &&
                <CAccordion style={{margin: 10}} activeItemKey={2}>
                  <CAccordionItem itemKey={1}>

                    <CAccordionHeader style={{display: "flex"}}>
                      <p>{todo.name}&nbsp;</p>
                      {todo.approved == false &&
                        <p>{" "} - In Progress</p>
                      }
                      {todo.approved == true &&
                        <p>{" "} - Completed</p>
                      }
                    </CAccordionHeader>
                    <CAccordionBody>
                      <div style={{display: "flex"}}>
                        <p><strong>Ordered by:</strong> {todo.customerName} {todo.customerLastName}</p>
                        <p style={{marginLeft: "auto"}}><strong>Date of order:</strong> {todo.creationDate}</p>
                      </div>

                      <div style={{display: "flex"}}>
                        <p style={{marginLeft: "auto"}}><strong>Total
                          :</strong> {Math.round(todo.totalPrice * 100) / 100} zł</p>
                      </div>

                      <div style={{display: "flex"}}>
                        <p style={{marginLeft: "auto"}}><strong>Number of phone: </strong> {todo.customerPhoneNumber}
                        </p>
                      </div>
                      <hr/>
                      {todo.itemAssigment?.map((as) => {

                        return (
                          <div>
                            <div style={{display: "flex"}}>
                              <p>{as.project.name} {""} x{as.quantityItemAssigment} = {as.project.basePrice * as.quantityItemAssigment} zł</p>
                            </div>

                            {resources && resources.map((re) => {
                              return (
                                <p style={{textAlign: "right"}}>
                                  {re.itemAssigment.id == as.id &&

                                    <span>
                                  <span>{re.quantityResources}x</span>{" "}
                                      <span>{re.product.name}</span> = {" "}
                                      {re.product.type == "LIQUID" &&
                                        <span>{re.product.pricePerLiter * re.quantityResources} zł</span>
                                      }
                                      {re.product.type == "CONSTANT" &&
                                        <span>{re.product.pricePerPiece * re.quantityResources} zł</span>
                                      }

                                </span>

                                  }
                                </p>

                              )

                            })}

                          </div>
                        )
                      })}

                      <div style={{display: "flex"}}>
                        <Button style={{marginLeft: "auto"}}><Link style={{color: "white", textDecoration: "none"}}
                                                                   to={`/JobDetail?id=${todo.id}`}>Go To</Link></Button>
                      </div>

                    </CAccordionBody>

                  </CAccordionItem>
                </CAccordion>
              }
            </CContainer>

          )
        })}

    </CContainer>

  )
}

export default JobList
