import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
// import path from 'path';
import fs from 'fs';
import genDiff from '../src/genDiff';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const jsonFilepath1 = getFixturePath('filepath1.json');
const jsonFilepath2 = getFixturePath('filepath2.json');

const yamlFilepath1 = getFixturePath('filepath1.yaml');
const yamlFilepath2 = getFixturePath('filepath2.yaml');

const resultStylishContent = readFile('expected_stylish_format.txt');
const resultPlainContent = readFile('expected_plain_format.txt');
const resultJsonContent = readFile('expected_json_format.json');

const inputs = [
  ['json', jsonFilepath1, jsonFilepath2],
  ['yaml', yamlFilepath1, yamlFilepath2],
];

const expectedResults = [
  ['stylish', resultStylishContent],
  ['plain', resultPlainContent],
  ['json', resultJsonContent],
];

describe.each(inputs)('Gendiff for input format %s', (inputFormat, filepath1, filepath2) => {
  test.each(expectedResults)('Output format %s', (outputFormat, expectedResult) => {
    expect(genDiff(filepath1, filepath2, outputFormat)).toBe(expectedResult);
  });
});
