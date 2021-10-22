const isNode = () =>
  errorHandler(typeof process !== 'undefined' && process.versions !== null && process.versions.node !== null);
const isBrowser = () => errorHandler(typeof window !== 'undefined' && typeof window.document !== 'undefined');

const isWebWorker = () =>
  errorHandler(typeof self === 'object' && self.constructor && self.constructor.name === 'DedicatedWorkerGlobalScope');

const isJsDom = () =>
  errorHandler(
    (typeof window !== 'undefined' && window.name === 'nodejs') ||
      navigator.userAgent.includes('Node.js') ||
      navigator.userAgent.includes('jsdom')
  );

const errorHandler = (rule: boolean) => {
  try {
    return rule;
  } catch (error) {
    return false;
  }
};

export const EnvHandler = { isBrowser, isJsDom, isNode, isWebWorker };
