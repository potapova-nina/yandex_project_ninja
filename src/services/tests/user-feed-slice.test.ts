import reducer, {
  wsUserOpen,
  wsUserClosed,
  wsUserError,
  wsUserMessage,
} from '../user-feed-slice';

import type { UserFeedState } from '../user-feed-slice';

describe('userFeedSlice', () => {
  const initialState: UserFeedState = {
    orders: [],
    wsConnected: false,
    error: null,
  };

  const mockOrders = [
    {
      ingredients: ['123', '456'],
      _id: 'order1',
      status: 'done',
      number: 101,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:01:00Z',
      name: 'Test Order',
    },
  ];

  it('should return the initial state', () => {
    expect(reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle wsUserOpen', () => {
    const nextState = reducer(initialState, wsUserOpen());
    expect(nextState.wsConnected).toBe(true);
    expect(nextState.error).toBeNull();
  });

  it('should handle wsUserClosed', () => {
    const state = { ...initialState, wsConnected: true };
    const nextState = reducer(state, wsUserClosed());
    expect(nextState.wsConnected).toBe(false);
  });

  it('should handle wsUserError', () => {
    const errorEvent = new Event('error');
    const nextState = reducer(initialState, wsUserError(errorEvent));
    expect(nextState.error).toBe(errorEvent);
  });

  it('should handle wsUserMessage with success=true', () => {
    const payload = JSON.stringify({
      success: true,
      orders: mockOrders,
    });

    const nextState = reducer(initialState, wsUserMessage(payload));
    expect(nextState.orders).toEqual(mockOrders);
  });

  it('should ignore wsUserMessage with success=false', () => {
    const payload = JSON.stringify({
      success: false,
      orders: mockOrders,
    });

    const nextState = reducer(initialState, wsUserMessage(payload));
    expect(nextState.orders).toEqual([]);
  });
});
