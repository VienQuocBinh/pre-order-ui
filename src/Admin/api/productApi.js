import api from "./api";

export const getAllProducts = (accessToken) =>
  api
    .get("/product/getAll", {
      headers: {
        authorization: "Bearer " + accessToken,
      },
    })
    .then((res) => res.data);

export const getById = (id, accessToken) =>
  api
    .get(`/product/GetById?productId=${id}`, {
      headers: {
        authorization: "Bearer " + accessToken,
      },
    })
    .then((res) => res.data);

const productApi = {
  getAllProducts,
  getById,
};

export default productApi;
