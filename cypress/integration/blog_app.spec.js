/* eslint-disable no-undef */
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'King James',
      username: 'testaaja',
      password: 'baller23'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('Blog application')
  })

  it('login form is shown and can be opened', function() {
    cy.contains('log in to application')
    cy.contains('login').click()
  })

  describe('login', function(){
    it('succeeds with correct credentials', function(){
      cy.get('#username').type('testaaja')
      cy.get('#password').type('baller23')
      cy.get('#loginbutton').click()
      cy.contains('King James logged in')
    })

    it('fails with incorrect credentials and gives error message', function(){
      cy.get('#username').type('foo')
      cy.get('#password').type('bar')
      cy.get('#loginbutton').click()
      cy.contains('wrong username or password')
    })
  })

  describe.only('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('testaaja')
      cy.get('#password').type('baller23')
      cy.get('#loginbutton').click()
    })

    it('blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('foo')
      cy.get('#author').type('bar')
      cy.get('#url').type('https://baz.fi')
      cy.get('#create').click()
      cy.contains('foo bar')
    })
  })
})


