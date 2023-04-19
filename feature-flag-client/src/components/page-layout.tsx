import React from 'react';
import { FeatureFlagContext } from '../contexts/FeatureFlagContext';

import { shouldRenderBannerBasedOnFlagValue } from '../helpers/flagHelpers';
import { launchBannerFlagKey } from '../feature-flag-config';

// Problem: 
//     This should be conditionally rendered based on feature flag enrolment.
// Feature flag name: 
//     general-render-launch-banner
// Setup: 
//     Show to users with flag value: true
const PromotionalBanner = () => (
  <div className="promotional-banner">
    <p>50% launch sale! Use code TAKEHOME</p>
  </div>
)

export const PageLayout = ({ children, className }: { children: React.ReactNode, className: string }) => {
  const { getFlagValueForKey } = React.useContext(FeatureFlagContext);
  
  return (
    <div className={`page-layout ${className}`}>
      {shouldRenderBannerBasedOnFlagValue(getFlagValueForKey(launchBannerFlagKey, false)) && <PromotionalBanner />}
      {children}
    </div>
  )
}