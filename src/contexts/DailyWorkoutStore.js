import React, { useReducer } from "react";

import { dailyWorkoutReducer } from "./reducers";

export const DailyWorkoutContext = React.createContext();

const DailyWorkoutStore = (props) => {
  const [state, dispatch] = useReducer(dailyWorkoutReducer, {
    dailyWorkouts: [],
    dailyWorkoutsCount: null,
    dailyWorkoutsUpdated: false,
  });

  return (
    <DailyWorkoutContext.Provider value={{ state, dispatch }}>
      {props.children}
    </DailyWorkoutContext.Provider>
  );
};

export default DailyWorkoutStore;
