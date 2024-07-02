/* eslint-disable no-undef */
describe("User Journey", () => {
  it("should complete the full temperature analysis process", () => {
    // Navigate to the home page
    cy.visit("/");
    cy.getByData("temperature-input-container").should("be.visible");

    // Enter multiple temperatures
    const temperatures = [25, -10, 18.5];
    temperatures.forEach((temp) => {
      cy.getByData("temperature-input").type(temp.toString());
      cy.getByData("add-temperature-button").click();
    });

    // Verify temperatures are added
    temperatures.forEach((temp, index) => {
      cy.getByData(`temperature-value-${index}`).should(
        "contain",
        `${temp.toFixed(1)}°C`
      );
    });

    // Submit the temperatures
    cy.getByData("submit-temperatures-button").click();

    // Verify the result page displays correctly
    cy.url().should("eq", Cypress.config().baseUrl + "/result");
    cy.getByData("result-chart-container").should("be.visible");

    // Check if the chart data is displayed correctly
    cy.getByData("bar-chart").should("be.visible");
    temperatures.forEach((temp) => {
      cy.getByData("bar-chart").should(
        "contain",
        temp > 0 ? `+${temp}` : `${temp}`
      );
    });
    cy.getByData("closest-to-zero-result").should("contain", "Result: -10");

    // Navigate back to the home page
    cy.getByData("back-to-home-button").click();
    cy.url().should("eq", Cypress.config().baseUrl + "/");
    cy.getByData("temperature-input-container").should("be.visible");

    // Verify the temperature list is reset
    cy.getByData("empty-list-message").should("be.visible");
  });
});
