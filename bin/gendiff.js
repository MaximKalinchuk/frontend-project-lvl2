#!/usr/bin/env node

import { Command } from 'commander';
import genDiff from '../src/genDiff.js';

const program = new Command();
program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1', '-v, --version', 'output the current version')
  .option('-f, --format [type]', 'output format')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2) => genDiff(filepath1, filepath2));

program.parse();
