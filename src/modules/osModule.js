import os from 'node:os';

import { colorfulPrint } from '../utils.js';
import { ConsoleColors } from '../variables.js';

export const osModule = {
  os: (_, commandArguments) => {
    const commandStringified = commandArguments.toString().trim();
    const splitedCommand = commandStringified.split(' ').filter(str => str.startsWith('--'));
    const command = splitedCommand[0];

    switch (command) {
      case '--EOL':
        console.dir('os EOL - ' + os.EOL);
        break;
      case '--cpus':
        console.table(os.cpus())
        break;
      case '--homedir':
        colorfulPrint(ConsoleColors.green, os.homedir());
        break;
      case '--username':
        colorfulPrint(ConsoleColors.green, os.userInfo().username);
        break;
      case '--architecture':
        colorfulPrint(ConsoleColors.green, os.arch());
        break;
      default:
        colorfulPrint(ConsoleColors.red, 'Invalid input\n');
        break;
    }
  }
  
}