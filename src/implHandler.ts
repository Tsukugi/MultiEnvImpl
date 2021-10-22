import { EnvHandler } from './envHandler';
import { createEventsImpl } from './impl/events';
import { createFetchImpl } from './impl/fetch';
import { createFileManagerImpl } from './impl/fileManager';

const handleImpl = <Res>(impl: () => Res): Res => {
  const res = impl();
  if (res) return res;
  throw new Error(impl + 'Not Supported');
};

export const Impl = {
  fetch: handleImpl(() => {
    if (EnvHandler.isBrowser) return createFetchImpl().browser;
    if (EnvHandler.isNode) return createFetchImpl().node;
  }),
  fileManager: handleImpl(() => {
    if (EnvHandler.isBrowser) return createFileManagerImpl().browser;
    if (EnvHandler.isNode) return createFileManagerImpl().node;
  }),
  events: handleImpl(() => {
    if (EnvHandler.isBrowser) return createEventsImpl().browser;
    if (EnvHandler.isNode) return createEventsImpl().node;
  }),
};
