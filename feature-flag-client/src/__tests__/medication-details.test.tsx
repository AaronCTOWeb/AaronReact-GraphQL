import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { profileSectionFlagKey } from '../feature-flag-config';
import { DetailsRender } from '../helpers/types';
import { MedicationDetails } from '../components/medication-details';
import { AppContext } from '../context';

const renderWithContext = (flags: Record<string, any>) => {
  const contextValue = { ...flags };
  return render(
    <AppContext.Provider value={contextValue}>
      <MedicationDetails />
    </AppContext.Provider>,
  );
};

describe('MedicationDetails', () => {
  test('renders the details section when flag value is variation', () => {
    renderWithContext({ [profileSectionFlagKey]: DetailsRender.VARIATION });
    const sideEffects = screen.getByText(/common side effects/i);
    const warningSigns = screen.getByText(/warning signs/i);
    const contactDoctor = screen.getByText(/please contact your doctor/i);

    expect(sideEffects).toBeInTheDocument();
    expect(warningSigns).toBeInTheDocument();
    expect(contactDoctor).toBeInTheDocument();
  });

  test('does not render the details section when flag value is not variation', () => {
    renderWithContext({ [profileSectionFlagKey]: DetailsRender.CONTROL });

    const sideEffects = screen.queryByText(/common side effects/i);
    const warningSigns = screen.queryByText(/warning signs/i);
    const contactDoctor = screen.queryByText(/please contact your doctor/i);

    expect(sideEffects).not.toBeInTheDocument();
    expect(warningSigns).not.toBeInTheDocument();
    expect(contactDoctor).not.toBeInTheDocument();
  });

  test('renders the request review button when flag value is variation', () => {
    renderWithContext({ [profileSectionFlagKey]: DetailsRender.VARIATION });
    const reviewButton = screen.getByTestId('review-button');
    expect(reviewButton).toBeInTheDocument();
  });

  test('does not render the request review button when flag value is not variation', () => {
    renderWithContext({ [profileSectionFlagKey]: DetailsRender.CONTROL });
    const reviewButton = screen.queryByTestId('review-button');
    expect(reviewButton).not.toBeInTheDocument();
  });

  test('does not render the details section when flag value is not-enrolled', () => {
    renderWithContext({ [profileSectionFlagKey]: DetailsRender.NOT_ENROLLED });

    const sideEffects = screen.queryByText(/common side effects/i);
    const warningSigns = screen.queryByText(/warning signs/i);
    const contactDoctor = screen.queryByText(/please contact your doctor/i);

    expect(sideEffects).not.toBeInTheDocument();
    expect(warningSigns).not.toBeInTheDocument();
    expect(contactDoctor).not.toBeInTheDocument();
  });

  test('does not render the request review button when flag value is not-enrolled', () => {
    renderWithContext({ [profileSectionFlagKey]: DetailsRender.NOT_ENROLLED });
    const reviewButton = screen.queryByTestId('review-button');
    expect(reviewButton).not.toBeInTheDocument();
  });
});
