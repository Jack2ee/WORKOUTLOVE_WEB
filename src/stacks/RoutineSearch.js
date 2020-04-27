import React, { useEffect, useContext } from "react";
import axios from "../apis";

import { RoutineContext } from "../contexts/RoutineStore";
import { AuthContext } from "../contexts/AuthStore";

const RoutineSearch = (props) => {
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

  const updateAllRoutinesInfoHandler = async () => {
    const allRoutinesChunk = await getAllRoutinesHandler();
    routineDispatch({
      type: "SAVE_ALL_ROUTINES",
      allRoutines: allRoutinesChunk.allRoutines,
      totalRoutineCount: allRoutinesChunk.totalRoutineCount,
      allRoutinesLoaded: true,
    });
  };

  useEffect(() => {
    if (authState.authToken && !routineState.allRoutinesLoaded) {
      updateAllRoutinesInfoHandler();
    }
  }, [authState.authToken, routineState.allRoutinesLoaded]);

  console.log(routineState);
  return <></>;
};

export default RoutineSearch;
