import path from 'node:path';
import { stat } from 'node:fs/promises';

export const colorfulPrint = (color, message) => {
  const reset = "\x1b[0m";
  console.log(color, message)
  console.log(reset);
}

export const createAbsolutePath = (currentDirPath, pathToFile) => {
  const absolutePathToFile = path.isAbsolute(pathToFile) 
    ? path.join(pathToFile) 
    : path.join(currentDirPath, pathToFile);
    
  return absolutePathToFile;
} 

export const checkIsItDir = async (absolutePathToFile) => {
  try {
    const dirStat = await stat(absolutePathToFile) 
  
    return dirStat.isDirectory();
  } catch (error) {
    return false;
  }
}

export const checkIsItFile = async (absolutePathToFile) => {
  try {
    const fileStat = await stat(absolutePathToFile) 
  
    return  fileStat.isFile();
  } catch (error) {
    return false 
  }
}