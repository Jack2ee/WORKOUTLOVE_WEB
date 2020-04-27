import React from "react";
import styled from "styled-components";

import NavigationItem from "./NavigationItem";

const NavigationBarContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  width: 100%;
  height: 4rem;
  box-shadow: 3px 0 9px 0 rgba(0, 0, 0, 0.15);
`;

const NavigationItems = (props) => {
  return (
    <NavigationBarContainer>
      <NavigationItem
        to="/"
        navItem="홈"
        current={props.path == "/" ? "true" : "false"}
      />
      <NavigationItem
        to="/workouts/my"
        navItem="내 운동"
        current={props.path == "/workouts/my" ? "true" : "false"}
      />
      <NavigationItem
        to="/feed"
        navItem="피드"
        current={props.path == "/feed" ? "true" : "false"}
      />
      <NavigationItem
        to={`/group/:groupId`}
        navItem="그룹 운동"
        current={props.path == "/group/:groupId" ? "true" : "false"}
      />
    </NavigationBarContainer>
  );
};

export default NavigationItems;
