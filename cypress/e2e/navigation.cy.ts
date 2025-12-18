describe('IFTS 14 - Smoke test', () => {
  it('muestra la home con secciones clave', () => {
    cy.visit('/');
    cy.contains('Formaci').should('exist');
    cy.contains('Actualidad').should('exist');
    cy.contains('Preguntas frecuentes').should('exist');
  });

  it('permite navegar a Noticias y ver el listado', () => {
    cy.visit('/');
    cy.get('a[routerlink="/noticias"]').first().click();
    cy.url().should('include', '/noticias');
    cy.get('app-lista-noticias').should('exist');
  });

  it('envia el formulario de contacto', () => {
    cy.intercept('POST', '**/api/contacto/create.php', {
      statusCode: 201,
      body: { error: false, message: 'ok' }
    }).as('contacto');

    cy.visit('/contactanos');
    cy.get('input[formcontrolname="fullnameControl"]').type('Juan Perez');
    cy.get('input[formcontrolname="emailControl"]').type('juan@example.com');
    cy.get('input[formcontrolname="telControl"]').type('1155551234');
    cy.get('textarea[formcontrolname="comentControl"]').type('Consulta automatica de Cypress');

    cy.contains('Enviar consulta').click();
    cy.wait('@contacto');
  });
});
