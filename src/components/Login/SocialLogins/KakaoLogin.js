import React from "react";
import KakaoOAUTH from "react-kakao-login";
import styled from "styled-components";

const KakaoLoginButton = styled.button`
  width: 100%;
  height: 3.125rem;
  background: rgb(255, 235, 0);
  box-shadow: 0 3px 9px 0 rgba(0, 0, 0, 0.15);
  font-size: 1rem;
`;

const KakaoLogin = (props) => {
  return (
    <>
      <KakaoOAUTH
        jsKey={process.env.REACT_APP_KAKAOOAUTH_CLIENT_ID}
        render={(renderProps) => (
          <KakaoLoginButton onClick={() => renderProps.onClick()}>
            {props.content}
          </KakaoLoginButton>
        )}
        onSuccess={(result) =>
          props.postSocialLoginInfoHandler({
            oauth: true,
            oauthProvider: "kakao",
            name: result.profile.kakao_account.profile.nickname,
            profileImageUrl: null,
            thirdPartyId: result.profile.id,
            accessToken: result.response.access_token,
            refreshToken: result.response.refresh_token,
          })
        }
        onFailure={(result) => console.log(result)}
        useDefaultStyle
        getProfile={true}
      />
    </>
  );
};

export default KakaoLogin;
