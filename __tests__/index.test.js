import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/genDiff';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8').replaceAll('"', '');

const filepath1 = getFixturePath('file1.json');
const filepath2 = getFixturePath('file2.json');
// console.log(readFile('expected_file.json'))

test('genDiff', () => {
  expect(genDiff(filepath1, filepath2)).toEqual(readFile('expected_file.json'));
});
