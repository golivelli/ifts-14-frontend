describe('Panel administrativo', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/anuncios/index.php*', { fixture: 'anuncios.json' }).as('getAnuncios');
    cy.intercept('GET', '**/api/contacto/index.php', { fixture: 'contactos.json' }).as('getContactos');
    cy.intercept('PUT', '**/api/anuncios/update.php', { body: { success: true } }).as('updateAnuncio');
  });

  it('muestra el tablero del panel', () => {
    cy.visit('/admin-ifts14');
    cy.get('h1').should('contain.text', 'Panel de');
    cy.contains('Gestionar Novedades').should('exist');
  });

  it('muestra la lista de anuncios en la vista de novedades', () => {
    cy.visit('/admin-ifts14/novedades');
    cy.wait('@getAnuncios');
    cy.contains('Publicar').should('exist');
  });

  it('permite publicar un anuncio (simulado)', () => {
    cy.visit('/admin-ifts14/novedades');
    cy.wait('@getAnuncios');
    cy.contains('Publicar').first().click();
    cy.wait('@updateAnuncio');
  });

  it('carga el listado de consultas de contacto', () => {
    cy.visit('/admin-ifts14/contactos');
    cy.wait('@getContactos');
    cy.contains('Consultas de contacto').should('exist');
    cy.contains('Maria Gomez').should('exist');
  });
});
