import assert from "assert";

class RegisterForm {
  elements = {
    titleInput: () => cy.get("#title"),
    titleFeedback: () => cy.get("#titleFeedback"),
    imageUrlInput: () => cy.get("#imageUrl"),
    urlFeedback: () => cy.get("#urlFeedback"),
    buttonSubmit: () => cy.get("#btnSubmit"),
  };

  typeTitle(text) {
    if (!text) return;
    this.elements.titleInput().type(text);
  }

  typeUrl(text) {
    if (!text) return;
    this.elements.imageUrlInput().type(text);
  }

  clickButtonSubmit() {
    this.elements.buttonSubmit().click();
  }

  checkTitle() {
    this.elements
      .titleFeedback()
      .should("contains.text", "Please type a title for the image.");
  }

  checkUrl() {
    this.elements
      .urlFeedback()
      .should("contains.text", "Please type a valid URL");
  }

  checkIconInInput() {
    this.elements.titleInput().should(([element]) => {
      const styles = window.getComputedStyle(element);
      const border = styles.getPropertyValue("border-right-color");
      assert.strictEqual(border, colors.errors);
    });
  }
}

const registerForm = new RegisterForm();
const colors = {
  errors: "rgb(220, 53, 69)",
};

describe("Registro de Imagem", () => {
  describe("Enviando uma imagem com entradas inválidas", () => {
    after(() => {
      cy.clearAllLocalStorage();
    });

    const input = {
      title: "",
      url: "",
    };

    it("Dado que estou na página de registro de imagens", () => {
      cy.visit("/");
    });

    it(`Quando eu insiro "${input.title}" no campo de título`, () => {
      registerForm.typeTitle(input.title);
    });

    it(`Então eu insiro "${input.url}" no campo URL`, () => {
      registerForm.typeUrl(input.url);
    });

    it("Então clico no botão enviar", () => {
      registerForm.clickButtonSubmit();
    });

    it(`Então devo ver a mensagem "Please type a title for the image." acima do campo de título`, () => {
      registerForm.checkTitle();
    });

    it(`E devo ver a mensagem "Please type a valid URL" acima do campo imageUrl`, () => {
      registerForm.checkUrl();
    });

    it("E devo ver um ícone de exclamação nos campos de título e URL", () => {
      registerForm.checkIconInInput();
    });
  });
});
