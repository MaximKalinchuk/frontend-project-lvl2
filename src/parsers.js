import { readFileSync } from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export default (filepath) => {
  const format = path.extname(filepath);

  if (format === '.yaml' || format === '.yml') {
    return yaml.load(readFileSync(filepath));
  }
  if (format === '.json') {
    return JSON.parse(readFileSync(filepath));
  }
  return filepath;
};

// const file1 = JSON.parse(readFileSync(path.join(process.cwd(), filepath1)));
// const file2 = JSON.parse(readFileSync(path.join(process.cwd(), filepath2)));
// console.log(file1)
