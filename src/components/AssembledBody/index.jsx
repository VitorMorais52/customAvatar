/* eslint-disable react/prop-types */
import React, { Suspense } from "react";

const Body = ({ colorSettings, partsSettings }) => {
  const {
    hair: hairType,
    eyebrowAndNose: eyebrowAndNoseType,
    mouth: mouthType,
  } = partsSettings;
  const {
    hair: hairColor,
    skin: skinColor,
    tshirt: tshirtColor,
  } = colorSettings;

  const getHair = () => {
    const HairComponent = React.lazy(() =>
      import(`./BodyParts/hair/${hairType}.jsx`)
    );
    return (
      <Suspense fallback={<>...loading</>}>
        <HairComponent fillColor={hairColor} />
      </Suspense>
    );
  };
  const getEyebrowAndNose = () => {
    const EyebrowAndNoseComponent = React.lazy(() =>
      import(
        `./BodyParts/eyebrowAndNose/${
          eyebrowAndNoseType ? eyebrowAndNoseType : "one"
        }.jsx`
      )
    );
    return (
      <Suspense fallback={<>...loading</>}>
        <EyebrowAndNoseComponent skinColor={skinColor} />
      </Suspense>
    );
  };
  const getMouth = () => {
    const EyebrowAndNoseComponent = React.lazy(() =>
      import(`./BodyParts/mouth/${mouthType ? mouthType : "one"}.jsx`)
    );
    return (
      <Suspense fallback={<>...loading</>}>
        <EyebrowAndNoseComponent />
      </Suspense>
    );
  };

  return (
    <svg
      width="350"
      height="350"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M50 100C77.6142 100 99.9999 77.6143 99.9999 50.0001C99.9999 22.3859 77.6142 0.000183105 50 0.000183105C22.3857 0.000183105 0 22.3859 0 50.0001C0 77.6143 22.3857 100 50 100Z"
        fill="#00ADFE"
      />
      <path
        opacity="0.3"
        d="M50 89.9999C72.0913 89.9999 89.9999 72.0913 89.9999 50C89.9999 27.9087 72.0913 10.0001 50 10.0001C27.9086 10.0001 10 27.9087 10 50C10 72.0913 27.9086 89.9999 50 89.9999Z"
        fill="#356CB6"
      />
      <mask
        id="mask0_4_2"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="100"
        height="100"
      >
        <path
          d="M50 99.9998C77.6142 99.9998 99.9999 77.6141 99.9999 49.9999C99.9999 22.3857 77.6142 0 50 0C22.3857 0 0 22.3857 0 49.9999C0 77.6141 22.3857 99.9998 50 99.9998Z"
          fill="white"
        />
      </mask>
      <g mask="url(#mask0_4_2)">
        <path
          className="neck"
          d="M64.9999 75.8999L92.8999 83.5999C96.0999 84.6999 98.5999 87.0999 99.9999 90.1999V99.9998H0V90.1999C1.3 87.0999 3.9 84.6999 7.09999 83.5999L35 75.8999V60.9999H64.9999V75.8999Z"
          fill={skinColor}
        />
      </g>
      <mask
        id="mask1_4_2"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="100"
        height="100"
      >
        <path
          d="M50 99.9998C77.6142 99.9998 99.9999 77.6141 99.9999 49.9999C99.9999 22.3857 77.6142 0 50 0C22.3857 0 0 22.3857 0 49.9999C0 77.6141 22.3857 99.9998 50 99.9998Z"
          fill="white"
        />
      </mask>
      <g mask="url(#mask1_4_2)">
        <mask
          id="mask2_4_2"
          style={{ maskType: "luminance" }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="61"
          width="100"
          height="39"
        >
          <path
            d="M64.9999 75.8999L92.8999 83.5999C96.0999 84.6999 98.5999 87.0999 99.9999 90.1999V99.9998H0V90.1999C1.3 87.0999 3.9 84.6999 7.09999 83.5999L35 75.8999V60.9999H64.9999V75.8999Z"
            fill="white"
          />
        </mask>
        <g mask="url(#mask2_4_2)">
          <path
            className="tshirt"
            d="M0 58H99.9999V99.9999H0V58ZM50 87.9999C60.9999 87.9999 69.9999 81.6999 69.9999 74C69.9999 66.3 60.9999 60 50 60C39 60 30 66.3 30 74C30 81.6999 39 87.9999 50 87.9999Z"
            fill={tshirtColor}
          />
        </g>
        <mask
          id="mask3_4_2"
          style={{ maskType: "luminance" }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="61"
          width="100"
          height="39"
        >
          <path
            d="M64.9999 75.8999L92.8999 83.5999C96.0999 84.6999 98.5999 87.0999 99.9999 90.1999V99.9998H0V90.1999C1.3 87.0999 3.9 84.6999 7.09999 83.5999L35 75.8999V60.9999H64.9999V75.8999Z"
            fill="white"
          />
        </mask>
        <g mask="url(#mask3_4_2)">
          <path
            className="chin"
            d="M50.0002 77.9999C48.3002 77.9999 46.1002 77.5999 44.6002 76.8999C42.9002 75.9999 36.6002 70.7999 34.4002 68.5999C31.6002 65.5999 30.2002 61.7999 29.8002 55.2999C29.4002 48.7999 27.7002 25.6 27.7002 20.3C27.7002 12.8 33.4002 1.10003 49.8002 1.10003H49.9002H50.0002C66.5002 1.20003 72.1002 12.8 72.1002 20.3C72.1002 25.6 70.4002 48.7999 70.0002 55.2999C69.6002 61.7999 68.2002 65.4999 65.4002 68.5999C63.3002 70.8999 57.0002 75.9999 55.2002 76.8999C53.9002 77.5999 51.7002 77.9999 50.0002 77.9999Z"
            fill="#614131"
          />
        </g>
        <mask
          id="mask4_4_2"
          style={{ maskType: "luminance" }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="61"
          width="100"
          height="39"
        >
          <path
            d="M64.9999 75.8999L92.8999 83.5999C96.0999 84.6999 98.5999 87.0999 99.9999 90.1999V99.9998H0V90.1999C1.3 87.0999 3.9 84.6999 7.09999 83.5999L35 75.8999V60.9999H64.9999V75.8999Z"
            fill="white"
          />
        </mask>
        <g mask="url(#mask4_4_2)">
          <path
            className="tshirtCollar"
            d="M50 58C37.3 58 27 65.4 27 74.5C27 83.5999 37.3 90.9999 50 90.9999C62.7 90.9999 73 83.5999 73 74.5C73 65.4 62.7 58 50 58ZM50 86.9999C39.5 86.9999 31 80.9999 31 73.5C31 66 39.5 60 50 60C60.5 60 69 66 69 73.5C69 80.9999 60.5 86.9999 50 86.9999Z"
            fill="#5A2CA0"
          />
        </g>
      </g>
      <path
        className="face"
        d="M72.8999 39.027C70.7214 23.716 60.7371 16.8739 50.0001 16.8739C39.2631 16.8739 29.2788 23.716 27.1003 39.027C24.3503 39.027 22.1221 42.5934 22.1221 46.9921C22.1221 51.1877 24.1552 54.5888 26.7299 54.8975C29.1653 68.1375 38.6478 75.8657 50.0001 75.8657C61.3504 75.8657 70.835 68.1375 73.2683 54.8975C75.845 54.5888 77.8781 51.1877 77.8781 46.9921C77.8781 42.5934 75.6499 39.027 72.8999 39.027Z"
        fill={skinColor}
      />
      {getEyebrowAndNose()}
      <path
        d="M60.4597 48.1197C61.685 48.1197 62.6874 47.0502 62.6874 45.7431C62.6874 44.436 61.685 43.3666 60.4597 43.3666C59.2345 43.3666 58.232 44.436 58.232 45.7431C58.232 47.0502 59.2345 48.1197 60.4597 48.1197ZM40.4103 48.1197C41.6356 48.1197 42.638 47.0502 42.638 45.7431C42.638 44.436 41.6356 43.3666 40.4103 43.3666C39.1851 43.3666 38.1826 44.436 38.1826 45.7431C38.1826 47.0502 39.1851 48.1197 40.4103 48.1197Z"
        fill="#262626"
      />
      {getMouth()}
      {hairType ? getHair() : <></>}
    </svg>
  );
};

export default Body;
