import { OpmResponse, RawResponse } from '../kepco-opm.response';

/**
 *
 */
export class MinuteLpDataInfo {
  // custNo
  private customerNumber: string;

  // meterNo
  private meterNumber: string;

  // mr_ymd
  private requestedAt: string;

  // multi_meter_yn
  private hasMultipleMeters: boolean;

  // pwr_qty
  private usage: number;

  setCustomerNumber(value: string): void {
    this.customerNumber = value;
  }

  setMeterNumber(value: string): void {
    this.meterNumber = value;
  }

  setRequestedAt(value: string): void {
    this.requestedAt = value;
  }

  setHasMultipleMeters(value: boolean): void {
    this.hasMultipleMeters = value;
  }

  setUsage(value: number): void {
    this.usage = value;
  }
}

/**
 * {"minuteLpDataInfoList":[{"custNo":"고객번호","meterNo":"계기번호","mr_ymd":"조회 일자","multi_meter_yn":"다계기여부","pwr_qty":0.0728}]}
 */
export class GetMinuteLpDataResponse extends OpmResponse<MinuteLpDataInfo> {
  constructor(rawResponse: RawResponse) {
    super(rawResponse, 'minuteLpDataInfoList');

    const data = this.rawResponse[this.key].map((item) => {
      const keys = Object.keys(item);

      const minuteData = new MinuteLpDataInfo();

      keys.forEach((key) => {
        const value = item[key];

        switch (key) {
          case 'custNo':
            minuteData.setCustomerNumber(value);
            return;
          case 'meterNo':
            minuteData.setMeterNumber(value);
            return;
          case 'mr_ymd':
            minuteData.setRequestedAt(value);
            return;
          case 'multi_meter_yn':
            minuteData.setHasMultipleMeters(value === 'Y');
            return;
          case 'pwr_qty':
            minuteData.setUsage(value);
            return;
          default:
            console.log(`UnhandledKey:${key}`);
            break;
        }
      });

      return minuteData;
    });

    this.data.push(...data);
  }
}
