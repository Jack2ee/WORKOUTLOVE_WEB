import React, { useReducer } from "react";

import { mypageReducer } from "./reducers";

export const MypageContext = React.createContext();

const MypageStore = (props) => {
  const [state, dispatch] = useReducer(mypageReducer, {
    profileImageUrl: null,
    oauth: null,
    oauthProvider: null,
    sex: null,
    age: null,
    height: null,
    weight: null,
    posts: [],
    routines: [],
    dailyWorkouts: [],
    workouts: [],
    rooms: [],
    images: [],
    name: null,
  });

  return (
    <MypageContext.Provider value={{ state, dispatch }}>
      {props.children}
    </MypageContext.Provider>
  );
};

export default MypageStore;
