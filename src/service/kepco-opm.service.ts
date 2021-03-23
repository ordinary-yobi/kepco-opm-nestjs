import { HttpService, Inject, Injectable, Logger } from '@nestjs/common';
import {
  DrApiOperation,
  KEPCO_OPM_MODULE_CONFIG_KEY,
  KukminApiOperation,
  OpenApiOperation,
} from '../constants';
import { KepcoOPMConfig, QueryParameterMap } from '../interfaces';
import * as url from 'url';
import {
  KepcoOpmError,
  KepcoOpmException,
} from '../exception/kepco-opm.exception';

@Injectable()
export class KepcoOpmService {
  private readonly logger: Logger = new Logger(this.constructor.name);

  // 2.1
  // 2020.05.19
  // API 수정
  // 7번 고객정보, 8번 청구정보 API 수정
  // private readonly apiVersion = '2.1';
  //
  private readonly apiUrl = 'https://opm.kepco.co.kr:11080';

  //
  private readonly serviceKey: string | undefined;

  //
  private readonly httpService: HttpService;

  /**
   *
   * @param serviceKey
   * @param httpService
   * @protected
   */
  constructor(
    @Inject(KEPCO_OPM_MODULE_CONFIG_KEY)
    { serviceKey }: KepcoOPMConfig = {
      serviceKey: undefined,
    },
    httpService: HttpService,
  ) {
    this.serviceKey = serviceKey;
    this.httpService = httpService;
    this.logger.debug(`serviceKey: ${this.serviceKey}`);
  }

  /**
   *
   * @param operation
   * @private
   */
  protected getUrl(
    operation: OpenApiOperation | DrApiOperation | KukminApiOperation,
  ): string {
    return `${this.apiUrl}/${operation}`;
  }

  /**
   * 하나의 service key 로 사용하는 경우도있지만, 여러 사업자의 service key 를 사용해야 할 수 있기 때문에
   * @param serviceKey
   * @private
   */
  protected getServiceKey(serviceKey: string): string {
    const key = serviceKey ?? this.serviceKey;
    if (key) {
      return key;
    }
    throw new KepcoOpmException(KepcoOpmError.NO_SERVICE_KEY);
  }

  /**
   * 요청 보내기
   * @private
   * @param operation
   * @param parameterMap
   */
  public async request(
    operation: OpenApiOperation | DrApiOperation | KukminApiOperation,
    parameterMap: QueryParameterMap = {},
  ): Promise<any> {
    const serviceKey = this.getServiceKey(parameterMap.serviceKey);

    const paramsString = new url.URLSearchParams({
      ...parameterMap,
      serviceKey,
      // 01: XML
      // 02: JSON
      returnType: '02',
    }).toString();

    const response = await this.httpService
      .post(this.getUrl(operation), paramsString)
      .toPromise();

    const { status, statusText, data } = response;

    this.logger.debug(
      `status: ${status}, statusText: ${statusText}, data: ${JSON.stringify(
        data,
      )}`,
    );

    return data;
  }
}
