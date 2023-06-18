import os from 'node:os';
import { argv } from 'node:process';
import { ConsoleColors } from './variables.js';
import { colorfulPrint } from './utils.js';
import { commandProcessing } from './commandProcessing.js';

export const initialization = () => {
  const paramUsername = argv.slice(2)[0];

  const state = {
    username: /=.+$/.exec(paramUsername)[0].slice(1),
    currentDirPath: os.homedir(),
  }
  
  colorfulPrint(ConsoleColors.green, `Welcome to the File Manager, ${state.username}!`);
  console.log('Print commands and wait for results...')
  
  process.on('SIGINT', function() {
    console.log(`Thank you for using File Manager, ${state.username}, goodbye!`);
    process.exit();
  });
  
  process.stdin.on('data', (command) => {
    commandProcessing(command, state);
  });
  
  process.on('uncaughtException', (error) => {
    console.log('Operation failed', error)
  })
}