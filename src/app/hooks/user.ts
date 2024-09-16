import { useContext } from "react";

import { UserContext } from "@/app/context/user";

export const useUser = () => {
  return useContext(UserContext);
};
