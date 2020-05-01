import React, { useReducer } from "react";

import { newRoutineReducer } from "./reducers";

export const NewRoutineContext = React.createContext();

const NewRoutineStore = (props) => {
  const [state, dispatch] = useReducer(newRoutineReducer, {
    routineName: "",
    description: "",
    workouts: [],
    tempWorkout: null,
  });

  return (
    <NewRoutineContext.Provider value={{ state, dispatch }}>
      {props.children}
    </NewRoutineContext.Provider>
  );
};

export default NewRoutineStore;
