import React, { useContext } from "react";

import { AuthContext } from "../contexts/AuthStore";

import NavigationItems from "../components/Navigation/NavigationItems";
import Header from "../components/UI/Header";
import User from "../components/Home/User/User";
import Main from "../components/Home/Main/Main";

const Home = (props) => {
  const { state: authState } = useContext(AuthContext);

  const moveToMypageHandler = () => {
    props.history.push("/mypage");
  };

  const moveToRoutineSearchPageHandler = () => {
    props.history.push("/routines");
  };

  const moveToEquipmentSearchPageHandler = () => {
    props.history.push("/equipment");
  };

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
