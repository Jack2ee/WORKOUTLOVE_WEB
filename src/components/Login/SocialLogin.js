import React from "react";
import styled from "styled-components";

import GoogleLogin from "./SocialLogins/GoogleLogin";
import KakaoLogin from "./SocialLogins/KakaoLogin";

const SocialLoginWrapper = styled.div``;
const SocialLogin = (props) => {
  return (
    <SocialLoginWrapper>
      <GoogleLogin
        content="구글로 간편 시작"
        postSocialLoginInfoHandler={(info) =>
          props.postSocialLoginInfoHandler(info)
        }
      />
      <KakaoLogin
        content="카카오로 간편 시작"
        postSocialLoginInfoHandler={(info) =>
          props.postSocialLoginInfoHandler(info)
        }
      >
        카카오로 간편시작
      </KakaoLogin>
    </SocialLoginWrapper>
  );
};

export default SocialLogin;
