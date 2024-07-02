/* eslint-disable no-undef */
describe("Temperature List Management", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should add individual temperatures", () => {
    cy.getByData("temperature-input").type("25");
    cy.getByData("add-temperature-button").click();
    cy.getByData("temperature-item-0").should("exist");
    cy.getByData("temperature-value-0").should("contain", "25.0°C");

    cy.getByData("temperature-input").type("-10");
    cy.getByData("add-temperature-button").click();
    cy.getByData("temperature-item-1").should("exist");
    cy.getByData("temperature-value-1").should("contain", "-10.0°C");
  });

  it("should remove individual temperature", () => {
    cy.getByData("temperature-input").type("25");
    cy.getByData("add-temperature-button").click();
    cy.getByData("temperature-item-0").should("exist");
    cy.getByData("temperature-item-0").within(() => {
      cy.getByData("remove-temperature-button-0").click();
    });
    cy.getByData("temperature-item-0").should("not.exist");
    cy.getByData("empty-list-message").should("be.visible");
  });

  it("should not allow more than 20 temperatures", () => {
    for (let i = 0; i < 20; i++) {
      cy.getByData("temperature-input").type(`${i}`);
      cy.getByData("add-temperature-button").click();
    }

    cy.getByData("temperature-input").type("20");
    cy.getByData("add-temperature-button").click();
    cy.getByData("input-error-message").should(
      "contain",
      "Maximum of 20 temperatures allowed"
    );

    cy.getByData("temperature-items-container")
      .children()
      .should("have.length", 20);
  });

  it("should display empty list message when no temperatures are added", () => {
    cy.getByData("empty-list-message").should("be.visible");
    cy.getByData("empty-list-message").should(
      "contain",
      "No temperatures added yet."
    );
  });

  it("should remove all temperatures", () => {
    cy.getByData("temperature-input").type("25");
    cy.getByData("add-temperature-button").click();
    cy.getByData("temperature-input").type("30");
    cy.getByData("add-temperature-button").click();

    cy.getByData("remove-all-temperatures-button").click();

    cy.getByData("temperature-items-container").should("not.exist");
    cy.getByData("empty-list-message").should("be.visible");
  });
});
