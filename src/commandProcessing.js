import { fsModule } from './modules/fsModule.js';
import { ConsoleColors } from './variables.js';
import { colorfulPrint } from './utils.js';

export const commandProcessing = async (unprocessedCommand, state) => {
  try {
    const commandStringified = unprocessedCommand.toString().trim();
    const splitedCommand = commandStringified.split(' ');
    const command = splitedCommand[0];
    const commandArguments = splitedCommand.slice(1);

    // put all modules in one big map with all methods throw ... destructarization
    // {
    //   cd
    //   ls
    //   ...
    // }

    switch (command) {
      case 'cd':
        await fsModule.cd(commandArguments, state);
        break;
      case 'ls':
        await fsModule.ls(state);
        break;  
      case 'up':
        await fsModule.up(state)
        break;
      case '.exit':
        console.log(`Thank you for using File Manager, ${username}, goodbye!`);
        process.exit();
      default:
        colorfulPrint(ConsoleColors.red, 'Invalid input');
        break;
    }
    colorfulPrint(ConsoleColors.cyan, `You are currently in ${state.currentDirPath}\n`);
  } catch (error) {
     console.log('Operation failed \n', error);
  }

};