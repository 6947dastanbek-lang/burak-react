import { createContext, useContext } from "react";
import { Member } from "../../lib/types/member";

interface GlobalInterface {
  authMember: Member | null;
  setAuthMember: (member: Member | null) => void;
  // [KETMA-KETLIK-COMMENT: 7.1-BOSQICH (DEFINE)] orderBuilder: Buyurtmalar o'zgarganda sahifani avto-yangilash uchun state
  orderBuilder: Date;
  setOrderBuilder: (input: Date) => void;
}

export const GlobalContext = createContext<GlobalInterface | undefined>(
  undefined,
);

export const useGlobals = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) throw new Error("useGlobals withit Provider");
  return context;
};
