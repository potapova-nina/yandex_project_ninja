import reducer, {
  wsProfileOpen,
  wsProfileClose,
  wsProfileError,
  wsProfileMessage,
  IOrder,
  IWSResponse,
  ProfileOrdersState,
} from '../profile-orders-slice.ts';

describe('profileOrdersSlice', () => {
  const initialState: ProfileOrdersState = {
    orders: [],
    total: 0,
    totalToday: 0,
    wsConnected: false,
    error: undefined,
  };

  const mockOrders: IOrder[] = [
    {
      ingredients: ['123', '456'],
      _id: '1',
      status: 'done',
      number: 1001,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:01:00Z',
      name: 'Test Order',
    },
  ];

  const mockMessage: IWSResponse = {
    orders: mockOrders,
    total: 50,
    totalToday: 10,
  };

  it('should return the initial state by default', () => {
    expect(reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle wsProfileOpen', () => {
    const state = reducer(initialState, wsProfileOpen());
    expect(state.wsConnected).toBe(true);
    expect(state.error).toBeUndefined();
  });

  it('should handle wsProfileClose', () => {
    const modifiedState: ProfileOrdersState = {
      ...initialState,
      wsConnected: true,
    };

    const state = reducer(modifiedState, wsProfileClose());
    expect(state.wsConnected).toBe(false);
  });

  it('should handle wsProfileError', () => {
    const fakeError = new Event('error');
    const state = reducer(initialState, wsProfileError(fakeError));
    expect(state.error).toBe(fakeError);
  });

  it('should handle wsProfileMessage', () => {
    const state = reducer(initialState, wsProfileMessage(mockMessage));
    expect(state.orders).toEqual(mockOrders);
    expect(state.total).toBe(50);
    expect(state.totalToday).toBe(10);
  });
});
