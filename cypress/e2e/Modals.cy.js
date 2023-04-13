describe("Modals", () => {
  it("Add Crypto Modal(CryptoList) should open and close", () => {
    cy.visit("/");
    cy.get(".crypto-list__table__element__action__button").first().click(); // Click "+" button in CryptoList list to add crypto
    cy.get(".add-crypto-modal").should("be.visible"); // Check if modal is opened
    cy.get(".modal__content__header__close-button button").click(); // Click modal close button
    cy.get(".add-crypto-modal").should("not.exist"); // Check if modal doesn't exist in DOM anymore
  });

  it("Add Crypto Modal(CryptoInfo) should open and close", () => {
    cy.visit("/bitcoin");
    cy.get(".crypto-info__header__asset__main__name").should(($element) => {
      expect($element.text().toLowerCase()).to.contain("bitcoin"); // check if name is equal to bitcoin
    });
    cy.get(".crypto-info__header__stats__col--add-button button").click(); // open add crypto modal
    cy.get(".add-crypto-modal").should("be.visible"); // check if its visible
    cy.get(".modal__content__header__close-button button").click(); // click close
    cy.get(".add-crypto-modal").should("not.exist"); // make sure it does not exist in DOM
  });

  it("Add Crypto Modal should work with decimals", () => {
    cy.visit("/");
    cy.get(".crypto-list__table__element__action__button").first().click(); // Click "+" button in CryptoListElement to add crypto
    cy.get(".add-crypto-modal").should("be.visible"); // Check if modal is opened

    cy.get(".add-crypto-modal__amount-input input") // Get input and type decimal value (1.23)
      .type("1.23")
      .should("have.value", "1.23"); // Check if value is correct and equals to 1.23

    cy.get(".add-crypto-modal__confirm-button button").click(); // Click "Add" button to add crypto
    cy.get(".add-crypto-modal").should("not.exist"); // Check if modal is closed

    cy.get("td.crypto-list__table__element__price") // Get cryptocurrency price from the first element of CryptoList list
      .first()
      .invoke("text")
      .then((cryptoText) => {
        const cryptoPrice = parseFloat(cryptoText.replace("$", ""));
        cy.wrap(cryptoPrice).as("cryptoPrice"); // Wrap it's value as @cryptoPrice element
      });

    cy.get("span.header__portfolio__element__value") // Get portfolio value from header
      .invoke("text")
      .then((portfolioText) => {
        const portfolioValue = parseFloat(portfolioText.replace("$", ""));
        cy.wrap(portfolioValue).as("portfolioValue"); // Wrap it's value as @portfolioValue element
      });

    cy.get("@cryptoPrice").then((cryptoPrice) => {
      cy.get("@portfolioValue").then((portfolioValue) => {
        expect(portfolioValue).to.closeTo(cryptoPrice * 1.23, 100); // cryptoPrice * 1.23 should be equal to portfolioValue | +- 100
      });
    });
  });

  it("Portfolio Modal should open and close", () => {
    cy.visit("/");
    cy.get(".header__links__button").click(); // Click "My Portfolio" button in Header
    cy.get(".portfolio-modal").should("be.visible"); // Check if portfolio is popped up
    cy.get(".modal__content__header__close-button button").click(); // Click modal close button
    cy.get(".portfolio-modal").should("not.exist"); // Check if portfolio does not exist in DOM
  });

  it("Edit Crypto Modal should work fine (open, contains, delete, close)", () => {
    cy.visit("/");
    cy.get(".crypto-list__table__element__action__button").first().click(); // Click "+" button in the CryptoList list to add cryptocurrency
    cy.get(".add-crypto-modal").should("be.visible"); // Check if Add Crypto Modal is visible

    cy.get(".add-crypto-modal__amount-input input") // Get an amount input and type "1" as an amount
      .type("1")
      .should("have.value", "1"); // Check if input value is equals to "1"

    cy.get(".add-crypto-modal__confirm-button button").click(); // Click "Add" button
    cy.get(".add-crypto-modal").should("not.exist"); // Portfolio should close. Check if portfolio does not exist in DOM.

    cy.get("td.crypto-list__table__element__price") // Get cryptocurrency price from the first element of CryptoList list
      .first()
      .invoke("text")
      .then((cryptoText) => {
        const cryptoPrice = parseFloat(cryptoText.replace("$", ""));
        cy.wrap(cryptoPrice).as("cryptoPrice"); // Wrap it's value as @cryptoPrice element
      });

    cy.get(".header__links__button").click(); // Click "My Portfolio" button in Header
    cy.get(".portfolio-modal").should("be.visible"); // Check if portfolio is popped up
    cy.get(".portfolio__modal__table__body__row").should("have.length", 1); // Check the length of the rows (it should equal to 1, because we've added 1 element)

    cy.get(".portfolio__modal__table__body__price") // Check if price in portfolio equals to price of cryptocurrency (it should equal because we've added amount of 1)
      .first()
      .invoke("text")
      .then((portfolioText) => {
        cy.get("@cryptoPrice").then((cryptoPrice) => {
          const portfolioValue = parseFloat(portfolioText.replace("$", ""));
          expect(portfolioValue).to.be.closeTo(cryptoPrice, 100); // portfolioValue === CryptoPrice | +- 100
        });
      });

    cy.get(".portfolio__modal__table__body__actions").click(); // Click edit crypto button
    cy.get(".edit-crypto-modal").should("be.visible"); // Check if the edit crypto modal opens

    cy.get(".edit-crypto-modal").within(() => {
      cy.contains("Delete from portfolio").click(); // Click delete from portfolio button in edit crypto modal
    });

    cy.get(".portfolio__modal__table__body__row").should("have.length", 0); // Check if cryptocurrency is deleted from portfolio (length 1 -> length 0)
    cy.get(".modal__content__header__close-button button").click(); // close modal
    cy.get(".portfolio-modal").should("not.exist"); // check if its not exist in DOM anymore
  });
});
