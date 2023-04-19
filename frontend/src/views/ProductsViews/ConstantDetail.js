import React, {useEffect, useState} from "react";
import {Button, Container, Form, Row} from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import swal from "sweetalert";
import {useLocation} from "react-router-dom";
import productService from "../../service/ProductService";


function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function ConstantDetail() {

  let query = useQuery();

  const [products, setProducts] = useState(null);
  const [err, setError] = useState(false);
  const [category, setCategory] = useState(null);
  const [newName, setNewName] = useState("");
  const [newCategoryC, setNewCategoryC] = useState("");
  const [newPricePerPiece, setNewPricePerPiece] = useState("");
  const [newQuantity, setNewQuantity] = useState("")
  const [newLengthInCm, setNewLengthInCm] = useState("");
  const [newWidthInCm, setNewWidthInCm] = useState("");
  const [newDescription, setNewDescription] = useState("");

  useEffect(() => {
    productService.fetchConstantCategory().then(
      (response) => {
        setCategory(response.data)
      }
    )
  }, []);


  useEffect(() => {
    productService.getProductById(query.get("id")).then(
      (response) => {
        setNewName(response.data.name)
        setNewCategoryC(response.data.constantCategory)
        setNewQuantity(response.data.quantity)
        setNewPricePerPiece(response.data.pricePerPiece)
        setNewLengthInCm(response.data.lengthInCm)
        setNewWidthInCm(response.data.widthInCm)
        setNewDescription(response.data.description)
      }
    )
  }, []);


  ////////////////////


  const onSubmit = () => {
    const productData = {
      name: newName,
      description: newDescription,
      constantCategory: newCategoryC,
      quantity: newQuantity,
      pricePerPiece: newPricePerPiece,
      lengthInCm: newLengthInCm,
      widthInCm: newWidthInCm
    }

    productService.updateConstant(query.get("id"), productData).then(
      () => {
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
            } style={{border: 0}} className="border-sm-start-none border-bottom" defaultValue={newName}/>
          </tr>
          <tr>
            <td>Category</td>
            <Form.Control as="select" onChange={
              event => setNewCategoryC(event.target.value)
            } style={{border: 0}} defaultValue={newCategoryC}>
              <option value={newCategoryC}>{newCategoryC}</option>
              {category && category.map((category) => {
                return (
                  <option value={category}>{category}</option>
                )
              })}
            </Form.Control>
          </tr>
          <tr>
            <td>Prize per piece</td>
            <Form.Control type="number" min="0" onChange={
              event => setNewPricePerPiece(event.target.value)
            } style={{border: 0}} defaultValue={newPricePerPiece}/>
          </tr>
          <tr>
            <td>Length</td>
            <Form.Control type="number" min="0" onChange={
              event => setNewLengthInCm(event.target.value)
            } style={{border: 0}} defaultValue={newLengthInCm}/>
          </tr>
          <tr>
            <td>Width</td>
            <Form.Control type="number" min="0" onChange={
              event => setNewWidthInCm(event.target.value)
            } style={{border: 0}} defaultValue={newWidthInCm}/>
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
