import React, { useEffect, useContext } from "react";
import axios from "../apis";

import { WorkoutContext } from "../contexts/WorkoutStore";
import { AuthContext } from "../contexts/AuthStore";

const WorkoutSearch = (props) => {
  const { state: workoutState, dispatch: workoutDispatch } = useContext(
    WorkoutContext
  );
  const { state: authState, dispatch: authDispatch } = useContext(AuthContext);

  const getAuthTokenHandler = () => {
    return authState.authToken;
  };

  const getAllWorkoutsHandler = async () => {
    let allWorkoutsChunk;
    try {
      allWorkoutsChunk = await axios({
        method: "GET",
        url: "/workouts/all",
        headers: {
          Authorization: `Bearer ${getAuthTokenHandler()}`,
        },
      });
    } catch (err) {
      console.log(err);
    }

    return allWorkoutsChunk.data;
  };

  const updateAllWorkoutsInfoHandler = async () => {
    const allWorkoutsChunk = await getAllWorkoutsHandler();
    workoutDispatch({
      type: "SAVE_ALL_WORKOUTS",
      allWorkouts: allWorkoutsChunk.allWorkouts,
      totalWorkoutCount: allWorkoutsChunk.totalWorkoutCount,
      allWorkoutsLoaded: true,
    });
  };

  useEffect(() => {
    if (authState.authToken && !workoutState.allWorkoutsLoaded) {
      updateAllWorkoutsInfoHandler();
    }
  }, [authState.authToken, workoutState.allWorkoutsLoaded]);

  console.log(workoutState);
  return <></>;
};

export default WorkoutSearch;
