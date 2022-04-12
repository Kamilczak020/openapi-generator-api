import { DocumentBuilder, SwaggerModule, OpenAPIObject } from '@nestjs/swagger';
import { SwaggerConfigService } from '../configuration/services';
import { INestApplication } from '@nestjs/common';
import { readFile, writeFile } from 'fs/promises';
import { isEqual } from 'lodash';

export abstract class SwaggerBootstrapper {
  public static async bootstrap(app: INestApplication) {
    const swaggerConfig = app.get(SwaggerConfigService);

    const config = new DocumentBuilder()
      .setTitle(swaggerConfig.title)
      .setVersion(swaggerConfig.version)
      .setDescription(swaggerConfig.description)
      .addTag(
        'Codegen',
        'Operations regarding code generation.',
      )
      .build();

    const newDocument = SwaggerModule.createDocument(app, config);
    await this.writeSchemaToDisk(newDocument, swaggerConfig.schemaFilePath);

    SwaggerModule.setup(swaggerConfig.path, app, newDocument);
  }

  private static async writeSchemaToDisk(
    newDocument: OpenAPIObject,
    schemaFilePath: string,
  ) {
    try {
      const oldDocumentContentBuffer = await readFile(schemaFilePath);
      const oldDocument = oldDocumentContentBuffer.toJSON();
      if (!isEqual(oldDocument, newDocument)) {
        writeFile(schemaFilePath, JSON.stringify(newDocument));
      }
    } catch (error) {
      console.log('Api schema missing or unreadable, skipping comparison and forcing regeneration.');
      writeFile(schemaFilePath, JSON.stringify(newDocument));
    }
  }
}