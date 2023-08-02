/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
const Four = ({ isIndividualComponent, fillColor }) => {
  const xy = isIndividualComponent ? [-220, -60] : [0, 0];
  const color = fillColor || "#000000";

  const hexColor = color.replace("#", "");
  const r = parseInt(hexColor.substring(0, 2), 16);
  const g = parseInt(hexColor.substring(2, 4), 16);
  const b = parseInt(hexColor.substring(4, 6), 16);
  const rgbaColor = `rgba(${r + 12}, ${g + 12}, ${b + 12}, 1)`;

  const Path = () => (
    <g
      className="hairComponent"
      transform={`scale(0.1) translate(${xy[0]}, ${xy[1]})`}
    >
      <path
        d="M275.666 427.035V260.507"
        stroke={fillColor}
        strokeWidth="12.5932"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <path
        d="M726 426.854V252"
        stroke={fillColor}
        strokeWidth="12.5932"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M225 439.585C232.605 411.175 250.238 391.27 270.782 391.27C292.567 238.16 392.41 169.74 499.78 169.74C607.15 169.74 706.994 238.16 728.778 391.27C748.556 391.27 765.635 409.716 773.667 436.438V343.105C773.667 270.408 744.764 200.688 693.317 149.284C641.869 97.8789 572.091 69 499.333 69C426.576 69 356.798 97.8789 305.35 149.284C253.903 200.688 225 270.408 225 343.105V439.585Z"
        fill={fillColor}
      />
      <path
        d="M223 185.176C223 201.763 226.271 218.188 232.624 233.513C238.977 248.838 248.289 262.762 260.028 274.491C271.766 286.22 285.702 295.524 301.04 301.872C316.377 308.22 332.816 311.487 349.417 311.487H727.167C728.498 311.544 729.824 311.282 731.032 310.723C732.241 310.163 733.298 309.322 734.115 308.27C734.931 307.218 735.482 305.985 735.723 304.676C735.965 303.367 735.888 302.019 735.5 300.746C719.261 250.595 687.521 206.883 644.844 175.897C602.168 144.911 550.754 128.249 498 128.306H223V185.176Z"
        fill={rgbaColor}
      />
      <path
        opacity="0.1"
        d="M547.083 253.264H357.334C335.232 253.264 314.036 244.491 298.408 228.876C282.78 213.261 274 192.083 274 170"
        stroke="white"
        strokeWidth="12.5932"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
    </g>
  );

  if (isIndividualComponent)
    return (
      <svg width="55.07" height="37.06">
        <Path />
      </svg>
    );

  return <Path />;
};

export default Four;
