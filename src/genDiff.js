import _ from 'lodash';
import path from 'path';
import { readFileSync } from 'fs';
import parse from './parsers.js';
import formatOutput from './formatters/index.js';

const getSortedKeys = (obj1, obj2) => {
  const keys1 = _.keys(obj1);
  const keys2 = _.keys(obj2);
  const allKeys = _.union(keys1, keys2);
  const sortedAllKeys = _.sortBy(allKeys);

  return sortedAllKeys;
};

const buildTree = (value1, value2) => {
  const keys = getSortedKeys(value1, value2);

  const comparisonResult = keys.map((key) => {
    if (!_.has(value1, key)) {
      return { key, value2: value2[key], type: 'add' };
    }
    if (!_.has(value2, key)) {
      return { key, value1: value1[key], type: 'del' };
    }
    if (_.isPlainObject(value1[key]) && _.isPlainObject(value2[key])) {
      return { key, children: buildTree(value1[key], value2[key]), type: 'object' };
    }
    if (!_.isEqual(value1[key], value2[key])) {
      return {
        key, value1: value1[key], value2: value2[key], type: 'changed',
      };
    }
    return {
      key, value1: value1[key], value2: value2[key], type: 'unchanged',
    };
  });
  return comparisonResult;
};

const getFormat = (filepath) => {
  const format = path.extname(filepath);

  if (format === '.yaml' || format === '.yml') {
    return '.yaml';
  }
  if (format === '.json') {
    return '.json';
  }
  throw new Error('Wrong format');
};

const genDiff = (filepath1, filepath2, formatName) => {
  const format1 = getFormat(filepath1);
  const format2 = getFormat(filepath1);
  const content1 = readFileSync(filepath1);
  const content2 = readFileSync(filepath2);

  const obj1 = parse(content1, format1);
  const obj2 = parse(content2, format2);

  const tree = buildTree(obj1, obj2);

  return formatOutput(tree, formatName);
};

export default genDiff;
