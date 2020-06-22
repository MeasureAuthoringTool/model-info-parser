import { exec } from 'child_process';
import execPromise from './execPromise';

describe('generateMongoidTypes', () => {

  const modelDir = './test/mongoid';
  const generatorScript = './src/generateMongoidTypes.ts';

  // remove models after all tests have been run
  afterAll(() => {
    exec(`rm -rf ${modelDir}`);
  });

  test('Should generate mongoid models successfully', async() => {
    const cmd = `ts-node ${generatorScript} --output-directory=${modelDir}`;
    const result = await  execPromise(cmd);
    expect(result).toContain('Successfully generated 932 types');
  });
});
