


describe('Login', () => {//funcao de callback
    it('successfully logs in', () => {  
      cy.visit('/login')//visitando a pagina
            cy.get('.nav > :nth-child(2) > a').click()//clicando no elmento

      cy.get('#email').type(Cypress.env('USER_EMAIL'))//chamadno o arquivo da pastra cypress.env aqui ele vai trazer o email
      cy.get('#password').type(Cypress.env('USER_PASSWORD'), { log: false })//chamadno o arquivo da pastra cypress.env aqui ele vai trazer a senha mascarando
      cy.contains('button', 'Login').click() // dando click apos preenche os campos email e senha
      cy.wait(1700)
      cy.contains('h1', 'Your Notes').should('be.visible')
      cy.contains('a', 'Create a new note').should('be.visible')
    })
  })

  
