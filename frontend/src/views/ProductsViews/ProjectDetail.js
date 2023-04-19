import React, {useEffect, useState} from "react";
import {Button, Container, Form, Row} from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import swal from "sweetalert";
import {useLocation} from "react-router-dom";
import productService from "../../service/ProductService";


function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function FurnitureDetail() {

  let query = useQuery();


  const [products, setProducts] = useState(null);
  const [err, setError] = useState(false);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    productService.fetchProjectCategory().then(
      (response) => {
        setCategory(response.data)
      }
    )
  }, []);

  const [newName, setNewName] = useState("");
  const [newCategoryF, setNewCategoryF] = useState("");
  const [newBasePrice, setNewBasePrice] = useState("");
  const [newWeight, setNewWeight] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newImage, setNewImage] = useState("");

  useEffect(() => {
    productService.getProductById(query.get("id")).then(
      (response) => {
        setNewName(response.data.name)
        setNewCategoryF(response.data.furnitureCategory)
        setNewBasePrice(response.data.basePrice)
        setNewWeight(response.data.weight)
        setNewDescription(response.data.description)
        setNewImage(response.data.photos)
      }
    )
  }, []);

  ////////////////////


  const onSubmit = () => {
    const productData = {
      name: newName,
      description: newDescription,
      furnitureCategory: newCategoryF,
      basePrice: newBasePrice,
      weight: newWeight
    }

    productService.updateProject(query.get("id"), productData).then(
      (response) => {
        swal({
          text: "Project updated!!!",
          icon: "success",
        })
      }
    )

  };

  console.log(newImage)
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
              event => setNewCategoryF(event.target.value)
            } style={{border: 0}} defaultValue={newCategoryF}>
              <option value={newCategoryF}>{newCategoryF}</option>
              {category && category.map((category, index) => {
                return (
                  <option value={category}>{category}</option>
                )
              })}
            </Form.Control>
          </tr>
          <tr>
            <td>Base Prize</td>
            <Form.Control type="number" min="0" onChange={
              event => setNewBasePrice(event.target.value)
            } style={{border: 0}} defaultValue={newBasePrice}/>
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
