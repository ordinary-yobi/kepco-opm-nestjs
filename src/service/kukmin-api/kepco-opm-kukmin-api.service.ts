import { Injectable } from '@nestjs/common';
import { KukminApiOperation } from '../../constants';
import {
  GetDayLpDataArgs,
  GetMinuteLpDataArgs,
} from '../../request/kepco-opm.args';
import { KepcoOpmService } from '../kepco-opm.service';
import { GetMinuteLpDataResponse } from '../../response/opm/GetMinuteLpDataResponse';
import { GetDayLpDataResponse } from '../../response/opm/GetDayLpDataResponse';

@Injectable()
export class KepcoOpmKukminApiService {
  constructor(private readonly kepcoOpmService: KepcoOpmService) {}

  /**
   * 요청고객의 요청일자에 대 한 15분단위 하루치 96개 데이터
   */
  public async getDayLpData({
    serviceKey,
    custNo,
    date,
  }: GetDayLpDataArgs): Promise<GetDayLpDataResponse> {
    const response = await this.kepcoOpmService.request(
      KukminApiOperation.getKukminDayLpData,
      {
        serviceKey,
        custNo,
        date,
      },
    );
    return new GetDayLpDataResponse(response);
  }

  /**
   * 요청고객의 요청일자시분에 대한 15분단위 1개 데이터
   */
  public async getMinuteLpData({
    serviceKey,
    custNo,
    dateTime,
  }: GetMinuteLpDataArgs): Promise<GetMinuteLpDataResponse> {
    const response = await this.kepcoOpmService.request(
      KukminApiOperation.getKukminMinuteLpData,
      {
        serviceKey,
        custNo,
        dateTime,
      },
    );

    return new GetMinuteLpDataResponse(response);
  }
}
