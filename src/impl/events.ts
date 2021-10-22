import { EventsTemplate } from '../types';

export const createEventsImpl = () => {
  const node = (): EventsTemplate => {
    const EventEmitter = require('events');
    return new EventEmitter();
  };

  const browser = (): EventsTemplate => {
    const target = new EventTarget();
    return {
      emit: (event, action) => target.dispatchEvent(new CustomEvent(event, { detail: action })),
      on: (event, listener) => {
        target.addEventListener(event, (evt: any) => listener(evt.type, evt.detail));
        return browser();
      },
      off: (event, listener) => {
        target.removeEventListener(event, (evt: any) => listener(evt.type, evt.detail));
        return browser();
      },
    };
  };

  return { node, browser };
};
