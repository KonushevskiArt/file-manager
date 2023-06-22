import os from 'node:os';
import { argv } from 'node:process';
import { ConsoleColors } from './variables.js';
import { colorfulPrint } from './utils.js';
import { commandProcessing } from './commandProcessing.js';

export const initialization = () => {
  const paramUsername = argv.slice(2)[0];
  
  const state = {
    _username: /=.+$/.exec(paramUsername)[0].slice(1),
    _currentDirPath: os.homedir(),
    getUserName: function() {return this._username},
    setCurrentDirPath: function(newPath) {return this._currentDirPath = newPath },
    getCurrentDirPath: function() {return this._currentDirPath}, 
  }

  const externalStateInterface = {
    getUserName: state.getUserName.bind(state), 
    getCurrentDirPath: state.getCurrentDirPath.bind(state), 
    setCurrentDirPath: state.setCurrentDirPath.bind(state)
  }
  
  colorfulPrint(ConsoleColors.green, `Welcome to the File Manager, ${state.getUserName()}!`);
  console.log('Print commands and wait for results...')
  
  process.on('SIGINT', function() {
    colorfulPrint(ConsoleColors.green, `Thank you for using File Manager, ${state.getUserName()}, goodbye!`);
    process.exit();
  });
  
  process.stdin.on('data', (command) => {
    commandProcessing(command, externalStateInterface);
  });
  
  process.on('uncaughtException', (error) => {
    console.log('Operation failed\n', error);
    colorfulPrint(ConsoleColors.cyan, `You are currently in ${state.getCurrentDirPath()}\n`);
  })
}