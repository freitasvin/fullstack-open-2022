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

        cy.contains('Testing with cypress - Cypress')
          .parent()
          .find('button')
          .as('view-button')
      })

      it('users can like a blog', function() {
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

      it('user who created a blog can delete it', function() {
        cy.get('@view-button').click()

        cy.get('@view-button')
          .parent()
          .get('#remove-button')
          .click()

        cy.get('.blog').should('not.exist')
      })

      it('other users but the creator do not see the delete button', function() {
        const newUser = {
          name: 'Another User',
          username: 'havenoblogs',
          password: 'havenoblogs'
        }
        cy.request('POST', `${Cypress.env('EXTERNAL_API')}/users`, newUser)

        cy.get('#logout-button').click

        cy.login({ username: 'havenoblogs', password: 'havenoblogs' })

        cy.get('@view-button').click()

        cy.get('@view-button')
          .parent()
          .get('#remove-button')
          .should('not.exist')
      })
    })
    describe('Blogs ordered by number of likes', function() {
      it('they are ordered by number of likes', function() {
        cy.createBlog({ author: 'Vinicius Freitas', title: 'blog1', url: 'http://localhost:3000/example/blog1' })
        cy.createBlog({ author: 'Vinicius Freitas', title: 'blog2', url: 'http://localhost:3000/example/blog2' })
        cy.createBlog({ author: 'Vinicius Freitas', title: 'blog3', url: 'http://localhost:3000/example/blog3' })

        cy.contains('blog1').parent().parent().as('blog1')
        cy.contains('blog2').parent().parent().as('blog2')
        cy.contains('blog3').parent().parent().as('blog3')

        cy.get('@blog1').contains('view').click()
        cy.get('@blog2').contains('view').click()
        cy.get('@blog3').contains('view').click()

        cy.get('@blog1').contains('like').as('like1')
        cy.get('@blog2').contains('like').as('like2')
        cy.get('@blog3').contains('like').as('like3')

        cy.get('@like2').click()
        cy.wait(500)
        cy.get('@like1').click()
        cy.wait(500)
        cy.get('@like1').click()
        cy.wait(500)
        cy.get('@like3').click()
        cy.wait(500)
        cy.get('@like3').click()
        cy.wait(500)
        cy.get('@like3').click()
        cy.wait(500)

        cy.get('.blog').then(blogs => {
          cy.wrap(blogs[0]).contains('likes: 3')
          cy.wrap(blogs[1]).contains('likes: 2')
          cy.wrap(blogs[2]).contains('likes: 1')
        })
      })
    })
  })
})