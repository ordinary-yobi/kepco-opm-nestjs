import { Injectable } from '@nestjs/common';
import { DrApiOperation } from '../../constants';
import { GetDayLpDataArgs, GetMinuteLpDataArgs } from '../../request/kepco-opm.args';
import { KepcoOpmService } from '../kepco-opm.service';
import { GetMinuteLpDataResponse } from '../../response/opm/GetMinuteLpDataResponse';
import { GetDayLpDataResponse } from '../../response/opm/GetDayLpDataResponse';

@Injectable()
export class KepcoOpmDrApiService {
  constructor(private readonly kepcoOpmService: KepcoOpmService) {}

  /**
   * DR사업자용 일단위 전력소비 데이터
   * 특정고객에 대한 요청일자에 대 한 15분단위 하루치 96개 데이터
   */
  public async getDayLpData({
    serviceKey,
    custNo,
    date,
  }: GetDayLpDataArgs): Promise<GetDayLpDataResponse> {
    const response = await this.kepcoOpmService.request(
      DrApiOperation.getDayLpData,
      {
        serviceKey,
        custNo,
        date,
      },
    );
    return new GetDayLpDataResponse(response);
  }

  /**
   * DR사업자용 15분단위 전력소비 데이터
   * 특정고객에 대한 요청일자 시분 에 대한 15분단위 1개 데이터
   */
  public async getMinuteLpData({
    serviceKey,
    custNo,
    dateTime,
  }: GetMinuteLpDataArgs): Promise<GetMinuteLpDataResponse> {
    const response = await this.kepcoOpmService.request(
      DrApiOperation.getMinuteLpData,
      {
        serviceKey,
        custNo,
        dateTime,
      },
    );

    return new GetMinuteLpDataResponse(response);
  }
}
