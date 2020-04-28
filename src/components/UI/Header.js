import React from "react";
import styled from "styled-components";

const HeaderContainer = styled.div`
  width: 100%;
  height: 10vh;
  background-color: blue;
`;

const Header = (props) => {
  return <HeaderContainer>{props.children}</HeaderContainer>;
};

export default Header;
