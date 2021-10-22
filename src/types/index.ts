export type EventHandler = <Events extends string>(
  event: Events,
  listener: (event: Events, data: any) => void
) => EventsTemplate;

export interface EventsTemplate {
  emit: <Action, Events extends string>(event: Events, action?: Action) => boolean;
  on: EventHandler;
  off: EventHandler;
}

export interface FileManager {
  read: <T>(path: string) => T;
  write: <T>(path: string, data: T) => void;
  exists: (path: string) => boolean;
  mkdir: (path: string) => void;
}

export interface RequestOptionsTemplate {
  serverUrl: string;
  method?: 'GET' | 'POST';
  path?: string;
  headers?: Record<string, string>;
  body?: string;
}

export type FetchTemplate = <Response = Record<string | number | symbol, unknown>>(
  options: RequestOptionsTemplate
) => Promise<Response>;
