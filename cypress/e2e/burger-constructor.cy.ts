/// <reference types="cypress" />
import '@4tw/cypress-drag-drop';

const extractName = (fullText: string) => fullText.replace(/\d+.*$/, '').trim();

describe('Страница "Конструктор"', () => {
  beforeEach(() => {
    cy.visit('/ingredients');

    cy.window().then((win) => {
      win.localStorage.setItem('accessToken', 'тестовый_токен');
    });

    cy.get('[data-test=ingredient-card]', { timeout: 10000 }).should('exist');
  });
  //Добавила перетаскивание из меню в конструктор, проверка соотвествия, перемещение элементов между собой, проверка, что все правильно
  it('Можно перетаскивать ингредиенты и менять их порядок по имени', () => {
    // Добавим 3 ингредиента
    const names: string[] = [];

    cy.get('[data-test=ingredient-card]')
      .eq(1)
      .invoke('text')
      .then((name1) => {
        names.push(name1.trim());
      })
      .then(() => {
        cy.get('[data-test=ingredient-card]').eq(1).trigger('dragstart');
        cy.get('[data-test=constructor-drop-area]').trigger('drop');
      });

    cy.get('[data-test=ingredient-card]')
      .eq(2)
      .invoke('text')
      .then((fullText) => {
        const nameOnly = extractName(fullText);
        names.push(nameOnly);
      })
      .then(() => {
        cy.get('[data-test=ingredient-card]').eq(2).trigger('dragstart');
        cy.get('[data-test=constructor-drop-area]').trigger('drop');
      });

    cy.get('[data-test=ingredient-card]')
      .eq(3)
      .invoke('text')
      .then((fullText) => {
        const nameOnly = extractName(fullText);
        names.push(nameOnly);
      })
      .then(() => {
        cy.get('[data-test=ingredient-card]').eq(3).trigger('dragstart');
        cy.get('[data-test=constructor-drop-area]').trigger('drop');
      });

    // Подождем, пока всё точно добавится
    cy.wait(500);

    // Проверка: имена в конструкторе соответствуют добавленным
    cy.get('[data-test=constructor-ingredient]').then(($before) => {
      const nameInConstructor0 = $before.eq(0).text().trim();
      const nameInConstructor1 = $before.eq(1).text().trim();

      // Проверим соответствие
      expect(nameInConstructor0).to.include(names[1]);
      expect(nameInConstructor1).to.include(names[2]);

      // DnD: второй на место первого
      cy.get('[data-test=constructor-ingredient]')
        .eq(1)
        .drag('[data-test=constructor-ingredient]:eq(0)');

      cy.wait(500);

      // Проверяем порядок после dnd
      cy.get('[data-test=constructor-ingredient]').then(($after) => {
        const new0 = $after.eq(0).text().trim();
        const new1 = $after.eq(1).text().trim();

        expect(new0).to.include(names[1]); // второй стал первым
        expect(new1).to.include(names[2]); // первый стал вторым
      });
    });
  });

  //добавила проверку контента модалки
  it('Оформление заказа отображает модалку с текстом подтверждения', () => {
    // Добавляем ингредиент
    cy.get('[data-test=ingredient-card]').first().trigger('dragstart');
    cy.get('[data-test=constructor-drop-area]').trigger('drop');

    // Кликаем на кнопку оформления
    cy.get('[data-test=order-button]').click();

    // Проверяем, что в модалке есть нужный текст
    cy.contains('идентификатор заказа').should('be.visible');
    cy.contains('Ваш заказ начали готовить').should('be.visible');
    cy.contains('Дождитесь готовности на орбитальной станции').should(
      'be.visible',
    );
  });

  //Добавила проверку контента модалки и ее закрытия
  it('Закрытие модалки', () => {
    cy.get('[data-test=ingredient-card]').first().trigger('dragstart');
    cy.get('[data-test=constructor-drop-area]').trigger('drop');
    cy.get('[data-test=order-button]').click();

    // Проверяем, что в модалке есть нужный текст
    cy.contains('идентификатор заказа').should('be.visible');
    cy.contains('Ваш заказ начали готовить').should('be.visible');
    cy.contains('Дождитесь готовности на орбитальной станции').should(
      'be.visible',
    );
    cy.get('[data-test=modal-close]').click();
    //проверка, что она закрылась
    cy.get('[data-test=order-modal]').should('not.exist');
  });
});
