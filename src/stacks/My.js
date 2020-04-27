import React, { useEffect, useContext } from "react";
import axios from "../apis";

import { AuthContext } from "../contexts/AuthStore";
import { MypageContext } from "../contexts/MypageStore";

const Mypage = () => {
  const { state: authState, dispatch: authDispatch } = useContext(AuthContext);
  const { state: mypageState, dispatch: mypageDispatch } = useContext(
    MypageContext
  );

  const getAuthTokenHandler = () => {
    return authState.authToken;
  };

  const getMyInfoHandler = async () => {
    let myInfo;
    try {
      myInfo = await axios({
        method: "GET",
        url: "/auth/my",
        headers: {
          Authorization: `Bearer ${getAuthTokenHandler()}`,
        },
      });
    } catch (err) {
      console.log(err);
    }

    return myInfo.data.user;
  };

  const updateMypageInfoHandler = async () => {
    const userInfoChunk = await getMyInfoHandler();
    mypageDispatch({
      type: "SAVE_MYPAGE_INFO",
      profileImageUrl: userInfoChunk.profileImageUrl,
      oauth: userInfoChunk.oauth,
      oauthProvider: userInfoChunk.oauthProvider,
      sex: userInfoChunk.sex,
      age: userInfoChunk.age,
      height: userInfoChunk.height,
      weight: userInfoChunk.weight,
      posts: userInfoChunk.posts,
      routines: userInfoChunk.routines,
      dailyWorkouts: userInfoChunk.dailyWorkouts,
      workouts: userInfoChunk.workouts,
      rooms: userInfoChunk.rooms,
      images: userInfoChunk.images,
      name: userInfoChunk.name,
    });
  };

  useEffect(() => {
    if (authState.authToken) {
      updateMypageInfoHandler();
    }
  }, [authState.authToken]);

  console.log(mypageState);

  return <></>;
};

export default Mypage;
