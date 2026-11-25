import React, { ReactNode, useState } from "react";
import Cookies from "universal-cookie";
import { Member } from "../../lib/types/member";
import { GlobalContext } from "../hooks/useGlobals";

const ContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const cookies = new Cookies(); //cookie dastup alip
  if (!cookies.get("accessToken")) localStorage.removeItem("memberData"); //bolmasa local storag oshir degen

  const [authMember, setAuthMember] = useState<Member | null>(
    localStorage.getItem("memberData")
      ? JSON.parse(localStorage.getItem("memberData") as string)
      : null,
  );
  // [KETMA-KETLIK-COMMENT: 7.1-BOSQICH (DEFINE)] orderBuilder state va setOrderBuilder ni Provider ga ulash
  const [orderBuilder, setOrderBuilder] = useState<Date>(new Date());

  console.log("=== verify ===");

  return (
    <GlobalContext.Provider
      value={{ authMember, setAuthMember, orderBuilder, setOrderBuilder }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default ContextProvider;
