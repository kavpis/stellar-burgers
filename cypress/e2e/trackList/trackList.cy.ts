import { TEST_URL, SELECTORS } from '../../support/constants';

describe('Конструктор бургеров', () => {
  beforeEach(() => {
    cy.intercept('api/ingredients', { fixture: 'ingredients.json' });
    cy.visit(TEST_URL);
  });

  it('Добавление ингредиентов', () => {
    // проверка на отсутстве ингредиентов в конструкторе изначально
    cy.get(SELECTORS.BURGER_CONSTRUCTOR.TOP_BUN)
      .should('have.length', 1)
      .contains(/Выберите булки/i);
    cy.get(SELECTORS.BURGER_CONSTRUCTOR.LIST).contains(/Выберите начинку/i);
    cy.get(SELECTORS.BURGER_CONSTRUCTOR.BOTTOM_BUN)
      .should('have.length', 1)
      .contains(/Выберите булки/i);

    // булка
    cy.get(SELECTORS.BURGER_CONSTRUCTOR.INGREDIENT)
      .filter(':contains("Краторная булка N-200i")')
      .contains(/Добавить/i)
      .click();
    cy.get(SELECTORS.BURGER_CONSTRUCTOR.TOP_BUN)
      .should('have.length', 1)
      .contains(/Краторная булка N-200i/i);
    cy.get(SELECTORS.BURGER_CONSTRUCTOR.BOTTOM_BUN)
      .should('have.length', 1)
      .contains(/Краторная булка N-200i/i);

    // начинка
    cy.get(SELECTORS.BURGER_CONSTRUCTOR.INGREDIENT)
      .filter(':contains("Биокотлета из марсианской Магнолии")')
      .contains(/Добавить/i)
      .click();
    cy.get(SELECTORS.BURGER_CONSTRUCTOR.LIST)
      .children()
      .should('have.length', 1)
      .contains(/Биокотлета из марсианской Магнолии/i);
    cy.get(SELECTORS.BURGER_CONSTRUCTOR.INGREDIENT)
      .filter(':contains("Мясо бессмертных моллюсков Protostomia")')
      .contains(/Добавить/i)
      .click();
    cy.get(SELECTORS.BURGER_CONSTRUCTOR.LIST)
      .children()
      .should('have.length', 2)
      .contains(/Мясо бессмертных моллюсков Protostomia/i);
  }); // добавление ингредиентов

  it('Создание заказа', () => {
    // моковые данные
    cy.intercept('api/auth/login', { fixture: 'userLogin.json' }).as('login');
    cy.intercept('api/auth/user', { fixture: 'userLogin.json' }).as('user');
    cy.intercept('api/orders', { fixture: 'newOrderResponse.json' }).as('order');

    // добавление игредиентов
    cy.get(SELECTORS.BURGER_CONSTRUCTOR.INGREDIENT)
      .filter(':contains("Краторная булка N-200i")')
      .contains(/Добавить/i)
      .click();
    cy.get(SELECTORS.BURGER_CONSTRUCTOR.INGREDIENT)
      .filter(':contains("Биокотлета из марсианской Магнолии")')
      .contains(/Добавить/i)
      .click();

    // клик по кнопке создания
    cy.get(SELECTORS.BURGER_CONSTRUCTOR.SECTION)
      .contains(/Оформить заказ/i)
      .click();

    // проверка успешной авторизации
    cy.wait('@user').its('response.statusCode').should('eq', 200);
    
    // проверка успешного создания заказа
    cy.wait('@order').its('response.statusCode').should('eq', 200);

    // проверка модального окна с номером заказа
    cy.get(SELECTORS.MODAL.ROOT, { timeout: 10000 })
      .should('exist')
      .get(SELECTORS.MODAL.NEW_ORDER_NUMBER)
      .contains(/12345/i);

    // закрытие модального окна
    cy.get('body').type('{esc}');
    
    // проверка что модальное окно закрылось
    cy.get(SELECTORS.MODAL.ROOT).should('not.exist');

    // проверка очистки конструктора
    cy.get(SELECTORS.BURGER_CONSTRUCTOR.TOP_BUN)
      .should('have.length', 1)
      .contains(/Выберите булки/i);
    cy.get(SELECTORS.BURGER_CONSTRUCTOR.LIST).contains(/Выберите начинку/i);
    cy.get(SELECTORS.BURGER_CONSTRUCTOR.BOTTOM_BUN)
      .should('have.length', 1)
      .contains(/Выберите булки/i);
  }); // Создание заказа

  it('Открытие модального окна', () => {
    // проверяем что нет модалок
    cy.get(SELECTORS.MODAL.ROOT).should('not.exist');
    // открываем
    cy.get(SELECTORS.BURGER_CONSTRUCTOR.INGREDIENT).eq(0).click();
    // проверяем наличие
    cy.get(SELECTORS.MODAL.ROOT);
  }); // Открытие модального окна

  it('Закрытие модального окна на крестик', () => {
    // открываем
    cy.get(SELECTORS.BURGER_CONSTRUCTOR.INGREDIENT).eq(0).click();
    // проверяем наличие
    cy.get(SELECTORS.MODAL.ROOT);
    // Закрытие
    cy.get(SELECTORS.MODAL.CLOSE_BUTTON).eq(0).click();
    // проверяем что закрылось
    cy.get(SELECTORS.MODAL.ROOT).should('not.exist');
  }); // Закрытие модального окна на крестик

  it('Закрытие модального окна на Esc', () => {
    // открываем
    cy.get(SELECTORS.BURGER_CONSTRUCTOR.INGREDIENT).eq(0).click();
    // проверяем наличие
    cy.get(SELECTORS.MODAL.ROOT);
    // нажатие на крестик
    cy.get('body').type('{esc}');
    // проверка
    cy.get(SELECTORS.MODAL.ROOT).should('not.exist');
  }); // Закрытие модального окна на Esc

  it('Закрытие модального окна по клику на оверлей', () => {
    // открываем
    cy.get(SELECTORS.BURGER_CONSTRUCTOR.INGREDIENT).eq(0).click();
    // проверяем наличие
    cy.get(SELECTORS.MODAL.ROOT);
    /// нажатие на крестик
    cy.get(SELECTORS.MODAL.OVERLAY).eq(0).click({ force: true });
    // проверка
    cy.get(SELECTORS.MODAL.ROOT).should('not.exist');
  }); // Закрытие модального окна по клику на оверлей
});
