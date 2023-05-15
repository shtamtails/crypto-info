/**
 *
 * This tests are temporary deprecated! Will be recreated soon
 *
 */

// describe("Crypto List", () => {
//   beforeEach(() => {
//     cy.visit("/");
//   });
//   it("Crypto List should load", () => {
//     cy.get(`[data-testid="crypto-list-element"]`).should("have.length", 5); // Check if CryptoList list length is 5 (we load and display 5 elements from API)
//     cy.screenshot();
//   });
//   it("Should lore more cryptocurrencies", () => {
//     cy.get(".crypto-list").within(() => {
//       cy.contains("Load more").click(); // Click load more button in crypto list
//       cy.get(`[data-testid="crypto-list-element"]`).should("have.length", 10); // Check if CryptoList list length is at least 10 (we load and display 5 more elements from API)
//     });
//     cy.screenshot();
//   });
// });

// describe("CryptoInfo Page", () => {
//   it("CryptoInfo page should load", () => {
//     cy.visit("/");
//     cy.get("[data-testid='crypto-list_element_name']") // Get the first element from CryptoList list
//       .first()
//       .find("[data-testid='cryptocurrency-component_name']") // Get it's name
//       .click() // Click it
//       .invoke("text")
//       .then((text) => {
//         // check if crypto name is the same we're clicked on
//         cy.get("[data-testid='crypto-info_header_name']").should(
//           "contain.text",
//           text
//         );
//         cy.url().should("include", text.toLowerCase()); // check if URL is contains crypto we clicked
//       });
//     cy.screenshot();
//   });

//   it("Graph should load", () => {
//     cy.visit("/bitcoin");
//     // check if graph is visible and exists
//     cy.get("[data-testid='crypto-info_price-chart']").should("be.visible");
//     cy.screenshot();
//   });
// });

// describe("Header Component", () => {
//   beforeEach(() => {
//     cy.visit("/");
//   });

//   it("3 popular cryptocurrencies should load", () => {
//     cy.get("[data-testid='header_portfolio_element']").should("have.length", 3); // Check if popular cryptocurrencies length is equals to 3
//     // Check if popular cryptocurrencies value is greater than 0 (API loaded and works)
//     cy.get("[data-testid='header_portfolio_element_value']").each(($el) => {
//       const value = parseFloat($el.text().replace("$", ""));
//       expect(value).to.be.greaterThan(0);
//     });
//     cy.screenshot();
//   });
// });
