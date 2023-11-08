class Login {
  elements = {
    userName: () => cy.getByCy("sername"), //here I ignor the first letter of username to avoid the system crash when something changes
    password: () => cy.getByCy("assword"),  //here I ignor the first letter of password to avoid the system crash when something changes
    loginBTN: () => cy.get("[type=submit]"),

  };

  loginFunction(userName: string, password: string) {
    this.elements.userName().type(userName),
    this.elements.password().type(password),
    this.elements.loginBTN().click({ force: true });
  }
}

export default Login;
