import React from "react";
import styled from "styled-components";

import { AreaShaded } from "../../UI/sharedStyles";

const MainContainer = styled.div`
  padding: 0 10px;
`;

const MainButton = styled(AreaShaded)`
  margin: 10px 0;
  height: 4rem;
  display: flex;
  align-items: center;
  padding: 0 20px;
`;

const ButtonText = styled.div`
  font-weight: 800;
`;

const User = (props) => {
  return (
    <MainContainer>
      <MainButton onClick={() => props.moveToRoutineSearchPageHandler()}>
        <ButtonText>추가하기</ButtonText>
      </MainButton>
      <MainButton onClick={() => props.moveToEquipmentSearchPageHandler()}>
        <ButtonText>운동용품</ButtonText>
      </MainButton>
    </MainContainer>
  );
};

export default User;
