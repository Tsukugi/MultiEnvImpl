import { FileManager } from '../types';

export const createFileManagerImpl = () => {
  const node = (): FileManager => {
    const fs = require('fs');
    return {
      write: (path, data) => fs.writeFileSync(path, JSON.stringify(data)),
      read: path => JSON.parse(fs.readFileSync(path, 'utf8')),
      exists: fs.existsSync,
      mkdir: fs.mkdirSync,
    };
  };

  const browser = (): FileManager => ({
    write: (path: string, data: any) => undefined,
    read: (path: string) => ({} as any),
    exists: (path: string) => false,
    mkdir: (path: string) => undefined,
  });

  return { node, browser };
};
