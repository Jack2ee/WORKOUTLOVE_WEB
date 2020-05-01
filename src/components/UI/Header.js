import React from "react";
import styled from "styled-components";

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 10vh;
  background-color: blue;
`;

const Header = (props) => {
  return <HeaderContainer>{props.children}</HeaderContainer>;
};

export default Header;
