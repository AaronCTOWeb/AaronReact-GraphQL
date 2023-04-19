import React, { useContext } from "react";
import { FlagContext } from "../App";

// Problem:
//     This should be coloured based on FF value
// Feature flag name:
//     details-section-cta-colour
// Setup:
//     Fill background color with flag value.

export const RequestReviewButton = () => {
  // get the details-section-cta-colour flag value
  const { detailsSection } = useContext(FlagContext);
  return (
    // use the details-section-cta-colour flag value as classname
    <button className={`btn-${detailsSection}`}>Request doctor review</button>
  );
};
