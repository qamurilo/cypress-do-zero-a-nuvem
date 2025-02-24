describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('Verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
 
  })

  it('Preencha os campos obrigatórios e envia o formulário', () => {

    const longText = Cypress._.repeat('Olá Olá Olá',10)
    cy.clock()

    cy.get('#firstName').type('Murilo')
    cy.get('#lastName').type('Frederico Teixeira')
    cy.get('#email').type('murilo.teixeira@edu.unipar.br')
    cy.get('#open-text-area').type(longText, {delay:0})
    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')

    cy.tick(3000)

    cy.get('.success').should('not.be.visible')

  })

  it.only('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.clock()

    cy.get('#firstName').type('Murilo')
    cy.get('#lastName').type('Frederico Teixeira')
    cy.get('#email').type('murilo.teixeira@edu.unipar.br,com')
    cy.get('#email-checkbox').check()
    cy.get('#open-text-area').type('Muito obrigado , estou gostando bastante do conteúdo de vocês, nota 10!')
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')

    cy.tick(3000)

    cy.get('.error').should('not.be.visible')
  
  })
  it('Campo telefone continua vazio quando preenchido com um valor não-numérico', () => {
    cy.get('#phone')
      .type('ABCDE')
      .should('have.value','')

  })
  it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.clock()

    cy.get('#firstName').type('Murilo')
    cy.get('#lastName').type('Frederico Teixeira')
    cy.get('#email').type('murilo.teixeira@edu.unipar.br')
    cy.get('input[type="radio"][value="feedback"][name="atendimento-tat"]').click()
    cy.get('#open-text-area').type('Muito obrigado , estou gostando bastante do conteúdo de vocês, nota 10!')
    cy.get('#phone-checkbox').check()
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')

    cy.tick(3000)

    cy.get('.error').should('not.be.visible')

  })

  it('Preencha e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
      .type('Murilo')
      .should('have.value', 'Murilo')
      .clear()
      .should('have.value', '')
      cy.get('#lastName')
      .type('Frederico Teixeira')
      .should('have.value', 'Frederico Teixeira')
      .clear()
      .should('have.value', '')
      cy.get('#email')
      .type('murilo.teixeira@edu.unipar.br')
      .should('have.value', 'murilo.teixeira@edu.unipar.br')
      .clear()
      .should('have.value', '')
      cy.get('#phone')
      .type('44991692883')
      .should('have.value', '44991692883')
      .clear()
      .should('have.value', '')
  })

  it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.clock()

    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')

    cy.tick(3000)

    cy.get('.error').should('not.be.visible')
  })

  it('Envia o formulário com sucesso usando um comando customizado', () => {
    cy.clock()

    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible')

    cy.tick(3000)

    cy.get('.success').should('not.be.visible')

  })

  it('Seleciona um produto (Youtube) por seu texto', () => {
    cy.get('#product')
      .select('YouTube')
      .should('have.value','youtube')
  })
  
  it('Seleciona um produto (Mentoria) por seu valor (Value)', () => {
    cy.get('#product')
      .select('mentoria')
      .should('have.value','mentoria')
  })

  it('Seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product')
      .select(1)
      .should('have.value','blog')
  })

  it('Marca um tipo de atendimento "Feedback', () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('be.checked')
  })

  it('Marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
      .each(typeOfService => {
        cy.wrap(typeOfService)
          .check()
          .should('be.checked')
      }
    )
})

  it('Marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]')
       .check()
       .should('be.checked')
       .last()
       .uncheck()
       .should ('not.be.checked')
  })

  it('Seleciona um arquivo da pasta fixtures', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')

      }) 
  })

  it('Seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json', { action: 'drag-drop'})
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      }) 
  })

  it('Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as ('sampleFile')
    cy.get('#file-upload')
      .selectFile('@sampleFile')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
    }) 
  })

  it('Verifica que a política de privacidade abre em outra aba sem a necessidade de um cilque', () => {
    cy.contains('a', 'Política de Privacidade')
      .should('have.attr', 'href', 'privacy.html')
      .and('have.attr', 'target', '_blank')
  })

  it('Testa a página de política de privacidade de forma independente', () => {
    cy.contains('a', 'Política de Privacidade')
      .invoke('removeAttr','target')
      .click()

    cy.contains('h1', 'CAC TAT - Política de Privacidade')
      .should('be.visible')
  })
  it('exibe e oculta as mensagens de sucesso e erro usando .invoke()', () => {
    cy.get('.success')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.')
      .invoke('hide')
      .should('not.be.visible')
    cy.get('.error')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide')
      .should('not.be.visible')
  })

  it('Preenche o campo da área do texto usando o comando invoke', () => {
    cy.get('#open-text-area')
      .invoke('val', 'Um texto qualquer')
      .should('have.value', 'Um texto qualquer')
  })

  it('Faz uma requisição HTTP', () => {
     cy.request('https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html')
       .as('getRequest')
       .its('status')
       .should('be.equal', 200)
     cy.get('@getRequest')
       .its('statusText')
       .should('be.equal', "OK")
     cy.get('@getRequest')
       .its('body')
       .should('include', 'CAC TAT')  
  })

  it('Encontra o gato escondido', () => {
     cy.get('#cat')
       .invoke('show')  
       .should('be.visible')
     cy.get('#title')
       .invoke('text', 'CAT TAT')
     cy.get('#subtitle')
       .invoke('text', 'Eu ♥ Gatos')
 })

})
