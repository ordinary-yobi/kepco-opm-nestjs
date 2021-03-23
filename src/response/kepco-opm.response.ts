import { KepcoOpmError, KepcoOpmException } from '../exception/kepco-opm.exception';

/**
 *
 */
export type RawResponse = { [key: string]: any };

/**
 *
 */
export abstract class OpmResponse<T> {
  protected readonly rawResponse: RawResponse;

  protected readonly key: string;

  protected readonly data: T[] = [];

  protected constructor(rawResponse: RawResponse, key: string) {
    this.rawResponse = rawResponse ?? ({}[key] = []);
    this.key = key;
    this.checkError();
  }

  /**
   * 응답에 오류를 확인합니다.
   * @protected
   */
  private checkError(): void {
    const list = this.rawResponse[this.key];
    const error = list[0]?.errMsg;
    const code = list[1]?.returnCode;
    if (error || code) {
      throw new KepcoOpmException(
        KepcoOpmError.DEFAULT,
        `error: ${error}, code: ${code}`,
      );
    }
  }

  /**
   * raw response 를 일부 수정하여 반환합니다.
   */
  public getData(): T[] {
    return this.data;
  }
}
