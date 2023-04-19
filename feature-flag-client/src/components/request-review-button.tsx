import React from "react";

// Problem:
//     This should be coloured based on FF value
// Feature flag name:
//     details-section-cta-colour
// Setup:
//     Fill background color with flag value.
export const RequestReviewButton = ({ detailsSectionCtaColour }) => (
  <button style={{ backgroundColor: detailsSectionCtaColour }}>
    Request doctor review
  </button>
);
