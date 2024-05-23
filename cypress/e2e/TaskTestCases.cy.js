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
    const uploadedImage = this.data.uploadedImage;
    homePage.chooseFileBtn.should("be.enabled");
    homePage.uploadFile(uploadedImage);
    homePage.uploadedImage.should("have.attr", "src").and("include", "blob");
  });
  it("Open New Tab Test", () => {
    cy.getNewTabUrl(homePage.openNewTabBtn);
    cy.get("@windowOpen").should("have.been.called");
    cy.url().should("eq", "https://www.easygenerator.com/en/");
  });
  it("Alert Test", () => {
    const name = data.name;
    cy.alertAlertBtn(name);
    cy.alertConfirmBtn(name);
  });

  it("Hide and Show Button Test", () => {
    const name = data.name;
    cy.hideTest(name);
    homePage.showHideInputField.should("not.visible");
    homePage.showBtn.click();
    homePage.showHideInputField.should("be.visible");
  });
  it("Hover Test", () => {
    const { hList } = data.mouseHover;
    homePage.mouseHoverBtn.trigger("mouseover");
    hList.forEach((option, index) => {
      homePage.listOfHoverEl
        .eq(index)
        .should("be.visible")
        .and("have.text", option);
    });
  });
  it("iFrame Test", () => {
    homePage.iframe.then(($iframe) => {
      const body = $iframe.contents().find("body");
      cy.wrap(body).as("iframe");
    });
    cy.get("@iframe").find("#menu-item-100599").should("be.visible");
  });
});
