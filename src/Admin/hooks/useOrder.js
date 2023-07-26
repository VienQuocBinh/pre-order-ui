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

  const getByUserId = async (accessToken) => {
    const res = await orderApi.getByUserId(accessToken);
    return res;
  };

  return {
    getAllOrders,
    getByUserId,
    getById,
  };
};

export default useOrder;
