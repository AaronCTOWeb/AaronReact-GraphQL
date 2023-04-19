import React from 'react';
import { RequestReviewButton } from './request-review-button';
import { FeatureFlagContext } from '../contexts/FeatureFlagContext';

import { useMedication } from '../mock-data';

import { profileSectionFlagKey } from '../feature-flag-config';
import { shouldRenderDetailsSectionBasedOnFlagValue } from '../helpers/flagHelpers';

// Problem: 
//     This should be conditionally rendered based on feature flag enrolment.
// Feature flag name: 
//     profile-render-details-section
// Setup: 
//     Show to users with flag value 'variation'
export const MedicationDetails = () => { 
  const medication = useMedication();
  const { getFlagValueForKey } = React.useContext(FeatureFlagContext);

  return (
    <>
      { shouldRenderDetailsSectionBasedOnFlagValue(getFlagValueForKey(profileSectionFlagKey)) && <div>
        <ul>
          <li>Common side effects: {medication.sideEffects}</li>
          <li>Warning signs: {medication.warnings}</li>
        </ul>
        <p>Experiencing any of these? Please contact your doctor</p>
        <RequestReviewButton />
      </div>}
    </>
  )
}