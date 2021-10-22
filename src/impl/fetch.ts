import { FetchTemplate, RequestOptionsTemplate } from '../types';

export const createFetchImpl = () => {
  const node: FetchTemplate = async (options?: RequestOptionsTemplate) => {
    const https = require('https');
    return new Promise((resolve, reject) => {
      const onResponse = resp => {
        let data = '';
        resp.on('data', (chunk: string) => (data += chunk));
        resp.on('end', () => resolve(JSON.parse(data)));
      };

      const req = https.request(options, onResponse);

      req.on('error', error => {
        throw reject(error);
      });
    });
  };

  const browser: FetchTemplate = async (options?: RequestOptionsTemplate) => {
    const { method, serverUrl, path, headers, body } = options;
    const url = `${serverUrl}${path}`;
    const fetchOptions: RequestInit = { method, headers, body };
    return await fetch(url, fetchOptions).then(res => res.json());
  };

  return { node, browser };
};
