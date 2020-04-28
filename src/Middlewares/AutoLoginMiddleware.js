import React, { useEffect, useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { useCookies } from "react-cookie";
import CryptoJS from "crypto-js";

import { AuthContext } from "../contexts/AuthStore";

const TOKEN_PRIVATE_KEY = process.env.REACT_APP_TOKEN_PRIVATE_KEY;

const AutoLoginMiddleware = (props) => {
  const { state: authState, dispatch: authDispatch } = useContext(AuthContext);
  const [cookies] = useCookies(["token"]);

  const makeAESbytesHandler = async (authToken) => {
    let bytes;
    try {
      bytes = await CryptoJS.AES.decrypt(authToken, `${TOKEN_PRIVATE_KEY}`);
    } catch (err) {
      console.log(err);
    }

    return bytes;
  };

  const makeBytesToTextHandler = async (authToken) => {
    let text;
    try {
      const AESbytes = await makeAESbytesHandler(authToken);
      text = await AESbytes.toString(CryptoJS.enc.Utf8);
    } catch (err) {
      console.log(err);
    }

    return text;
  };

  const decodeJWTAndUpdateAuthStateHandler = async (authToken) => {
    let token;
    try {
      token = await makeBytesToTextHandler(authToken);
    } catch (err) {
      console.log(err);
    }

    let decoded;
    if (token) {
      try {
        decoded = jwtDecode(token);
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
        profileImageUrl: decoded.profileImageUrl,
      });
      return true;
    }
  };

  const convertEncryptedTokenToDecryptedTokenStoredInCookiesHandler = async () => {
    let authToken;
    try {
      authToken = await cookies["token"];
    } catch (err) {
      console.log(err);
    }

    if (authToken) {
      try {
        await decodeJWTAndUpdateAuthStateHandler(authToken);
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    convertEncryptedTokenToDecryptedTokenStoredInCookiesHandler();
  }, []);

  return <>{props.children}</>;
};

export default AutoLoginMiddleware;
