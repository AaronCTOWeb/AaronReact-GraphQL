import React, { useEffect } from "react";
import { MedicationDetails } from "../components/medication-details";
import { PageLayout } from "../components/page-layout";
import { useMedication, useUser } from "../mock-data";
import { useFlags } from "launchdarkly-react-client-sdk";
import {
  shouldRenderBanner,
  shouldRenderDetailsSection,
} from "../helpers/flagHelper";

export const DashboardScreen = () => {
  const user = useUser();
  const medication = useMedication();
  const {
    detailsSectionCtaColour,
    generalRenderLaunchBanner,
    profileRenderDetailsSection,
  } = useFlags();

  useEffect(() => {
    console.log("detailsSectionCtaColour =>", detailsSectionCtaColour);
    console.log("generalRenderLaunchBanner =>", generalRenderLaunchBanner);
    console.log("profileRenderDetailsSection =>", profileRenderDetailsSection);
  }, [
    detailsSectionCtaColour,
    generalRenderLaunchBanner,
    profileRenderDetailsSection,
  ]);

  return (
    <PageLayout
      className="dashboard"
      generalRenderLaunchBanner={shouldRenderBanner(generalRenderLaunchBanner)}
    >
      <h1>Dashboard</h1>
      <div className="dashboard-details">
        <h3>Your information</h3>
        <ul>
          <li>Name: {user.name}</li>
          <li>Age: {user.age}</li>
          <li>Country: {user.country}</li>
        </ul>
      </div>
      <div className="dashboard-details">
        <h3>Your medication</h3>
        <ul>
          <li>Medication: {medication.name}</li>
          <li>Repeats left: {medication.repeatsLeft}</li>
          <li>Instructions: {medication.instructions}</li>
        </ul>
        {shouldRenderDetailsSection(profileRenderDetailsSection) && (
          <MedicationDetails
            detailsSectionCtaColour={detailsSectionCtaColour}
          />
        )}
      </div>
    </PageLayout>
  );
};
