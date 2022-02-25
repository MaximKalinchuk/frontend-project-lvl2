const stringify = (stringifiable, depth = 0) => {
  const space = '    ';
  const iter = (value, indentLevel = 0) => {
    const currentIndent = space.repeat(indentLevel + 1);
    const braceIndent = space.repeat(indentLevel);

    if (typeof value === 'object' && value !== null) {
      const entries = Object.entries(value);
      const items = entries.map(([key, val]) => (
        `${currentIndent}${key}: ${iter(val, indentLevel + 1)}`
      ));

      return [
        '{',
        ...items,
        `${braceIndent}}`,
      ].join('\n');
    }

    return String(value);
  };
  return iter(stringifiable, depth);
};

const formatStylish = (objDiff) => {
  const iter = (obj, depth = 0) => {
    const indent = '    '.repeat(depth);
    const result = [
      '{',
      ...obj.map(({
        key, value1, value2, type, children,
      }) => {
        if (type === 'add') {
          return `${indent}  + ${key}: ${stringify(value2, depth + 1)}`;
        }
        if (type === 'del') {
          return `${indent}  - ${key}: ${stringify(value1, depth + 1)}`;
        }
        if (type === 'object') {
          return `${indent}    ${key}: ${iter(children, depth + 1)}`;
        }
        if (type === 'changed') {
          return `${indent}  - ${key}: ${stringify(value1, depth + 1)}\n`
               + `${indent}  + ${key}: ${stringify(value2, depth + 1)}`;
        }
        return `${indent}    ${key}: ${stringify(value1, depth)}`;
      }),
      `${indent}}`,
    ].join('\n');
    return result;
  };
  return iter(objDiff, 0);
};

export default formatStylish;
