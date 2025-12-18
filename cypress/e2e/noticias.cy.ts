describe('Noticias page', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/anuncios/index.php*', {
      fixture: 'anuncios.json'
    }).as('getAnuncios');
  });

  it('shows the filterable list', () => {
    cy.visit('/noticias');
    cy.wait('@getAnuncios');
    cy.contains('Novedades').should('exist');
    cy.get('app-lista-noticias').should('exist');
    cy.get('a[href^="/noticias/"]').should('have.length.greaterThan', 0);
  });

  it('allows opening the detail view', () => {
    cy.fixture('anuncios.json').then((anuncios) => {
      const first = anuncios[0];
      cy.intercept('GET', '**/api/anuncios/get.php?id=*', {
        body: first
      }).as('getDetalle');

      cy.visit('/noticias');
      cy.wait('@getAnuncios');
      cy.get('a[href^="/noticias/"]').first().click();
      cy.wait('@getDetalle');
      cy.url().should('include', '/noticias/');
      cy.contains(first.titulo).should('exist');
    });
  });
});
