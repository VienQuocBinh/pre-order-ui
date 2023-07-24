import api from "./api";

const getAllCategories = (accessToken) =>
  api
    .get("/product-category", {
      headers: {
        authorization: "Bearer " + accessToken,
      },
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));

const getById = (id, accessToken) =>
  api
    .get(`/product-category/GetById?productCategoryId=${id}`, {
      headers: {
        authorization: "Bearer " + accessToken,
      },
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));

const productApi = {
  getAllCategories,
  getById,
};

export default productApi;
