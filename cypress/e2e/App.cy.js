describe("Crypto List", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("Crypto List should load", () => {
    cy.get(`.crypto-list__table__element`).should("have.length", 5); // Check if CryptoList list length is 5 (we load and display 5 elements from API)
  });
  it("Should lore more cryptocurrencies", () => {
    cy.get(".crypto-list").within(() => {
      cy.contains("Load more").click(); // Click load more button in crypto list
      cy.get(`.crypto-list__table__element`).should("have.length", 10); // Check if CryptoList list length is at least 10 (we load and display 5 more elements from API)
    });
  });
});

describe("CryptoInfo Page", () => {
  it("CryptoInfo page should load", () => {
    cy.visit("/");
    cy.get(".crypto-list__table__element__name") // Get the first element from CryptoList list
      .first()
      .find(".cryptocurrency-component__info__name") // Get it's name
      .click() // Click it
      .invoke("text")
      .then((text) => {
        // check if crypto name is the same we're clicked on
        cy.get(".crypto-info__header__asset__main__name").should(
          "contain.text",
          text
        );
        cy.url().should("include", text.toLowerCase()); // check if URL is contains crypto we clicked
      });
  });

  it("Graph should load", () => {
    cy.visit("/bitcoin");
    // check if graph is visible and exists
    cy.get(".crypto-info__body__price-chart").should("be.visible");
  });
});

describe("Header Component", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("3 popular cryptocurrencies should load", () => {
    cy.get(".header__portfolio__element").should("have.length", 3); // Check if popular cryptocurrencies length is equals to 3
    // Check if popular cryptocurrencies value is greater than 0 (API loaded and works)
    cy.get("div.header__portfolio__element__value").each(($el) => {
      const value = parseFloat($el.text().replace("$", ""));
      expect(value).to.be.greaterThan(0);
    });
  });
});
