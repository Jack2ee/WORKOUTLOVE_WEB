import React, { useEffect, useContext } from "react";
import axios from "../apis";

import { RoutineContext } from "../contexts/RoutineStore";
import { AuthContext } from "../contexts/AuthStore";

const Routine = (props) => {
  const { state: routineState, dispatch: routineDispatch } = useContext(
    RoutineContext
  );
  const { state: authState, dispatch: authDispatch } = useContext(AuthContext);

  const getAuthTokenHandler = () => {
    return authState.authToken;
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

  const updateMyRoutinesInfoHandler = async () => {
    const myRoutinesChunk = await getMyRoutines();
    routineDispatch({
      type: "SAVE_MY_ROUTINES",
      myRoutines: myRoutinesChunk.myRoutines,
      myRoutineCount: myRoutinesChunk.myRoutineCount,
      myRoutinesLoaded: true,
    });
  };

  useEffect(() => {
    if (authState.authToken && !routineState.myRoutinesLoaded) {
      updateMyRoutinesInfoHandler();
    }
  }, [authState.authToken, routineState.myRoutinesLoaded]);

  const moveToRoutineSearchPageHandler = () => {
    props.history.push("/routines/search");
  };

  console.log(routineState);

  return (
    <>
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
    </>
  );
};

export default Routine;
