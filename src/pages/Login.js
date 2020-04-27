import React, { useContext, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from "../apis";
import styled from "styled-components";
import jwtDecode from "jwt-decode";
import { useCookies } from "react-cookie";
import CryptoJS from "crypto-js";

import { AuthContext } from "../contexts/AuthStore";

import SocialLogin from "../components/Login/SocialLogin";

const TOKEN_PRIVATE_KEY = process.env.REACT_APP_TOKEN_PRIVATE_KEY;

const LoginContainer = styled.div`
  height: 100%;
  width: 100%;
`;

const Description = styled.div`
  height: 50%;
  text-align: center;
`;

const LoginErrorStyleWrapper = styled.div`
  color: "FF9494";
`;

const LoginPage = (props) => {
  const [loginError, setLoginError] = useState(false);
  const { state: authState, dispatch: authDispatch } = useContext(AuthContext);
  const [, setCookies] = useCookies(["token"]);

  const postSocialLoginInfoHandler = async (info) => {
    let authToken;
    try {
      const result = await axios({
        method: "POST",
        url: "/auth/oauth",
        data: info,
      });
      authToken = result.data.authToken;
    } catch (err) {
      console.log(err);
      setLoginError(loginError);
    }

    let decoded;
    let uglifiedAuthToken;
    if (authToken) {
      try {
        decoded = await jwtDecode(authToken);
      } catch (err) {
        console.log(err);
      }
      try {
        uglifiedAuthToken = CryptoJS.AES.encrypt(
          authToken,
          `${TOKEN_PRIVATE_KEY}`
        ).toString();
      } catch (err) {
        console.log(err);
      }
    }

    if (decoded) {
      authDispatch({
        type: "LOGIN",
        authToken: uglifiedAuthToken,
        userId: decoded.userId,
        name: decoded.name,
        oauth: decoded.oauth,
        oauthProvider: decoded.oauthProvider,
      });
    }

    if (authToken) {
      await setCookies("token", uglifiedAuthToken);
    }
  };

  return (
    <LoginContainer>
      <Description>운동사랑에 오신 것을 환영합니다!</Description>
      <SocialLogin
        postSocialLoginInfoHandler={(info) => postSocialLoginInfoHandler(info)}
      />
      {loginError ? (
        <LoginErrorStyleWrapper>
          계정정보를 불러올 수 없습니다.
        </LoginErrorStyleWrapper>
      ) : null}
      {authState.authToken ? <Redirect to="/" /> : null}
    </LoginContainer>
  );
};

export default LoginPage;
