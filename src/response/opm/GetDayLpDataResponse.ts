import { OpmResponse, RawResponse } from '../kepco-opm.response';

/**
 *
 */
export class DayLpDataInfo {
  // custNo
  private customerNumber: string;

  // meterNo
  private meterNumber: string;

  // mr_ymd
  private requestedDate: string;

  // multi_meter_yn
  private hasMultipleMeters: boolean;

  // pwr_qty0015 ... pwr_qty2400
  // 96 개
  private usages: number[];

  setCustomerNumber(value: string): void {
    this.customerNumber = value;
  }

  setMeterNumber(value: string): void {
    this.meterNumber = value;
  }

  setRequestedDate(value: string): void {
    this.requestedDate = value;
  }

  setHasMultipleMeters(value: boolean): void {
    this.hasMultipleMeters = value;
  }

  setUsages(value: number[]): void {
    this.usages = value;
  }

  getCustomerNumber(): string {
    return this.customerNumber;
  }

  getMeterNumber(): string {
    return this.meterNumber;
  }

  getRequestedDate(): string {
    return this.requestedDate;
  }

  getHasMultipleMeters(): boolean {
    return this.hasMultipleMeters;
  }

  getUsages(): number[] {
    return this.usages;
  }
}

/**
 * {"dayLpDataInfoList":[{"custNo":"고객번호","meterNo":"계기번호","mr_ymd":"조회일자","multi_meter_yn":"다계기여부","pwr_qty0015":0.0911,"pwr_qty0030":0.0728,"pw r_qty0045":0.0208,"pwr_qty0100":0.0221, ... "pwr_qty2400":0.0211}]}
 */
export class GetDayLpDataResponse extends OpmResponse<DayLpDataInfo> {
  constructor(rawResponse: RawResponse) {
    super(rawResponse, 'dayLpDataInfoList');

    const data = this.rawResponse[this.key].map((item) => {
      const keys = Object.keys(item);

      const dayData = new DayLpDataInfo();

      const usages = new Array(96);

      keys.forEach((key) => {
        const value = item[key];

        switch (key) {
          case 'custNo':
            dayData.setCustomerNumber(value);
            return;
          case 'meterNo':
            dayData.setMeterNumber(value);
            return;
          case 'mr_ymd':
            dayData.setRequestedDate(value);
            return;
          case 'multi_meter_yn':
            dayData.setHasMultipleMeters(value === 'Y');
            return;
        }

        if (key.substr(0, 7) === 'pwr_qty') {
          const time = key.substr(7);
          const hour = Number.parseInt(time.substr(0, 2), 10);
          const minute = Number.parseInt(time.substr(2), 10);
          const index = (hour * 60 + minute) / 15;
          usages[index - 1] = item[key];
          return;
        }

        console.log(`UnhandledKey:${key}`);
      });

      dayData.setUsages(usages);

      return dayData;
    });

    this.data.push(...data);
  }
}
