
/**
 * These are feature flags contained within our LaunchDarkly project
 */

/**
 * Controls: Showing a promotional launch banner at the top of the page layout
 * Returns: true/false
 * Show when: If returns 'true'
 */
export const launchBannerFlagKey = 'general-render-launch-banner'

/**
 * Controls: Rendering a details section on the dashboard screen
 * Returns: not-enrolled, control, variation
 * Show when: Returns 'variation'
 */
export const profileSectionFlagKey = 'profile-render-details-section'

/**
 * Controls: The colour of the detail section CTA
 * Returns: hex colour
 * Show when: Always, colour is based on flag value.
 */
export const detailsCtaFlagKey = 'details-section-cta-colour'
