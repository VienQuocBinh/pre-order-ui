import api from "./api";

const getAllProducts = (accessToken) =>
  api
    .get("/product/getAll?PageSize=999", {
      headers: {
        authorization: "Bearer " + accessToken,
      },
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));

const getById = (id, accessToken) =>
  api
    .get(`/product/GetById?productId=${id}`, {
      headers: {
        authorization: "Bearer " + accessToken,
      },
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));

const create = (product, accessToken) =>
  api
    .post(`/product/Create`, product, {
      headers: {
        authorization: "Bearer " + accessToken,
      },
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));


const deleteProduct = (id, accessToken) =>
    api
      .delete(`/product/Delete?productId=${id}`, {
        headers: {
          authorization: "Bearer " + accessToken,
        },
      })
      .then((res) => res.data)
      .catch((err) => console.log(err));

const productApi = {
  getAllProducts,
  getById,
  create,
  deleteProduct
};

export default productApi;
