import React from "react";
import GoogleOAUTH from "react-google-login";
import styled from "styled-components";

const GoogleLoginButton = styled.button`
  width: 100%;
  height: 3.125rem;
  background: #ffffff;
  box-shadow: 0 3px 9px 0 rgba(0, 0, 0, 0.15);
  font-size: 1rem;
`;

const GoogleLogin = (props) => {
  return (
    <GoogleOAUTH
      clientId={process.env.REACT_APP_GOOGLEOAUTH_CLIENT_ID}
      render={(renderProps) => (
        <GoogleLoginButton onClick={() => renderProps.onClick()}>
          {props.content}
        </GoogleLoginButton>
      )}
      onSuccess={(result) =>
        props.postSocialLoginInfoHandler({
          oauth: true,
          oauthProvider: "google",
          name: result.profileObj.name,
          profileImageUrl: result.profileObj.imageUrl,
          thirdPartyId: Number(result.googleId),
          accessToken: result.accessToken,
          refreshToken: null,
        })
      }
      onFailure={(err) => console.log(err)}
    />
  );
};

export default GoogleLogin;
