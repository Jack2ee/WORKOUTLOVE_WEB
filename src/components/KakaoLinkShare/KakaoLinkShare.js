import React, { useEffect } from "react";

const KakaoLinkShare = () => {
  useEffect(() => {
    window.Kakao.init("fb448803ca71594d50dd37aa69c74e7b");
    window.Kakao.Link.createDefaultButton({
      container: "#CONTAINER_ID",
      objectType: "feed",
      content: {
        title: "디저트 사진",
        description: "아메리카노, 빵, 케익",
        imageUrl:
          "http://mud-kage.kakao.co.kr/dn/NTmhS/btqfEUdFAUf/FjKzkZsnoeE4o19klTOVI1/openlink_640x640s.jpg",
        link: {
          mobileWebUrl: "https://developers.kakao.com",
          androidExecParams: "test",
        },
      },
      social: {
        likeCount: 10,
        commentCount: 20,
        sharedCount: 30,
      },
      buttons: [
        {
          title: "웹으로 이동",
          link: {
            mobileWebUrl: "https://developers.kakao.com",
          },
        },
        {
          title: "앱으로 이동",
          link: {
            mobileWebUrl: "https://developers.kakao.com",
          },
        },
      ],
      success: function (response) {
        console.log(response);
      },
      fail: function (error) {
        console.log(error);
      },
    });
  }, []);

  return (
    <>
      <div id="CONTAINER_ID">공유하기</div>
    </>
  );
};

export default KakaoLinkShare;
