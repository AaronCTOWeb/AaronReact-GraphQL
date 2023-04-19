import { render, screen } from "@testing-library/react";
import { PageLayout } from "../components/page-layout";
import "@testing-library/jest-dom/extend-expect";

describe("PageLayout", () => {
  it("should render PromotionalBanner when promotionalBannerStatus is true", () => {
    render(
      <PageLayout className="test-class" promotionalBannerStatus={true}>
        <p>Test child element</p>
      </PageLayout>
    );
    expect(
      screen.getByText("50% launch sale! Use code TAKEHOME")
    ).toBeInTheDocument();
  });

  it("should not render PromotionalBanner when promotionalBannerStatus is false", () => {
    render(
      <PageLayout className="test-class" promotionalBannerStatus={false}>
        <p>Test child element</p>
      </PageLayout>
    );
    expect(
      screen.queryByText("50% launch sale! Use code TAKEHOME")
    ).not.toBeInTheDocument();
  });
});
