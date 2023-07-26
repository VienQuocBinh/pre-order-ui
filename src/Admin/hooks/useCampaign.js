import campaignApi from "../api/campaignApi";

const useCampaign = () => {
  const getAllCampaigns = async (accessToken) => {
    return await campaignApi.getAllCampaigns(accessToken);
  };
  const getCampaignById = async (id, accessToken) => {
    return await campaignApi.getById(id, accessToken);
  };
  return {
    getAllCampaigns,
    getCampaignById,
  };
};

export default useCampaign;
