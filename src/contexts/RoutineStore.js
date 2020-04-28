import React, { useReducer } from "react";

import { routineReducer } from "./reducers";

export const RoutineContext = React.createContext();

const RoutineStore = (props) => {
  const [state, dispatch] = useReducer(routineReducer, {
    allRoutines: [],
    totalRoutineCount: 0,
    allRoutinesLoaded: false,
    myRoutines: [],
    myRoutineCount: 0,
    myRoutineUpdated: false,
    selectedRoutineCategory: "allRoutines",
  });

  return (
    <RoutineContext.Provider value={{ state, dispatch }}>
      {props.children}
    </RoutineContext.Provider>
  );
};

export default RoutineStore;
