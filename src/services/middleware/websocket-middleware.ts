import {
  MiddlewareAPI,
  Middleware,
  Dispatch,
  AnyAction,
} from '@reduxjs/toolkit';
import { RootState } from '../store';
import {
  wsConnect,
  wsDisconnect,
  wsOnOpen,
  wsOnClose,
  wsOnError,
  wsOnMessage,
  IWSResponse,
} from '../actions/wsActions'; // путь поправь под себя

export const createSocketMiddleware = (
  wsUrl: string,
): Middleware<{}, RootState> => {
  let socket: WebSocket | null = null;

  return function socketMiddleware(
    store: MiddlewareAPI<Dispatch<AnyAction>, RootState>,
  ) {
    return function wrapDispatch(next: Dispatch<AnyAction>) {
      return function handleAction(action: AnyAction) {
        if (wsConnect.match(action)) {
          socket = new WebSocket(wsUrl);

          socket.onopen = () => {
            store.dispatch(wsOnOpen());
          };

          socket.onmessage = (event: MessageEvent) => {
            try {
              const data: IWSResponse = JSON.parse(event.data);
              store.dispatch(wsOnMessage(data));
            } catch (e) {
              store.dispatch(
                wsOnError('Ошибка при разборе WebSocket-сообщения'),
              );
            }
          };

          socket.onerror = () => {
            store.dispatch(wsOnError('Произошла ошибка WebSocket'));
          };

          socket.onclose = () => {
            store.dispatch(wsOnClose());
          };
        }

        if (wsDisconnect.match(action)) {
          socket?.close();
          socket = null;
        }

        return next(action);
      };
    };
  };
};
