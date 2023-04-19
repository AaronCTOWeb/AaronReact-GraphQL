import "@testing-library/jest-dom/extend-expect"; 

function initializeLDClient(clientId) {
  const ldClient = window.ldclient.initialize(clientId);
  return ldClient;
}

describe("LDClient", () => {
  let originalLdclient;

  beforeEach(() => {
    // Save the original ldclient object
    originalLdclient = window.ldclient;

    // Define a mock ldclient object
    window.ldclient = {
      initialize: jest.fn(() => ({
        on: jest.fn(),
        variation: jest.fn(),
      })),
    };
  });

  afterEach(() => {
    // Restore the original ldclient object
    window.ldclient = originalLdclient;
  });

  test("uses LaunchDarkly client ID", () => {
    const clientId = process.env.REACT_APP_LAUNCH_DARKLY_CLIENT_ID;
    const ldClient = initializeLDClient(clientId);
    expect(ldClient).toBeDefined();
  });
});