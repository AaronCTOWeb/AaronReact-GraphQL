type FlagValue = boolean | "not-enrolled" | "control" | "variation";

export const shouldRenderBanner = (flagValue: FlagValue) => flagValue === true;
export const shouldRenderDetailsSection = (flagValue: FlagValue) =>
  flagValue === "variation";

  