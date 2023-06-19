
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
  const dirStat = await stat(absolutePathToFile) 

  return dirStat.isDirectory();
}

export const checkIsItFile = async (absolutePathToFile) => {
  const fileStat = await stat(absolutePathToFile) 

  return  dirStat.isFile();
}