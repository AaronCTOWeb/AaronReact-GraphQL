/**
* Determines whether to show promotional banner
* flagValue can be: true/false
* Show when flag value is true
*/
export const shouldRenderBannerBasedOnFlagValue: (
    flagValue: boolean
) => boolean = (flagValue) => (flagValue === true);

/**
* Determines whether to show dashboard details section
* flagValue can be: not-enrolled, control, variation
* Show when flag value is 'variation'
*/
export const shouldRenderDetailsSectionBasedOnFlagValue: (
    flagValue: 'not-enrolled' | 'control' | 'variation'
) => boolean = (flagValue) => (flagValue === 'variation');