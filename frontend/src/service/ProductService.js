import axios from "axios";
import swal from "sweetalert";

const API_URL = "http://16.170.170.180:8080/api/";


const addProject = (furniture) => {
  const urlProduct = API_URL + "project/addProject"
  axios.post(urlProduct, furniture).then((res) => {
    console.log(res)
    swal({
      text: "Project added to list!!",
      icon: "success",
    }).then(function () {
      window.location = "#/Dashboard";
    });
    ;
  })

};

const fetchProjectCategory = () => {
  return axios.get(API_URL + "project/category")
};

const addConstant = (constant) => {
  const urlProduct = API_URL + "constant/addConstant"
  axios.post(urlProduct, constant).then((res) => {
    console.log(res)
    swal({
      text: "Project added to list!!",
      icon: "success",
    }).then(function () {
      window.location = "#/Dashboard";
    });
    ;
  })

};

const fetchConstantCategory = () => {
  return axios.get(API_URL + "constant/category")
};

const addLiquid = (liquid) => {
  const urlProduct = API_URL + "liquid/addLiquid"
  axios.post(urlProduct, liquid).then((res) => {
    console.log(res)
    swal({
      text: "Project added to list!!",
      icon: "success",
    }).then(function () {
      window.location = "#/Dashboard";
    });
    ;
  })

};

const fetchLiquidCategory = () => {
  return axios.get(API_URL + "liquid/category")
};

const getProductById = (id) => {
  return axios.get(API_URL + `products/details/${id}`)
};

const getAllProducts = () => {
  return axios.get(API_URL + `products/all`)
};

const changeStatus = (id) => {
  return axios.post(API_URL + `products/status/${id}`)
};

const updateConstant = (id, data) => {
  return axios.put(API_URL + `constant/details/update/constant/${id}`, data)
};

const updateLiquid = (id, data) => {
  return axios.put(API_URL + `liquid/details/update/liquid/${id}`, data)
};

const updateProject = (id, data) => {
  return axios.put(API_URL + `project/details/update/project/${id}`, data)
};

const delivery = (keys, values, types) => {
  return axios.put(API_URL + `products/delivery?product=${keys}&quan=${values}&types=${types}`)
};

const ProductService = {
  addProject,
  fetchProjectCategory,
  addConstant,
  fetchConstantCategory,
  addLiquid,
  fetchLiquidCategory,
  getProductById,
  getAllProducts,
  changeStatus,
  updateConstant,
  updateLiquid,
  updateProject,
  delivery
};

export default ProductService;
