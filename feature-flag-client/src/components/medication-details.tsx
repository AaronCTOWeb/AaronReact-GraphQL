import React, { useContext } from "react";
import { useMedication } from "../mock-data";
import { RequestReviewButton } from "./request-review-button";
import { FlagContext } from "../App";

// Problem:
//     This should be conditionally rendered based on feature flag enrolment.
// Feature flag name:
//     profile-render-details-section
// Setup:
//     Show to users with flag value 'variation'
export const MedicationDetails = () => {
  const medication = useMedication();

  // get the profile-render-details-section flag value
  const { profileRender } = useContext(FlagContext);

  return (
    // use the profile-render-details-section flag value as conditionally rendered
    profileRender === "variation" && (
      <div>
        <ul>
          <li>Common side effects: {medication.sideEffects}</li>
          <li>Warning signs: {medication.warnings}</li>
        </ul>
        <p>Experiencing any of these? Please contact your doctor</p>
        <RequestReviewButton />
      </div>
    )
  );
};
