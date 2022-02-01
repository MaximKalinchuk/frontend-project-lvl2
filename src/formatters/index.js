import makePlainFormat from './plain.js';
import makeStylishFormat from './stylish.js';

const selectFormat = (tree, formatName) => {
//   console.log(formatName);
  if (formatName === 'plain') {
    return makePlainFormat(tree);
  }
  return makeStylishFormat(tree);
};

export default selectFormat;
