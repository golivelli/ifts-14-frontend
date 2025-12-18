describe('Public pages IFTS 14', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/anuncios/index.php*', {
      fixture: 'anuncios.json'
    }).as('getAnuncios');
  });

  it('shows the home hero, actualidad and FAQ blocks', () => {
    cy.visit('/');
    cy.wait('@getAnuncios');
    cy.get('app-hero-section').should('exist');
    cy.get('app-academy-section').should('exist');
    cy.get('app-frequently-asked').should('exist');
  });

  it('navigates to Instituto and Tecnicaturas', () => {
    cy.visit('/');
    cy.contains('Instituto').click();
    cy.url().should('include', '/instituto');
    cy.get('app-mission-vision').should('exist');

    cy.contains('Tecnicaturas').click();
    cy.url().should('include', '/tecnicaturas');
    cy.get('app-section-tecnicaturas').should('exist');
  });

  it('opens Estudiantes and renders support content', () => {
    cy.visit('/estudiantes');
    cy.get('app-support-and-guidance').should('exist');
  });
});
