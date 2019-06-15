describe('Auth spec', function() {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
    });
    it('Logs in with proper credentials', () => {
        cy.get('#username').type('ennamel');
        cy.get('#password').type('kala');
        cy.get('#loginButton').click();
        cy.get('.App-header').should($header => {
            expect($header).to.contain('ennamel');
        });
    });
    it('Doesnt log with improper credentials', () => {
        cy.get('#username').type('asdasd');
        cy.get('#password').type('weqweqw');
        cy.get('#loginButton').click();
        cy.get('.App-header').should($header => {
            expect($header).to.contain('password');
        });
    });
    it('Can log in and log out', () => {
        cy.get('#username').type('ennamel');
        cy.get('#password').type('kala');
        cy.get('#loginButton').click();
        cy.get('.App-header').should($header => {
            expect($header).to.contain('ennamel');
        });
        cy.get('#logoutButton').click();
        cy.get('.App-header').should($header => {
            expect($header).to.contain('password');
        });
    });
});
