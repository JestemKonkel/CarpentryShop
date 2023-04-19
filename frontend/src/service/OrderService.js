import axios from "axios";
import swal from "sweetalert";

const API_URL = "http://16.170.170.180:8080/api/";


const addConstant = (constant) => {
  const urlProduct = API_URL + "items/addItem"
  return axios.post(urlProduct, {elementConstant: constant})

};

const addLiquid = (liquid) => {
  const urlProduct = API_URL + "items/addItem"
  return axios.post(urlProduct, {elementLiquid: liquid})

};

const addProject = (Project) => {
  const urlProduct = API_URL + "assigment/add"
  return axios.post(urlProduct, {project: Project})

};

const changeQuantityProduct = (id, type, operation, quan) => {
  return axios.put(API_URL + `products/modified?product=${id}&type=${type}&operation=${operation}&quan=${quan}`)
};

const changeQuantityItems = (id, operation, quan) => {
  return axios.put(API_URL + `items/modified?item=${id}&operation=${operation}&quan=${quan}`)
};

const changeQuantityAssigment = (id, operation, quan) => {
  return axios.put(API_URL + `assigment/modified?item=${id}&operation=${operation}&quan=${quan}`)
};

const changePriceItems = (operation, price) => {
  return axios.put(API_URL + `items/totalprice?operation=${operation}&total=${price}`)
};

const changePriceAssigment = (operation, price) => {
  return axios.put(API_URL + `assigment/totalprice?operation=${operation}&total=${price}`)
}

const getAssignments = () => {
  return axios.get(API_URL + `itemA/all`)
};

const getItems = () => {
  return axios.get(API_URL + `item/all`)
};

const getTotalPrizeCart = () => {
  return axios.get(API_URL + `items/total`)
};

const getTotalPrizeAssignment = () => {
  return axios.get(API_URL + `assigment/total`)
};

const endItems = () => {
  return axios.get(API_URL + `items/end`)
};

const endAssignments = () => {
  return axios.get(API_URL + `assigment/end`)
};

const updateInfo = (name, lastname, phonenumber) => {
  return axios.put(API_URL + `assigment/customerData?customerName=${name}&customerLastName=${lastname}&customerPhoneNumber=${phonenumber}`)
};

const deleteItem = (id) => {
  return axios.delete(API_URL + `item/deleteItem/${id}`)
};

const deleteAssigment = (id) => {
  return axios.delete(API_URL + `itemA/delete/${id}`)
};


const ProductService = {
  addConstant,
  addLiquid,
  addProject,
  changeQuantityProduct,
  changeQuantityAssigment,
  changeQuantityItems,
  changePriceAssigment,
  changePriceItems,
  getAssignments,
  getItems,
  getTotalPrizeCart,
  getTotalPrizeAssignment,
  endItems,
  endAssignments,
  updateInfo,
  deleteItem,
  deleteAssigment,
};

export default ProductService;
