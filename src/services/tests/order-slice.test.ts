// import reducer, { resetOrder, createOrder } from '../orderSlice';

import reducer, { createOrder, resetOrder } from '../order-slice';

type OrderState = {
  orderNumber: number | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
};

describe('orderSlice', () => {
  const initialState: OrderState = {
    orderNumber: null,
    status: 'idle',
  };

  it('should return the initial state by default', () => {
    expect(reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle resetOrder', () => {
    const modifiedState: OrderState = {
      orderNumber: 12345,
      status: 'succeeded',
    };
    const newState = reducer(modifiedState, resetOrder());
    expect(newState).toEqual(initialState);
  });

  it('should handle createOrder.fulfilled', () => {
    const action = {
      type: createOrder.fulfilled.type,
      payload: {
        name: 'test order',
        order: { number: 999 },
        success: true,
      },
    };

    const nextState = reducer(initialState, action);

    expect(nextState.status).toBe('succeeded');
    expect(nextState.orderNumber).toBe(999);
  });
});
