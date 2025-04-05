import reducer, { onOpen, onClose, onError, onMessage } from '../feed-slice';

describe('feedSlice reducer', () => {
  const initialState = {
    orders: [],
    total: 0,
    totalToday: 0,
    wsConnected: false,
    error: null,
  };

  it('should handle onOpen', () => {
    const nextState = reducer(initialState, onOpen());
    expect(nextState.wsConnected).toBe(true);
    expect(nextState.error).toBeNull();
  });

  it('should handle onClose', () => {
    const state = { ...initialState, wsConnected: true };
    const nextState = reducer(state, onClose());
    expect(nextState.wsConnected).toBe(false);
  });

  it('should handle onError', () => {
    const mockEvent = new Event('error');
    const nextState = reducer(initialState, onError(mockEvent));
    expect(nextState.error).toBe(mockEvent);
  });

  it('should handle onMessage with valid data', () => {
    const payload = JSON.stringify({
      success: true,
      orders: [
        {
          _id: '1',
          name: 'Test',
          status: 'done',
          number: 123,
          createdAt: '',
          updatedAt: '',
          ingredients: [],
        },
      ],
      total: 100,
      totalToday: 10,
    });

    const nextState = reducer(initialState, onMessage(payload));
    expect(nextState.orders.length).toBe(1);
    expect(nextState.total).toBe(100);
    expect(nextState.totalToday).toBe(10);
  });

  it('should ignore onMessage with invalid data', () => {
    const payload = JSON.stringify({ success: false });
    const nextState = reducer(initialState, onMessage(payload));
    expect(nextState.orders).toEqual([]);
  });
});
