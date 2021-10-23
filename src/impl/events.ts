import { EventsTemplate } from '../types';

export const createEventsImpl = () => {
  const node = (): EventsTemplate => {
    const EventEmitter = require('events');
    const eventEmitter = new EventEmitter();

    return {
      emit: (event, action) => eventEmitter.emit(event, event, action),
      on: (event, listener) => eventEmitter.on(event, (...data) => listener(event, data)),
      off: (event, listener) => eventEmitter.off(event, (...data) => listener(event, data)),
    };
  };

  const browser = (): EventsTemplate => {
    const target = new EventTarget();
    const eventHandler = {
      emit: (event, action) => target.dispatchEvent(new CustomEvent(event, { detail: action })),
      on: (event, listener) => {
        target.addEventListener(event, (evt: any) => listener(evt.type, evt.detail));
        return eventHandler;
      },
      off: (event, listener) => {
        target.removeEventListener(event, (evt: any) => listener(evt.type, evt.detail));
        return eventHandler;
      },
    };
    return eventHandler;
  };

  return { node, browser };
};
