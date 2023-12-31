/* eslint-disable no-undef */
// eslint-disable-next-line react/prop-types
const Two = ({ isIndividualComponent, skinColor }) => {
  const transformValue = isIndividualComponent
    ? "translate(-30,-22), scale(0.12)"
    : "scale(0.1)";
  const Path = () => (
    <g className="eyebrowAndNose" transform={transformValue}>
      <path
        d="M454.825 427.034C449.593 419.71 433.9 400.878 396.235 400.878C353.341 400.878 342.878 424.942 342.878 425.988L323 418.664C324.046 417.618 337.647 381 396.235 381C444.363 381 465.287 406.109 471.565 417.618L454.825 427.034Z"
        fill={skinColor || "#000"}
        filter="brightness(0.8)"
      />
      <path
        d="M666.825 427.034C661.593 419.71 645.9 400.878 608.235 400.878C565.341 400.878 554.878 424.942 554.878 425.988L535 418.664C536.046 417.618 549.647 381 608.235 381C656.363 381 677.287 406.109 683.565 417.618L666.825 427.034Z"
        fill={skinColor || "#000"}
        filter="brightness(0.8)"
      />
      <path
        d="M529.622 533.541C528.878 533.271 528.201 533.068 527.457 533H479.567C478.823 533.068 478.079 533.271 477.403 533.541C473.074 535.3 470.706 539.764 472.736 544.567C474.765 549.369 484.302 562.762 503.512 562.762C522.722 562.762 532.26 549.301 534.289 544.567C536.318 539.764 533.951 535.3 529.622 533.541Z"
        fill={skinColor || "#000"}
        filter="brightness(0.8)"
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

export default Two;
