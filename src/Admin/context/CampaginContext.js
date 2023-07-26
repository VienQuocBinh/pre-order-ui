import React, { createContext, useContext } from "react";
import useCampaign from "../hooks/useCampaign";

const CampaignContext = createContext();
const CampaignProvider = ({children}) => {
  const campaignMethods = useCampaign();
  return (
    <CampaignContext.Provider value={campaignMethods}>
      {children}
    </CampaignContext.Provider>
  );
};

const useCampaignContext = () => {
  return useContext(CampaignContext);
};

export { CampaignProvider, useCampaignContext };
