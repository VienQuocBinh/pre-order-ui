import orderApi from "../api/orderApi";

const useOrder = () => {
  const getAllOrders = async (accessToken) => {
    const res = await orderApi.getAllOrders(accessToken);
    return res;
  };

  const getById = async (id, accessToken) => {
    const res = await orderApi.getById(id, accessToken);
    return res;
  };

  const getByUserId = async (userId, accessToken) => {
    const res = await orderApi.getByUserId(userId, accessToken);
    return res;
  };

  const getByProductCode = async (code, accessToken) => {
    const res = await orderApi.getByProductCode(code, accessToken);
    return res;
  };

  return {
    getAllOrders,
    getByUserId,
    getById,
    getByProductCode,
  };
};

export default useOrder;
