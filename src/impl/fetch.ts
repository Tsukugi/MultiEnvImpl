import { FetchTemplate, RequestOptionsTemplate } from '../types';

export const createFetchImpl = () => {
  const node: FetchTemplate = async (options?: RequestOptionsTemplate) => {
    const https = require('https');
    const url = new URL(options.serverUrl);

    const reqOptions = { host: url.host, json: true, ...options };

    return new Promise((resolve, reject) => {
      const req = https.request(reqOptions, res => {
        let data = '';
        res.on('data', (chunk: string) => (data += chunk));
        res.on('end', () => {
          const res = typeof data === 'string' ? JSON.parse(data) : data;
          resolve(res);
        });
      });

      req.on('error', (error: any) => {
        console.error(error);
        reject(error);
      });

      req.end();
    });
  };

  const browser: FetchTemplate = async (options?: RequestOptionsTemplate) => {
    const { method, serverUrl, path, headers, body } = options;
    const url = `${serverUrl}${path}`;
    const fetchOptions: RequestInit = { method, headers, body };
    return await (await fetch(url, fetchOptions)).json();
  };

  return { node, browser };
};
