import api from "./api";

const getAllOrders = (accessToken) =>
  api
    .get("/order/getAll?PageSize=999", {
      headers: {
        authorization: "Bearer " + accessToken,
      },
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));

const getById = (id, accessToken) =>
  api
    .get(`/order/GetById?orderId=${id}`, {
      headers: {
        authorization: "Bearer " + accessToken,
      },
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));

const getByUserId = (userId, accessToken) =>
  api
    .get(`/admin-order/getByUserId?userId=${userId}&PageSize=999`, {
      headers: {
        authorization: "Bearer " + accessToken,
      },
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));

const getByProductCode = (productCode, accessToken) =>
  api
    .get(`/order/getByProductCode?productCode=${productCode}&PageSize=999`, {
      headers: {
        authorization: "Bearer " + accessToken,
      },
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));

const orderApi = {
  getAllOrders,
  getByUserId,
  getById,
  getByProductCode,
};

export default orderApi;
