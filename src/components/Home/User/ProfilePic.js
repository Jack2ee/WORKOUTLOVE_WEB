import React from "react";
import styled from "styled-components";

const ProfilePicContainer = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-color: ${(props) => (props.src ? "transparent" : "pink")};
`;

const ProfilePic = (props) => {
  return (
    <>
      <ProfilePicContainer src={props.profileImageUrl} />
    </>
  );
};

export default ProfilePic;
