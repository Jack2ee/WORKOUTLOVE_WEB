import React, { useState, useEffect, useContext } from "react";
import axios from "../apis";

import { WorkoutContext } from "../contexts/WorkoutStore";
import { AuthContext } from "../contexts/AuthStore";
import { NewRoutineContext } from "../contexts/NewRoutineStore";

import Autosuggest from "../Util/Autosuggest";
import WorkoutInfoInputs from "../components/CreateRoutine/WorkoutInputs/WorkoutInputs";

const WorkoutSearch = (props) => {
  const { state: workoutState, dispatch: workoutDispatch } = useContext(
    WorkoutContext
  );
  const { state: authState, dispatch: authDispatch } = useContext(AuthContext);
  const { state: newRoutineState, dispatch: newRoutineDispatch } = useContext(
    NewRoutineContext
  );
  const [tempWorkout, setTempWorkout] = useState(null);

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
    });
  };

  const getWorkoutInfoFromAutosuggest = (info) => {
    newRoutineDispatch({
      type: "SAVE_TEMP_WORKOUT",
      tempWorkout: info,
    });

    moveToWorkoutDetailPageHandler(info._id);
  };

  const moveToWorkoutDetailPageHandler = (workoutId) => {
    props.history.push(`/workouts/${workoutId}/detail`);
  };

  useEffect(() => {
    if (authState.authToken && !workoutState.allWorkoutsUpdated) {
      updateAllWorkoutsInfoHandler();
    }
  }, [authState.authToken, workoutState.allWorkoutsUpdated]);

  return (
    <>
      <Autosuggest
        listOfThingsToAutosuggest={workoutState.allWorkouts}
        inputPlaceholder="운동명을 검색해보세요!"
        searchKey="workoutNameKor"
        clickItemAction={(info) => getWorkoutInfoFromAutosuggest(info)}
      />
    </>
  );
};

export default WorkoutSearch;
