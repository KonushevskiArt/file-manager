import { fsModule } from './modules/fsModule.js';
import { osModule } from './modules/osModule.js';
import { ConsoleColors } from './variables.js';
import { colorfulPrint } from './utils.js';

export const commandProcessing = async (unprocessedCommand, externalStateInterface) => {
  try {
    const { getUserName, getCurrentDirPath } = externalStateInterface;
    const commandStringified = unprocessedCommand.toString().trim();
    const splitedCommand = commandStringified.split(' ');
    const command = splitedCommand[0];
    const commandArguments = splitedCommand.slice(1);

    const uniteModule = { 
      ...fsModule,
      ...osModule, 
    };

    if (uniteModule[command]) {
      await uniteModule[command](externalStateInterface, commandArguments);
      colorfulPrint(ConsoleColors.cyan, `You are currently in ${getCurrentDirPath()}\n`);
    } else if (command.toLowerCase() === '.exit') {
      console.log(`Thank you for using File Manager, ${getUserName()}, goodbye!`);
      process.exit();
    } else {
      colorfulPrint(ConsoleColors.red, 'Invalid input');
      colorfulPrint(ConsoleColors.cyan, `You are currently in ${getCurrentDirPath()}\n`);
    }

  } catch (error) {
     console.log('Operation failed \n', error);
  }

};