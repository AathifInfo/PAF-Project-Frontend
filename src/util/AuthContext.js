import React, { createContext, useContext, useReducer } from "react";

// Define initial state
const initialState = {
  authenticated: false,
  currentUser: null,
  loading: false,
};

// Create context
const AuthContext = createContext();

// Define reducer function
debugger;
const authReducer = (state, action) => {
    console.log("authReducer switch case trigger")
  switch (action.type) {
    case "LOGIN":
        console.log("authReducer LOGIN switch case trigger")
      return {
        ...state,
        authenticated: true,
        currentUser: action.payload.currentUser,
        loading: false,
      };
    case "LOGOUT":
        console.log("authReducer LOGOUT switch case trigger")
      return {
        ...state,
        authenticated: false,
        currentUser: null,
      };
    default:
        console.log("authReducer default switch case trigger")
      return state;
  }
};

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth state and dispatch
export const useAuth = () => {
  return useContext(AuthContext);
};
