import type { Middleware, MiddlewareAPI, AnyAction } from '@reduxjs/toolkit';
import type { AppDispatch, RootState } from '../store';
import { isValidOrder } from '../utils/valid-order';

export interface IOrder {
  ingredients: string[];
  _id: string;
  status: string;
  number: number;
  createdAt: string;
  updatedAt: string;
  name: string;
}

export interface IWSResponse {
  success: boolean;
  orders: IOrder[];
  total: number;
  totalToday: number;
}

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
  withToken = false,
): Middleware<{}, RootState, AppDispatch> => {
  return (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next: (action: AnyAction) => unknown) => (action: AnyAction) => {
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
            const raw = JSON.parse(event.data) as IWSResponse;

            if (!raw.success) return;

            const filteredOrders = raw.orders.filter(isValidOrder);

            dispatch({
              type: onMessage,
              payload: {
                ...raw,
                orders: filteredOrders,
              },
            });
          } catch (err) {
            console.error('Ошибка при обработке сообщения WebSocket:', err);
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
