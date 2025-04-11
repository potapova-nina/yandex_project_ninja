import { IRegisterResponse } from '../../api/api.dto';
import reducer, { fetchRegistration } from '../register-slice';

describe('registerSlice', () => {
  const initialState: IRegisterResponse = {
    success: false,
    user: {
      email: '',
      name: '',
    },
    accessToken: '',
    refreshToken: '',
  };

  const mockResponse: IRegisterResponse = {
    success: true,
    user: {
      email: 'test@example.com',
      name: 'Test User',
    },
    accessToken: 'access-token-123',
    refreshToken: 'refresh-token-456',
  };

  it('should return the initial state by default', () => {
    expect(reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle fetchRegistration.fulfilled', () => {
    const action = {
      type: fetchRegistration.fulfilled.type,
      payload: mockResponse,
    };

    const state = reducer(initialState, action);

    expect(state.success).toBe(true);
    expect(state.user).toEqual(mockResponse.user);
    expect(state.accessToken).toBe(mockResponse.accessToken);
    expect(state.refreshToken).toBe(mockResponse.refreshToken);
  });
});
