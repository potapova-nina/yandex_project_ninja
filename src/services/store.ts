import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './ingredients-slice';
import constructorReducer from './constructor-slice';
import selectIngedientReducer from './select-ingredients-slice';
import orderReducer from './order-slice';
import registerReducer from './register-slice';
import loginReducer from './login-slice';
import feedReducer, {
  wsInit,
  wsClose,
  onOpen,
  onError,
  onClose,
  onMessage,
} from './feed-slice';
import userFeedReducer, {
  wsUserInit,
  wsUserClose,
  wsUserOpen,
  wsUserError,
  wsUserClosed,
  wsUserMessage,
} from './user-feed-slice';

import { createSocketMiddleware } from './middleware/socket-middleware';

const userFeedMiddleware = createSocketMiddleware({
  wsInit: wsUserInit.type,
  wsClose: wsUserClose.type,
  onOpen: wsUserOpen.type,
  onClose: wsUserClosed.type,
  onError: wsUserError.type,
  onMessage: wsUserMessage.type,
});

const feedMiddleware = createSocketMiddleware({
  wsInit: wsInit.type,
  wsClose: wsClose.type,
  onOpen: onOpen.type,
  onClose: onClose.type,
  onError: onError.type,
  onMessage: onMessage.type,
});

export const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    constructor: constructorReducer, // именно этот ключ вы затем используете через useSelector
    selectIngedient: selectIngedientReducer,
    order: orderReducer,
    register: registerReducer,
    login: loginReducer,
    feedOrder: feedReducer,
    userFeed: userFeedReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      feedMiddleware,
      userFeedMiddleware,
    ),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
