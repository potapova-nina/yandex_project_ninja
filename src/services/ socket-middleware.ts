import type { Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
import type { AppDispatch, RootState } from './store'; // путь подстрой под себя

interface TSocketActions {
  wsInit: string;
  onOpen: string;
  onClose: string;
  onError: string;
  onMessage: string;
  wsSendMessage?: string;
}

export const socketMiddleware = (
  wsUrl: string,
  actions: TSocketActions,
  withToken: boolean = false,
): Middleware => {
  return (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInit, onOpen, onClose, onError, onMessage, wsSendMessage } =
        actions;

      if (type === wsInit) {
        const token = withToken
          ? localStorage.getItem('accessToken')?.replace('Bearer ', '')
          : null;

        const url = withToken ? `${wsUrl}?token=${token}` : wsUrl;

        socket = new WebSocket(url);
      }

      if (socket) {
        socket.onopen = (event) => dispatch({ type: onOpen, payload: event });
        socket.onerror = (event) => dispatch({ type: onError, payload: event });
        socket.onclose = (event) => dispatch({ type: onClose, payload: event });

        socket.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            dispatch({ type: onMessage, payload: data });
          } catch (err) {
            console.error('Ошибка парсинга сообщения WebSocket:', err);
          }
        };

        if (wsSendMessage && type === wsSendMessage) {
          socket.send(JSON.stringify(payload));
        }
      }

      return next(action);
    };
  };
};
