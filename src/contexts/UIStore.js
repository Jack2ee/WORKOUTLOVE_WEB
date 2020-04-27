import React, { useReducer } from "react";

import { UIReducer } from "./reducers";

export const UIContext = React.createContext();

const UIStore = (props) => {
  const [state, dispatch] = useReducer(UIReducer, {
    showStack: false,
  });

  return (
    <UIContext.Provider value={{ state, dispatch }}>
      {props.children}
    </UIContext.Provider>
  );
};

export default UIStore;
