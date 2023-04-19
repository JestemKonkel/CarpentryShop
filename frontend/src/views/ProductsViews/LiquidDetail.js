import React, {useEffect, useState} from "react";
import {Button, Container, Form, Row} from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import swal from "sweetalert";
import {useLocation} from "react-router-dom";
import productService from "../../service/ProductService";


function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function LiquidDetail() {

  let query = useQuery();


  const [products, setProducts] = useState(null);
  const [err, setError] = useState(false);
  const [category, setCategory] = useState(null);
  const [newName, setNewName] = useState("");
  const [newCategoryL, setNewCategoryL] = useState("");
  const [newCapacity, setNewCapacity] = useState("");
  const [newPricePerLiter, setNewPricePerLiter] = useState("");
  const [newQuantity, setNewQuantity] = useState("");
  const [newDescription, setNewDescription] = useState("");

  useEffect(() => {
    productService.fetchLiquidCategory().then(
      (response) => {
        setCategory(response.data)
      }
    )
  }, []);


  useEffect(() => {
    productService.getProductById(query.get("id")).then(
      (response) => {
        setNewName(response.data.name)
        setNewCategoryL(response.data.liquidCategory)
        setNewCapacity(response.data.capacity)
        setNewPricePerLiter(response.data.pricePerLiter)
        setNewQuantity(response.data.quantity)
        setNewDescription(response.data.description)
      }
    )
  }, []);


  ////////////////////


  const onSubmit = () => {
    const productData = {
      name: newName,
      description: newDescription,
      liquidCategory: newCategoryL,
      pricePerLiter: newPricePerLiter,
      quantity: newQuantity,
      capacity: newCapacity
    }

    productService.updateLiquid(query.get("id"), productData).then(
      (response) => {
        swal({
          text: "Project updated!!!",
          icon: "success",
        })
      }
    )

  };


  return (
    <Container fluid>
      <Row className="d-flex justify-content-center align-items-center">
        <Table>
          <thead>
          <tr>
            <th>Pole</th>
            <th>Value</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>Name</td>
            <Form.Control onChange={
              event => setNewName(event.target.value)
            } style={{border: 0}} defaultValue={newName}/>
          </tr>
          <tr>
            <td>Category</td>
            <Form.Control as="select" onChange={
              event => setNewCategoryL(event.target.value)
            } style={{border: 0}} defaultValue={newCategoryL}>
              <option value={newCategoryL}>{newCategoryL}</option>
              {category && category.map((category) => {
                return (
                  <option value={category}>{category}</option>
                )
              })}
            </Form.Control>
          </tr>
          <tr>
            <td>Capacity</td>
            <Form.Control type="number" min="0" onChange={
              event => setNewCapacity(event.target.value)
            } style={{border: 0}} defaultValue={newCapacity}/>
          </tr>
          <tr>
            <td>Price</td>
            <Form.Control type="number" min="0" onChange={
              event => setNewPricePerLiter(event.target.value)
            } style={{border: 0}} defaultValue={newPricePerLiter}/>
          </tr>
          <tr>
            <td>Quantity</td>
            <Form.Control type="number" min="0" onChange={
              event => setNewQuantity(event.target.value)
            } style={{border: 0}} defaultValue={newQuantity}/>
          </tr>
          <tr>
            <td>Description</td>
            <Form.Control as="textarea" onChange={
              event => setNewDescription(event.target.value)
            } style={{border: 0}} defaultValue={newDescription}/>
          </tr>
          </tbody>
        </Table>
        <Button onClick={onSubmit}>Zmień</Button>
      </Row>

    </Container>
  );
};
