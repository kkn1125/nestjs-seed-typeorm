import * as tsconfig from '../tsconfig.json';
import * as readline from 'readline';
import * as path from 'path';
import * as fs from 'fs/promises';
import * as prettier from 'prettier';

(async function (depth: number = 1) {
  console.log(`깊이 ${depth}로 탐색합니다.`);

  let overwrite = false,
    resolver: (value: string) => void;

  if ('paths' in tsconfig.compilerOptions) {
    overwrite = true;
    console.error('paths 속성이 존재합니다.');
    console.warn('덮어 쓰시겠습니까?');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.on('line', (input) => {
      resolver(input || 'y');
      rl.close();
    });
  }

  const keepGoing = await new Promise((resolve) => (resolver = resolve));

  if (overwrite && keepGoing !== 'y') {
    console.log('덮어쓰기를 취소합니다.');
    process.exit(0);
  }

  if (!overwrite) {
    Object.assign(tsconfig.compilerOptions, { paths: {} });
  }

  const parseToAlias = (name: string) => [`@${name}/*`, [`src/${name}/*`]];
  const configPath = path.join(path.resolve(), 'tsconfig.json');
  const srcPath = path.join(path.resolve(), 'src');
  const dirs = await fs.readdir(srcPath, { withFileTypes: true });
  const folders = dirs.filter((dir) => dir.isDirectory());
  const aliases = folders.map((folder) => folder.name);
  tsconfig.compilerOptions.paths = Object.fromEntries(
    aliases.map(parseToAlias).concat([['@/*', ['src/*']]]),
  ) as typeof tsconfig.compilerOptions.paths;
  const aliasSyntax = JSON.stringify(tsconfig, null, 2);
  const prettyAlias = await prettier.format(aliasSyntax, {
    parser: 'json',
  });
  await fs.writeFile(configPath, prettyAlias, {
    encoding: 'utf-8',
    flag: 'w',
  });
  console.log('tsconfig.json 파일에 alias를 추가했습니다.');
  console.log('경로: ', configPath);
  console.log(
    `alias 대상:\n${[...aliases]
      .sort()
      .map(
        (alias) => '- ' + alias + `-> ${parseToAlias(alias).join(' : ["')}"]`,
      )
      .join('\n')}`,
  );
})()
  .then(() => {
    console.log('done');
  })
  .catch((err) => {
    console.log(err);
  });
