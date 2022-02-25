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
  const correctItems = objDiff.filter(({ type }) => type !== 'unchanged');
  const result = [
    ...correctItems.map(({
      key, value1, value2, type, children,
    }) => {
      const propetryFullName = [...path, key].join('.');
      if (type === 'add') {
        return `Property '${propetryFullName}' was added with value: ${stringify(value2)}`;
      }

      if (type === 'del') {
        return `Property '${propetryFullName}' was removed`;
      }

      if (type === 'object') {
        return formatPlain(children, [...path, key]);
      }

      if (type === 'changed') {
        return `Property '${propetryFullName}' was updated. From ${stringify(value1)} to ${stringify(value2)}`;
      }

      return '';
    }),
  ].join('\n');
  return result;
};

export default formatPlain;
