import _ from 'lodash';
import parse from './parsers.js';
import formater from './stylish.js';

const getSortedKeys = (obj1, obj2) => {
  const keys1 = _.keys(obj1);
  const keys2 = _.keys(obj2);
  const allKeys = _.union(keys1, keys2);
  const sortedAllKeys = _.sortBy(allKeys);

  return sortedAllKeys;
};

const genDiff = (filepath1, filepath2) => {
  const content1 = parse(filepath1);
  const content2 = parse(filepath2);

  // const keys = getSortedKeys(content1, content2);

  const buildTree = (value1, value2) => {
    const keys = getSortedKeys(value1, value2);

    const comparisonResult = keys.map((key) => {
      // 1. 1 объекте ключа нет - add
      // 2. 2 объекте ключа нет - deleted
      // 3. 2 значения === объект, строим деверо
      // 4. 1 об === 2 об значения не равны - changed
      // 5. 1 об === 2 об значения равны - unchanged
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
  // console.log(tree);

  const format = formater(tree);
  console.log(format);
  return format;
};

export default genDiff;
