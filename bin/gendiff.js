#!/usr/bin/env node

import { Command } from 'commander/esm.mjs';
const program = new Command();
program
    .description('Compares two configuration files and shows a difference.')
    .version('0.0.1', '-v, --version', 'output the current version')

    .option('-f, --format [type]', 'output format')
    .argument('<filepath1> <filepath2>')
program.parse();