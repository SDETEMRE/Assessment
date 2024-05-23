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
    homePage.chooseFileBtn.should("be.enabled").and("be.visible");
    homePage.uploadFile(uploadedImage);
    homePage.uploadedImage.should("have.attr", "src");
  });

  it("Open New Tab Test", () => {
    const url = data.openNewtab;
    cy.getNewTabUrl(homePage.openNewTabBtn);
    cy.get("@windowOpen").should("have.been.called");
    cy.url().should("eq", url);
  });

  it("Alert Test", () => {
    const name = data.name;
    cy.alertAlertBtn(name);
    cy.alertConfirmBtn(name);
    cy.readAlertTextFromFile().then((alertText) => {
      cy.log("Alert Text:", alertText);
      cy.window().then((win) => {
        cy.stub(win, "alert").as("alertStub");
        cy.then(() => {
          win.alert(alertText);
          cy.get("@alertStub").should("be.calledWith", alertText);
        });
      });
    });
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
    const { tabs } = data.iframe;
    homePage.iframe.then(($iframe) => {
      const body = $iframe.contents().find("body");
      cy.wrap(body).as("iframe");
    });
    cy.get("@iframe").find("#menu-item-100599").should("be.visible");
    cy.get("@iframe").each(($el, index, list) => {
      cy.wrap($el).invoke("text").should("contain", tabs[index]);
    });
  });
});
