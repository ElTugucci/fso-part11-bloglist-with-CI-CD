describe('Blog app', function () {
  beforeEach(function () {
    cy.request({
      method: 'POST',
      url: 'http://localhost:5001/api/testing/reset',
      allowOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(204)
    })

    const matti = {
      name: 'Matti Luukkainen',
      username: 'mlukkai',
      password: 'salainen',
    }

    cy.request('POST', `${Cypress.env('BACKEND')}/users`, matti)

    const arto = {
      name: 'Arto Hellas',
      username: 'hellas',
      password: 'salainen',
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, arto)
    cy.visit('')
  })

  it('Login form is shown', function () {
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('mlukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('mlukkai')
      cy.get('#password').type('wrong password')
      cy.get('#login-button').click()
      cy.get('.error').should('contain', 'invalid username or password')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'mlukkai', password: 'salainen' })
    })

    it('A blog can be created', function () {
      cy.createBlog({
        title: 'new blog by cypress',
        author: 'new author by cypress',
        url: 'new url by cypress',
      })

      cy.contains('new blog by cypress')
    })

    it('user can like the blog', function () {
      cy.createBlog({
        title: 'another blog by cypress',
        author: 'another author by cypress',
        url: 'another url by cypress',
      })
      cy.contains('another blog by cypress')
      cy.contains('another blog by cypress').click()
      cy.contains('like').click()
      cy.contains('1')
    })

    it('user who created the blog can delete it', function () {
      cy.createBlog({ title: 'new blog', author: 'author', url: 'http://remove.com' })

      cy.contains('new blog').should('be.visible')

      cy.contains('new blog').click()

      cy.on('window:confirm', (text) => {
        expect(text).to.contain('Do you want to delete')
        return true
      })

      cy.contains('delete').click()
      cy.wait(1000)
      cy.contains('new blog').should('not.exist')
    })
  })

  describe('make sure that only creator of the note can see the delete button', function () {
    beforeEach(function () {
      cy.login({ username: 'mlukkai', password: 'salainen' })
      cy.createBlog({ title: 'blog by mlukkai', author: 'mlukkai', url: 'http://mlukkai.fi' })
      cy.contains('logout').click()
    })
    it('user who did not create the blog can not see the delete button', function () {
      cy.login({ username: 'hellas', password: 'salainen' })
      cy.contains('blog by mlukkai').click()
      cy.get('.delete').should('not.exist')
      cy.contains('logout').click()
    })
  })

  describe('test that blogs are ordered according to the number of likes', function () {
    beforeEach(function () {
      cy.login({ username: 'mlukkai', password: 'salainen' })
      cy.createBlog({ title: 'blog 1', author: 'mlukkai', url: 'http://mlukkai.fi', likes: 2 })
      cy.createBlog({ title: 'blog 2', author: 'mlukkai', url: 'http://mlukkai.fi', likes: 3 })
      cy.createBlog({ title: 'blog 3', author: 'mlukkai', url: 'http://mlukkai.fi', likes: 5 })
      cy.createBlog({ title: 'blog 4', author: 'mlukkai', url: 'http://mlukkai.fi', likes: 8 })
    })

    it('ordered by likes', function () {
      cy.get('.blogDiv').eq(0).contains('blog 4')
      cy.get('.blogDiv').eq(1).contains('blog 3')
      cy.get('.blogDiv').eq(2).contains('blog 2')
      cy.get('.blogDiv').eq(3).contains('blog 1')
    })
  })
})
