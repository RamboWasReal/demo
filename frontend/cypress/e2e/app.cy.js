describe('Navigation', () => {
    it('should navigate to events list', () => {
        cy.visit('http://localhost:3000/')
        cy.get('a[href*="create"]').click()

        cy.visit('http://localhost:3000/events')
        cy.get('h1').contains('Event List')
    })
})
describe('Create Form', () => {
    it('should navigate to create event and redirect to events list', () => {
        cy.visit('http://localhost:3000/events/create')

        cy.get('#name').type('Test Event')
        cy.get('#description').type('Test Description')
        cy.get('#start_at').type('2024-06-01T08:30')
        cy.get('#end_at').type('2024-06-01T09:30')

        cy.get('#createForm').submit()

        cy.location('pathname').should('eq', '/events')
    })
    it('should test name validation', () => {
        cy.visit('http://localhost:3000/events/create')
        cy.get('#start_at').type('2023-06-01T08:30')
        cy.get('#end_at').type('2237-06-01T09:30')
        cy.get('#description').type('Test Description')

        cy.get('#createForm').submit()
        cy.get('#name').then(($input) => {
            expect($input[0].validationMessage).to.eq('Please fill out this field.')
        })
    })
    it('should test description validation', () => {
        cy.visit('http://localhost:3000/events/create')
        cy.get('#name').type('Test event')
        cy.get('#start_at').type('2024-06-01T08:30')
        cy.get('#end_at').type('2024-06-01T09:30')

        cy.get('#createForm').submit()
        cy.get('#description').then(($input) => {
            expect($input[0].validationMessage).to.eq('Please fill out this field.')
        })
    })
})
