import { OpmResponse, RawResponse } from '../kepco-opm.response';

/**
 *
 */
export class CustMeter {
  // custNo, 고객번호
  private customerNumber: string;

  // meter, 계기번호
  private meter: string;

  public setCustomerNumber(number: string): void {
    this.customerNumber = number;
  }

  public setMeter(meter: string): void {
    this.meter = meter;
  }
}

/**
 * {"custMeterInfoList":[{"custNo":"고객번호","meter":"계기번호"},{"custNo":"고객번 호2","meter":"계기번호2"}]}
 */
export class GetCustMeterListResponse extends OpmResponse<CustMeter> {
  constructor(rawResponse: RawResponse) {
    super(rawResponse, 'custMeterInfoList');

    const data = this.rawResponse[this.key].map((item) => {
      const keys = Object.keys(item);

      const customerInfo = new CustMeter();

      keys.forEach((key) => {
        const value = item[key];

        switch (key) {
          case 'custNo':
            customerInfo.setCustomerNumber(value);
            return;
          case 'meter': // 계약종명, 20
            customerInfo.setMeter(value);
            return;
        }

        console.log(`UnhandledKey:${key}`);
      });

      return customerInfo;
    });

    this.data.push(...data);
  }
}
