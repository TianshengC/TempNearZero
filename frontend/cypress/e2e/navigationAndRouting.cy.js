/* eslint-disable no-undef */
describe("Navigation and Routing", () => {
  it("should navigate to the home page", () => {
    cy.visit("/");
    cy.url().should("eq", Cypress.config().baseUrl + "/");
    cy.getByData("temperature-input-container").should("be.visible");
  });

  it("should redirect to home page when visiting result page without data", () => {
    cy.visit("/result");
    cy.url().should("eq", Cypress.config().baseUrl + "/");
    cy.getByData("temperature-input-container").should("be.visible");
  });

  it("should display 404 page for non-existent routes and navigate back to home", () => {
    cy.visit("/non-existent-page", { failOnStatusCode: false });
    cy.url().should("eq", Cypress.config().baseUrl + "/404");
    cy.getByData("not-found-container").should("be.visible");
    cy.contains("404 - Page Not Found").should("be.visible");
    cy.getByData("go-home-button").click();
    cy.url().should("eq", Cypress.config().baseUrl + "/");
    cy.getByData("temperature-input-container").should("be.visible");
  });
});
