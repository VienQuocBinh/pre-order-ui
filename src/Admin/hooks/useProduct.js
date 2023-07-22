import productApi from "../api/productApi";

const useProduct = () => {
  const getAllProducts = async (accessToken) => {
    const res = await productApi.getAllProducts(accessToken);
    return res;
  };

  const getById = async (id, accessToken) => {
    const res = await productApi.getById(id, accessToken);
    return res;
  };

  return {
    getAllProducts,
    getById,
  };
};

export default useProduct;
