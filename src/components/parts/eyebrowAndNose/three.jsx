// eslint-disable-next-line react/prop-types
const Three = ({ isIndividualComponent }) => {
  const transformValue = isIndividualComponent
    ? "translate(-35,-26), scale(0.13)"
    : "scale(0.1)";
  const Path = () => (
    <g className="eyebrowAndNose" transform={transformValue}>
      <path
        d="M502.584 473V527.122"
        stroke="#6C4735"
        strokeWidth="15.1181"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <path
        d="M524.666 533.367H483"
        stroke="#6C4735"
        strokeWidth="15.1181"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <path
        opacity="0.9"
        d="M433.167 403.082L353 401"
        stroke="#6C4735"
        strokeWidth="12"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        opacity="0.9"
        d="M654.167 403.082L574 401"
        stroke="#6C4735"
        strokeWidth="12"
        strokeLinecap="round"
        strokeLinejoin="round"
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

export default Three;
