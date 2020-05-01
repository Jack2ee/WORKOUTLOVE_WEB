import React from "react";
import styled from "styled-components";

const ActionButtonContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 8vh;
  background-color: pink;
`;

const PageActionButton = (props) => {
  return (
    <ActionButtonContainer onClick={() => props.actionHandler()}>
      {props.children}
    </ActionButtonContainer>
  );
};

export default PageActionButton;
