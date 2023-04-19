import React from "react";
import { PromotionalBanner } from "./promotional-banner";

export const PageLayout = ({
  children,
  className,
  generalRenderLaunchBanner,
}: {
  children: React.ReactNode;
  className: string;
  generalRenderLaunchBanner?: boolean | string;
}) => {
  return (
    <div className={`page-layout ${className}`}>
      {generalRenderLaunchBanner === true && <PromotionalBanner />}
      {children}
    </div>
  );
};
