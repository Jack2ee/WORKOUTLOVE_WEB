import React from "react";

import NavigationItems from "../components/Navigation/NavigationItems";

const Myworkouts = (props) => {
  return (
    <>
      내 운동
      <NavigationItems path={props.match.path} />
    </>
  );
};

export default Myworkouts;
