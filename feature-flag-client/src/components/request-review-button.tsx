import { useContext } from 'react';

import { AppContext } from '../context';
import { detailsCtaFlagKey } from '../feature-flag-config';

// Problem:
//     This should be coloured based on FF value
// Feature flag name:
//     details-section-cta-colour
// Setup:
//     Fill background color with flag value.

export const RequestReviewButton = () => {
  const flags = useContext(AppContext);
  return (
    <button data-testid="review-button" style={{ background: flags[detailsCtaFlagKey] }}>
      Request doctor review
    </button>
  );
};
