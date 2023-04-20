import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { detailsCtaFlagKey } from '../feature-flag-config';
import { RequestReviewButton } from '../components/request-review-button';
import { AppContext } from '../context';

const renderWithContext = (flags: Record<string, any>) => {
  const contextValue = { ...flags };
  return render(
    <AppContext.Provider value={contextValue}>
      <RequestReviewButton />
    </AppContext.Provider>,
  );
};

describe('RequestReviewButton', () => {
  test('renders the button with the correct text', () => {
    renderWithContext({});
    const reviewButton = screen.getByTestId('review-button');
    expect(reviewButton).toHaveTextContent('Request doctor review');
  });

  test('renders the button with custom background color based on flag value', () => {
    const customColor = 'red';
    renderWithContext({ [detailsCtaFlagKey]: customColor });
    const reviewButton = screen.getByTestId('review-button');
    expect(reviewButton).toHaveStyle({ background: customColor });
  });

  test('renders the button with a valid CSS color name based on flag value', () => {
    const validColor = 'blue';
    renderWithContext({ [detailsCtaFlagKey]: validColor });
    const reviewButton = screen.getByTestId('review-button');
    expect(reviewButton).toHaveStyle({ background: validColor });
  });

  test('renders the button with a valid RGB color value based on flag value', () => {
    const validColor = 'rgb(255, 0, 0)';
    renderWithContext({ [detailsCtaFlagKey]: validColor });
    const reviewButton = screen.getByTestId('review-button');
    expect(reviewButton).toHaveStyle({ background: validColor });
  });

  test('renders the button with a valid HEX color value based on flag value', () => {
    const validColor = '#FF0000';
    renderWithContext({ [detailsCtaFlagKey]: validColor });
    const reviewButton = screen.getByTestId('review-button');
    expect(reviewButton).toHaveStyle({ background: validColor });
  });
});
