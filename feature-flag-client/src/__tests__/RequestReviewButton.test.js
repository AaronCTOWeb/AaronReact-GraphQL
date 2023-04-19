import React from 'react';
import { render } from '@testing-library/react';
import { FlagContext } from '../App';
import { RequestReviewButton } from '../components/request-review-button';
import "@testing-library/jest-dom/extend-expect";

describe('RequestReviewButton', () => {
  it('renders with correct class based on FF value', () => {
    const ffValue = 'blue';
    const { getByText } = render(
      <FlagContext.Provider value={{ detailsSection: ffValue }}>
        <RequestReviewButton />
      </FlagContext.Provider>
    );
    const button = getByText('Request doctor review');
    expect(button).toHaveClass(`btn-${ffValue}`);
  });
});
