import React from "react";

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
);

// get the general-render-launch-banner flag value as children
export const PageLayout = ({
  children,
  className,
  promotionalBannerStatus,
}: {
  children: React.ReactNode;
  className: string;
  promotionalBannerStatus: boolean;
}) => {
  return (
    <div className={`page-layout ${className}`}>
      {/* use the general-render-launch-banner flag value as conditionally rendered */}
      {promotionalBannerStatus && <PromotionalBanner />}
      {children}
    </div>
  );
};
