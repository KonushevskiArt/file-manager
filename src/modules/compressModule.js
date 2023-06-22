import path from 'node:path';
import { checkIsItFile, createAbsolutePath } from '../utils.js';
import { colorfulPrint } from '../utils.js';
import { ConsoleColors } from '../variables.js';
import { createBrotliCompress, createBrotliDecompress } from 'node:zlib';
import { createReadStream, createWriteStream } from 'node:fs';

export const compressModule = {

  compress: async ({ getCurrentDirPath }, commandArguments) => {
    try {
      const pathToFile = path.normalize(commandArguments[0]);
      const pathToDestination = path.normalize(commandArguments[1]);
      const absolutePathToFile = createAbsolutePath(getCurrentDirPath(), pathToFile); 
      const absolutePathToDestination = createAbsolutePath(getCurrentDirPath(), pathToDestination); 

      const isItFile = await checkIsItFile(absolutePathToFile);
      
      if (isItFile) {
         createReadStream(absolutePathToFile).pipe(createBrotliCompress()).pipe(createWriteStream(absolutePathToDestination));
      } else {
        throw new Error('invalid input');
      }
      
    } catch (error) {
      colorfulPrint(ConsoleColors.green, 'Invalid input\n');
      console.log(error)
    }
  },
  decompress: async ({ getCurrentDirPath }, commandArguments) => {
    try {
      const pathToFile = path.normalize(commandArguments[0]);
      const pathToDestination = path.normalize(commandArguments[1]);
      const absolutePathToFile = createAbsolutePath(getCurrentDirPath(), pathToFile); 
      const absolutePathToDestination = createAbsolutePath(getCurrentDirPath(), pathToDestination); 

      const isItFile = await checkIsItFile(absolutePathToFile);
      
      if (isItFile) {
        createReadStream(absolutePathToFile)
        .pipe(createBrotliDecompress())
        .pipe(createWriteStream(absolutePathToDestination));
          
      } else {
        throw new Error('invalid input');
      }
      
    } catch (error) {
      colorfulPrint(ConsoleColors.green, 'Invalid input\n');
      console.log(error)
    }
  }
}