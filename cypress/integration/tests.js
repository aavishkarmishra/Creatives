/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe('Creatives Tests', () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit('http://127.0.0.1:8080/');
  });

  it('Checking the required components ', () => {
    // We use the `cy.get()` command to get all elements that match the selector.
    // Then, we use `should` to assert that there are two matched items,
    // which are the two default items.
    cy.get('.filters .colors');
    cy.get('.filters input');
    cy.get('.progress');
    cy.get('button#addCreative');
    cy.get('#creatives');
    cy.get('.drawer');
  });
  it('Adding Creatives', () => {
    cy.get('button#addCreative').click();
    cy.get('form #title').type('This is title!');
    cy.get('form #subtitle').type('This is subtitle!');
    cy.get('form input.radio').first().click();
    cy.get('form button').click();
    cy.get('#progressAria').contains('1/5 Creatives');
    cy.get('#creatives').children().should('have.length', 1);
  });
  it('Maximum Creatives', () => {
    for (let i = 0; i < 6; i++) {
      cy.get('button#addCreative').click();
      cy.get('form #title').type('This is title!');
      cy.get('form #subtitle').type('This is subtitle!');
      cy.get('form input.radio').first().click();
      cy.get('form button').click();
    }
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Max number of creatives have been created`);
    });
  });
  it('Color Filter Check', () => {
    for (let i = 0; i < 2; i++) {
      cy.get('button#addCreative').click();
      cy.get('form #title').type('This is title!');
      cy.get('form #subtitle').type('This is subtitle!');
      cy.get('form input.radio').first().click();
      cy.get('form button').click();
    }
    cy.get('.checkbox').first().click();
    cy.wait(500);
    cy.get('#creatives').children().first().should('not.be.visible');
  });
  it('Text Filter Check 1', () => {
    cy.get('button#addCreative').click();
    cy.get('form #title').type('1');
    cy.get('form #subtitle').type('This is subtitle!');
    cy.get('form input.radio').first().click();
    cy.get('form button').click();
    cy.get('button#addCreative').click();
    cy.get('form #title').type('2');
    cy.get('form #subtitle').type('This is subtitle!');
    cy.get('form input.radio').first().click();
    cy.get('form button').click();
    cy.get('.checkbox').first().click();
    cy.get('#filtertxt').type('1');
    cy.wait(500);
    cy.get('#creatives').children().first().should('not.be.visible');
    cy.get('#creatives').children().last().should('not.be.visible');
  });
  it('Text Filter Check 2', () => {
    cy.get('button#addCreative').click();
    cy.get('form #title').type('1');
    cy.get('form #subtitle').type('This is subtitle!');
    cy.get('form input.radio').first().click();
    cy.get('form button').click();
    cy.get('button#addCreative').click();
    cy.get('form #title').type('2');
    cy.get('form #subtitle').type('This is subtitle!');
    cy.get('form input.radio').first().click();
    cy.get('form button').click();
    cy.get('.checkbox').first().click();
    cy.get('#filtertxt').type('2');
    cy.wait(500);
    cy.get('#creatives').children().first().should('not.be.visible');
    cy.get('#creatives').children().last().should('be.visible');
  });
});
