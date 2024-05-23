// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import HomePage from "./pageObjects/Homepage.cy";
const homePage = new HomePage();

Cypress.Commands.add("alertAlertBtn", (name) => {
  homePage.nameField.type(name);

  // Test scenario for alert button
  homePage.alertBtn.click();
  cy.on("window:alert", (alertText) => {
    expect(alertText).to.contain(
      `Hello ${name}, share this practice page and share your knowledge`
    );
  });
});
Cypress.Commands.add("alertConfirmBtn", (name) => {
  // Test scenario for confirm button
  homePage.nameField.type(name);
  homePage.confirmBtn.click();
  cy.on("window:confirm", (confirmText) => {
    expect(confirmText).to.contain(
      `Hello ${name}, Are you sure you want to confirm?`
    );
  });
});
  Cypress.Commands.add("hideTest", (name)=>{
    homePage.showHideInputField.type(name);
    homePage.hideBtn.click();
  })
  Cypress.Commands.add("showTest" ,()=>{
    homePage.showBtn.click();
  })

  Cypress.Commands.add('getNewTabUrl', (openButtonSelector) => {
    cy.window().then((win) => {
      const open = win.open;
      cy.stub(win, 'open').callsFake((url) => {
        win.location.href = url;
      }).as('windowOpen');
    });
    openButtonSelector.click();
    
  });


