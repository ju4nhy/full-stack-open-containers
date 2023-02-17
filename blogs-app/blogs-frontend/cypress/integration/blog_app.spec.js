// 5.17
describe('Blog ', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'juanhy',
      name: 'Juha H',
      password: '1234'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('Blogs App')
    cy.contains('login')
  })

  it('login form can be shown', function() {
    cy.contains('login').click()
  })

  // 5.18 Login
  describe('Login', function () {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('juanhy')
      cy.get('#password').type('1234')
      cy.get('#login-button').click()
      cy.contains('juanhy logged in')
    })

    it('fails with the wrong credentials and error message background is red', function() {
      cy.contains('login').click()
      cy.get('#username').type('juanhy')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.get('.error').should('contain', 'Wrong username or password')
      cy.get('.error').should('have.css', 'background-color', 'rgb(255, 0, 0)')
      cy.get('html').should('not.contain', 'juanhy logged in')
    })
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'juanhy', password: '1234' })
      cy.createBlog({ title: 'Cypress test blog', author: 'juanhy', url: 'http://testurl.test' })
        .createBlog({ title: 'Second cypress test blog', author: 'juanhy', url: 'http://testurl.testtest' })
        .createBlog({ title: 'Third cypress test blog', author: 'juanhy', url: 'http://testurl.testtesttest' })
    })

    // 5.19 Create blog
    it('a new blog can be created', function() {
      cy.contains('New blog').click()
      cy.get('#title').type('Fourth cypress test blog')
      cy.get('#author').type('cypress')
      cy.get('#url').type('http://testurlurlurlurl')
      cy.contains('Save').click()
      cy.contains('Fourth cypress test blog')
    })

    // 5.20 Add like
    it('a blog can be liked', function() {
      cy.contains('cypress test blog')
        .get('#blog').contains('View').click()

      cy.contains('Likes: 0')
        .get('#like-button').contains('Like').click()

      cy.contains('Likes: 1')
    })

    // 5.21 Deleting the second blog
    it('a blog can be deleted by its author', function() {
      cy.get('#blog').next()
        .contains('Second cypress test blog')

      cy.get('button').then(buttons => {
        cy.wrap(buttons[5]).click() // cy.contains('View') did not work for this
        cy.contains('Delete').click()
      })

      cy.get('#blog').next().should('not.contain', 'Second cypress test blog')
    })

    // 5.22 Blogs order by likes
    it('blogs are ordered by likes', function() {
      // Click all 'View' buttons and ensure every blog has 0 likes at start and there is no blogs liked 1 or 2 times
      cy.get('.view-button').click({ multiple: true })
      cy.get('li:contains(Likes: 0)').should('have.length', 3)
      cy.get('html').should('not.contain', 'Likes: 1').should('not.contain', 'Likes: 2')
      // Like the 'Third cypress test blog' two times and 'Cypress test blog' once
      cy.get('button').then(buttons => {
        cy.wrap(buttons[11]).click()  // third cypress test blog
        cy.contains('Likes: 1')
        cy.wrap(buttons[5]).click() // third cypress test blog
        cy.contains('Likes: 2')
        cy.wrap(buttons[8]).click() // cypress test blog: 1 like
        cy.contains('Likes: 1')
      })
      // Ensure there are now blogs liked 0, 1 and 2 times
      cy.get('li:contains(Likes: 0)').should('have.length', 1)
      cy.get('li:contains(Likes: 1)').should('have.length', 1)
      cy.get('li:contains(Likes: 2)').should('have.length', 1)
      // and blogs are ordered by likes (most likes first)
      cy.get('#blog').should('contain', 'Likes: 2')
        .next().should('contain', 'Likes: 1')
        .next().should('contain', 'Likes: 0')
    })
  })
})