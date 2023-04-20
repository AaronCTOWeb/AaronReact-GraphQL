import { useContext } from 'react';

import { useMedication } from '../mock-data';
import { RequestReviewButton } from './request-review-button';
import { profileSectionFlagKey } from '../feature-flag-config';
import { DetailsRender } from '../helpers/types';
import { AppContext } from '../context';

// Problem:
//     This should be conditionally rendered based on feature flag enrolment.
// Feature flag name:
//     profile-render-details-section
// Setup:
//     Show to users with flag value 'variation'
export const MedicationDetails = () => {
  const flags = useContext(AppContext);
  const medication = useMedication();

  return (
    <>
      {flags[profileSectionFlagKey] === DetailsRender.VARIATION && (
        <div>
          <ul>
            <li>Common side effects: {medication.sideEffects}</li>
            <li>Warning signs: {medication.warnings}</li>
          </ul>
          <p>Experiencing any of these? Please contact your doctor</p>
          <RequestReviewButton />
        </div>
      )}
    </>
  );
};
