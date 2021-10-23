import { EnvChecker } from '../envChecker';
import { createEventsImpl } from './events';
import { createFetchImpl } from './fetch';
import { createFileManagerImpl } from './fileManager';

const handleImpl = <Res>(impl: () => Res): Res => {
  const res = impl();
  if (res !== undefined) return res;
  throw new Error(impl + 'Not Supported');
};

export const ImplHandler = {
  fetch: handleImpl(() => {
    const { browser, node } = createFetchImpl();
    if (EnvChecker.isBrowser()) return browser;
    if (EnvChecker.isNode()) return node;
  }),
  fileManager: handleImpl(() => {
    const { browser, node } = createFileManagerImpl();
    if (EnvChecker.isBrowser()) return browser();
    if (EnvChecker.isNode()) return node();
  }),
  events: handleImpl(() => {
    const { browser, node } = createEventsImpl();
    if (EnvChecker.isBrowser()) return browser();
    if (EnvChecker.isNode()) return node();
  }),
};
