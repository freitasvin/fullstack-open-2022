describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('EXTERNAL_API')}/testing/reset`)
    const newUser = {
      name: 'cypress',
      username: 'cypress',
      password: 'cypress'
    }
    cy.request('POST', `${Cypress.env('EXTERNAL_API')}/users`, newUser)
    cy.visit('')
  })

  it('Login form is shown', function() {
    cy.contains('log in').click()

    cy.get('#username')
    cy.get('#password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('log in').click()

      cy.get('#username').type('cypress')
      cy.get('#password').type('cypress')
      cy.get('#login-button').click()

      cy.contains('logout')
    })

    it('fails with wrong credentials', function() {
      cy.contains('log in').click()

      cy.get('#username').type('jest')
      cy.get('#password').type('jest')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'cypress', password: 'cypress' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()

      cy.get('#title').type('Testing with cypress')
      cy.get('#author').type('Cypress')
      cy.get('#url').type('http://localhost:3000')

      cy.get('#create-button').click()

      cy.get('.success')
        .should('contain', 'A new blog Testing with cypress by Cypress added')
        .and('have.css', 'color', 'rgb(0, 128, 0)')

      cy.contains('Testing with cypress - Cypress')
    })

    describe('When create a blog', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'Testing with cypress',
          author: 'Cypress',
          url: 'localhost:3000',
        })
      })

      it('users can like a blog', function() {
        cy.contains('Testing with cypress - Cypress')
          .parent()
          .find('button')
          .as('view-button')

        cy.get('@view-button').click()

        cy.get('@view-button')
          .parent()
          .get('#like-button')
          .click()

        cy.contains('The blog was successfully updated')

        cy.get('@view-button')
          .parent()
          .should('contain', 'likes: 1')
      })
    })
  })
})