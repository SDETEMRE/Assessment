/// <reference types='Cypress'/>

import HomePage from "../support/pageObjects/Homepage.cy";
let data;
const homePage = new HomePage();

describe("Test Cases for Task Home Page", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
    cy.visit(Cypress.env("baseUrl"));
    cy.fixture("data").then((sel) => {
      data = sel;
    });
  });
  it("Dropdown Test", () => {
    homePage.dropDownBtn.should("be.visible").and("be.enabled");
    homePage.dropDownBtn.select("Option1").should("have.value", "option1");
    homePage.dropDownBtn.find("option").should("have.length", 3);
  });
  it("Upload Image Test", () => {
    const uploadedImage = data.uploadedImage;
    homePage.chooseFileBtn.should("be.enabled");
    homePage.uploadFile(uploadedImage);
    homePage.uploadedImage.should("have.attr", "src").and("include", "blob");
  });
  it("Open New Tab Test", () => {
    cy.window().then((win) => {
      cy.spy(win, "open").as("redirect");
    });
    homePage.openNewTabBtn.click();
    cy.url("@redirect").should("include", "https://www.easygenerator.com/en/");
  });
  it("Alert Test", () => {
    const name = data.name;
    cy.alertAlertBtn(name);
    cy.alertConfirmBtn(name);
  });

  it("Hide and Show Button Test", () => {
    const name = data.name;
    cy.hideTest(name);
    homePage.showHideInputField.should('not.visible')
    homePage.showBtn.click();
    homePage.showHideInputField.should('be.visible')
  });
  it.only("Hover Test", () => {
   const {list} = data.mouseHoverList;
    homePage.mouseHoverBtn.trigger('mouseover').each(($el,index,list)=>{
        cy.wrap($el).invoke('text').should('eq',list[index])
    })
  });
  xit("iFrame Test", () => {
    const name = data.name;
    cy.alertAlertBtn(name);
    cy.alertConfirmBtn(name);
  });

});
