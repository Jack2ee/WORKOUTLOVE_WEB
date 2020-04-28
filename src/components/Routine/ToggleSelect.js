import React from "react";
import styled from "styled-components";

const SelectButtonContainer = styled.div`
  display: flex;
`;

const SelectButton = styled.div`
  width: 50%;
  height: 3rem;
  border-bottom: ${(props) =>
    props.selected === props.category ? "1px solid black" : "transparent"};
  font-weight: ${(props) =>
    props.selected === props.category ? "800" : "400"};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonText = styled.div``;

const ToggleSelect = (props) => {
  return (
    <SelectButtonContainer>
      {props.candidates.map((i, k) => (
        <SelectButton
          key={k}
          selected={props.selected}
          category={i.category}
          onClick={() => props.selectCategory(i.category)}
        >
          <ButtonText>{i.text}</ButtonText>
        </SelectButton>
      ))}
    </SelectButtonContainer>
  );
};

export default ToggleSelect;
