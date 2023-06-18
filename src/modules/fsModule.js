import { readdir, access, stat } from 'node:fs/promises';
import path from 'node:path';

export const fsModule = {
  cd: async (commandArguments, state) => {
    try {
      const arg1 = path.normalize(commandArguments[0]);
      const isAbsolutePath = path.isAbsolute(arg1);

      const dirStat = isAbsolutePath 
      ? await stat(path.join(arg1)) 
      : await stat(path.join(state.currentDirPath, arg1));

      const isDir = dirStat.isDirectory();

      if (isDir) {
        state.currentDirPath = isAbsolutePath 
        ? arg1
        : path.join(state.currentDirPath, arg1);
      } else {
        throw new Error('You can not read fila like directory!');
      }
    } catch (error) {
      console.log('Invalid input');
    }
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