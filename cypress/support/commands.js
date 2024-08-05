
















////////////////////
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

//declarando variaveis
var ativar = '.active > a'
var email1 = '#email'
var senha   = '#password'
var passwordconfin ='#confirmPassword'
var code = '#confirmationCode'

// cypress/support/commands.js

Cypress.Commands.add('fillSignupFormAndSubmit', (email, password) => {
    cy.intercept('GET', '**/notes').as('getNotes')//aqui e aonde o intecept fica esperando requisiçoes que termina com note
    cy.visit('/signup')//aqui onde ele vai visitar
    cy.get(ativar).click();
    cy.get(email1).type(email)
    cy.get(senha).type(password, { log: false })
    cy.get(passwordconfin).type(password, { log: false })
    cy.contains('button', 'Signup').click()
    cy.get(code).should('be.visible')
    cy.mailosaurGetMessage(Cypress.env('MAILOSAUR_SERVER_ID'), {
      sentTo: email
    }).then(message => {
      const confirmationCode = message.html.body.match(/\d{6}/)[0]
      cy.get('#confirmationCode').type(`${confirmationCode}{enter}`)
      cy.wait('@getNotes')
    })
  })

// cypress/support/commands.js

// ... Comando de signup aqui

 var nth = ':nth-child(2) > a'
Cypress.Commands.add('guiLogin', (
  username = Cypress.env('USER_EMAIL'),
  password = Cypress.env('USER_PASSWORD')
) => {
  cy.intercept('GET', '**/notes').as('getNotes')
  cy.visit('/login')
  cy.get(nth).click()
  cy.get(email1).type(username)
  cy.get(senha).type(password, { log: false })
  cy.contains('button', 'Login').click()
  cy.wait('@getNotes', { timeout: 10000 }); // Espera até 10 segundos

  cy.contains('h1', 'Your Notes').should('be.visible')
})

Cypress.Commands.add('sessionLogin', (
  
  username = Cypress.env('USER_EMAIL'),
  password = Cypress.env('USER_PASSWORD')
) => {
  const login = () => cy.guiLogin(username, password)
  cy.session(username, login)
})

  // cypress/support/commands.js
 /* cy.get('body').then($body => {
    if ($body.find('#content').length > 0) {
      cy.log('Elemento #content encontrado');
    } else {
      cy.log('Elemento #content NÃO encontrado');
    }
  });*/
// Outros comands aqui ...

const attachFileHandler = () => {
  cy.get('#file').selectFile('cypress/fixtures/example.json')
}
Cypress.Commands.add('createNote', (note, attachFile = false) => {
  cy.visit('/notes/new')
  cy.get('#content').type(note)

  if (attachFile) {
    attachFileHandler()
  }

  cy.contains('button', 'Create').click()

  cy.contains('.list-group-item', note).should('be.visible')
})

Cypress.Commands.add('editNote', (note, newNoteValue, attachFile = false) => {
  cy.intercept('GET', '**/notes/**').as('getNote')

  cy.contains('.list-group-item', note).click()
  cy.wait('@getNote')

  cy.get('#content')
    .as('contentField')
    .clear()
  cy.get('@contentField')
    .type(newNoteValue)

  if (attachFile) {
    attachFileHandler()
  }

  cy.contains('button', 'Save').click()

  cy.contains('.list-group-item', newNoteValue).should('be.visible')
  cy.contains('.list-group-item', note).should('not.exist')
})


Cypress.Commands.add('editNote', (note, newNoteValue, attachFile = false) => {
  cy.intercept('GET', '**/notes/**').as('getNote')

  cy.contains('.list-group-item', note).click()
  cy.wait('@getNote')

  
  cy.get('#content')
    .as('contentField')
    .clear()
  cy.get('@contentField')
    .type(newNoteValue)

  if (attachFile) {
    attachFileHandler()
  }

  cy.contains('button', 'Save').click()

  cy.contains('.list-group-item', newNoteValue).should('be.visible')
  cy.contains('.list-group-item', note).should('not.exist')
})

Cypress.Commands.add('deleteNote', note => {
  cy.contains('.list-group-item', note).click()
  cy.contains('button', 'Delete').click()

  cy.get('.list-group-item')
    .its('length')
    .should('be.at.least', 1)
  cy.contains('.list-group-item', note)
    .should('not.exist')
})