/// <reference types="cypress" />

describe('Страница "Конструктор"', () => {
  beforeEach(() => {
    cy.visit('/ingredients');

    cy.window().then((win) => {
      win.localStorage.setItem('accessToken', 'тестовый_токен');
    });

    cy.get('[data-test=ingredient-card]', { timeout: 10000 }).should('exist');
  });

  it('Перетаскивание ингредиента', () => {
    cy.get('[data-test=ingredient-card]').first().trigger('dragstart');
    cy.get('[data-test=constructor-drop-area]').trigger('drop');
  });

  it('Оформление заказа', () => {
    cy.get('[data-test=ingredient-card]').first().trigger('dragstart');
    cy.get('[data-test=constructor-drop-area]').trigger('drop');

    cy.get('[data-test=order-button]').click();
  });
  it('Закрытие модалки', () => {
    cy.get('[data-test=ingredient-card]').first().trigger('dragstart');
    cy.get('[data-test=constructor-drop-area]').trigger('drop');
    cy.get('[data-test=order-button]').click();
    cy.get('[data-test=modal-close]').click();
    cy.get('[data-test=order-modal]').should('not.exist');
  });
});
