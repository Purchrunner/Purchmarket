﻿import { useQuery, gql, ApolloError } from "@apollo/client";
import { createContext, useContext, ReactNode } from "react";

export interface User {
  id: string;
  databaseId: number;
  firstName: string;
  lastName: string;
  email: string;
  description: string;
  capabilities: string[];
  avatar: {
    url: string;
  };
}

interface AuthData {
  loggedIn: boolean;
  user?: User;
  loading: boolean;
  error?: ApolloError;
}

const DEFAULT_STATE: AuthData = {
  loggedIn: false,
  user: undefined,
  loading: false,
  error: undefined,
};

const AuthContext = createContext(DEFAULT_STATE);

export const GET_USER = gql`
  query getUser {
    viewer {
      id
      databaseId
      firstName
      lastName
      email
      description
      capabilities
      avatar(size: 400) {
        url
      }
    }
  }
`;

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data, loading, error } = useQuery(GET_USER);
  const user = data?.viewer;
  const loggedIn = Boolean(user);

  const value = {
    loggedIn,
    user,
    loading,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

const useAuth = () => useContext(AuthContext);

export default useAuth;
