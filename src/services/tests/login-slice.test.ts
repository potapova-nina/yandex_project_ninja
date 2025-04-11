import { ILoginResponse } from '../../api/api.dto';
import reducer, {
  fetchLoginUser,
  setIsAuthChecked,
  setUser,
} from '../login-slice';

export interface LoginState {
  user: ILoginResponse;
  isAuthChecked: boolean;
}

describe('loginSlice', () => {
  const initialUser: ILoginResponse = {
    success: false,
    user: {
      email: '',
      name: '',
    },
    accessToken: '',
    refreshToken: '',
  };

  const initialState: LoginState = {
    user: initialUser,
    isAuthChecked: true,
  };

  const mockUser: ILoginResponse = {
    success: true,
    user: {
      email: 'test@example.com',
      name: 'Test User',
    },
    accessToken: 'token123',
    refreshToken: 'refresh456',
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle setIsAuthChecked', () => {
    const nextState = reducer(initialState, setIsAuthChecked(false));
    expect(nextState.isAuthChecked).toBe(false);
  });

  it('should handle setUser', () => {
    const nextState = reducer(initialState, setUser(mockUser));
    expect(nextState.user).toEqual(mockUser);
  });

  it('should handle fetchLoginUser.fulfilled', () => {
    const action = {
      type: fetchLoginUser.fulfilled.type,
      payload: mockUser,
    };

    const nextState = reducer(initialState, action);
    expect(nextState.user).toEqual(mockUser);
    expect(nextState.isAuthChecked).toBe(true);
  });
});
