import { IsObject, IsJSON, IsEnum, IsString, IsBoolean } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { TemplatingEngine } from '../../constants';
import { GenerateCliFlagName } from '../../decorators';

export class CliGenerateOptions {
  @IsJSON()
  @ApiPropertyOptional({
    type: Object,
    description: 'Authorization headers when fetching the OpenAPI definitions remotely.',
  })
  @GenerateCliFlagName('--auth')
  public readonly authorization?: string;

  @IsString()
  @ApiPropertyOptional({
    description: 'Suffix that will be appended to all API names ("tags").',
  })
  @GenerateCliFlagName('--api-name-suffix')
  public readonly apiNameSuffix?: string;

  @IsString()
  @ApiPropertyOptional({
    description: 'Package for generated api classes.',
  })
  @GenerateCliFlagName('--api-package')
  public readonly apiPackage?: string;

  @IsString()
  @ApiPropertyOptional({
    description: 'artifactId in generated pom.xml. \
    This also becomes part of the generated library\'s filename.',
  })
  @GenerateCliFlagName('--artifact-id')
  public readonly artifactId?: string;

  @IsString()
  @ApiPropertyOptional({
    description: 'artifactVersion in generated pom.xml. \
    This also becomes part of the generated library\'s filename.',
  })
  @GenerateCliFlagName('--artifact-version')
  public readonly artifactVersion?: string;

  @IsBoolean()
  @ApiPropertyOptional({
    description: 'Try things out and report on potential changes \
    (without actually making changes).',
  })
  @GenerateCliFlagName('--dry-run')
  public readonly dryRun?: boolean;

  @IsEnum(TemplatingEngine)
  @ApiPropertyOptional({
    type: 'enum',
    enum: TemplatingEngine,
    description: 'Templating engine to use for generating code.',
  })
  @GenerateCliFlagName('--engine')
  public templatingEngine?: string;

  @IsBoolean()
  @ApiPropertyOptional({
    description: 'Enable post-processing file using environment variables.',
  })
  @GenerateCliFlagName('--enable-post-process-file')
  public readonly enablePostProcessFile?: boolean;


  @IsBoolean()
  @ApiPropertyOptional({
    description: 'Generate model implementation for aliases to map and array schemas.',
  })
  @GenerateCliFlagName('--generate-alias-as-model')
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
  @GenerateCliFlagName('--git-user-id')
  public readonly gitUserId?: string;

  @IsString()
  @ApiPropertyOptional({
    description: 'Git repo ID, e.g. openapi-generator-api.',
  })
  @GenerateCliFlagName('--git-repo-id')
  public readonly gitRepoId?: string;


  @IsObject()
  @ApiPropertyOptional({
    type: Object,
    description: 'Sets specified global properties.',
  })
  @GenerateCliFlagName('--global-property')
  public readonly globalProperties?: Record<string, string>;

  @IsString()
  @ApiPropertyOptional({
    description: 'groupId in generated pom.xml.',
  })
  @GenerateCliFlagName('--group-id')
  public readonly groupId?: string;

  @IsString()
  @ApiPropertyOptional({
    description: 'HTTP user agent, e.g. codegen_csharp_api_client.',
    default: 'OpenAPI-Generator/{packageVersion}/{language}',
  })
  @GenerateCliFlagName('--http-user-agent')
  public readonly httpUserAgent?: string;

  @IsString({ each: true })
  @ApiPropertyOptional({
    type: [String],
    description: 'Specifies files to be put into .openapi-generator-ignore.',
  })
  @GenerateCliFlagName('--ignore-file-override')
  public readonly ignoreFileOverride?: Array<string>;

  @IsObject()
  @ApiPropertyOptional({
    type: Object,
    description: 'Specifies mappings between a given class \
    and the import that should be used for that class.',
  })
  @GenerateCliFlagName('--import-mappings')
  public readonly importMappings?: Record<string, string>;

  @IsObject()
  @ApiPropertyOptional({
    type: Object,
    description: 'Sets instantiation type mappings.',
  })
  @GenerateCliFlagName('--instantiation-types')
  public readonly instantiationTypes?: Record<string, string>;

  @IsString()
  @ApiPropertyOptional({
    description: 'Root package for generated code.',
  })
  @GenerateCliFlagName('--invoker-package')
  public readonly invokerPackage?: string;

