import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
// import path from 'path';
import fs from 'fs';
import genDiff from '../src/genDiff';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

// console.log(readFile('expected_file.json'))

test('genDiff JSON format', () => {
  const filepath1 = getFixturePath('filepath1.json');
  console.log(filepath1);
  const filepath2 = getFixturePath('filepath2.json');

  const result = readFile('expected_file.txt');
  console.log(result);
  expect(genDiff(filepath1, filepath2)).toEqual(result);
});

test('genDiff YAML format', () => {
  const filepath1 = getFixturePath('filepath1.yaml');
  const filepath2 = getFixturePath('filepath2.yaml');
  const filepath3 = getFixturePath('filepath1.yml');
  const result = readFile('expected_file.txt');

  expect(genDiff(filepath1, filepath2)).toEqual(result);
  expect(genDiff(filepath3, filepath2)).toEqual(result);
});
