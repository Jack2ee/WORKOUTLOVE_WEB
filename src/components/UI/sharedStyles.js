import styled from "styled-components";

export const breakpoints = {
  // Material design 기준
  small: "600px", //mobile
  medium: "960px", //tablet or small desktop
  large: "1280px", //desktop
  extraLarge: "1920px", //large desktop
};

export const AreaShaded = styled.div`
  box-shadow: 3px 0 9px 0 rgba(0, 0, 0, 0.15);
`;
