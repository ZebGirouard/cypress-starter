describe("characterSearch", () => {
  it("tests characterSearch", () => {
    cy.viewport(1792, 447);

    cy.visit("http://localhost:3000/");

    cy.get("#root > div > form > div > div:nth-child(2) > input").click();

    cy.get("#root > div > form > div > div:nth-child(2) > input").type("skywalker{enter}");

    cy.get(".results").should("contain", "Luke Skywalker");

    cy.get(".results .result").as("result");

    cy.get("@result").should("have.length", 3);

    cy.get("@result").each(($item) => {
      expect($item.text())
        .to.include("Height")
        .and.to.include("Mass")
        .and.to.include("Link");
      expect($item.find("a").attr("href")).to.include("https://swapi.dev/api/people/");
    });
  });
});
