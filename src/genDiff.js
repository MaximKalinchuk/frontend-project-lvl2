import _ from 'lodash';
import parse from './parsers.js';
// import stylish from './formatters/stylish.js';
// import plain from './formatters/plain.js';
import selectFormat from './formatters/index.js';

const getSortedKeys = (obj1, obj2) => {
  const keys1 = _.keys(obj1);
  const keys2 = _.keys(obj2);
  const allKeys = _.union(keys1, keys2);
  const sortedAllKeys = _.sortBy(allKeys);

  return sortedAllKeys;
};

const genDiff = (filepath1, filepath2, formatName) => {
  const content1 = parse(filepath1);
  const content2 = parse(filepath2);

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

  const tree = buildTree(content1, content2);

  const normalizedTree = selectFormat(tree, formatName);
  console.log(normalizedTree);
  return normalizedTree;
};

export default genDiff;
