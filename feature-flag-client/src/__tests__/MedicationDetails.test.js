import React from "react";
import { render, screen } from "@testing-library/react";
import { FlagContext } from "../App";
import { useMedication } from "../mock-data";
import { MedicationDetails } from "../components/medication-details";
import "@testing-library/jest-dom/extend-expect";

jest.mock("../mock-data");

describe("MedicationDetails", () => {
  it("should render details section when profileRender is 'variation'", () => {
    useMedication.mockReturnValueOnce({
      sideEffects: "test side effects",
      warnings: "test warnings",
    });

    const mockContext = {
      profileRender: "variation",
    };

    render(
      <FlagContext.Provider value={mockContext}>
        <MedicationDetails />
      </FlagContext.Provider>
    );

    expect(
      screen.getByText("Common side effects: test side effects")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Warning signs: test warnings")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Experiencing any of these? Please contact your doctor")
    ).toBeInTheDocument();
  });

  it("should not render details section when profileRender is not 'variation'", () => {
    useMedication.mockReturnValueOnce({
      sideEffects: "test side effects",
      warnings: "test warnings",
    });

    const mockContext = {
      profileRender: "other",
    };

    render(
      <FlagContext.Provider value={mockContext}>
        <MedicationDetails />
      </FlagContext.Provider>
    );

    expect(
      screen.queryByText("Common side effects: test side effects")
    ).toBeNull();
    expect(screen.queryByText("Warning signs: test warnings")).toBeNull();
    expect(
      screen.queryByText(
        "Experiencing any of these? Please contact your doctor"
      )
    ).toBeNull();
  });
});
