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

const formattersByNodeTypes = {
  add: (value1, value2, children, indent, key, identDepth) => (`${indent}  + ${key}: ${stringify(value2, identDepth + 1)}`),
  del: (value1, value2, children, indent, key, identDepth) => (`${indent}  - ${key}: ${stringify(value1, identDepth + 1)}`),
  object: (value1, value2, children, indent, key, identDepth, iter) => (`${indent}    ${key}: ${iter(children, identDepth + 1)}`),
  changed: (value1, value2, children, indent, key, identDepth) => ([
    `${indent}  - ${key}: ${stringify(value1, identDepth + 1)}`,
    `${indent}  + ${key}: ${stringify(value2, identDepth + 1)}`,
  ]),
  unchanged: (value1, value2, children, indent, key, identDepth) => (`${indent}    ${key}: ${stringify(value1, identDepth)}`),
};

const formatStylish = (objDiff) => {
  const iter = (obj, depth = 0) => {
    const indent = '    '.repeat(depth);

    const resultItems = obj.map(({
      key, value1, value2, type, children,
    }) => formattersByNodeTypes[type](value1, value2, children, indent, key, depth, iter));

    return [
      '{',
      ...resultItems,
      `${indent}}`,
    ].flat().join('\n');
  };
  return iter(objDiff, 0);
};

export default formatStylish;
