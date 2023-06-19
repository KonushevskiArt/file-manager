import { readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { createReadStream } from 'node:fs';
import { checkIsItDir, checkIsItFile, createAbsolutePath } from '../utils';


export const fsModule = {
  cd: async (commandArguments, state) => {
    try {
      const pathToFile = path.normalize(commandArguments[0]);

      const absolutePathToFile = createAbsolutePath(state.currentDirPath, pathToFile); 

      // const dirStat = await stat(absolutePathToFile) 

      // const isDir = dirStat.isDirectory();

      if (await checkIsItDir(absolutePathToFile)) {
        state.currentDirPath = absolutePathToFile;
      } else {
        throw new Error('Invalid input');
      }
    } catch (error) {
      console.log('Invalid input');
    }
  },
  cat: async (state, commandArguments) => {
    const pathToFile = path.normalize(commandArguments[0]);
    const absolutePathToFile = createAbsolutePath(state.currentDirPath, pathToFile);
    checkIsItFile(absolutePathToFile)
    if (await checkIsItFile(absolutePathToFile)) {
      createReadStream(readFilePath).pipe(process.stdout); 
    }
    // check is file if not throw invalid input
    // check absolute path or relative 
    // readable stream 
    // Read file and print it's content in console (should be done using Readable stream)
  },
  add: async (state, commandArguments) => {
    const fileName = commandArguments[0];
    //Create empty file in current working directory:
  },
  rn: async (state, commandArguments) => {
    const pathToFile = commandArguments[0];
    const newFileName = commandArguments[1];
    //pathToFile, newFileName get it
    // Rename file (content should remain unchanged):
  },  
  up: async (state) => {
    const res = path.resolve(state.currentDirPath, `..${path.sep}`);
    state.currentDirPath = res;
  },
  ls: async (state) => {
    const dirItems = await readdir(state.currentDirPath);
  
    const promisesArr = dirItems.map(dirItem => {
      return new Promise((resolve) => {
        stat(path.join(state.currentDirPath, dirItem))
        .then(data => resolve({name: dirItem, type: data.isFile() ? 'file' : data.isDirectory() ? 'directory' : 'else'}));
      })
    })

    const res = await Promise.all(promisesArr);

    const sortedRes = res.sort().reverse().sort((el1, el2) => {
      if (el1.type === 'directory') {
        return -1;
      };
      return 1; 
    })

    console.table(sortedRes);
  }

}