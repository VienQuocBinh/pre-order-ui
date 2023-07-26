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

  const create = async (product, accessToken) => {
    const res = await productApi.create(product, accessToken);
    return res;
  };

  const deleteProduct = async (id, accessToken) => {
    const res = await productApi.deleteProduct(id, accessToken);
    return res;
  };

  const updateProduct = async (id, product, accessToken) => {
    const res = await productApi.updateProduct(id, product, accessToken);
    return res;
  };

  return {
    getAllProducts,
    getById,
    create,
    deleteProduct,
    updateProduct,
  };
};

export default useProduct;
