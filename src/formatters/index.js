import formatPlain from './plain.js';
import formatStylish from './stylish.js';
import formatJson from './json.js';

const formatOutput = (tree, formatName) => {
  if (formatName === 'plain') {
    return formatPlain(tree);
  }
  if (formatName === 'json') {
    return formatJson(tree);
  }
  return formatStylish(tree);
};

export default formatOutput;
