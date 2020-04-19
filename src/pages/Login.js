import React, { useContext } from "react";
// import { Redirect } from "react-router-dom";
import axios from "../apis";
import styled from "styled-components";
import jwtDecode from "jwt-decode";
import { useCookies } from "react-cookie";
import CryptoJS from "crypto-js";

import { AuthContext } from "../contexts/AuthStore";

import SocialLogin from "../components/Login/SocialLogin";

const TOKEN_PRIVATE_KEY = process.env.REACT_APP_TOKEN_PRIVATE_KEY;

const Description = styled.div`
  height: 50%;
  text-align: center;
`;

const LoginContainer = styled.div`
  height: 100%;
  width: 100%;
`;

const LoginPage = (props) => {
  const { state: authState, dispatch: authDispatch } = useContext(AuthContext);
  const [cookies, setCookies, removeCookies] = useCookies(["token"]);

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
    }

    let decoded;
    if (authToken) {
      try {
        decoded = await jwtDecode(authToken);
      } catch (err) {
        console.log(err);
      }
    }

    if (decoded) {
      authDispatch({
        type: "LOGIN",
        authToken: authToken,
        userId: decoded.userId,
        name: decoded.name,
        oauth: decoded.oauth,
        oauthProvider: decoded.oauthProvider,
      });
    }

    if (authToken) {
      await setCookies(
        "token",
        CryptoJS.AES.encrypt(authToken, `${TOKEN_PRIVATE_KEY}`).toString()
      );
    }
  };

  return (
    <LoginContainer>
      <Description>운동사랑에 오신 것을 환영합니다!</Description>
      <SocialLogin
        postSocialLoginInfoHandler={(info) => postSocialLoginInfoHandler(info)}
      />
    </LoginContainer>
  );
};

export default LoginPage;
