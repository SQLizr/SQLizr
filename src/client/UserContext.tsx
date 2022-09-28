import { createContext, useContext } from "react"
import { UserData, UserContent } from './Types';


export const UserContext = createContext<UserContent>({
  userData: {} as UserData,
  setUserData: () => {}
});

export const useUserContext = () => useContext(UserContext);