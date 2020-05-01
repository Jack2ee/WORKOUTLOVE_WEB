import React from "react";
import styled from "styled-components";

import { AreaShaded } from "../../UI/sharedStyles";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const RoutineNameInput = styled.input`
  width: 100%;
  height: 2rem;
  box-sizing: border-box;
  padding: 10px;
  font-size: 1rem;
  font-weight: 600;
`;

const RoutineDescriptionTextArea = styled.textarea`
  width: 100%;
  height: 6rem;
  box-sizing: border-box;
  padding: 10px;
  font-size: 1rem;
  font-weight: 600;
`;

const Main = (props) => {
  return (
    <MainContainer>
      <RoutineNameInput
        placeholder="루틴이름"
        value={props.newRoutineName}
        onChange={(e) => props.changeRoutineName(e.target.value)}
      />
      <RoutineDescriptionTextArea
        placeholder="예시) 각진 가슴을 효과적으로 만들어주는 루틴입니다. 초심자분들은 자신에게 맞는 무게로 진행하세요!"
        value={props.newRoutineDescription}
        onChange={(e) => props.changeRoutineDescription(e.target.value)}
      />
      <AreaShaded onClick={() => props.moveToWorkoutSearchPage()}>
        운동 추가하기
      </AreaShaded>
    </MainContainer>
  );
};

export default Main;
