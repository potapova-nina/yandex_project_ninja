import { IWSResponse } from './websocket-middleware';

export interface WSInitAction {
  type: 'WS_FEED_INIT' | 'WS_PROFILE_INIT';
}

export interface WSOpenAction {
  type: string;
  payload: Event;
}

export interface WSCloseAction {
  type: string;
  payload: CloseEvent;
}

export interface WSErrorAction {
  type: string;
  payload: Event;
}

export interface WSMessageAction {
  type: string;
  payload: IWSResponse;
}

export interface WSSendMessageAction {
  type: string;
  payload: unknown;
}

export type WSActions =
  | WSInitAction
  | WSOpenAction
  | WSCloseAction
  | WSErrorAction
  | WSMessageAction
  | WSSendMessageAction;
