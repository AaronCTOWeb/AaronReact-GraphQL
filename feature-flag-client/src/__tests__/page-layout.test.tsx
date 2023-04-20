import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { PageLayout } from '../components/page-layout';
import { launchBannerFlagKey } from '../feature-flag-config';
import { AppContext } from '../context';

const renderWithContext = (
  ui: React.ReactElement,
  { flags, ...options }: { flags: Record<string, any> },
) => {
  return render(<AppContext.Provider value={flags}>{ui}</AppContext.Provider>, options);
};

describe('PageLayout', () => {
  test('renders children and className correctly', () => {
    const testText = 'Test child content';
    renderWithContext(
      <PageLayout className="test">
        <div>{testText}</div>
      </PageLayout>,
      {
        flags: { [launchBannerFlagKey]: false },
      },
    );
    const childContent = screen.getByText(testText);
    const pageLayout = screen.getByText(testText).closest('.page-layout');
    expect(childContent).toBeInTheDocument();
    expect(pageLayout).toHaveClass('test');
  });

  test('renders PromotionalBanner when launchBannerFlagKey is true', () => {
    renderWithContext(
      <PageLayout className="test">
        <p>Page content</p>
      </PageLayout>,
      {
        flags: { [launchBannerFlagKey]: true },
      },
    );
    const promotionalBanner = screen.getByText(/50% launch sale!/i);
    expect(promotionalBanner).toBeInTheDocument();
  });

  test('does not render PromotionalBanner when launchBannerFlagKey is false', () => {
    renderWithContext(
      <PageLayout className="test">
        <p>Page content</p>
      </PageLayout>,
      {
        flags: { [launchBannerFlagKey]: false },
      },
    );
    const promotionalBanner = screen.queryByText(/50% launch sale!/i);
    expect(promotionalBanner).not.toBeInTheDocument();
  });
});
