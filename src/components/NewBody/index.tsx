import React, { useEffect, useState } from "react";
import Assembled from "./Assembled";
import CustomOptions from "./CustomOptions";

import components from "./localComponents.json";

interface SVGComponent {
  svg: string;
  id?: string;
  coordinates: Record<"x" | "y", number>;
  shadow?: Record<"svg", string> | Record<"x" | "y", number>;
}

const NewBody = () => {
  const suggestedComposition = {
    background: 0,
    body: 0,
    head: 0,
    hair: 0,
    eyebrow: 0,
    eyes: 0,
    nose: 0,
    mouth: 0,
    clothes: 0,
  };

  const [selectedComponents, setSelectedComponents] = useState({});

  const getComposition = () => {
    const avatar = {} as SVGComponent;
    Object.entries(suggestedComposition).forEach(([key, index]) => {
      if (key === "head" && components[key][index]?.shadow) {
        avatar["shadowHead"] = components[key][index].shadow;
      }
      avatar[key] = components[key][index];
    });
    setSelectedComponents({ ...avatar });
  };

  useEffect(() => {
    getComposition();
  }, []);

  return (
    <div>
      <Assembled defaultComposition={selectedComponents} />
      <CustomOptions />
    </div>
  );
};

export default NewBody;
