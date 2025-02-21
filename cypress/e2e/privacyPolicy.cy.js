Cypress._.times(3, () =>{
  it('Testa a página de política de privacidade de forma independente', () => {
    cy.visit('./src/privacy.html')

    cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')
    cy.contains('p', 'No entanto, a aplicação é um exemplo, sem qualquer persistência de dados, e usada para fins de ensino.').should('be.visible')
    cy.contains('p', 'Talking About Testing').should('be.vissible')
  })
})