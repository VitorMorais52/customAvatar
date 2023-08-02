/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
const Three = ({ translateValues, isIndividualComponent, fillColor }) => {
  const x = translateValues?.x || "27";
  const y = translateValues?.y || "11";

  const Path = () => (
    <g transform={`translate(${x}, ${y})`} className="hairGroup">
      <path
        d="M47.2 23.6C47.2 17.3409 44.7136 11.3381 40.2877 6.91227C35.8619 2.48643 29.8591 0 23.6 0C17.3409 0 11.3382 2.48643 6.91229 6.91227C2.48643 11.3381 0 17.3409 0 23.6V28.2416H0.774963C3.99996 28.2416 6.60834 18.9666 6.60834 15.7416V15.8833C9.54167 19.0166 16.0916 21.2 23.7083 21.2C31.5916 21.2 38.325 18.8666 41.1 15.5583V15.7416C41.1 18.9666 43.7083 28.2416 46.9333 28.2416H47.2V23.6Z"
        fill={fillColor}
      />
    </g>
  );

  if (isIndividualComponent)
    return (
      <svg width="47.2" height="28.24">
        <Path />
      </svg>
    );

  return <Path />;
};

export default Three;
