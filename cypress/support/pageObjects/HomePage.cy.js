class HomePage {
  get dropDownBtn() {
    return cy.get("#dropdown-class-example");
  }
  get chooseFileBtn() {
    return cy.get(".image-upload-wrapper > input");
  }
  get uploadedImage() {
    return cy.get("img");
  }
  get openNewTabBtn() {
    return cy.get("#opentab");
  }
  get nameField() {
    return cy.get("#name");
  }
  get alertBtn() {
    return cy.get("#alertbtn");
  }
  get confirmBtn() {
    return cy.get("#confirmbtn");
  }
  get hideBtn() {
    return cy.get("#hide-textbox");
  }
  get showBtn() {
    return cy.get("#show-textbox");
  }
  get showHideInputField() {
    return cy.get("#displayed-text");
  }
  get mouseHoverBtn(){
    return cy.get('.hover-container > .btn');
  }
  uploadFile(file) {
    this.chooseFileBtn.selectFile(file);
  }
  textYourName(name) {
    this.nameField.type(name);
  }
}
export default HomePage;
