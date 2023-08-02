// eslint-disable-next-line react/prop-types
const One = ({ isIndividualComponent }) => {
  const transformValue = isIndividualComponent
    ? "translate(-26,-17), scale(1.12)"
    : "";

  const Path = () => (
    <g className="eyebrowAndNose" transform={transformValue}>
      <path
        d="M45.9621 41.6865C45.4378 40.9526 43.8652 39.0655 40.0909 39.0655C35.7924 39.0655 34.7439 41.4769 34.7439 41.5817L32.752 40.8478C32.8567 40.7429 34.2197 37.0735 40.0909 37.0735C44.9137 37.0735 47.0105 39.5897 47.6396 40.7429L45.9621 41.6865Z"
        fill="#5A3D2F"
      />
      <path
        d="M51.8584 53.8497C51.8584 53.5117 51.8584 45.8483 51.8584 43.707C51.8584 40.8896 54.6758 37.0579 60.8741 36.9452C67.0725 36.9452 68.6502 40.8896 68.763 41.0023L66.6217 41.7912C66.6217 41.6785 65.4948 39.1992 60.8741 39.0865C56.2535 39.0865 54.1123 41.7912 54.1123 43.5943C54.1123 45.7356 54.1123 53.6243 54.1123 53.737L51.8584 53.8497Z"
        fill="#5A3D2F"
      />
    </g>
  );

  if (isIndividualComponent)
    return (
      <svg width="60" height="60">
        <Path />
      </svg>
    );

  return <Path />;
};

export default One;
