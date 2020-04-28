import React from "react";
import styled from "styled-components";

const InfoContainer = styled.div`
  width: 100%;
  height: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 10px;
`;

const Nickname = styled.div`
  font-size: 1rem;
  font-weight: 800;
`;

const SeeMyInfoDiv = styled.div`
  font-size: 0.875rem;
  font-weight: 400;
`;

const Info = (props) => {
  return (
    <InfoContainer>
      <Nickname>{props.userName}</Nickname>
      <SeeMyInfoDiv>내 정보 보기</SeeMyInfoDiv>
    </InfoContainer>
  );
};

export default Info;
