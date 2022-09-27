import { Injectable } from '@nestjs/common';
import { getRequestContext } from '../../app/contexts/requestContext.asyncLocalStorage';
import { mkdir } from 'fs/promises';
import { createWriteStream } from 'fs';
import { GeneratorConfigService } from '../../configuration/services';
import { GeneratorDirectory, GeneratorFile } from '../constants/generatorFilesystem.enum';
import * as jsZip from 'jszip';
import * as fs from 'fs/promises';
import { UseLogger } from '../../logger/decorators';
import { Logger } from 'winston';
import { getFilePathsRecursively } from '../../../util/getFilePaths';
import * as path from 'path';

@Injectable()
export class CliDiskService {
  public constructor(
    @UseLogger('CliDiskService')
    private readonly logger: Logger,
    private readonly configService: GeneratorConfigService,
  ) { }

  public get requestPath() {
    const request = getRequestContext();
    return `${this.configService.tmpDirectory}/${request.correlationId}`;
  }

  public get generatedOutputDirectory() {
    return `${this.requestPath}/output`;
  }

  public async prepareRequestFileSystem() {
    await mkdir(this.requestPath, { recursive: true });

      const templatesDir = `${this.requestPath}/${GeneratorDirectory.Templates}`;
      await mkdir(templatesDir, { recursive: true });
  }

  public writeSchemaToDisk(schema: string) {
    return this.writeToDisk(GeneratorFile.Schema, schema);
  }

  public writeGeneratorOptionsToDisk(options: Record<string, any>) {
    return this.writeToDisk(GeneratorFile.GeneratorOptions, JSON.stringify(options));
  }

  public async zipDirectory(directory: GeneratorDirectory) {
    const sourceDirectory = `${this.requestPath}/${directory}`;
    const filePaths = await getFilePathsRecursively(sourceDirectory);
    const zip = new jsZip();

    for (let filePath of filePaths) {
      const addPath = path.relative(sourceDirectory, filePath);
      const data = await fs.readFile(filePath);
      const stat = await fs.stat(filePath);
      const permissions = stat.mode;

      if (stat.isSymbolicLink()) {
        const link = fs.readlink(filePath);
        zip.file(addPath, link, {
          unixPermissions: parseInt('120755', 8),
          dir: stat.isDirectory(),
        });
      } else {
        zip.file(addPath, data, {
          unixPermissions: permissions,
          dir: stat.isDirectory(),
        });
      }
    }

    return zip.generateNodeStream({
      type: 'nodebuffer',
      streamFiles: true,
    });
  }

  private writeToDisk(file: GeneratorFile, content: string) {
    const finalPath = `${this.requestPath}/${file}`;
    const writeStream = createWriteStream(finalPath);

    return new Promise<string>((resolve, reject) => {
      writeStream.on('close', () => resolve(finalPath));
      writeStream.on('error', reject);
      writeStream.write(content);
      writeStream.end();
    });
  }
}
