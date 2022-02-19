import yaml from 'js-yaml';

export default (content, format) => {
  if (format === '.yaml') {
    return yaml.load(content);
  }
  if (format === '.json') {
    return JSON.parse(content);
  }
  throw new Error('Wrong format');
};
