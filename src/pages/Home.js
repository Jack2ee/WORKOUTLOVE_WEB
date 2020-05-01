import React, { useEffect, useContext } from "react";
import axios from "../apis";

import { AuthContext } from "../contexts/AuthStore";
import { DailyWorkoutContext } from "../contexts/DailyWorkoutStore";

import NavigationItems from "../components/Navigation/NavigationItems";
import Header from "../components/UI/Header";
import User from "../components/Home/User/User";
import Main from "../components/Home/Main/Main";

const Home = (props) => {
  const { state: authState } = useContext(AuthContext);
  const {
    state: dailyWorkoutState,
    dispatch: dailyWorkoutsDispatch,
  } = useContext(DailyWorkoutContext);

  const moveToMypageHandler = () => {
    props.history.push("/mypage");
  };

  const moveToRoutineSearchPageHandler = () => {
    props.history.push("/routines");
  };

  const moveToEquipmentSearchPageHandler = () => {
    props.history.push("/equipment");
  };

  const getAuthTokenHandler = () => {
    return authState.authToken;
  };

  const getDailyWorkoutHandler = async () => {
    let dailyWorkoutsLoaded;
    try {
      dailyWorkoutsLoaded = await axios({
        method: "GET",
        url: "/my-daily-workouts/chunk/1",
        headers: {
          Authorization: `Bearer ${getAuthTokenHandler()}`,
        },
      });
    } catch (err) {
      console.log(err);
    }

    if (dailyWorkoutsLoaded) {
      dailyWorkoutsDispatch({
        type: "SAVE_DAILY_WORKOUTS",
        dailyWorkouts: dailyWorkoutsLoaded.data.workoutChunk,
        dailyWorkoutsCount: dailyWorkoutsLoaded.data.totalWorkoutCount,
      });
    }
  };

  useEffect(() => {
    if (authState.authToken && !dailyWorkoutState.dailyWorkoutsUpdated) {
      getDailyWorkoutHandler();
    }
  }, [authState.authToken]);

  console.log(dailyWorkoutState);

  return (
    <>
      <Header />
      <User
        moveToMypageHandler={() => moveToMypageHandler()}
        authState={authState}
      />
      <Main
        moveToRoutineSearchPageHandler={() => moveToRoutineSearchPageHandler()}
        moveToEquipmentSearchPageHandler={() =>
          moveToEquipmentSearchPageHandler()
        }
      />
      <NavigationItems path={props.match.path} />
    </>
  );
};

export default Home;
