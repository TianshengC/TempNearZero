/* eslint-disable no-undef */
describe("Input Validation", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should accept valid temperature inputs", () => {
    cy.getByData("temperature-input").type("25");
    cy.getByData("add-temperature-button").click();
    cy.getByData("input-error-message").should("not.exist");

    cy.getByData("temperature-input").type("-10");
    cy.getByData("add-temperature-button").click();
    cy.getByData("input-error-message").should("not.exist");

    cy.getByData("temperature-input").type("18.5");
    cy.getByData("add-temperature-button").click();
    cy.getByData("input-error-message").should("not.exist");

    cy.getByData("temperature-list-container").within(() => {
      cy.getByData("temperature-item-0").within(() => {
        cy.getByData("temperature-value-0").should("contain", "25.0°C");
      });
      cy.getByData("temperature-item-1").within(() => {
        cy.getByData("temperature-value-1").should("contain", "-10.0°C");
      });
      cy.getByData("temperature-item-2").within(() => {
        cy.getByData("temperature-value-2").should("contain", "18.5°C");
      });
    });
  });

  it("should reject temperatures out of range", () => {
    cy.getByData("temperature-input").type("-101");
    cy.getByData("add-temperature-button").click();
    cy.getByData("input-error-message").should(
      "contain",
      "Temperature must be between -100 and 70"
    );

    cy.getByData("temperature-input").clear().type("71");
    cy.getByData("add-temperature-button").click();
    cy.getByData("input-error-message").should(
      "contain",
      "Temperature must be between -100 and 70"
    );
  });

  it("should reject incorrectly formatted inputs", () => {
    cy.getByData("temperature-input").type("abc");
    cy.getByData("add-temperature-button").click();
    cy.getByData("input-error-message").should(
      "contain",
      "Temperature must be a valid number"
    );

    cy.getByData("temperature-input").clear().type("18.55");
    cy.getByData("add-temperature-button").click();
    cy.getByData("input-error-message").should(
      "contain",
      "at most one decimal place"
    );
  });
});
