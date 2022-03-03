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

const formatterByNodeTypes = {
  add: (children, filepath, key, iter, value1, value2) => (`Property '${[...filepath, key].join('.')}' was added with value: ${stringify(value2)}`),
  del: (children, filepath, key) => (`Property '${[...filepath, key].join('.')}' was removed`),
  object: (children, filepath, key, iter) => (iter(children, [...filepath, key])),
  changed: (children, filepath, key, iter, value1, value2) => (`Property '${[...filepath, key].join('.')}' was updated. From ${stringify(value1)} to ${stringify(value2)}`),
  unchanged: () => ([]),
};

const formatPlain = (objDiff) => {
  const iter = (obj, path = []) => {
    const resultItems = obj.map(({
      key, value1, value2, type, children,
    }) => formatterByNodeTypes[type](children, path, key, iter, value1, value2));
    return resultItems.flat().join('\n');
  };
  return iter(objDiff);
};

export default formatPlain;
