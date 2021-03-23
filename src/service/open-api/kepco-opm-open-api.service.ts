import { Injectable, Logger } from '@nestjs/common';
import { OpenApiOperation } from '../../constants';
import {
  GetAllCustPeriodDataArgs,
  GetCustBillDataArgs,
  GetCustInfoDataArgs,
  GetCustJoinInfoDataArgs,
  GetCustMeterListArgs,
  GetCustNoListArgs,
  GetDayLpDataArgs,
  GetMinuteLpDataArgs,
  GetPeriodDataArgs,
} from '../../request/kepco-opm.args';
import { KepcoOpmService } from '../kepco-opm.service';
import { GetDayLpDataResponse } from '../../response/opm/GetDayLpDataResponse';
import { GetMinuteLpDataResponse } from '../../response/opm/GetMinuteLpDataResponse';
import { GetCustNoListResponse } from '../../response/opm/GetCustNoListResponse';
import { GetCustMeterListResponse } from '../../response/opm/GetCustMeterListResponse';
import { GetAllCustPeriodDataResponse } from '../../response/opm/GetAllCustPeriodDataResponse';
import { GetPeriodDataResponse } from '../../response/opm/GetPeriodDataResponse';
import { GetCustInfoDataResponse } from '../../response/opm/GetCustInfoDataResponse';
import { GetCustJoinInfoDataResponse } from '../../response/opm/GetCustJoinInfoDataResponse';

@Injectable()
export class KepcoOpmOpenApiService {
  private readonly logger: Logger = new Logger(this.constructor.name);

  constructor(private readonly opmService: KepcoOpmService) {}

  /**
   *
   * 일단위 전력소비 데이터
   * 특정고객에 대한 요청일자에 대 한 15분단위 하루치 96개 데이터목록
   */
  public async getDayLpData({
    serviceKey,
    custNo,
    date,
  }: GetDayLpDataArgs): Promise<GetDayLpDataResponse> {
    const response = await this.opmService.request(
      OpenApiOperation.getDayLpData,
      {
        serviceKey,
        custNo,
        date,
      },
    );
    return new GetDayLpDataResponse(response);
  }

  /**
   *
   * 일반사업자용 15분단위 전력소비 데이터
   * 특정고객에 대한 요청일자 시분 에 대한 15분단위 1개 데이터
   */
  public async getMinuteLpData({
    serviceKey,
    custNo,
    dateTime,
  }: GetMinuteLpDataArgs): Promise<GetMinuteLpDataResponse> {
    const response = await this.opmService.request(
      OpenApiOperation.getMinuteLpData,
      {
        serviceKey,
        custNo,
        dateTime,
      },
    );
    return new GetMinuteLpDataResponse(response);
  }

  /**
   *
   * 고객번호 목록
   * 정보제공 동의한 고객정보 목록
   */
  public async getCustNoList(
    args: GetCustNoListArgs = {},
  ): Promise<GetCustNoListResponse> {
    const response = await this.opmService.request(
      OpenApiOperation.getCustNoList,
      { ...args },
    );
    return new GetCustNoListResponse(response);
  }

  /**
   *
   * 고객번호, 계기번호 목록
   * 정보제공 동의한 고객 목록
   * {"custMeterInfoList":[{"custNo":"고객번호","meter":"계기번호"},{"custNo":"고객번 호2","meter":"계기번호2"}]}
   */
  public async getCustMeterList(
    args: GetCustMeterListArgs = {},
  ): Promise<GetCustMeterListResponse> {
    const response = await this.opmService.request(
      OpenApiOperation.getCustMeterList,
      { ...args },
    );

    return new GetCustMeterListResponse(response);
  }

  /**
   * 전체고객 특정시간의 전력소비 데이터
   * 정보제공 동의한 전체 고객의 조회일시 15분단위 4개 데이터
   */
  public async getAllCustPeriodData({
    serviceKey,
    date,
  }: GetAllCustPeriodDataArgs): Promise<GetAllCustPeriodDataResponse> {
    const response = await this.opmService.request(
      OpenApiOperation.getAllCustPeriodData,
      {
        serviceKey,
        date,
      },
    );
    return new GetAllCustPeriodDataResponse(response);
  }

  /**
   * 특정고객의 특정기간의 전력소비 데이터
   * 고객의 특정시간의 전력소비 데이터목록
   */
  public async getPeriodData({
    serviceKey,
    custNo,
    sDate,
    endDate,
    sTime,
    endTime,
  }: GetPeriodDataArgs): Promise<GetPeriodDataResponse> {
    const response = await this.opmService.request(
      OpenApiOperation.getPeriodData,
      {
        serviceKey,
        custNo,
        sDate,
        endDate,
        sTime,
        endTime,
      },
    );
    return new GetPeriodDataResponse(response);
  }

  /**
   * 고객계약정보
   * 정보제공 동의한 고객기본사항
   */
  public async getCustInfoData(
    args: GetCustInfoDataArgs,
  ): Promise<GetCustInfoDataResponse> {
    const response = await this.opmService.request(
      OpenApiOperation.getCustInfoData,
      { ...args },
    );
    return new GetCustInfoDataResponse(response);
  }

  /**
   * 고객계약정보
   * 정보제공 동의한 고객기본사항
   */
  public async getCustJoinInfoData(
    args: GetCustJoinInfoDataArgs,
  ): Promise<GetCustJoinInfoDataResponse> {
    const response = await this.opmService.request(
      OpenApiOperation.getCustJoinInfoData,
      { ...args },
    );
    return new GetCustJoinInfoDataResponse(response);
  }

  /**
   * 고객요금정보
   * 고객 전기요금 청구정보
   */
  public getCustBillData({
    serviceKey,
    custNo,
    dataMonth,
  }: GetCustBillDataArgs) {
    return;
  }
}
