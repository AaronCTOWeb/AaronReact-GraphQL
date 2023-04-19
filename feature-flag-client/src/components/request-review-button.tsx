import React from 'react';
import { FeatureFlagContext } from '../contexts/FeatureFlagContext';
import { detailsCtaFlagKey } from '../feature-flag-config';

// Problem: 
//     This should be coloured based on FF value
// Feature flag name: 
//     details-section-cta-colour
// Setup: 
//     Fill background color with flag value.
export const RequestReviewButton = () => {
  const { getFlagValueForKey } = React.useContext(FeatureFlagContext);

  const buttonBackgroundColor = getFlagValueForKey(detailsCtaFlagKey, "") as string;
  return (
  <button style={{ backgroundColor: buttonBackgroundColor }}>Request doctor review</button>
)};