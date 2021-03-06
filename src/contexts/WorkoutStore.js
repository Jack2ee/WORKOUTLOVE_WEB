import React, { useReducer } from "react";

import { workoutReducer } from "./reducers";

export const WorkoutContext = React.createContext();

const WorkoutStore = (props) => {
  const [state, dispatch] = useReducer(workoutReducer, {
    allWorkouts: [],
    totalWorkoutCount: 0,
    allWorkoutsUpdated: false,
    myWorkouts: [],
    myWorkoutCount: 0,
    myWorkoutsUpdated: false,
  });

  return (
    <WorkoutContext.Provider value={{ state, dispatch }}>
      {props.children}
    </WorkoutContext.Provider>
  );
};

export default WorkoutStore;
