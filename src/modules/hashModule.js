import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { checkIsItFile, createAbsolutePath } from '../utils.js';
import { colorfulPrint } from '../utils.js';
import { ConsoleColors } from '../variables.js';

export const hashModule = {

  hash: async ({ getCurrentDirPath }, commandArguments) => {
    try {
      const pathToFile = path.normalize(commandArguments[0]);
      const absolutePathToFile = createAbsolutePath(getCurrentDirPath(), pathToFile); 

      const isItFile = await checkIsItFile(absolutePathToFile);
      
      if (isItFile) {
 
        const data = await readFile(absolutePathToFile);
        const hashedData = createHash('sha256').update(data);

        console.log(hashedData.digest('hex'));
      } else {
        throw new Error('invalid input');
      }
      
    } catch (error) {
      colorfulPrint(ConsoleColors.green, 'Invalid input\n');
      console.log(error)
    }
  },
}