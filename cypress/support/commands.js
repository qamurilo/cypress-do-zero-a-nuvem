Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (data = {
    firstName: 'Murilo',
    lastName: 'Frederico Teixeira',
    email: 'testeqa@tst.com.br',
    text: 'Olá, sou o Murilo'
}) => {
    cy.get('#firstName').type(data.firstName)
    cy.get('#lastName').type(data.lastName)
    cy.get('#email').type(data.email)
    cy.get('#open-text-area').type(data.text)
    cy.contains('button', 'Enviar').click()
})






