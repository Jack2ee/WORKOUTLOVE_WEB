import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const LinkContainer = styled.div`
  width: 25%;
`;

const LinkButton = styled(Link)`
  text-decoration: none;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => (props.current == "true" ? "blue" : "black")};
`;

const LinkText = styled.div``;

const NavigationItem = (props) => {
  return (
    <LinkContainer>
      <LinkButton to={props.to} current={props.current}>
        <LinkText>{props.navItem}</LinkText>
      </LinkButton>
    </LinkContainer>
  );
};

export default NavigationItem;
