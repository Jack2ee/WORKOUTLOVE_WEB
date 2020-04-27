import React, { useEffect, useContext } from "react";
import axios from "../apis";

import { WorkoutContext } from "../contexts/WorkoutStore";
import { AuthContext } from "../contexts/AuthStore";

import Autosuggest from "../Util/Autosuggest";

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

  return (
    <Autosuggest
      listOfThingsToAutosuggest={workoutState.allWorkouts}
      inputPlaceholder="운동명을 검색해보세요!"
      searchKey="workoutNameKor"
    />
  );
};

export default WorkoutSearch;
