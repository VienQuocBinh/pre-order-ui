import { UserContext } from "../context/UserContext";
import { useContext } from "react";

// ----------------------------------------------------------------------

const useUserContext = () => useContext(UserContext);

export default useUserContext;
