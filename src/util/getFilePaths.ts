import * as fs from 'fs/promises';
import * as path from 'path';

export const getFilePathsRecursively = async (dir: string) => {
  let results: string[] = [];
  let list = await fs.readdir(dir);

  let pending = list.length;
  if (!pending) return results;

  for (let file of list) {
    file = path.resolve(dir, file);

    let stat = await fs.lstat(file);

    if (stat && stat.isDirectory()) {
      results = results.concat(await getFilePathsRecursively(file));
    } else {
      results.push(file);
    }

    if (!--pending) return results;
  }

  return results;
};

