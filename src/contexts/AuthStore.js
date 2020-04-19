import React, { useReducer } from "react";

import { authReducer } from "./reducers";

export const AuthContext = React.createContext();

const AuthStore = (props) => {
  const [state, dispatch] = useReducer(authReducer, {
    authToken: null,
    userId: null,
    name: null,
    oauth: null,
    oauthProvider: null,
  });

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthStore;
