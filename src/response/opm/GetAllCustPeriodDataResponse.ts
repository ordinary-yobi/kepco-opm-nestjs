import { OpmResponse, RawResponse } from '../kepco-opm.response';

/**
 *
 */
export class AllCustPeriodDataInfo {
  // custNo, 고객번호
  private customerNumber: string;

  // meter, 계기번호
  private meter: string;

  // mr_ymd, 조회일자
  private requestedDate: string;

  // mr_hhmi, 조회시분
  private requestedTime: string;

  // pwr_qty, 전력소비데이터
  private usage: number;

  public setCustomerNumber(customerNumber: string): void {
    this.customerNumber = customerNumber;
  }

  public setMeter(meter: string): void {
    this.meter = meter;
  }

  public setRequestedDate(requestedDate: string): void {
    this.requestedDate = requestedDate;
  }

  public setRequestedTime(requestedTime: string): void {
    this.requestedTime = requestedTime;
  }

  public setUsage(usage: number): void {
    this.usage = usage;
  }
}

/**
 * {"allCustPeriodDataInfoList":[ {"custNo":"고객번호","meter":"계기번호","mr_ymd":"조회일자","mr_hhmi":"0000","pwr _qty":0.0211},{"custNo":"고객번호","meter":"계기번호","mr_ymd":"조회일자","mr_hhm i":"0015","pwr_qty":0.0911},{"custNo":"고객번호","meter":"계기번호","mr_ymd":"조 회일자","mr_hhmi":"0030","pwr_qty":0.0728},{"custNo":"고객번호","meter":"계기번호 ","mr_ymd":"조회일자","mr_hhmi":"0045","pwr_qty":0.0208}, {"custNo":"고객번호2","meter":"계기번호2","mr_ymd":"조회일자2","mr_hhmi":"0000"," pwr_qty":0.0211},{"custNo":"고객번호2","meter":"계기번호2","mr_ymd":"조회일자2"," mr_hhmi":"0015","pwr_qty":0.0211},{"custNo":"고객번호2","meter":"계기번호2","mr_ ymd":"조회일자2","mr_hhmi":"0030","pwr_qty":0.0528},{"custNo":"고객번호2","meter ":"계기번호2","mr_ymd":"조회일자2","mr_hhmi":"0045","pwr_qty":0.0208}]}
 */
export class GetAllCustPeriodDataResponse extends OpmResponse<AllCustPeriodDataInfo> {
  constructor(rawResponse: RawResponse) {
    super(rawResponse, 'allCustPeriodDataInfoList');

    const data = this.rawResponse[this.key].map((item) => {
      const keys = Object.keys(item);

      const periodDataInfo = new AllCustPeriodDataInfo();

      keys.forEach((key) => {
        const value = item[key];

        switch (key) {
          case 'custNo': // 고객번호, 10
            periodDataInfo.setCustomerNumber(value);
            return;
          case 'meter': // 계기번호, 20
            periodDataInfo.setMeter(value);
            return;
          case 'mr_ymd': // 조회일자, 8, yyyymmdd
            periodDataInfo.setRequestedDate(value);
            return;
          case 'mr_hhmi': // 조회시간, 4, hhmi
            periodDataInfo.setRequestedTime(value);
            return;
          case 'pwr_qty': // 전력소비데이터, (14,4)
            periodDataInfo.setUsage(value);
            return;
        }

        console.log(`UnhandledKey:${key}`);
      });

      return periodDataInfo;
    });

    this.data.push(...data);
  }
}
