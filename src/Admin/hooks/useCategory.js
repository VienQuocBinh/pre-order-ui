import categoryApi from "../api/categoryApi";

const useCategory = () => {
  const getAllCatgories = async (accessToken) => {
    const res = await categoryApi.getAllCategories(accessToken);
    return res;
  };

  const getById = async (id, accessToken) => {
    const res = await categoryApi.getById(id, accessToken);
    return res;
  };

  return {
    getAllCatgories,
    getById,
  };
};

export default useCategory;
