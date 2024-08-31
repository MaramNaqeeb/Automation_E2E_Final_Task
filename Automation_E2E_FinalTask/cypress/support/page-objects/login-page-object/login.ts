
class Login {
  elements = {
    userName: () => cy.getByCy("sername"), //here I ignor the first letter of username to avoid the system crash when something changes
    password: () => cy.getByCy("assword"), //here I ignor the first letter of password to avoid the system crash when something changes
    loginBTN: () => cy.get("[type=submit]"),
  };

  typeUserName(userName: string) {
    this.elements.userName().type(userName);
  }

  typePassword(password: string) {
    this.elements.password().type(password);
  }

  clickLoginButton() {
    this.elements.loginBTN().invoke("show").click();
  }

  loginFunction(userName: string, password: string) {
    cy.visit('/')
    this.typeUserName(userName);
    this.typePassword(password);
    this.clickLoginButton();
  }

}
export default Login;

