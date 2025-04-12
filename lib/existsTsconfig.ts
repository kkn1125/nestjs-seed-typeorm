import * as fs from 'fs/promises';
import * as path from 'path';

export function existsTsconfig(tsconfigName: string = 'tsconfig.json') {
  return fs.readFile(path.join(path.resolve(), tsconfigName), {
    encoding: 'utf-8',
  });
}
