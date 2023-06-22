import { readdir, stat, rename as renameFile, rm } from 'node:fs/promises';
import { pipeline } from 'node:stream/promises';
import path from 'node:path';
import { createReadStream, createWriteStream } from 'node:fs';
import { checkIsItDir, checkIsItFile, createAbsolutePath } from '../utils.js';
import { writeFile } from 'node:fs/promises';

export const fsModule = {

  cd: async ({ setCurrentDirPath, getCurrentDirPath }, commandArguments) => {
    try {
      const pathToFile = path.normalize(commandArguments[0]);
      const absolutePathToFile = createAbsolutePath(getCurrentDirPath(), pathToFile); 

      if (await checkIsItDir(absolutePathToFile)) {
        setCurrentDirPath(absolutePathToFile);
      } else {
        throw new Error('Invalid input');
      }
    } catch (error) {
      console.log('Invalid input\n', error);
    }
  },

  cat: async ({ getCurrentDirPath }, commandArguments) => {
    try {
      const pathToFile = path.normalize(commandArguments[0]);
      const absolutePathToFile = createAbsolutePath(getCurrentDirPath(), pathToFile);
      const isItFile = await checkIsItFile(absolutePathToFile);
  
      if (isItFile) {
        createReadStream(absolutePathToFile).pipe(process.stdout); 
      } else {
        throw new Error('invalid input');
      }
    } catch (error) {
      console.log('invalid input\n', error);
    }
  },

  add: async ({ getCurrentDirPath }, commandArguments) => {
    try {
      const fileName = commandArguments[0];
      const absolutePathToFile = createAbsolutePath(getCurrentDirPath(), fileName);
      await writeFile(absolutePathToFile, '', {flag: 'ax'});
    } catch (error) {
      console.log('invalid input\n', error)
    }
  },

  rn: async ({ getCurrentDirPath }, commandArguments) => {
    try {
      const pathToFile = commandArguments[0];
      const newFileName = commandArguments[1];
      const absolutePathToFile = createAbsolutePath(getCurrentDirPath(), pathToFile);
      const absolutePathToNewFile = createAbsolutePath(getCurrentDirPath(), newFileName);
      
      if (await checkIsItFile(absolutePathToNewFile)) {
        throw new Error('Invalid input, this file already exist!')
      } else {
        await renameFile(absolutePathToFile, absolutePathToNewFile);
      }
    } catch (error) {
      console.log('Invalid input\n', error);
    }
  }, 

  cp: async ({ getCurrentDirPath }, commandArguments) => {
    try {
      const pathToFile = commandArguments[0];
      const pathToNewDir = commandArguments[1];
  
      const absolutePathToFile = createAbsolutePath(getCurrentDirPath(), pathToFile);
      const absolutePathToNewDir = createAbsolutePath(getCurrentDirPath(), pathToNewDir);
      const absolutePathToNewFile = path.join(absolutePathToNewDir, path.basename(absolutePathToFile));

      if (await checkIsItFile(absolutePathToNewFile)) {
        throw new Error('this file already exist!')
      } else {
        pipeline(
          createReadStream(absolutePathToFile),
          createWriteStream(absolutePathToNewFile),
        );
      }
    } 

    catch (error) {
      console.log('Invalid input\n', error);
    }
  },

  mv: async ({ getCurrentDirPath }, commandArguments) => {
    try {
      const pathToFile = commandArguments[0];
      const pathToNewDir = commandArguments[1];
  
      const absolutePathToFile = createAbsolutePath(getCurrentDirPath(), pathToFile);
      const absolutePathToNewDir = createAbsolutePath(getCurrentDirPath(), pathToNewDir);
      const absolutePathToNewFile = path.join(absolutePathToNewDir, path.basename(absolutePathToFile)); 
  
      if (await checkIsItFile(absolutePathToNewFile)) {
        throw new Error('this file already exist!')
      } else {
        pipeline(
          createReadStream(absolutePathToFile),
          createWriteStream(absolutePathToNewFile),
        );
        rm(absolutePathToFile);
      }
     
    } catch (error) {
      console.log('invalid input\n', error)
    }
  },

  rm: ({ getCurrentDirPath }, commandArguments) => {
    try {
      const pathToFile = commandArguments[0];
      const absolutePathToFile = createAbsolutePath(getCurrentDirPath(), pathToFile);
  
      rm(absolutePathToFile);
      
    } catch (error) {
      console.log('invalid input\n', error)
    }
  },

  up: async ({ getCurrentDirPath, setCurrentDirPath }) => {
    const res = path.resolve(getCurrentDirPath(), `..${path.sep}`);
    setCurrentDirPath(res);
  },

  ls: async ({ getCurrentDirPath }) => {
    try {
      const dirItems = await readdir(getCurrentDirPath());
    
      const promisesArr = dirItems.map(dirItem => {
        return new Promise((resolve) => {
          stat(path.join(getCurrentDirPath(), dirItem))
          .then(data => resolve({name: dirItem, type: data.isFile() ? 'file' : data.isDirectory() ? 'directory' : 'else'}));
        })
      })
  
      const res = await Promise.all(promisesArr);
  
      const sortedRes = res.sort().reverse().sort((el1) => {
        if (el1.type === 'directory') {
          return -1;
        };
        return 1; 
      })
  
      console.table(sortedRes);
      
    } catch (error) {
      console.log('invalid input\n', error)
    }
  }

}