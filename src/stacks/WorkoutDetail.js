import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import axios from "../apis";
import { Redirect } from "react-router-dom";

import { NewRoutineContext } from "../contexts/NewRoutineStore";
import { RoutineContext } from "../contexts/RoutineStore";

import Header from "../components/UI/Header";
import PageActionButton from "../components/UI/PageActionButton";

import { AreaShaded } from "../components/UI/sharedStyles";

const WorkoutNameContainer = styled(AreaShaded)`
  margin: 10px 0;
  height: 4rem;
  display: flex;
  align-items: center;
  padding: 0 20px;
`;

const WorkoutTargetContainer = styled(AreaShaded)`
  margin: 10px 0;
  height: auto;
  padding: 0 20px;
`;

const WorkoutIntensitiesContainer = styled(AreaShaded)`
  margin: 10px 0;
  height: auto;
  padding: 0 20px;
`;

const WorkoutDetail = (props) => {
  const { state: newRoutineState, dispatch: newRoutineDispatch } = useContext(
    NewRoutineContext
  );
  const { dispatch: routineDispatch } = useContext(RoutineContext);
  const [tempWorkoutInfo, setTempWorkoutInfo] = useState(
    newRoutineState.tempWorkout ? newRoutineState.tempWorkout : null
  );
  const [intensities, setIntensities] = useState([{ unit: "", number: "" }]);

  const getWorkoutInfo = async (workoutId) => {
    let workoutInfoLoaded;
    try {
      workoutInfoLoaded = await axios({
        method: "GET",
        url: `/workouts/one/${workoutId}`,
      });
    } catch (err) {
      console.log(err);
    }

    if (workoutInfoLoaded) {
      console.log(workoutInfoLoaded);
      newRoutineDispatch({
        type: "SAVE_TEMP_WORKOUT",
        tempWorkout: workoutInfoLoaded.data.workout,
      });
      setTempWorkoutInfo(workoutInfoLoaded.data.workout);
    }
  };

  const changeNumberHandler = (idx, value) => {
    const temp = intensities;
    temp[idx].number = value;
    setIntensities(temp);
    console.log(intensities);
  };

  const changeUnitHandler = (idx, value) => {
    const temp = intensities;
    temp[idx].unit = value;
    setIntensities(temp);
    console.log(intensities);
  };

  const combineWorkoutInfoHandler = () => {
    newRoutineDispatch({
      type: "PUSH_WORKOUT_INFO",
      pushedWorkout: {
        workout: tempWorkoutInfo,
        intensities: intensities,
      },
    });
    newRoutineDispatch({
      type: "CLEAR_TEMP_WORKOUT",
    });

    props.history.push("/new-routine");
  };

  useEffect(() => {
    if (!tempWorkoutInfo) {
      getWorkoutInfo(props.match.params.workoutId);
    }
  }, [props.match.params.workoutId]);

  return (
    <>
      <Header />
      {newRoutineState.tempWorkout ? (
        <div>
          <WorkoutNameContainer>
            {newRoutineState.tempWorkout.workoutNameKor}
          </WorkoutNameContainer>
          <WorkoutTargetContainer>
            <strong>타겟</strong>
            <div>
              타켓부위
              <div>{newRoutineState.tempWorkout.targetPartKor}</div>
            </div>
            <div>
              타켓근육
              <div>{newRoutineState.tempWorkout.targetMuscleKor}</div>
            </div>
          </WorkoutTargetContainer>
          <WorkoutIntensitiesContainer>
            <strong>강도</strong>
            {intensities.map((i, k) => (
              <div key={k}>
                <input
                  placeholder="숫자"
                  onChange={(e) => changeNumberHandler(k, e.target.value)}
                />
                <input
                  placeholder="단위"
                  onChange={(e) => changeUnitHandler(k, e.target.value)}
                />
              </div>
            ))}
          </WorkoutIntensitiesContainer>
        </div>
      ) : (
        <Redirect to="/new-routine" />
      )}
      <PageActionButton actionHandler={() => combineWorkoutInfoHandler()} />
    </>
  );
};

export default WorkoutDetail;
