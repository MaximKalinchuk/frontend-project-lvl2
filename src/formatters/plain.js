const stringify = (value) => {
  if (value === null) {
    return null;
  }
  if (typeof value === 'object') {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const formatPlain = (objDiff, path = []) => {
  const formatterByNodeTypes = {
    add: (value1, value2, children, filepath, key) => (`Property '${[...path, key].join('.')}' was added with value: ${stringify(value2)}`),
    del: (value1, value2, children, filepath, key) => (`Property '${[...path, key].join('.')}' was removed`),
    object: (value1, value2, children, filepath, key) => (formatPlain(children, [...path, key])),
    changed: (value1, value2, children, filepath, key) => (`Property '${[...path, key].join('.')}' was updated. From ${stringify(value1)} to ${stringify(value2)}`),
  };

  const correctItems = objDiff.filter(({ type }) => type !== 'unchanged');
  const resultItems = correctItems.map(({
    key, value1, value2, type, children,
  }) => formatterByNodeTypes[type](value1, value2, children, path, key));

  return resultItems.join('\n');
};

export default formatPlain;