  @IsString({ each: true })
  @ApiPropertyOptional({
    description: 'Specifies additional language specific primitive types.',
  })
  @GenerateCliFlagName('--language-specific-primitives')
  public readonly languageSpecificPrimitives?: Array<string>;


  @IsBoolean()
  @ApiPropertyOptional({
    description: 'Set to false for generators with better support for discriminators. \
    (Python, Java, Go, PowerShell, C#have this enabled by default).',
  })
  @GenerateCliFlagName('--legacy-discriminator-behavior')
  public readonly legacyDiscriminatorBehavior?: boolean;

  @IsString()
  @ApiPropertyOptional({
    description: 'library template (sub-template).',
  })
  @GenerateCliFlagName('--library')
  public readonly library?: string;

  @IsBoolean()
  @ApiPropertyOptional({
    description: 'Only write output files that have changed.',
  })
  @GenerateCliFlagName('--minimal-update')
  public readonly minimalUpdate?: boolean;

  @IsString()
  @ApiPropertyOptional({
    description: 'Prefix that will be prepended to all model names.',
  })
  @GenerateCliFlagName('--model-name-prefix')
  public readonly modelNamePrefix?: string;

  @IsString()
  @ApiPropertyOptional({
    description: 'Suffix that will be prepended to all model names.',
  })
  @GenerateCliFlagName('--model-name-suffix')
  public readonly modelNameSuffix?: string;

  @IsString()
  @ApiPropertyOptional({
    description: 'Package for generated models.',
  })
  @GenerateCliFlagName('--model-package')
  public readonly modelPackage?: string;

  @IsObject()
  @ApiPropertyOptional({
    type: Object,
    description: 'sets additional properties that can be referenced \
    by the mustache templates',
  })
  @GenerateCliFlagName('--additional-properties')
  public readonly additionalProperties?: Record<string, any>;

  @IsString()
  @ApiPropertyOptional({
    description: 'Package for generated classes (where supported).',
  })
  @GenerateCliFlagName('--package-name')
  public readonly packageName?: string;

  @IsString()
  @ApiPropertyOptional({
    description: 'Release note.',
    default: 'Minor update',
  })
  @GenerateCliFlagName('--release-note')
  public readonly releaseNote?: string;

  @IsBoolean()
  @ApiPropertyOptional({
    description: 'Remove prefix of operationId, e.g. config_getId => getId.',
  })
  @GenerateCliFlagName('--remove-operation-id-prefix')
  public readonly removeOperationIdPrefix?: boolean;

  @IsObject()
  @ApiPropertyOptional({
    type: Object,
    default: '_<name>',
    description: 'Specifies how a reserved name should be escaped to. \
    You can also have multiple occurrences of these options.',
  })
  @GenerateCliFlagName('--reserved-words-mappings')
  public readonly reservedWordsMappings?: Record<string, any>;

  @IsObject()
  @ApiPropertyOptional({
    type: Object,
    description: 'Sets server variables overrides for spec documents \
    which support variable templating of servers.',
  })
  @GenerateCliFlagName('--server-variables')
  public readonly serverVariables?: Record<string, any>;

  @IsBoolean()
  @ApiPropertyOptional({
    description: 'Skip examples defined in operations to avoid out of memory errors.',
  })
  @GenerateCliFlagName('--skip-examples')
  public readonly skipOperationExample?: boolean;

  @IsBoolean()
  @ApiPropertyOptional({
    description: 'Skips the default behavior of validating an input specification.',
  })
  @GenerateCliFlagName('--skip-validate-spec')
  public readonly skipValidateSpec?: boolean;

  @IsBoolean()
  @ApiPropertyOptional({
    description: `'MUST' and 'SHALL' wording in OpenAPI spec is strictly adhered to.
    e.g. when false, no fixes will be applied to documents which pass
    validation but don't follow the spec.`,
  })
  @GenerateCliFlagName('--strict-spec')
  public readonly strictSpec?: boolean;

  @IsObject()
  @ApiPropertyOptional({
    type: Object,
    description: 'Sets mappings between OpenAPI spec types and generated code types.',
  })
  @GenerateCliFlagName('--type-mappings')
  public readonly typeMappings?: Record<string, any>;
}
