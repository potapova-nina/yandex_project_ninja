import { Dispatch } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface SocketActions {
  wsInit: string;
  wsClose: string;
  onOpen: string;
  onClose: string;
  onError: string;
  onMessage: string;
}

interface IAction {
  payload: string;
  type: string;
}

interface IStore {
  dispatch: Dispatch;
  getState: () => RootState;
}

type TNext = (action: IAction) => void;

export const createSocketMiddleware = (wsActions: SocketActions) => {
  return (store: IStore) => {
    let socket: WebSocket | null = null;

    return (next: TNext) => (action: IAction) => {
      const { dispatch } = store;
      const { wsInit, wsClose, onOpen, onClose, onError, onMessage } =
        wsActions;

      if (action.type === wsInit) {
        socket = new WebSocket(action.payload);

        socket.onopen = () => dispatch({ type: onOpen });
        socket.onerror = (event) => dispatch({ type: onError, payload: event });
        socket.onmessage = (event) =>
          dispatch({ type: onMessage, payload: event.data });
        socket.onclose = (event) => dispatch({ type: onClose, payload: event });
      }

      if (action.type === wsClose && socket) {
        socket.close();
      }

      return next(action);
    };
  };
};
