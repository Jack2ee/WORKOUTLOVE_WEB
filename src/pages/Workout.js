import React, { useEffect, useContext } from "react";
import axios from "../apis";

import { WorkoutContext } from "../contexts/WorkoutStore";
import { AuthContext } from "../contexts/AuthStore";

const Workout = (props) => {
  const { state: workoutState, dispatch: workoutDispatch } = useContext(
    WorkoutContext
  );
  const { state: authState, dispatch: authDispatch } = useContext(AuthContext);

  const getAuthTokenHandler = () => {
    return authState.authToken;
  };

  const getMyWorkouts = async () => {
    let myWorkoutsChunk;
    try {
      myWorkoutsChunk = await axios({
        method: "GET",
        url: "/workouts/my",
        headers: {
          Authorization: `Bearer ${getAuthTokenHandler()}`,
        },
      });
    } catch (err) {
      console.log(err);
    }

    return myWorkoutsChunk.data;
  };

  const updateMyWorkoutsInfoHandler = async () => {
    const myWorkoutsChunk = await getMyWorkouts();
    workoutDispatch({
      type: "SAVE_MY_WORKOUTS",
      myWorkouts: myWorkoutsChunk.myWorkouts,
      myWorkoutCount: myWorkoutsChunk.myWorkoutCount,
      myWorkoutsLoaded: true,
    });
  };

  useEffect(() => {
    if (authState.authToken && !workoutState.myWorkoutsLoaded) {
      updateMyWorkoutsInfoHandler();
    }
  }, [authState.authToken, workoutState.myWorkoutsLoaded]);

  const moveToworkoutSearchPageHandler = () => {
    props.history.push("/workouts/search");
  };

  console.log(workoutState);

  return (
    <>
      <div onClick={() => moveToworkoutSearchPageHandler()}>검색하기</div>
      <div
        onClick={() =>
          workoutDispatch({
            type: "UPDATE_MY_WORKOUTS",
            myWorkoutsLoaded: false,
          })
        }
      >
        새로 불러오기
      </div>
    </>
  );
};

export default Workout;
