export const TEST_URL = 'http://localhost:4000';

// Селекторы
export const SELECTORS = {
  BURGER_CONSTRUCTOR: {
    TOP_BUN: '[data-cy=burger-constructor__top_bun]',
    BOTTOM_BUN: '[data-cy=burger-constructor__bottom_bun]',
    LIST: '[data-cy=burger-constructor__list]',
    INGREDIENT: '[data-cy=burger-constructor__ingredient]',
    SECTION: '[data-cy=burger-constructor__section]'
  },
  MODAL: {
    ROOT: '[data-cy=modal]',
    CLOSE_BUTTON: '[data-cy=modal__close-button]',
    OVERLAY: '[data-cy=modal-overlay]',
    NEW_ORDER_NUMBER: '[data-cy=newOrder-number]'
  }
}; 