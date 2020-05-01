import React, { useEffect, useContext } from "react";
import axios from "../apis";

import { RoutineContext } from "../contexts/RoutineStore";
import { AuthContext } from "../contexts/AuthStore";

import Header from "../components/UI/Header";
import ToggleSelect from "../components/Routine/ToggleSelect";
import RoutineList from "../components/Routine/RoutineList";
import PageActionButton from "../components/UI/PageActionButton";

const Routine = (props) => {
  const { state: routineState, dispatch: routineDispatch } = useContext(
    RoutineContext
  );
  const { state: authState, dispatch: authDispatch } = useContext(AuthContext);

  const getAuthTokenHandler = () => {
    return authState.authToken;
  };

  const getAllRoutinesHandler = async () => {
    let allRoutinesChunk;
    try {
      allRoutinesChunk = await axios({
        method: "GET",
        url: "/routines/all",
        headers: {
          Authorization: `Bearer ${getAuthTokenHandler()}`,
        },
      });
    } catch (err) {
      console.log(err);
    }

    return allRoutinesChunk.data;
  };

  const getMyRoutines = async () => {
    let myRoutinesChunk;
    try {
      myRoutinesChunk = await axios({
        method: "GET",
        url: "/routines/my",
        headers: {
          Authorization: `Bearer ${getAuthTokenHandler()}`,
        },
      });
    } catch (err) {
      console.log(err);
    }

    return myRoutinesChunk.data;
  };

  const updateAllRoutinesInfoHandler = async () => {
    const allRoutinesChunk = await getAllRoutinesHandler();
    routineDispatch({
      type: "SAVE_ALL_ROUTINES",
      allRoutines: allRoutinesChunk.allRoutines,
      totalRoutineCount: allRoutinesChunk.totalRoutineCount,
    });
  };

  const updateMyRoutinesInfoHandler = async () => {
    const myRoutinesChunk = await getMyRoutines();
    routineDispatch({
      type: "SAVE_MY_ROUTINES",
      myRoutines: myRoutinesChunk.myRoutines,
      myRoutineCount: myRoutinesChunk.myRoutineCount,
    });
  };

  const selectCategoryHandler = (category) => {
    routineDispatch({
      type: "TOGGLE_ROUTINES_MODE",
      selectedRoutineCategory: category,
    });
  };

  useEffect(() => {
    if (authState.authToken && !routineState.myRoutinesUpdated) {
      updateMyRoutinesInfoHandler();
    }
  }, [authState.authToken, routineState.myRoutinesUpdated]);

  useEffect(() => {
    if (authState.authToken && !routineState.allRoutinesUpdated) {
      updateAllRoutinesInfoHandler();
    }
  }, [authState.authToken, routineState.allRoutinesUpdated]);

  const moveToRoutineSearchPageHandler = () => {
    props.history.push("/routines/search");
  };

  const moveToRoutineDatailPageHandler = (routineId) => {
    props.history.push(`/routines/${routineId}`);
  };

  const moveToRoutineCreatePageHandler = () => {
    props.history.push("/new-routine");
  };

  return (
    <>
      <Header />
      <ToggleSelect
        candidates={[
          { text: "모든 루틴", category: "allRoutines" },
          { text: "내 루틴", category: "myRoutines" },
        ]}
        selectCategory={(category) => selectCategoryHandler(category)}
        selected={routineState.selectedRoutineCategory}
      />
      <RoutineList
        selected={routineState.selectedRoutineCategory}
        routineList={routineState}
        moveToRoutineDetails={(routineId) =>
          moveToRoutineDatailPageHandler(routineId)
        }
      />
      <div onClick={() => moveToRoutineSearchPageHandler()}>검색하기</div>
      <div
        onClick={() =>
          routineDispatch({
            type: "UPDATE_MY_ROUTINES",
            myRoutinesLoaded: false,
          })
        }
      >
        새로 불러오기
      </div>
      <PageActionButton
        actionHandler={() => moveToRoutineCreatePageHandler()}
      />
    </>
  );
};

export default Routine;
