import React, { useEffect, useContext } from "react";
import jwtDecode from "jwt-decode";
import { useCookies } from "react-cookie";
import CryptoJS from "crypto-js";

import { AuthContext } from "../contexts/AuthStore";

const TOKEN_PRIVATE_KEY = process.env.REACT_APP_TOKEN_PRIVATE_KEY;

const LoginMiddleware = (props) => {
  const { state: authState, dispatch: authDispatch } = useContext(AuthContext);
  const [cookies] = useCookies(["token"]);

  const makeAESbytesHandler = async () => {
    const authToken = cookies["token"];
    let bytes;
    try {
      bytes = await CryptoJS.AES.decrypt(authToken, `${TOKEN_PRIVATE_KEY}`);
    } catch (err) {
      console.log(err);
    }

    return bytes;
  };

  const makeBytesToTextHandler = async () => {
    let text;
    try {
      const AESbytes = await makeAESbytesHandler();
      text = await AESbytes.toString(CryptoJS.enc.Utf8);
    } catch (err) {
      console.log(err);
    }

    return text;
  };

  const decodeJWTAndUpdateAuthStateHandler = async () => {
    let decoded;
    try {
      const authToken = await makeBytesToTextHandler();
      decoded = await jwtDecode(authToken);
      await authDispatch({
        type: "LOGIN",
        authToken: authToken,
        userId: decoded.userId,
        name: decoded.name,
        oauth: decoded.oauth,
        oauthProvider: decoded.oauthProvider,
      });
    } catch (err) {
      console.log(err);
    }

    return decoded;
  };

  console.log(authState);

  useEffect(() => {
    decodeJWTAndUpdateAuthStateHandler();
  }, []);

  return <>{props.children}</>;
};

export default LoginMiddleware;
