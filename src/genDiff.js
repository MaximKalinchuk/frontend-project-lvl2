import path from 'path';
import { readFileSync } from 'fs';
import parse from './parsers.js';
import formatOutput from './formatters/index.js';
import buildTree from './buildTree.js';

const getFormat = (filepath) => {
  const format = path.extname(filepath).slice(1);

  if (format === 'yaml' || format === 'yml') {
    return 'yaml';
  }
  if (format === 'json') {
    return 'json';
  }
  throw new Error('Wrong format');
};

const getData = (filepath) => {
  const format = getFormat(filepath);
  const content = readFileSync(filepath);

  return [format, content];
};

const genDiff = (filepath1, filepath2, formatName) => {
  const [format1, content1] = getData(filepath1);
  const [format2, content2] = getData(filepath2);

  const obj1 = parse(content1, format1);
  const obj2 = parse(content2, format2);

  const tree = buildTree(obj1, obj2);

  return formatOutput(tree, formatName);
};

export default genDiff;
