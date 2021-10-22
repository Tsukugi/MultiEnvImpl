import { EnvChecker } from './envChecker';
import { createEventsImpl } from './impl/events';
import { createFetchImpl } from './impl/fetch';
import { createFileManagerImpl } from './impl/fileManager';

const handleImpl = <Res>(impl: () => Res): Res => {
  const res = impl();
  if (res) return res;
  throw new Error(impl + 'Not Supported');
};

export const ImplHandler = {
  fetch: handleImpl(() => {
    const { browser, node } = createFetchImpl();
    if (EnvChecker.isBrowser) return browser;
    if (EnvChecker.isNode) return node;
  }),
  fileManager: handleImpl(() => {
    const { browser, node } = createFileManagerImpl();
    if (EnvChecker.isBrowser) return browser;
    if (EnvChecker.isNode) return node;
  }),
  events: handleImpl(() => {
    const { browser, node } = createEventsImpl();
    if (EnvChecker.isBrowser) return browser;
    if (EnvChecker.isNode) return node;
  }),
};
