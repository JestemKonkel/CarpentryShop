import axios from "axios";


const API_URL = "http://16.170.170.180:8080/api/";


const getJobs = () => {
  return axios.get(API_URL + `assigment/all`)

};

const getResources = () => {
  return axios.get(API_URL + `resources/all`)

};

const getJobById = (id) => {
  return axios.get(API_URL + `assigment/details/${id}`)

};

const changeJobPrice = (assigment, kindPrice, operation, quan) => {
  return axios.put(API_URL + `resources/modifiedPrice?assigment=${assigment}&price=${kindPrice}&operation=${operation}&quan=${quan}`)

};

const addResource = (ajdi, assigment, item) => {
  return axios.post(API_URL + `resources/add?product=${ajdi}&assigment=${assigment}`, {itemAssigment: item})

};

const deleteResource = (id) => {
  return axios.delete(API_URL + `resources/delete/${id}`)

};

const endTask = (id) => {
  return axios.delete(API_URL + `assigment/end?assigment=${id}`)

};


const ProductService = {
  getJobs,
  getResources,
  getJobById,
  changeJobPrice,
  addResource,
  deleteResource,
  endTask


};

export default ProductService;
