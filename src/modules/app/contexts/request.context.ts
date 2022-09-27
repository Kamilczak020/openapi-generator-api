import * as uuid from 'uuid';
import { CliDiskService } from '../../shared/services/cliDisk.service';

export class RequestContext {
  private _isAuthorized: boolean;
  public get isAuthorized(): boolean {
    return this._isAuthorized;
  }

  public readonly correlationId: string;

  public constructor(private readonly cliDiskService: CliDiskService) {
    this.correlationId = uuid.v4();
  }

  public async prepareRequestFiles() {
    await this.cliDiskService.prepareRequestFileSystem();
  }
}
