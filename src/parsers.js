import yaml from 'js-yaml';

const getFormat = (format) => {
  if (format === 'yaml') {
    return yaml.load;
  }
  if (format === 'json') {
    return JSON.parse;
  }
  throw new Error('Wrong format');
};

export default (content, format) => {
  const parse = getFormat(format);
  return parse(content);
};
