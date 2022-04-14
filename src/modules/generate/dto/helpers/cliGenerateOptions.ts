import { IsObject, IsJSON, IsEnum, IsString, IsBoolean } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { TemplatingEngine } from '../../constants';

export class CliGenerateOptions {
  @IsJSON()
  @ApiPropertyOptional({
    type: Object,
    description: 'Authorization headers when fetching the OpenAPI definitions remotely.',
  })
  public readonly authorization?: string;

  @IsString()
  @ApiPropertyOptional({
    description: 'Suffix that will be appended to all API names ("tags").',
  })
  public readonly apiNameSuffix?: string;

  @IsString()
  @ApiPropertyOptional({
    description: 'Package for generated api classes.',
  })
  public readonly apiPackage?: string;

  @IsString()
  @ApiPropertyOptional({
    description: `artifactId in generated pom.xml. \
    This also becomes part of the generated library's filename.`,
  })
  public readonly artifactId?: string;

  @IsString()
  @ApiPropertyOptional({
    description: `artifactVersion in generated pom.xml. \
    This also becomes part of the generated library's filename.`,
  })
  public readonly artifactVersion?: string;

  @IsBoolean()
  @ApiPropertyOptional({
    description: `Try things out and report on potential changes \
    (without actually making changes).`,
  })
  public readonly dryRun?: boolean;

  @IsEnum(TemplatingEngine)
  @ApiPropertyOptional({
    type: 'enum',
    enum: TemplatingEngine,
    description: 'Templating engine to use for generating code.',
  })
  public templatingEngine?: string;

  @IsBoolean()
  @ApiPropertyOptional({
    description: 'Enable post-processing file using environment variables.',
  })
  public readonly enablePostProcessFile?: boolean;


  @IsBoolean()
  @ApiPropertyOptional({
    description: 'Generate model implementation for aliases to map and array schemas.',
  })
  public readonly generateAliasAsModel?: boolean;

  @IsString()
  @ApiPropertyOptional({
    description: 'Git host, e.g. gitlab.com.',
  })
  public readonly gitHost?: string;

  @IsString()
  @ApiPropertyOptional({
    description: 'Git user ID, e.g. kamilczak020.',
  })
  public readonly gitUserId?: string;

  @IsString()
  @ApiPropertyOptional({
    description: 'Git repo ID, e.g. openapi-generator-api.',
  })
  public readonly gitRepoId?: string;


  @IsObject()
  @ApiPropertyOptional({
    type: Object,
    description: 'Sets specified global properties.',
  })
  public readonly globalProperties?: Record<string, string>;

  @IsString()
  @ApiPropertyOptional({
    description: 'groupId in generated pom.xml.',
  })
  public readonly groupId?: string;

  @IsString()
  @ApiPropertyOptional({
    description: 'HTTP user agent, e.g. codegen_csharp_api_client.',
    default: 'OpenAPI-Generator/{packageVersion}/{language}',
  })
  public readonly httpUserAgent?: string;

  @IsString({ each: true })
  @ApiPropertyOptional({
    type: [String],
    description: 'Specifies files to be put into .openapi-generator-ignore.',
  })
  public readonly ignoreFileOverride?: Array<string>;

  @IsObject()
  @ApiPropertyOptional({
    type: Object,
    description: `Specifies mappings between a given class \
    and the import that should be used for that class.`,
  })
  public readonly importMappings?: Record<string, string>;

  @IsObject()
  @ApiPropertyOptional({
    type: Object,
    description: 'Sets instantiation type mappings.',
  })
  public readonly instantiationTypes?: Record<string, string>;

  @IsString()
  @ApiPropertyOptional({
    description: 'Root package for generated code.',
  })
  public readonly invokerPackage?: string;

  @IsString({ each: true })
  @ApiPropertyOptional({
    description: 'Specifies additional language specific primitive types.',
  })
  public readonly languageSpecificPrimitives?: Array<string>;


  @IsBoolean()
  @ApiPropertyOptional({
    description: `Set to false for generators with better support for discriminators. \
    (Python, Java, Go, PowerShell, C#have this enabled by default).`,
  })
  public readonly legacyDiscriminatorBehavior?: boolean;

  @IsString()
  @ApiPropertyOptional({
    description: 'library template (sub-template).',
  })
  public readonly library?: string;

  @IsBoolean()
  @ApiPropertyOptional({
    description: 'Only write output files that have changed.',
  })
  public readonly minimalUpdate?: boolean;

  @IsString()
  @ApiPropertyOptional({
    description: 'Prefix that will be prepended to all model names.',
  })
  public readonly modelNamePrefix?: string;

  @IsString()
  @ApiPropertyOptional({
    description: 'Suffix that will be prepended to all model names.',
  })
  public readonly modelNameSuffix?: string;

  @IsString()
  @ApiPropertyOptional({
    description: 'Package for generated models.',
  })
  public readonly modelPackage?: string;

  @IsObject()
  @ApiPropertyOptional({
    type: Object,
    description: `sets additional properties that can be referenced \
    by the mustache templates`,
  })
  public readonly additionalProperties?: Record<string, any>;

  @IsString()
  @ApiPropertyOptional({
    description: 'Package for generated classes (where supported).',
  })
  public readonly packageName?: string;

  @IsString()
  @ApiPropertyOptional({
    description: 'Release note.',
    default: 'Minor update',
  })
  public readonly releaseNote?: string;

  @IsBoolean()
  @ApiPropertyOptional({
    description: 'Remove prefix of operationId, e.g. config_getId => getId.',
  })
  public readonly removeOperationIdPrefix?: boolean;

  @IsObject()
  @ApiPropertyOptional({
    type: Object,
    default: '_<name>',
    description: `Specifies how a reserved name should be escaped to. \
    You can also have multiple occurrences of these options.`,
  })
  public readonly reservedWordsMappings?: Record<string, any>;

  @IsObject()
  @ApiPropertyOptional({
    type: Object,
    description: `Sets server variables overrides for spec documents \
    which support variable templating of servers.`,
  })
  public readonly serverVariables?: Record<string, any>;

  @IsBoolean()
  @ApiPropertyOptional({
    description: 'Skip examples defined in operations to avoid out of memory errors.',
  })
  public readonly skipOperationExample?: boolean;

  @IsBoolean()
  @ApiPropertyOptional({
    description: 'Skips the default behavior of validating an input specification.',
  })
  public readonly skipValidateSpec?: boolean;

  @IsBoolean()
  @ApiPropertyOptional({
    description: `'MUST' and 'SHALL' wording in OpenAPI spec is strictly adhered to.
    e.g. when false, no fixes will be applied to documents which pass
    validation but don't follow the spec.`,
  })
  public readonly strictSpec?: boolean;

  @IsObject()
  @ApiPropertyOptional({
    type: Object,
    description: 'Sets mappings between OpenAPI spec types and generated code types.',
  })
  public readonly typeMappings?: Record<string, any>;
}
