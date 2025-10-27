import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import * as apiClient from "../apiClient"


const AuthContext = React.createContext(undefined);

export const AuthContextProvider = ({ children }) => {
  const { data,isError, refetch, isLoading } = useQuery({
    queryKey: ["validateToken"],
    queryFn: apiClient.validateToken, 
  });

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !isError && !isLoading, 
        refetchToken: refetch,
        isLoading,
        user:data || null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAppContext must be used inside AuthContextProvider");
  }
  return context;
};
