import React, { useContext } from "react";

import { NewRoutineContext } from "../contexts/NewRoutineStore";

import Header from "../components/UI/Header";
import Main from "../components/CreateRoutine/Main/Main";
import WorkoutList from "../components/CreateRoutine/Main/WorkoutList";

const CreateRoutine = (props) => {
  const { state: newRoutineState, dispatch: newRoutineDispatch } = useContext(
    NewRoutineContext
  );

  const changeRoutineNameHandler = (value) => {
    newRoutineDispatch({
      type: "CHANGE_ROUTINE_NAME",
      routineName: value,
    });
  };

  const changeRoutineDescriptionHandler = (value) => {
    newRoutineDispatch({
      type: "CHANGE_ROUTINE_DESCRIPTION",
      description: value,
    });
  };

  const moveToWorkoutSearchPageHandler = () => {
    props.history.push("/workouts/search");
  };

  return (
    <>
      <Header />
      <Main
        newRoutineName={newRoutineState.routineName}
        newRoutineDescription={newRoutineState.description}
        changeRoutineName={(value) => changeRoutineNameHandler(value)}
        changeRoutineDescription={(value) =>
          changeRoutineDescriptionHandler(value)
        }
        moveToWorkoutSearchPage={() => moveToWorkoutSearchPageHandler()}
      />
      <WorkoutList workouts={newRoutineState.workouts} />
    </>
  );
};

export default CreateRoutine;
