import React, { useContext } from "react";
import { MedicationDetails } from "../components/medication-details";
import { PageLayout } from "../components/page-layout";
import { useMedication, useUser } from "../mock-data";
import { FlagContext } from "../App";

export const DashboardScreen = () => {
  const user = useUser();
  const medication = useMedication();

  // get the flag for rendered promotionalBanner in the login and dashboard
  const { generalRender } = useContext(FlagContext);

  return (
    // pass the general-render-launch-banner flag value as child
    <PageLayout className="dashboard" promotionalBannerStatus={generalRender}>
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
        <MedicationDetails />
      </div>
    </PageLayout>
  );
};
