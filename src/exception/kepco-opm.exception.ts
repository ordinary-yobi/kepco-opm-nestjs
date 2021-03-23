/**
 *
 */
export enum KepcoOpmError {
  NO_SERVICE_KEY = 'NoServiceKey',
  INSUFFICIENT_PERMISSION = 'InsufficientPermission',
  DEFAULT = 'Error',
}

/**
 *
 */
export class KepcoOpmException extends Error {
  private readonly detail: string;

  constructor(message: KepcoOpmError, detail?: string) {
    super(message);
    this.detail = detail;
    console.log(detail);
  }
}
