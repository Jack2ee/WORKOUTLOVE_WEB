import React, { useContext } from "react";
import styled from "styled-components";

import { UIContext } from "../contexts/UIStore";

const BackDropWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: black;
  opacity: 0.5;
`;

const ContentContainer = styled.div`
  position: fixed;
  // top: 5vh;
  left: 0;
  background-color: #ffffff;
  width: 100vw;
  height: 100vh;
  overflow: auto;
`;

const FullModal = (props) => {
  const { state: UIState } = useContext(UIContext);

  return (
    <>
      {!UIState.showStack ? (
        <>
          {/* <BackDropWrapper /> */}
          <ContentContainer>{props.content}</ContentContainer>
        </>
      ) : null}
    </>
  );
};

export default FullModal;
