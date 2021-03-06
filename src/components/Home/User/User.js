import React from "react";
import styled from "styled-components";

import ProfilePic from "./ProfilePic";
import Info from "./Info";

const UserContainer = styled.div`
  height: 4rem;
  display: flex;
  margin: 10px 0;
  padding: 0 10px;
`;

const User = (props) => {
  return (
    <UserContainer onClick={() => props.moveToMypageHandler()}>
      <ProfilePic profileImageUrl={props.authState.profileImageUrl} />
      <Info userName={props.authState.name} />
    </UserContainer>
  );
};

export default User;
