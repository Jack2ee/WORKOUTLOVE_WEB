import React from "react";

import NavigationItems from "../components/Navigation/NavigationItems";

const Home = (props) => {
  return (
    <>
      홈
      <NavigationItems path={props.match.path} />
    </>
  );
};

export default Home;
