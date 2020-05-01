import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import axios from "../apis";

import { RoutineContext } from "../contexts/RoutineStore";
import { AuthContext } from "../contexts/AuthStore";

import Header from "../components/UI/Header";
import User from "../components/RoutineDetail/User/User";
import PageActionButton from "../components/UI/PageActionButton";

const RoutineDetail = (props) => {
  const { state: routineState, dispatch: routineDispatch } = useContext(
    RoutineContext
  );
  const { state: authState } = useContext(AuthContext);
  const [routineDetail, setRoutineDetail] = useState(null);
  const [creatorInfo, setCreatorInfo] = useState(null);

  const getOneRoutineDetailHandler = async () => {
    let routineDetailLoaded;
    try {
      routineDetailLoaded = await axios({
        method: "GET",
        url: `/routines/one/${props.match.params.routineId}`,
      });
    } catch (err) {
      console.log(err);
    }

    if (routineDetailLoaded) {
      console.log(routineDetailLoaded.data.routine);
      setRoutineDetail(routineDetailLoaded.data.routine);
      setCreatorInfo(routineDetailLoaded.data.creatorInfo);
    }
  };

  const getAuthTokenHandler = () => {
    return authState.authToken;
  };

  const addRoutineToTodayWorkoutHandler = async () => {
    let addedTodayWorkouts;
    try {
      addedTodayWorkouts = await axios({
        method: "POST",
        url: "/my-daily-workouts",
        data: {
          contents: {
            routineId: routineDetail._id,
          },
        },
        headers: {
          Authorization: `Bearer ${getAuthTokenHandler()}`,
        },
      });
    } catch (err) {
      console.log(err);
    }

    if (addedTodayWorkouts) {
      props.history.push("/");
    }
  };

  console.log(routineDetail);
  console.log(routineState[`${props.selectedRoutineCategory}`]);

  useEffect(() => {
    getOneRoutineDetailHandler();
  }, [props.match.params.routineId]);

  let routineDetailHeader = null;
  if (routineDetail) {
    routineDetailHeader = <div>{routineDetail.routineName}</div>;
  }

  let routineCreatorInfoComponent = null;
  if (creatorInfo) {
    routineCreatorInfoComponent = <User creatorInfo={creatorInfo}></User>;
  }

  let routineDetailComponent = null;
  if (routineDetail) {
    routineDetailComponent = routineDetail.workouts.map((i, k) => (
      <div key={k}>
        <div>{i.workout.workoutNameKor}</div>
        <div>
          {i.intensities.map((i, k) => (
            <div key={k}>{i.number + i.unit}</div>
          ))}
        </div>
      </div>
    ));
  }

  return (
    <>
      <Header>{routineDetailHeader}</Header>
      {routineCreatorInfoComponent}
      {routineDetailComponent}
      <PageActionButton
        actionHandler={() => addRoutineToTodayWorkoutHandler()}
      />
    </>
  );
};

export default RoutineDetail;
