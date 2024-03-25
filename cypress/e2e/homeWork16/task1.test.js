
describe('API Tests', () => {
    
    it('getting a resource', () =>{
        cy.api({ 
            url: `${Cypress.env('API_URL')}/posts/1`
        }).as("getPost")

        cy.get("@getPost").its('status').should('eq', 200)
        cy.get("@getPost").its('body.userId').should('eq', 1)
        cy.get("@getPost").its('body.body').should('be.a','string')
    })

    it('listing all resources', () =>{
        cy.api({ 
            url: `${Cypress.env('API_URL')}/posts`
        }).as('getList')

        cy.get('@getList').its('status').should('eq', 200)
        cy.get('@getList').its('body').each(obj => {expect(obj).to.have.all.keys('userId', 'id', 'title', 'body');})
    })

    it('creating a resource', ()=>{
        cy.api({
            url: `${Cypress.env('API_URL')}/posts`,
                method: 'POST',
                body: JSON.stringify({
                title: 'title new',
                body: 'body new',
                userId: 1
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
    }).as('createPost')
        cy.get('@createPost').its('status').should('eq', 201)
        cy.get('@createPost').its('body.body').should('equals', 'body new')
        cy.get('@createPost').its('body.title').should('equals', 'title new')
        cy.get('@createPost').its('body.userId').should('be.a','number')


    })

    it('updating a resource', ()=>{
        cy.api({
            url: `${Cypress.env('API_URL')}/posts/1`,
                method: 'PUT',
                body: JSON.stringify({
                    id : 1,
                    title: 'title update',
                    body: 'body update',
                    userId: 33
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
    }).as('updatePost')
        cy.get('@updatePost').its('status').should('eq', 200)
        cy.get('@updatePost').its('body.body').should('equals', 'body update')
        cy.get('@updatePost').its('body.userId').should('eq', 33)
    })

    it('Deleting a resource', ()=>{
        cy.api({
            url: `${Cypress.env('API_URL')}/posts/1`,
                method: 'DELETE'
    }).as('deletePost')
        cy.get('@deletePost').its('status').should('eq', 200)
        cy.get('@deletePost').its('body').should('be.empty')
    })

})