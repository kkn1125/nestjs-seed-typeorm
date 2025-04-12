import { describe, expect, it, vitest } from 'vitest';
import { readInput } from './read_input';
import { existsTsconfig } from './existsTsconfig';
import { findAlias } from './findAlias';

describe('[Alias 생성] 단위 테스트', () => {
  it('[구상] 흐름 테스트', () => {
    expect(readInput).toBeDefined();
  });

  it('[입력 받기] 사용자 입력 테스트', async () => {
    const once = { readInput };
    const spy = vitest.spyOn(once, 'readInput');
    spy.mockReturnValue(Promise.resolve(true));
    const result = await once.readInput();
    expect(result).toBeTruthy();
  });

  it('[파일 찾기] tsconfig.json 찾기', async () => {
    expect(existsTsconfig).toBeDefined();
    const tsconfig = await existsTsconfig('tsconfig.json');
    expect(tsconfig).toBeDefined();

    const json = JSON.parse(tsconfig);
    const paths = json.compilerOptions.paths;
    expect(paths).toBeDefined();
  });

  it('[Alias 리스트 찾기] Alias 리스트 검색', async () => {
    const alias = await findAlias(1);
    console.log(alias);
    expect(alias).toBeDefined();
  });
});
