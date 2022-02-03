import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
// import path from 'path';
import fs from 'fs';
import genDiff from '../src/genDiff';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('genDiff JSON and YAML stylish format', () => {
  const jsonContent1 = getFixturePath('filepath1.json');
  const jsonContent2 = getFixturePath('filepath2.json');

  const yamlContent1 = getFixturePath('filepath1.yaml');
  const yamlContent2 = getFixturePath('filepath2.yaml');

  const resultContent = readFile('expected_stylish_format.txt');

  expect(genDiff(jsonContent1, jsonContent2)).toEqual(resultContent);
  expect(genDiff(yamlContent1, yamlContent2)).toEqual(resultContent);
});

test('genDiff JSON and YAML plain format', () => {
  const jsonContent1 = getFixturePath('filepath1.json');
  const jsonContent2 = getFixturePath('filepath2.json');

  const yamlContent1 = getFixturePath('filepath1.yaml');
  const yamlContent2 = getFixturePath('filepath2.yaml');

  const resultContent = readFile('expected_plain_format.txt');

  expect(genDiff(jsonContent1, jsonContent2, 'plain')).toEqual(resultContent);
  expect(genDiff(yamlContent1, yamlContent2, 'plain')).toEqual(resultContent);
});

test('genDiff JSON and YAML json format', () => {
  const jsonContent1 = getFixturePath('filepath1.json');
  const jsonContent2 = getFixturePath('filepath2.json');

  const yamlContent1 = getFixturePath('filepath1.yaml');
  const yamlContent2 = getFixturePath('filepath2.yaml');

  const resultContent = readFile('expected_json_format.json');

  expect(genDiff(jsonContent1, jsonContent2, 'json')).toEqual(resultContent);
  expect(genDiff(yamlContent1, yamlContent2, 'json')).toEqual(resultContent);
});
