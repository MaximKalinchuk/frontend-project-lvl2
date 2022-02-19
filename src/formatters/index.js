import makePlainFormat from './plain.js';
import makeStylishFormat from './stylish.js';
import makeJsonFormat from './json.js';

const selectFormat = (tree, formatName) => {
  if (formatName === 'plain') {
    return makePlainFormat(tree);
  }
  if (formatName === 'json') {
    return makeJsonFormat(tree);
  }
  return makeStylishFormat(tree);
};

export default selectFormat;
